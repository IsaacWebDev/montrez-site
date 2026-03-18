# EMAIL VERIFICATION - QUICK START GUIDE

**Get the email verification system running in 5 minutes.**

---

## 1. Get Resend API Key (2 minutes)

1. Go to https://resend.com
2. Sign up with email
3. Navigate to **API Keys**
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

---

## 2. Add to Vercel (1 minute)

1. Go to Vercel dashboard → Your project
2. Navigate to **Settings** → **Environment Variables**
3. Add two variables:

**Variable 1:**
- Key: `RESEND_API_KEY`
- Value: `re_your_key_here`
- Environments: ✅ Production, ✅ Preview

**Variable 2:**
- Key: `EMAIL_FROM`
- Value: `MONTREZ <onboarding@resend.dev>`
- Environments: ✅ Production, ✅ Preview

4. Click **Save**

---

## 3. Deploy (1 minute)

**Option A - Auto Deploy:**
- Push this branch to GitHub
- Vercel auto-deploys
- Wait ~2 minutes

**Option B - Manual Deploy:**
```bash
vercel --prod
```

---

## 4. Test (1 minute)

**Send test code:**
```bash
curl -X POST https://your-site.vercel.app/api/send-code \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com"}'
```

**Check your email for the code.**

**Verify code:**
```bash
curl -X POST https://your-site.vercel.app/api/verify-code \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","code":"123456"}'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Code verified",
  "accessToken": "...",
  "expiresIn": 86400
}
```

---

## 5. Integrate Frontend (Optional - Later)

**When ready for frontend integration:**

See `EMAIL_VERIFICATION_INTEGRATION.md` for complete guide.

**Quick version:**
1. Copy hook from integration guide
2. Update PasswordGate modal
3. Add email/code input sections
4. Store access token on verification
5. Test full flow

---

## Done! ✅

Your email verification API is live and working.

**Next steps:**
- Read `EMAIL_VERIFICATION_INTEGRATION.md` for frontend integration
- Check `api/README.md` for full API documentation
- Review `BACKEND_DEPLOYMENT_CHECKLIST.md` for production readiness

---

## Troubleshooting

**Emails not sending?**
- Check Resend API key is correct in Vercel
- Verify email address is valid
- Check Resend dashboard for delivery status

**Rate limiting triggering?**
- Wait 1 hour to reset
- Or use different email for testing

**API not responding?**
- Check Vercel function logs
- Verify environment variables are set
- Ensure CORS headers allow your domain

---

**Need help?** Check the full documentation in `api/README.md`
