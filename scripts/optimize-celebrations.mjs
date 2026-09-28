/**
 * Resize celebration cutouts → WebP frames + animated GIF (L→M→R→M).
 * Source: assets/celebrations-source/original-wag-{left,middle,right}.png
 *
 * Requires: sharp (npm) and ffmpeg on PATH for the GIF.
 */
import sharp from 'sharp'
import { mkdir, access, writeFile, rm } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'assets/celebrations-source')
const outDir = join(root, 'public/celebrations')
const frames = ['left', 'middle', 'right']
const SIZE = 512

await mkdir(outDir, { recursive: true })

const frameBuffers = {}

for (const name of frames) {
  const input = join(srcDir, `original-wag-${name}.png`)
  try {
    await access(input)
  } catch {
    console.error(`Missing source: ${input}`)
    process.exit(1)
  }
  const output = join(outDir, `wag-${name}.webp`)
  const info = await sharp(input)
    .resize(SIZE, SIZE, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(output)
  frameBuffers[name] = await sharp(output)
    .resize(SIZE, SIZE, { fit: 'fill' })
    .png()
    .toBuffer()
  console.log(`${name}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB → ${output}`)
}

const order = ['left', 'middle', 'right', 'middle']
const tmp = join(tmpdir(), `wag-opt-${Date.now()}`)
await mkdir(tmp, { recursive: true })
for (let i = 0; i < order.length; i++) {
  await writeFile(join(tmp, `${i}.png`), frameBuffers[order[i]])
}

const gifPath = join(outDir, 'wag-animated.gif')
execFileSync(
  'ffmpeg',
  [
    '-y',
    '-framerate',
    '5',
    '-i',
    join(tmp, '%d.png'),
    '-loop',
    '0',
    '-lavfi',
    'split[s0][s1];[s0]palettegen=max_colors=128:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer',
    gifPath,
  ],
  { stdio: 'inherit' },
)
await rm(tmp, { recursive: true, force: true })

const spritePath = join(outDir, 'wag-sprite.webp')
const spriteInfo = await sharp({
  create: {
    width: SIZE * order.length,
    height: SIZE,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
})
  .composite(
    await Promise.all(
      order.map(async (name, i) => ({
        input: await sharp(frameBuffers[name]).ensureAlpha().toBuffer(),
        left: i * SIZE,
        top: 0,
      })),
    ),
  )
  .webp({ quality: 82, effort: 6 })
  .toFile(spritePath)

console.log(`animated gif → ${gifPath}`)
console.log(`sprite: ${spriteInfo.width}x${spriteInfo.height} → ${spritePath}`)
