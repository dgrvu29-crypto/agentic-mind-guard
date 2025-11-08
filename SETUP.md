# AgenticAI Setup Guide

Complete step-by-step guide to get AgenticAI running locally and deployed.

## 📋 Prerequisites

- Node.js 18+ and npm
- Lovable account (for deployment)
- Modern web browser
- Git

## 🚀 Quick Start (5 Minutes)

### 1. Access the Project in Lovable

This project is built with Lovable and deploys automatically. Simply:

1. Open the project in Lovable
2. The database schema is already created
3. Auth is pre-configured (auto-confirm emails enabled)
4. Edge functions deploy automatically
5. Click the preview URL to access your app

### 2. Create an Admin User

1. Click "Get Started" on the landing page
2. Sign up with email and password
3. Complete the consent flow
4. Note your user ID from the URL or backend

### 3. Grant Admin Permissions

In Lovable Cloud → Database → SQL Editor, run:

```sql
-- Replace USER_ID_HERE with your actual user ID
INSERT INTO user_roles (user_id, role) 
VALUES ('USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

### 4. Seed Sample Resources

In the SQL Editor, run the script from `scripts/seed-sample-data.sql` to populate sample campus resources.

### 5. Test the App

1. Sign in to your account
2. Start a conversation with Agentic
3. Test crisis detection (type "I'm feeling suicidal")
4. View resources in the sidebar
5. Try booking an appointment

## 🛠️ Local Development

### Option 1: Lovable Preview (Recommended)

The easiest way to develop is using Lovable's built-in preview:

1. Make changes in your IDE
2. Push to your connected Git repository
3. Lovable auto-deploys changes
4. Test in the live preview

### Option 2: Local Vite Server

For faster local iteration:

```bash
# Clone the repository
git clone <your-repo-url>
cd AgenticAI

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:8080`

**Note:** Edge functions will still call your deployed Lovable Cloud backend. To test edge functions locally, use the Supabase CLI (see Advanced Setup below).

## 🔧 Advanced Setup

### Local Supabase CLI (Optional)

For full local development including edge functions:

1. **Install Supabase CLI**
```bash
npm install -g supabase
```

2. **Link to Your Project**
```bash
supabase link --project-ref YOUR_PROJECT_ID
```

3. **Start Local Supabase**
```bash
supabase start
```

4. **Serve Edge Functions Locally**
```bash
supabase functions serve
```

5. **Update .env.local**
```bash
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_PUBLISHABLE_KEY=your_local_anon_key
```

### Testing Edge Functions

Use the built-in Lovable Cloud UI or curl:

```bash
# Test chat assessment
curl -X POST https://your-project.supabase.co/functions/v1/chat-assessment \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "assessmentId": "uuid-here",
    "message": "I feel anxious",
    "conversationHistory": []
  }'

# Test data export
curl -X POST https://your-project.supabase.co/functions/v1/export-data \
  -H "Authorization: Bearer YOUR_USER_JWT"
```

## 📊 Database Management

### View Schema

Access your database via Lovable Cloud → Database → Tables

### Run Migrations

All migrations are automatically applied when you push code changes to your repository.

### Backup Data

Use Lovable Cloud → Database → Export to download your data.

## 🎨 Customization

### Update Crisis Hotlines

Edit crisis numbers in `src/pages/Chat.tsx`:

```typescript
const crisisMsg: Message = {
  role: 'assistant',
  content: `If you are in immediate danger...
    National Crisis Hotline: 988
    Campus Emergency: (555) 123-4567`,
  ...
};
```

### Customize System Prompt

Edit the system prompt in `supabase/functions/chat-assessment/index.ts`:

```typescript
{
  role: "system",
  content: "You are **Agentic**, a compassionate..."
}
```

### Update Branding

1. Edit colors in `src/index.css` (`:root` variables)
2. Update logo in `src/pages/Index.tsx`
3. Change app name throughout the codebase

## 🔍 Troubleshooting

### Issue: "Authentication required" error

**Solution:** Make sure auto-confirm emails is enabled:
- Lovable Cloud → Auth → Settings
- Enable "Auto-confirm email signups"

### Issue: Edge functions not deploying

**Solution:** 
- Check Lovable Cloud → Functions for deployment status
- View logs for any errors
- Ensure TypeScript compiles without errors

### Issue: Database RLS errors

**Solution:**
- Verify user is authenticated
- Check RLS policies match user role
- For admins, ensure `user_roles` entry exists

### Issue: Crisis detection not working

**Solution:**
- Check edge function logs
- Verify crisis keywords in `chat-assessment/index.ts`
- Test with exact phrases: "suicide", "kill myself", "want to die"

### Issue: Resources not showing

**Solution:**
- Run seed script: `scripts/seed-sample-data.sql`
- Verify `access_level = 'public'` in resources table
- Check RLS policies allow SELECT for authenticated users

## 📱 Testing Checklist

- [ ] User can sign up and consent
- [ ] Chat interface loads and accepts messages
- [ ] AI responds with empathetic messages
- [ ] Crisis keywords trigger immediate escalation
- [ ] Resources display in sidebar
- [ ] Booking modal opens and submits
- [ ] Export data generates download link
- [ ] Delete account removes user data
- [ ] Admin can view audit logs (if admin role granted)

## 🚀 Deployment

### Lovable Deployment (Recommended)

1. Push changes to your Git repository
2. Lovable automatically deploys:
   - Frontend updates instantly
   - Edge functions deploy on push
   - Database migrations run automatically
3. Click "Publish" in Lovable to make changes live

### Custom Domain

1. Go to Lovable → Settings → Domains
2. Click "Connect Domain"
3. Follow DNS configuration instructions
4. Update canonical URL in `index.html`

## 🔐 Production Checklist

Before going live with real students:

- [ ] Enable 2FA for admin accounts
- [ ] Review all RLS policies for security
- [ ] Test crisis escalation flows thoroughly
- [ ] Configure real campus hotline numbers
- [ ] Set up monitoring (Sentry, etc.)
- [ ] Review consent text with legal team
- [ ] Test GDPR export/deletion flows
- [ ] Configure backup schedule
- [ ] Set up rate limiting
- [ ] Review AI system prompts with mental health professionals
- [ ] Add real campus resources via admin dashboard
- [ ] Test with campus counseling center staff
- [ ] Establish emergency response protocol

## 📞 Support

- Lovable Documentation: https://docs.lovable.dev
- Lovable Community: https://discord.gg/lovable
- Supabase Docs: https://supabase.com/docs

## ⚠️ Legal & Compliance

**Before production deployment:**

1. **Consult Legal Counsel** - Review privacy policies and consent
2. **FERPA Compliance** - Ensure student data protection
3. **HIPAA Considerations** - If clinical data is collected
4. **Insurance Review** - Verify coverage for AI-assisted services
5. **Partnership Agreements** - Coordinate with campus counseling center
6. **Crisis Protocol** - Establish emergency response procedures
7. **Data Retention Policy** - Define retention periods for audit logs

---

**Ready to make a difference?** Start helping students with AgenticAI! 💙
