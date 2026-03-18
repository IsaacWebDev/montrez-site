/**
 * Video Optimization Script
 * Reduces video file size while maintaining quality
 * Requires FFmpeg to be installed
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const INPUT_VIDEO = path.join(__dirname, '../public/videos/intro.mp4')
const OUTPUT_VIDEO = path.join(__dirname, '../public/videos/intro-optimized.mp4')

console.log('🎬 Optimizing video for web...\n')

// Check if FFmpeg is installed
try {
  execSync('ffmpeg -version', { stdio: 'ignore' })
} catch (error) {
  console.error('❌ FFmpeg not found. Please install FFmpeg:')
  console.error('   Windows: choco install ffmpeg')
  console.error('   Mac: brew install ffmpeg')
  console.error('   Linux: sudo apt install ffmpeg')
  process.exit(1)
}

// Check if input video exists
if (!fs.existsSync(INPUT_VIDEO)) {
  console.error(`❌ Video not found: ${INPUT_VIDEO}`)
  process.exit(1)
}

const originalSize = fs.statSync(INPUT_VIDEO).size
console.log(`📊 Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`)

// Optimize video
console.log('⚙️  Optimizing (this may take a minute)...\n')

const command = `ffmpeg -i "${INPUT_VIDEO}" -c:v libx264 -crf 28 -preset slow -vf "scale=1280:-2" -c:a aac -b:a 128k -movflags +faststart "${OUTPUT_VIDEO}" -y`

try {
  execSync(command, { stdio: 'inherit' })
  
  const optimizedSize = fs.statSync(OUTPUT_VIDEO).size
  const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1)
  
  console.log(`\n✅ Optimization complete!`)
  console.log(`📊 Optimized size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`📉 Size reduction: ${reduction}%`)
  console.log(`\n💡 To use optimized video, replace intro.mp4 with intro-optimized.mp4`)
} catch (error) {
  console.error('❌ Optimization failed:', error.message)
  process.exit(1)
}
