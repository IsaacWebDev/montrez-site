# EMAIL VERIFICATION BACKEND - DEPLOYMENT CHECKLIST

Complete deployment checklist for MONTREZ email verification system.

---

## Pre-Deployment

### 1. Resend Account Setup
- [ ] Sign up at https://resend.com
- [ ] Verify email address
- [ ] Create API key
- [ ] Copy API key for environment variables

### 2. Domain Setup (Optional but Recommended)
- [ ] Verify custom domain in Resend dashboard
- [ ] Add DNS records (provided by Resend)
- [ ] Update `EMAIL_FROM` to use custom domain
- [ ] Example: `verify@montrez.com` instead of `onboarding@resend.dev`

### 3. Code Review
- [ ] Review `api/send-code.js`
- [ ] Review `api/verify-code.js`
- [ ] Check rate limit thresholds (currently: 3 codes/hour, 10 requests/hour per IP)
- [ ] Verify code expiry time (currently: 10 minutes)
- [ ] Check max verification attempts (currently: 3)

---

## Vercel Deployment

### 1. Environment Variables
- [ ] Go to Vercel dashboard
- [ ] Navigate to Project Settings → Environment Variables
- [ ] Add `RESEND_API_KEY`:
  - Value: Your Resend API key
  - Environments: Production + Preview
- [ ] Add `EMAIL_FROM`:
  - Value: `MONTREZ <onboarding@resend.dev>` (or custom domain)
  - Environments: Production + Preview

### 2. Configuration Check
- [ ] Verify `vercel.json` includes API function config
- [ ] Check API routes are configured correctly
- [ ] Verify CORS headers are set

### 3. Deploy
- [ ] Push to GitHub repository
- [ ] Verify Vercel auto-deploys
- [ ] Check deployment logs for errors
- [ ] Verify functions deployed successfully

---

## Post-Deployment Testing

### 1. API Endpoint Testing

**Send Code Endpoint:**
```bash
curl -X POST https://montrez-site.vercel.app/api/send-code \
  -H "Content-Type: application/json" \
  -d '{"email":"your-test-email@example.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Code sent to email",
  "expiresIn": 600
}
```

- [ ] Test with valid email
- [ ] Check email received
- [ ] Verify email formatting
- [ ] Test with invalid email (should fail)
- [ ] Test rate limiting (send 4 requests rapidly)

**Verify Code Endpoint:**
```bash
curl -X POST https://montrez-site.vercel.app/api/verify-code \
  -H "Content-Type: application/json" \
  -d '{"email":"your-test-email@example.com","code":"123456"}'
```

Expected success response:
```json
{
  "success": true,
  "message": "Code verified",
  "accessToken": "...",
  "expiresIn": 86400
}
```

- [ ] Test with correct code
- [ ] Test with wrong code (should fail)
- [ ] Test with expired code (wait 10 minutes)
- [ ] Test max attempts (3 wrong codes)
- [ ] Test invalid code format

### 2. Email Deliverability

- [ ] Send test email to Gmail account
- [ ] Send test email to Outlook account
- [ ] Send test email to Yahoo account
- [ ] Check spam folders
- [ ] Verify email styling renders correctly
- [ ] Test on mobile email clients
- [ ] Check Resend dashboard for delivery status

### 3. Frontend Integration

- [ ] Test password flow (returning users)
- [ ] Test email flow (new users)
- [ ] Test code verification
- [ ] Test error messages display correctly
- [ ] Test loading states
- [ ] Test access token persistence
- [ ] Test returning to site with valid token

### 4. Security Testing

- [ ] Verify rate limiting works (3 codes per email per hour)
- [ ] Verify IP rate limiting works (10 requests per hour per IP)
- [ ] Test code expiry (10 minutes)
- [ ] Test max attempts (3 per code)
- [ ] Verify email validation rejects invalid formats
- [ ] Test CORS headers allow frontend requests
- [ ] Verify no sensitive data in error messages

---

## Monitoring Setup

### 1. Vercel Logs
- [ ] Enable function logs in Vercel dashboard
- [ ] Set up log retention
- [ ] Review logs for errors

### 2. Resend Dashboard
- [ ] Monitor email delivery rate
- [ ] Check bounce rate
- [ ] Monitor complaint rate
- [ ] Set up alerts for delivery issues

### 3. Performance Monitoring
- [ ] Check function execution time
- [ ] Monitor memory usage
- [ ] Verify cold start performance
- [ ] Check API response times

---

## Production Readiness

### Critical Checks
- [ ] API endpoints respond correctly
- [ ] Emails are delivered
- [ ] Rate limiting is active
- [ ] Codes expire after 10 minutes
- [ ] Access tokens are generated correctly
- [ ] Frontend integration works end-to-end
- [ ] Mobile experience is smooth
- [ ] Error handling is user-friendly

### Optional Improvements
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Add analytics (track verification success rate)
- [ ] Implement Redis for better code persistence
- [ ] Add database for user tracking
- [ ] Set up monitoring alerts
- [ ] Add email templates for different scenarios

---

## Rollback Plan

**If issues occur:**

1. **Email delivery fails:**
   - Check Resend API key is valid
   - Verify `EMAIL_FROM` is correct
   - Check Resend dashboard for issues
   - Temporarily disable new user flow

2. **Rate limiting too aggressive:**
   - Update thresholds in `api/send-code.js`
   - Redeploy

3. **Codes not persisting (cold starts):**
   - Consider Redis implementation
   - Document issue for users
   - Temporary workaround: extend code expiry

4. **Critical failure:**
   - Revert to previous deployment
   - Investigate logs
   - Fix and redeploy

---

## Success Criteria

**Deployment is successful when:**
- ✅ API endpoints respond correctly
- ✅ Emails are delivered within 30 seconds
- ✅ Verification codes work correctly
- ✅ Rate limiting prevents abuse
- ✅ Frontend integration is seamless
- ✅ Mobile experience is smooth
- ✅ No errors in production logs
- ✅ Email deliverability > 95%

---

## Next Steps After Deployment

1. **Monitor for 24-48 hours:**
   - Watch function logs
   - Check email delivery rates
   - Monitor user feedback

2. **Gather metrics:**
   - Verification success rate
   - Average time to verify
   - Rate limit hit rate
   - Email bounce rate

3. **Optimize if needed:**
   - Adjust rate limits based on usage
   - Improve email template
   - Enhance error messages
   - Add analytics

4. **Scale considerations:**
   - If traffic increases, consider Redis
   - Add database for user tracking
   - Implement caching if needed
   - Scale to multiple regions

---

## Documentation

**All documentation complete:**
- [x] `api/README.md` - Complete API documentation
- [x] `EMAIL_VERIFICATION_INTEGRATION.md` - Frontend integration guide
- [x] `BACKEND_DEPLOYMENT_CHECKLIST.md` - This checklist
- [x] `.env.example` - Environment variables template
- [x] `api/test-api.js` - Testing script

---

**Ready for production deployment! ✅**

Follow this checklist to ensure smooth deployment and operation.
