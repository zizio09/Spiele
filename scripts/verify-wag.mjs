/**
 * Visual proof that the celebration dog actually changes frames.
 * Usage: node scripts/verify-wag.mjs
 * Requires preview at http://127.0.0.1:43141
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const BASE = process.env.WAG_URL ?? 'http://127.0.0.1:43141/dev/celebration'
const OUT = '/tmp/wag-verify'
const ARTIFACTS = '/opt/cursor/artifacts'

await mkdir(OUT, { recursive: true })
await mkdir(ARTIFACTS, { recursive: true })

const browser = await chromium.launch({
  headless: true,
  args: ['--force-prefers-reduced-motion=0'],
})
const page = await browser.newPage({
  viewport: { width: 900, height: 1100 },
  reducedMotion: 'no-preference',
})

await page.emulateMedia({ reducedMotion: 'no-preference' })
await page.goto(BASE, { waitUntil: 'networkidle' })

await page.waitForSelector('[data-testid="dog-sprite"].is-wagging', { timeout: 5000 })
const wagging = await page.getAttribute('[role="status"]', 'data-wagging')
const reduce = await page.getAttribute('[role="status"]', 'data-reduce-motion')
console.log(`data-wagging=${wagging} data-reduce-motion=${reduce}`)

if (wagging !== 'true' || reduce === 'true') {
  console.error('FAIL: component is not in wagging state')
  process.exit(1)
}

const stage = page.locator('.win-celebration__dog-stage')
const shots = []
for (let i = 0; i < 4; i++) {
  // Sample near the middle of each 200ms frame bucket
  await page.waitForTimeout(i === 0 ? 50 : 200)
  const file = join(OUT, `frame-${i}.png`)
  await stage.screenshot({ path: file })
  shots.push(file)
  const bp = await page.locator('[data-testid="dog-sprite"]').evaluate((el) =>
    getComputedStyle(el).backgroundPosition,
  )
  console.log(`shot ${i}: background-position=${bp}`)
}

async function pixelDiff(aPath, bPath) {
  const a = await sharp(aPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const b = await sharp(bPath).resize(a.info.width, a.info.height).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  })
  let changed = 0
  const total = a.info.width * a.info.height
  for (let i = 0; i < a.data.length; i += 4) {
    const d =
      Math.abs(a.data[i] - b.data[i]) +
      Math.abs(a.data[i + 1] - b.data[i + 1]) +
      Math.abs(a.data[i + 2] - b.data[i + 2])
    if (d > 30) changed++
  }
  return { changed, total, pct: (100 * changed) / total }
}

let maxPct = 0
for (let i = 0; i < shots.length - 1; i++) {
  const d = await pixelDiff(shots[i], shots[i + 1])
  maxPct = Math.max(maxPct, d.pct)
  console.log(`diff ${i}→${i + 1}: ${d.changed}/${d.total} px (${d.pct.toFixed(2)}%)`)
}

// Also compare first vs third (should be left vs right-ish across the loop)
const cross = await pixelDiff(shots[0], shots[2])
console.log(`diff 0→2: ${cross.changed}/${cross.total} px (${cross.pct.toFixed(2)}%)`)
maxPct = Math.max(maxPct, cross.pct)

const stripInputs = await Promise.all(
  shots.map(async (p, i) => ({
    input: await sharp(p).resize(220, 220, { fit: 'contain', background: '#000' }).png().toBuffer(),
    left: i * 220,
    top: 0,
  })),
)
await sharp({
  create: { width: 880, height: 220, channels: 3, background: { r: 0, g: 0, b: 0 } },
})
  .composite(stripInputs)
  .png()
  .toFile(join(ARTIFACTS, 'wag-verify-strip.png'))

await page.screenshot({ path: join(ARTIFACTS, 'wag-verify-page.png'), fullPage: true })

await browser.close()

// Require visible motion between samples (≥1% pixel change somewhere in the loop)
if (maxPct < 1) {
  console.error(`FAIL: frames look static (max diff ${maxPct.toFixed(2)}%)`)
  process.exit(1)
}

console.log(`PASS: visible wag (max adjacent/cross diff ${maxPct.toFixed(2)}%)`)
console.log(`artifacts: ${ARTIFACTS}/wag-verify-strip.png`)
