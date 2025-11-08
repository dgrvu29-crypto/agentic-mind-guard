# AgenticAI - Student Mental Health & Well-being Support

A compassionate, privacy-first AI-powered mental health support system for students, built with React, TypeScript, and Lovable Cloud (Supabase).

![AgenticAI](https://img.shields.io/badge/mental%20health-support-teal)
![Privacy First](https://img.shields.io/badge/privacy-first-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)

## 🎯 Core Features

- **Conversational AI Assessment** - Empathetic screening using validated PHQ-2/GAD-2 style questions
- **Crisis Detection** - Automatic detection of suicidal ideation with immediate escalation
- **Resource Grounding** - Retrieval-based recommendations from campus mental health resources
- **Privacy-First Design** - Encrypted conversations, consent management, data export/deletion
- **Appointment Booking** - Seamless scheduling with campus counselors
- **Admin Dashboard** - Upload resources, view anonymized logs, manage system

## 🏗️ Architecture

**Frontend:** React 18 + TypeScript + Vite + TailwindCSS
**Backend:** Lovable Cloud (Supabase) + Edge Functions (Deno)
**AI:** Lovable AI Gateway (Google Gemini 2.5 Flash)
**Database:** PostgreSQL with Row Level Security
**Storage:** Supabase Storage for resource documents

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser
- Lovable account (for deployment)

### Local Development

1. **Clone and Install**
```bash
git clone <your-repo-url>
cd AgenticAI
npm install
```

2. **Environment Setup**
The project uses Lovable Cloud, so environment variables are automatically configured. For local testing with Supabase CLI:

```bash
# .env.local (optional for local Supabase emulation)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Access the App**
Open [http://localhost:8080](http://localhost:8080)

## 📚 Key Pages & Routes

- `/` - Landing page with feature showcase
- `/auth` - Sign in / Sign up
- `/chat` - Main conversational interface
- `/privacy` - Privacy settings (export/delete data)

## 🔒 Security & Privacy

### Privacy Features
- ✅ Mandatory consent modal on first login
- ✅ Encrypted assessment responses (field-level encryption)
- ✅ Anonymized audit logs with hashed user IDs
- ✅ Data export (JSON download)
- ✅ Right to deletion (GDPR compliant)

### Security Measures
- ✅ Row Level Security (RLS) on all tables
- ✅ User role-based access control (admin/user)
- ✅ JWT-based authentication
- ✅ Secure edge functions with CORS
- ✅ Crisis escalation with immediate intervention

## 🗄️ Database Schema

### Core Tables
- `profiles` - User metadata and consent tracking
- `user_roles` - Role-based access control
- `assessments` - Screening sessions with urgency scores
- `chat_messages` - Conversation history
- `resources` - Campus mental health resources
- `bookings` - Appointment scheduling
- `audit_logs` - Anonymized activity tracking

### Key Enums
- `app_role` - admin | user
- `urgency_level` - green | yellow | red

## 🤖 AI Integration

### Lovable AI Models
- **Default:** `google/gemini-2.5-flash` (balanced performance)
- **Alternative:** `google/gemini-2.5-pro` (for complex reasoning)

### Conversation Flow
1. User sends message → Frontend
2. Frontend calls `chat-assessment` edge function
3. Edge function checks for crisis keywords
4. If safe, calls Lovable AI Gateway
5. Stores encrypted conversation in database
6. Returns empathetic response with urgency score

### System Prompt
```
You are **Agentic**, a compassionate and supportive student well-being assistant. 
You are not a medical professional. Your role is to listen with empathy, 
ask clear and respectful screening questions, provide evidence-based signposting, 
and escalate if the user indicates immediate risk. Always include 1–3 concrete 
next steps and ask for permission before connecting the user with campus services.
```

## 🛠️ Edge Functions

### `chat-assessment`
Main conversational endpoint with crisis detection and AI response generation.

**Request:**
```json
{
  "assessmentId": "uuid",
  "message": "user message",
  "conversationHistory": [...]
}
```

**Response:**
```json
{
  "response": "AI response",
  "crisisDetected": false,
  "progress": 30,
  "urgency": "green",
  "resources": [...]
}
```

### `export-data`
Generates a JSON export of all user data and uploads to Supabase Storage.

**Response:**
```json
{
  "message": "Export created successfully",
  "downloadUrl": "signed_url"
}
```

### `delete-account`
Permanently deletes user account and PII while preserving anonymized audit logs.

**Response:**
```json
{
  "message": "Account deleted successfully"
}
```

## 🎨 Design System

### Color Palette
- **Primary (Teal):** `hsl(180 50% 45%)` - Trust and calm
- **Secondary (Soft Purple):** `hsl(260 40% 92%)` - Empathy
- **Accent (Warm Teal):** `hsl(165 55% 50%)` - CTAs
- **Success:** `hsl(140 50% 50%)` - Low risk
- **Warning:** `hsl(45 90% 60%)` - Moderate urgency
- **Destructive:** `hsl(0 75% 55%)` - High risk / crisis

### Typography
- Headings: Bold, calming
- Body: Readable, accessible
- Crisis text: Clear, directive

## 📦 Deployment

### Deploy to Lovable
1. Push changes to your connected repository
2. Lovable automatically deploys frontend and edge functions
3. Database migrations run on commit
4. Environment variables are auto-configured

### Custom Domain
Configure in Lovable Project Settings → Domains

## 🧪 Testing

### Manual Testing Checklist
- [ ] Sign up flow with consent
- [ ] Chat with low-risk responses
- [ ] Crisis keyword triggers escalation
- [ ] Resource cards display correctly
- [ ] Booking flow creates database entry
- [ ] Export downloads user data
- [ ] Delete removes account

### Test Crisis Keywords
Try typing: "I'm thinking about suicide" or "I want to harm myself"
Expected: Immediate crisis response with hotline numbers

## 📝 Sample Data

To add sample resources:

1. Sign up as a user
2. Use the admin tools to insert sample data via SQL:

```sql
INSERT INTO resources (title, description, department, contact_email, tags, access_level) VALUES
('Counseling Center', 'Free, confidential counseling for all students', 'Student Health', 'counseling@university.edu', ARRAY['counseling', 'therapy'], 'public'),
('Crisis Hotline', '24/7 mental health crisis support', 'Emergency Services', '555-123-4567', ARRAY['crisis', 'emergency'], 'public'),
('Peer Support Group', 'Weekly peer-led support meetings', 'Student Life', 'peers@university.edu', ARRAY['peer support', 'group'], 'public');
```

## ⚠️ Disclaimers

**IMPORTANT:** AgenticAI is NOT a substitute for professional mental health care or emergency services.

- Not a medical diagnosis tool
- Not a replacement for licensed therapists
- In emergencies, call 911 or local crisis hotline immediately
- All responses are AI-generated and should be reviewed by professionals

## 🤝 Contributing

This project prioritizes safety, privacy, and empathy. Contributions should:
- Maintain HIPAA-like privacy standards
- Use evidence-based mental health practices
- Test thoroughly for crisis scenarios
- Follow accessibility guidelines (WCAG 2.1 AA)

## 📄 License

MIT License - See LICENSE file

## 🆘 Crisis Resources

**United States:**
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741

**International:**
- Find your local crisis line: https://findahelpline.com

## 🔗 Links

- [Lovable Cloud Documentation](https://docs.lovable.dev/features/cloud)
- [Lovable AI Documentation](https://docs.lovable.dev/features/ai)
- [Supabase Documentation](https://supabase.com/docs)

---

Built with ❤️ for student mental health and well-being.
