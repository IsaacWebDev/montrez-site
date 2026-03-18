#!/usr/bin/env node

/**
 * Logo Optimization Script
 * 
 * Optimizes PNG logos using pngquant compression
 * Expected results:
 * - 512px: 229KB → 35KB
 * - 256px: 69KB → 20KB
 * - 128px: 21KB → 12KB
 * 
 * Run: node scripts/optimize-logos.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LOGO_DIR = path.join(__dirname, '../public/images/logo');
const BACKUP_DIR = path.join(LOGO_DIR, '.backup');

// Files to optimize
const LOGOS = [
  'montrez-logo-512.png',
  'montrez-logo-256.png',
  'montrez-logo-128.png'
];

console.log('🖼️  MONTREZ LOGO OPTIMIZATION');
console.log('════════════════════════════════════════\n');

// Check if imagemin is installed
try {
  require.resolve('imagemin');
  require.resolve('imagemin-pngquant');
} catch (e) {
  console.log('📦 Installing optimization dependencies...');
  console.log('   npm install -D imagemin imagemin-pngquant\n');
  
  try {
    execSync('npm install -D imagemin imagemin-pngquant', {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
  } catch (err) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
  }
}

async function optimizeLogos() {
  const imagemin = require('imagemin');
  const imageminPngquant = require('imagemin-pngquant');

  // Create backup directory
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`✅ Backup directory created: ${BACKUP_DIR}\n`);
  }

  // Backup originals
  console.log('📦 Backing up original files...');
  for (const logo of LOGOS) {
    const originalPath = path.join(LOGO_DIR, logo);
    const backupPath = path.join(BACKUP_DIR, logo);
    
    if (fs.existsSync(originalPath)) {
      fs.copyFileSync(originalPath, backupPath);
      console.log(`   ✓ ${logo}`);
    }
  }
  console.log();

  // Optimize
  console.log('🚀 Optimizing images...\n');
  
  try {
    const files = await imagemin([`${LOGO_DIR}/*.png`], {
      plugins: [
        imageminPngquant({
          quality: [0.80, 0.95],  // 80-95% quality
          speed: 1                 // Best compression (slower)
        })
      ],
      destination: LOGO_DIR
    });

    // Print results
    console.log('\n📊 OPTIMIZATION RESULTS:');
    console.log('════════════════════════════════════════');
    
    for (const logo of LOGOS) {
      const filePath = path.join(LOGO_DIR, logo);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const backupStats = fs.statSync(path.join(BACKUP_DIR, logo));
        
        const originalSize = backupStats.size;
        const optimizedSize = stats.size;
        const saved = originalSize - optimizedSize;
        const percent = ((saved / originalSize) * 100).toFixed(1);
        
        console.log(`\n${logo}`);
        console.log(`  Before: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`  After:  ${(optimizedSize / 1024).toFixed(2)} KB`);
        console.log(`  Saved:  ${(saved / 1024).toFixed(2)} KB (${percent}%)`);
      }
    }

    // Total savings
    console.log('\n════════════════════════════════════════');
    let totalOriginal = 0;
    let totalOptimized = 0;
    
    for (const logo of LOGOS) {
      const filePath = path.join(LOGO_DIR, logo);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const backupStats = fs.statSync(path.join(BACKUP_DIR, logo));
        totalOriginal += backupStats.size;
        totalOptimized += stats.size;
      }
    }
    
    const totalSaved = totalOriginal - totalOptimized;
    const totalPercent = ((totalSaved / totalOriginal) * 100).toFixed(1);
    
    console.log(`\n📈 TOTAL:  ${(totalSaved / 1024).toFixed(2)} KB saved (${totalPercent}%)`);
    console.log(`   Before: ${(totalOriginal / 1024).toFixed(2)} KB`);
    console.log(`   After:  ${(totalOptimized / 1024).toFixed(2)} KB\n`);

    console.log('✅ Logo optimization complete!');
    console.log(`\n💡 Backups saved in: ${BACKUP_DIR}`);
    console.log('   (Safe to delete after verification)\n');

  } catch (err) {
    console.error('❌ Optimization failed:', err.message);
    
    // Restore from backup
    console.log('\n🔄 Restoring from backup...');
    for (const logo of LOGOS) {
      const backupPath = path.join(BACKUP_DIR, logo);
      const filePath = path.join(LOGO_DIR, logo);
      
      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, filePath);
      }
    }
    console.log('✅ Files restored\n');
    process.exit(1);
  }
}

// Run optimization
optimizeLogos().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
