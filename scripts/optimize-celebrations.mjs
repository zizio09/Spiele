/**
 * Resize celebration cutouts → WebP for public/celebrations/.
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
  console.log(`${name}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB → ${output}`)
}
