#!/usr/bin/env node
/**
 * Install PayFast Integration Dependencies
 * Ensures all required packages are installed for payment processing
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Installing PayFast Integration Dependencies...\n');

// Check if package.json exists
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: package.json not found. Run this from the project root.');
  process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Dependencies to install
const requiredDeps = {
  '@supabase/supabase-js': '^2.39.0',
  'resend': '^3.2.0'
};

console.log('📦 Required dependencies:');
Object.entries(requiredDeps).forEach(([pkg, version]) => {
  console.log(`   - ${pkg}@${version}`);
});
console.log('');

// Check which dependencies need to be installed
const toInstall = [];
Object.entries(requiredDeps).forEach(([pkg, version]) => {
  if (!packageJson.dependencies || !packageJson.dependencies[pkg]) {
    toInstall.push(`${pkg}@${version}`);
  }
});

if (toInstall.length === 0) {
  console.log('✅ All dependencies already installed!\n');
} else {
  console.log(`📥 Installing ${toInstall.length} package(s)...\n`);
  
  try {
    execSync(`npm install ${toInstall.join(' ')}`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('\n✅ Dependencies installed successfully!\n');
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
    process.exit(1);
  }
}

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('⚠️  No .env file found.');
  
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Copying .env.example to .env...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created. Please fill in your credentials.\n');
  } else {
    console.log('❌ No .env.example found either. Create .env manually.\n');
  }
} else {
  console.log('✅ .env file exists.\n');
}

// Check environment variables
console.log('🔍 Checking environment variables...\n');

const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

const requiredEnvVars = [
  'PAYFAST_MERCHANT_ID',
  'PAYFAST_MERCHANT_KEY',
  'PAYFAST_PASSPHRASE',
  'PAYFAST_MODE',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY',
  'EMAIL_FROM',
  'NEXT_PUBLIC_SITE_URL'
];

const missingVars = [];
requiredEnvVars.forEach(varName => {
  const regex = new RegExp(`^${varName}=.+`, 'm');
  if (!regex.test(envContent)) {
    missingVars.push(varName);
  }
});

if (missingVars.length === 0) {
  console.log('✅ All required environment variables set!\n');
} else {
  console.log('⚠️  Missing environment variables:\n');
  missingVars.forEach(varName => {
    console.log(`   ❌ ${varName}`);
  });
  console.log('\n📖 See .env.example for details.\n');
}

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Installation Summary');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('📦 Dependencies: ' + (toInstall.length === 0 ? '✅ Installed' : '✅ Installed'));
console.log('🔐 Environment:  ' + (missingVars.length === 0 ? '✅ Complete' : `⚠️  ${missingVars.length} missing`));
console.log('');

if (missingVars.length > 0) {
  console.log('⚡ Next Steps:');
  console.log('   1. Set up Supabase: https://supabase.com');
  console.log('   2. Set up PayFast: https://sandbox.payfast.co.za');
  console.log('   3. Set up Resend: https://resend.com');
  console.log('   4. Fill in .env with your credentials');
  console.log('   5. Run: npm run build');
  console.log('   6. Deploy: vercel --prod');
  console.log('');
  console.log('📖 See DEPLOYMENT_CHECKLIST.md for detailed instructions.');
} else {
  console.log('🚀 Ready to deploy!');
  console.log('   Run: vercel --prod');
}

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
