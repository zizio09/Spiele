/**
 * Resize celebration cutouts → WebP frames + 4-frame sprite for CSS wag.
 * Source: assets/celebrations-source/original-wag-{left,middle,right}.png
 */
import sharp from 'sharp'
import { mkdir, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'assets/celebrations-source')
const outDir = join(root, 'public/celebrations')
const frames = ['left', 'middle', 'right']
const SIZE = 512

await mkdir(outDir, { recursive: true })

/** @type {Record<string, Buffer>} */
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
    .ensureAlpha()
    .toBuffer()
  console.log(`${name}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB → ${output}`)
}

/** Loop strip: left → middle → right → middle */
const order = ['left', 'middle', 'right', 'middle']
const spritePath = join(outDir, 'wag-sprite.webp')
const spriteInfo = await sharp({
  create: {
    width: SIZE * order.length,
    height: SIZE,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
})
  .composite(order.map((name, i) => ({ input: frameBuffers[name], left: i * SIZE, top: 0 })))
  .webp({ quality: 82, effort: 6 })
  .toFile(spritePath)

console.log(
  `sprite: ${spriteInfo.width}x${spriteInfo.height}, ${(spriteInfo.size / 1024).toFixed(1)} KB → ${spritePath}`,
)
