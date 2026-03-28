const https = require('https');
const fs = require('fs');
const path = require('path');

// Free tier remove.bg API - requires API key
// Get free key from: https://www.remove.bg/api
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY || 'YOUR_API_KEY_HERE';

const images = [
  {
    input: './public/images/montrez-logo-castle.jpg',
    output: './public/images/montrez-logo-castle-no-bg.png'
  },
  {
    input: './public/images/montrez-logo-panther.jpg',
    output: './public/images/montrez-logo-panther-no-bg.png'
  }
];

async function removeBackground(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const formData = {
      size: 'auto',
      image_file_b64: fs.readFileSync(inputPath, { encoding: 'base64' })
    };

    const options = {
      method: 'POST',
      hostname: 'api.remove.bg',
      path: '/v1.0/removebg',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': REMOVE_BG_API_KEY
      }
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          fs.writeFileSync(outputPath, buffer);
          console.log(`✅ Success: ${outputPath}`);
          resolve();
        });
      } else {
        let errorMsg = '';
        res.on('data', (chunk) => errorMsg += chunk.toString());
        res.on('end', () => {
          console.error(`❌ Error ${res.statusCode}: ${errorMsg}`);
          reject(new Error(`API Error: ${res.statusCode}`));
        });
      }
    });

    req.on('error', reject);
    req.write(JSON.stringify(formData));
    req.end();
  });
}

async function main() {
  console.log('🎨 Starting background removal for Montrez logos...\n');
  
  if (REMOVE_BG_API_KEY === 'YOUR_API_KEY_HERE') {
    console.log('⚠️  No remove.bg API key found!');
    console.log('Get a free key at: https://www.remove.bg/api');
    console.log('Then run: $env:REMOVE_BG_API_KEY="your-key-here"\n');
    
    console.log('📌 Alternative: Use online tools manually:');
    console.log('   - https://www.remove.bg (upload images)');
    console.log('   - https://www.photoscissors.com');
    console.log('   - https://www.photopea.com (free Photoshop alternative)\n');
    process.exit(1);
  }

  for (const img of images) {
    try {
      console.log(`Processing: ${img.input}...`);
      await removeBackground(img.input, img.output);
    } catch (error) {
      console.error(`Failed to process ${img.input}:`, error.message);
    }
  }

  console.log('\n✅ Background removal complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Check output files for quality');
  console.log('2. Update image references in code (if needed)');
  console.log('3. Commit and push changes');
}

main().catch(console.error);
