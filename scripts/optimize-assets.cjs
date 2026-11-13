const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

async function run() {
  console.log('--- OPTIMIZING INA.EXE ASSETS ---')

  // 1. Optimize IT Logo & Favicon
  const itLogoPath = path.resolve('public/IT_Logo.png')
  if (fs.existsSync(itLogoPath)) {
    console.log('Optimizing IT_Logo.png & generating IT_Logo.webp...')
    await sharp(itLogoPath)
      .resize({ width: 512, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(path.resolve('public/IT_Logo.webp'))

    await sharp(itLogoPath)
      .resize({ width: 512, withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(path.resolve('public/IT_Logo_opt.png'))

    // Replace oversized 1.25MB public/IT_Logo.png with optimized 512px version
    fs.copyFileSync(path.resolve('public/IT_Logo_opt.png'), itLogoPath)
    fs.unlinkSync(path.resolve('public/IT_Logo_opt.png'))

    // Generate crisp 128x128 favicon.png
    await sharp(itLogoPath)
      .resize({ width: 128, height: 128, fit: 'contain', background: { r: 11, g: 17, b: 32, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.resolve('public/favicon.png'))

    console.log('IT Logo & Favicon optimized successfully.')
  }

  // 2. Profile picture
  const profilePath = path.resolve('public/profile.jpg')
  if (fs.existsSync(profilePath)) {
    await sharp(profilePath)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.resolve('public/profile.webp'))
    console.log('Profile image WebP generated.')
  }

  // 3. OJT Presentation Preview in public/documents/
  const ojtPreview = path.resolve('public/documents/OJT_Presentation_Preview.png')
  if (fs.existsSync(ojtPreview)) {
    console.log('Optimizing OJT_Presentation_Preview...')
    await sharp(ojtPreview)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.resolve('public/documents/OJT_Presentation_Preview.webp'))

    fs.mkdirSync(path.resolve('public/documents/thumbs'), { recursive: true })
    await sharp(ojtPreview)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.resolve('public/documents/thumbs/OJT_Presentation_Preview.webp'))
  }

  // 4. Multimedia gallery images
  const mediaDir = path.resolve('public/multimedia')
  const thumbsDir = path.resolve('public/multimedia/thumbs')
  fs.mkdirSync(thumbsDir, { recursive: true })

  const files = fs.readdirSync(mediaDir)
  for (const file of files) {
    const fullPath = path.join(mediaDir, file)
    if (!fs.statSync(fullPath).isFile() || file.endsWith('.webp')) continue

    const ext = path.extname(file)
    const baseName = path.basename(file, ext)
    const outWebp = path.join(mediaDir, `${baseName}.webp`)
    const outThumb = path.join(thumbsDir, `${baseName}.webp`)

    console.log(`Processing ${file}...`)
    // Full resolution display WebP
    await sharp(fullPath)
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outWebp)

    // Grid thumbnail WebP (max width 600)
    await sharp(fullPath)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outThumb)
  }

  console.log('Asset optimization complete!')
}

run().catch(console.error)

