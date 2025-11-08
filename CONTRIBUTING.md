# Contributing to AgenticAI

Thank you for your interest in improving student mental health support! This guide will help you contribute effectively.

## 🎯 Core Principles

1. **Safety First** - All changes must prioritize user safety
2. **Privacy by Design** - Maintain encryption and consent flows
3. **Evidence-Based** - Use validated screening tools and methods
4. **Accessibility** - Ensure WCAG 2.1 AA compliance
5. **Empathy** - Maintain compassionate, non-judgmental tone

## 🛠️ Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test thoroughly
7. Submit a pull request

## 📝 Contribution Areas

### 🤖 AI & Conversation Improvements

**Crisis Detection:**
- Add more nuanced keyword patterns
- Implement ML-based intent classification
- Improve multilingual crisis detection

**Screening Tools:**
- Add additional validated questionnaires (PHQ-9, GAD-7, etc.)
- Implement adaptive screening logic
- Add scoring algorithms with proper attribution

**Conversation Quality:**
- Improve empathy in system prompts
- Add conversation branching logic
- Implement follow-up question strategies

### 🔒 Privacy & Security

**Encryption:**
- Implement end-to-end encryption for messages
- Add field-level encryption helpers
- Create key rotation mechanism

**Audit & Compliance:**
- Enhance audit logging
- Add GDPR compliance checks
- Implement data retention automation

### 🎨 UX/UI Improvements

**Accessibility:**
- Screen reader optimization
- Keyboard navigation enhancements
- High contrast mode

**Mobile Experience:**
- Responsive chat interface
- Touch-friendly booking calendar
- Mobile-optimized resources view

**Internationalization:**
- Add multi-language support
- Localize crisis resources by region
- Translate UI components

### 🏥 Clinical Features

**Resource Management:**
- Advanced search and filtering
- Resource recommendations ML
- Integration with campus systems

**Appointment System:**
- Google Calendar integration
- SMS reminders
- Waitlist management

**Analytics:**
- Anonymized usage statistics
- Outcome tracking
- Resource effectiveness metrics

## 🧪 Testing Requirements

All contributions must include:

1. **Unit Tests** - For utility functions and logic
2. **Integration Tests** - For API endpoints
3. **Manual Testing** - With crisis scenario checklist
4. **Accessibility Testing** - WCAG validation

### Crisis Testing Checklist

- [ ] Test all crisis keywords
- [ ] Verify immediate escalation response
- [ ] Check hotline numbers display correctly
- [ ] Ensure booking is blocked during crisis
- [ ] Verify admin flagging works

## 📋 Pull Request Guidelines

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing Done
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Crisis scenarios tested
- [ ] Accessibility validated

## Checklist
- [ ] Code follows project style guide
- [ ] No sensitive data in commits
- [ ] Documentation updated
- [ ] No breaking changes to API
```

### Code Review Process

1. Submit PR with complete description
2. Automated tests must pass
3. Two approvers required (one clinical, one technical)
4. Clinical review for mental health content
5. Security review for privacy features

## 🎨 Style Guide

### TypeScript/React

```typescript
// ✅ Good: Descriptive names, proper types
interface AssessmentResult {
  urgency: 'green' | 'yellow' | 'red';
  phqScore: number;
  recommendedResources: Resource[];
}

// ❌ Bad: Unclear names, any types
interface Result {
  level: any;
  score: any;
  resources: any[];
}
```

### Mental Health Language

**DO:**
- Use person-first language ("person with depression")
- Be empathetic and non-judgmental
- Provide clear next steps
- Include disclaimers about limitations

**DON'T:**
- Use stigmatizing language
- Make medical diagnoses
- Promise outcomes
- Minimize user concerns

### Example Responses

```typescript
// ✅ Good: Empathetic, actionable
"I hear that you're feeling overwhelmed. Many students experience 
anxiety during exams. Would you like to explore some coping strategies, 
or would it help to connect with a counselor who can provide personalized support?"

// ❌ Bad: Dismissive, vague
"Everyone feels stressed sometimes. Just relax."
```

## 🔐 Security Guidelines

### Never Commit:
- API keys or secrets
- User data or logs
- Encryption keys
- Database credentials

### Always:
- Use environment variables
- Validate all user inputs
- Sanitize outputs
- Follow RLS best practices
- Log security events

## 📚 Documentation Standards

All new features must include:

1. **Code Comments** - Explain complex logic
2. **README Updates** - Document new features
3. **API Documentation** - Update endpoint descriptions
4. **User Guides** - Add to setup/usage docs

## 🐛 Bug Reports

Use this template for bug reports:

```markdown
## Bug Description
Clear description of the issue

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 120
- OS: macOS
- User Role: Student/Admin

## Screenshots
If applicable

## Logs
Relevant console errors
```

## 💡 Feature Requests

Use this template for feature requests:

```markdown
## Feature Description
Clear description of the proposed feature

## Problem it Solves
What user need does this address?

## Proposed Solution
How would this feature work?

## Alternatives Considered
What other approaches were considered?

## Mental Health Context
How does this align with evidence-based practices?

## Privacy Impact
Any privacy or security considerations?
```

## 🏥 Clinical Contributions

If you're a mental health professional:

- **Screening Tools** - Suggest validated assessments
- **Crisis Protocols** - Review escalation procedures
- **Response Quality** - Audit AI responses
- **Resource Curation** - Recommend quality resources

## 🌍 Internationalization

When adding new languages:

1. Add translations to `src/locales/`
2. Update crisis resources for region
3. Localize cultural references
4. Test with native speakers
5. Verify crisis hotline accuracy

## 📊 Performance

- Keep bundle size under 500KB
- Optimize images (WebP, lazy loading)
- Minimize database queries
- Cache resource data appropriately
- Monitor edge function cold starts

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Assume good intentions
- Focus on what's best for users
- Welcome newcomers
- Maintain professional conduct

## 📞 Questions?

- Open a GitHub Discussion
- Join our Lovable Discord
- Email: support@agenticai.example

---

Thank you for helping make mental health support more accessible! 💙
