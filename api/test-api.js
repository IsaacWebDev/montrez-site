/**
 * MONTREZ EMAIL VERIFICATION API - TEST SCRIPT
 * Run with: node api/test-api.js
 */

const API_BASE = process.env.API_BASE || 'http://localhost:3000';
const TEST_EMAIL = process.env.TEST_EMAIL || 'test@example.com';

async function testSendCode(email) {
  console.log('\n🧪 Testing: Send Code');
  console.log(`Email: ${email}`);
  
  try {
    const response = await fetch(`${API_BASE}/api/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return { success: response.ok, data };
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function testVerifyCode(email, code) {
  console.log('\n🧪 Testing: Verify Code');
  console.log(`Email: ${email}`);
  console.log(`Code: ${code}`);
  
  try {
    const response = await fetch(`${API_BASE}/api/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });
    
    const data = await response.json();
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return { success: response.ok, data };
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function testInvalidEmail() {
  console.log('\n🧪 Testing: Invalid Email');
  const result = await testSendCode('invalid-email');
  if (!result.success && result.data?.message?.includes('Invalid email')) {
    console.log('✅ Correctly rejected invalid email');
  } else {
    console.log('❌ Should have rejected invalid email');
  }
}

async function testInvalidCodeFormat() {
  console.log('\n🧪 Testing: Invalid Code Format');
  const result = await testVerifyCode(TEST_EMAIL, '12345'); // Only 5 digits
  if (!result.success && result.data?.message?.includes('Invalid code format')) {
    console.log('✅ Correctly rejected invalid code format');
  } else {
    console.log('❌ Should have rejected invalid code format');
  }
}

async function testWrongCode() {
  console.log('\n🧪 Testing: Wrong Code');
  const result = await testVerifyCode(TEST_EMAIL, '000000');
  if (!result.success) {
    console.log('✅ Correctly rejected wrong code');
    if (result.data?.attemptsRemaining !== undefined) {
      console.log(`   Attempts remaining: ${result.data.attemptsRemaining}`);
    }
  } else {
    console.log('❌ Should have rejected wrong code');
  }
}

async function testRateLimit() {
  console.log('\n🧪 Testing: Rate Limiting');
  console.log('Sending 4 requests rapidly...');
  
  const results = await Promise.all([
    testSendCode(TEST_EMAIL),
    testSendCode(TEST_EMAIL),
    testSendCode(TEST_EMAIL),
    testSendCode(TEST_EMAIL)
  ]);
  
  const rateLimited = results.filter(r => r.data?.retryAfter !== undefined);
  
  if (rateLimited.length > 0) {
    console.log(`✅ Rate limiting working (${rateLimited.length} requests blocked)`);
  } else {
    console.log('⚠️  Rate limiting may not be working correctly');
  }
}

async function fullFlow() {
  console.log('\n🧪 Testing: Full Verification Flow');
  
  // Step 1: Send code
  console.log('\n📧 Step 1: Sending verification code...');
  const sendResult = await testSendCode(TEST_EMAIL);
  
  if (!sendResult.success) {
    console.log('❌ Failed to send code');
    return;
  }
  
  console.log('✅ Code sent successfully');
  
  // Step 2: Manual code entry (in real testing, get from email)
  console.log('\n⏳ Step 2: Waiting for code entry...');
  console.log('   (In automated testing, you would retrieve the code from email)');
  console.log('   (In this test, we will try a wrong code first)');
  
  // Step 3: Try wrong code
  console.log('\n🔐 Step 3: Testing wrong code...');
  await testWrongCode();
  
  console.log('\n💡 To complete full flow:');
  console.log('   1. Check email for code');
  console.log('   2. Run: node api/test-api.js verify <code>');
}

async function main() {
  console.log('========================================');
  console.log('MONTREZ EMAIL VERIFICATION API - TESTS');
  console.log('========================================');
  console.log(`API Base: ${API_BASE}`);
  console.log(`Test Email: ${TEST_EMAIL}`);
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'verify') {
    const code = args[1];
    if (!code) {
      console.log('Usage: node api/test-api.js verify <code>');
      process.exit(1);
    }
    await testVerifyCode(TEST_EMAIL, code);
  } else if (command === 'send') {
    await testSendCode(TEST_EMAIL);
  } else if (command === 'rate-limit') {
    await testRateLimit();
  } else {
    // Run all tests
    await fullFlow();
    await testInvalidEmail();
    await testInvalidCodeFormat();
    
    console.log('\n========================================');
    console.log('TESTS COMPLETE');
    console.log('========================================');
    console.log('\nNext steps:');
    console.log('1. Check email for verification code');
    console.log('2. Run: node api/test-api.js verify <code>');
    console.log('3. Test rate limiting: node api/test-api.js rate-limit');
  }
}

main().catch(console.error);
