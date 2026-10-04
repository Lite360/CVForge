CVForge
Master Product Requirements Document, MVP, EPR, Design System, Architecture & Technology Stack

Product: CVForge
Product Type: CV/resume builder and AI CV optimization platform
Primary Brand: Orange + White
Developer Credit: Developed by Elite Developers
Application UI Font: Bricolage Grotesque
CV Document Default Font: Times New Roman

1. MASTER BUILD PROMPT

Build CVForge, a production-ready web application for creating, managing, optimizing, and exporting professional CVs.

CVForge must have three clearly separated experiences:

Public Marketing Website
Authenticated CV Application
Admin Control Panel

The application must also have two separate CV workflows:

Workflow A — Create a New CV

The user starts from scratch.

Create CV
→ Choose Template
→ Enter CV Information
→ Edit CV
→ Live Preview
→ Save CV
→ Export PDF/DOCX
Workflow B — AI CV Optimizer

The user already has an existing CV.

AI CV Optimizer
→ Upload PDF/DOCX
→ Extract CV Content
→ Analyze CV
→ AI Optimization Report
→ Review Suggestions
→ Accept/Edit/Reject Changes
→ Create Optimized CV
→ Choose CVForge Template
→ Live Preview
→ Save/Export

These workflows must remain separate.

The AI must not be responsible for designing or rendering the CV. The external CV template/rendering API handles CV presentation and rendering. CVForge's AI handles content analysis and improvement.

Do not build an autonomous AI agent for the MVP. Use a server-side AI abstraction with Gemini as the primary provider and OpenRouter as the fallback provider.

Do not expose AI API keys, Paystack secret keys, database credentials, or other secrets to the frontend.

Do not use Laravel.

Do not introduce unnecessary frameworks or infrastructure.

The final system must be modular, secure, responsive, production-ready, and maintainable.

2. PRODUCT VISION

CVForge should make professional CV creation accessible without requiring users to understand CV formatting or design.

The platform should allow a user to:

Create a CV from scratch
Select professional templates
Edit structured CV information
Preview the CV in real time
Upload an existing CV
Use AI to improve an existing CV
Analyze ATS compatibility
Match a CV against a job description
Export PDF
Export DOCX
Save multiple CVs
Manage profile and subscription
Purchase premium features
Manage their account from an app-like dashboard

CVForge should feel like a mature professional application rather than a generic AI/SaaS dashboard.

3. TARGET USERS
Primary Users
Job Seekers

People creating their first professional CV.

Experienced Professionals

Users who already have CVs and want to improve them.

Students and Graduates

Users preparing CVs for internships, graduate roles, NYSC-related opportunities, and entry-level employment.

Professionals Applying to Multiple Jobs

Users who need to tailor their CV to different job descriptions.

4. CORE FEATURES
Free Features
Account registration
Google login
GitHub login
Create CV
Basic CV templates
CV editor
Live preview
Save CV
Basic CV management
Basic PDF export depending on plan
Profile management
Premium Features

Premium feature availability must be controlled from the database/admin panel.

Potential premium features:

Premium templates
Advanced PDF export
DOCX export
ATS checker
AI CV Optimizer
Job Description Matching
AI writing assistance
Higher AI usage allowance
Multiple CVs
Advanced CV tools

AI features must have explicit usage limits/allowances rather than assuming unlimited usage.

5. PUBLIC WEBSITE

The public landing page should be a professional marketing website.

Page Structure
Header
↓
Hero
↓
How It Works
↓
Features
↓
Templates
↓
AI CV Optimizer
↓
ATS Checker
↓
Job Matching
↓
Pricing
↓
FAQ
↓
Testimonials
↓
Final CTA
↓
Newsletter Subscribe
↓
Footer
Header

Include:

CVForge logo
Features
Templates
Pricing
AI Optimizer
ATS
FAQ
Sign In
Create My CV

On mobile use a clean mobile navigation.

6. HERO SECTION

The hero must immediately communicate:

Create a Professional CV. Optimize It With AI. Get Job-Ready.

Primary CTA:

Create My CV

Secondary CTA:

Optimize My Existing CV

The hero should use a relevant professional visual/background rather than generic AI artwork.

Hero content must remain readable and centered around the main value proposition.

7. PUBLIC FOOTER

The footer is part of the marketing website.

It should contain:

Product
Create CV
Templates
AI CV Optimizer
ATS Checker
Job Matching
Pricing
Resources
FAQ
CV Tips
Help Center
Contact
Company
About
Contact
Developed by Elite Developers
Legal
Privacy Policy
Terms & Conditions
Cookie Policy
Refund Policy
Acceptable Use Policy

Bottom copyright:

© 2026 CVForge. All rights reserved.
Developed by Elite Developers

The Developed by Elite Developers credit must appear at the bottom of the landing-page footer.

The public footer should not appear inside the authenticated dashboard.

8. USER APPLICATION

The authenticated area must feel like a real application.

It should not look like a normal marketing website with a dashboard attached.

Main User Areas
Dashboard
My CVs
Templates
AI CV Optimizer
ATS Checker
Job Matching
Profile
9. MOBILE NAVIGATION

Mobile bottom navigation must contain exactly four primary destinations:

Home
My CVs
Templates
Profile

Other features such as:

ATS
AI Optimizer
Job Matching
Import
Export

should be actions accessible inside the appropriate screens, not bottom-navigation items.

Navigation Interaction

Active navigation item:

Circular background
Orange active state
Icon centered
Label underneath

Inactive:

No background

Interactions:

150–200ms transitions
Slight scale on press
Smooth hover circle on supported devices

Do not use pill-shaped active navigation.

10. DASHBOARD

The dashboard should provide:

Welcome Area
Welcome back, [Name]
Ready to improve your CV?
Main Actions
Create New CV
Optimize Existing CV
Check ATS Score
Match CV to Job
Recent CVs

Display:

CV name
Template
Last updated
Status
Quick actions

Actions:

Edit
Preview
Duplicate
Export
Delete
Subscription Card

Display:

Current plan
AI usage
Renewal information
Upgrade button
11. CREATE CV WORKFLOW

This is the standard CV creation system.

Step 1

User clicks:

Create New CV

Step 2

Choose template.

Example initial templates:

Professional ATS
Modern
Executive

Template availability comes from the database.

Do not hard-code template pricing/status in Vue.

Step 3

Enter structured information.

Sections:

Personal Information
Professional Summary
Work Experience
Education
Skills
Projects
Certifications
Languages
Awards
Volunteer Experience
References
Custom Section
Step 4

Open the CV editor.

Recommended desktop layout:

┌─────────────┬─────────────────────┬─────────────────────┐
│ CV Sections │ Editor              │ Live A4 Preview     │
│             │                     │                     │
│ Personal    │ Section Fields      │ CV Page             │
│ Summary     │                     │                     │
│ Experience  │                     │                     │
│ Education   │                     │                     │
│ Skills      │                     │                     │
│ Projects    │                     │                     │
└─────────────┴─────────────────────┴─────────────────────┘

On mobile, switch to a sequential editing experience with a preview toggle.

Editor Requirements
Autosave
Undo/redo
Section reordering
Add/remove sections
Drag-and-drop where practical
Live preview
A4 preview
Zoom controls
Template switching
Version history
Save status

Autosave status:

Saving...
Saved
Couldn't save
12. CV DATA MODEL

Use structured CV data.

Prefer JSON Resume compatibility where appropriate.

Example:

{
  "basics": {
    "name": "",
    "label": "",
    "email": "",
    "phone": "",
    "location": "",
    "url": "",
    "summary": ""
  },
  "work": [],
  "education": [],
  "skills": [],
  "projects": [],
  "certificates": [],
  "languages": [],
  "awards": [],
  "volunteer": []
}

CVForge-specific metadata should use its own namespace.

Do not copy another application's proprietary metadata namespace.

13. CV DOCUMENT TYPOGRAPHY

The CV itself must default to:

Times New Roman

This applies to:

CV editor document content
Live CV preview
PDF
DOCX
Template default typography

The application interface uses:

Bricolage Grotesque

The application font and CV document font are intentionally different.

14. AI CV OPTIMIZER

This must be a completely separate page.

Route example:

/optimizer

The feature is primarily a premium feature.

Landing State
Optimize Your Existing CV

Upload your current CV and let AI identify
weak content, improve wording, and make
your CV more relevant to your target role.

[ Upload CV ]

Supported:

PDF
DOCX
15. AI OPTIMIZER WORKFLOW
Upload CV
↓
Validate File
↓
Extract Text
↓
Normalize CV Content
↓
Analyze CV
↓
Optional Job Description
↓
Gemini Analysis
↓
OpenRouter fallback if required
↓
Validate Structured AI Response
↓
Optimization Report
↓
User Reviews Changes
↓
Accept/Edit/Reject
↓
Create Optimized CV
↓
Choose Template
↓
Preview
↓
Save
16. AI OPTIMIZATION REPORT

Example:

CV Optimization

Overall Score
78/100

Professional Summary
Needs Improvement

Work Experience
4 suggestions

Skills
3 missing keywords

Achievements
Needs stronger measurable results

ATS Compatibility
82%

Each suggestion should show:

Original

Responsible for managing customers.

Suggested

Managed customer inquiries and resolved service issues while maintaining efficient customer service operations.

Actions:

Accept
Edit
Reject

The AI must never silently overwrite the user's CV.

17. AI CAPABILITIES

The AI can:

Improve professional summaries
Rewrite weak experience bullets
Improve action verbs
Improve clarity
Remove unnecessary repetition
Identify missing keywords
Suggest relevant skills
Improve achievement descriptions
Detect weak CV sections
Tailor content toward a job description
Suggest stronger wording
Explain why a change is recommended

The AI must not:

Invent employment
Invent degrees
Invent certifications
Invent companies
Invent achievements
Invent numerical results
Falsify user experience

If information is missing, the AI should recommend providing it instead of fabricating it.

18. AI PROVIDER ARCHITECTURE

Use:

CVForge AI Service
        │
        ├── Gemini Provider
        │       Primary
        │
        └── OpenRouter Provider
                Fallback

Application code must call the internal service rather than directly calling Gemini throughout the application.

Example conceptual interface:

CVForgeAI.optimizeCV()
CVForgeAI.analyzeATS()
CVForgeAI.matchJob()
CVForgeAI.improveSummary()
19. AI FALLBACK RULES

Use Gemini first.

Fallback to OpenRouter for temporary provider failures:

Timeout
Rate limit
HTTP 5xx
Service unavailable
Temporary network failure

Do not fallback for:

Invalid user input
Invalid CV data
User AI quota exceeded
Safety/policy rejection
Invalid API configuration
Authentication/configuration errors

Both keys must remain server-side.

20. AI STRUCTURED OUTPUT

AI responses must be structured JSON.

Example:

{
  "overall_score": 86,
  "summary": {
    "original": "...",
    "suggested": "...",
    "reason": "..."
  },
  "experience_changes": [],
  "skill_suggestions": [],
  "missing_keywords": [],
  "ats_issues": [],
  "recommendations": []
}

Validate every AI response with a schema validator such as Zod before applying it to application data.

AI output is untrusted input.

21. ATS CHECKER

Separate feature.

The ATS checker analyzes:

CV structure
Section completeness
Keyword relevance
Job title relevance
Skill alignment
Formatting risks
Content quality
Keyword coverage
Potential ATS parsing problems

Output:

ATS Score: 84/100

Keyword Match: 82%
Structure: 95%
Skills: 78%
Experience Relevance: 86%
Formatting: 91%

Provide actionable recommendations.

22. JOB DESCRIPTION MATCHING

User selects a CV and pastes a job description.

Flow:

Select CV
↓
Paste Job Description
↓
Analyze
↓
Match Report

Show:

Match percentage
Matching skills
Missing skills
Matching keywords
Missing keywords
Recommended CV changes
Job-title alignment
Experience alignment

The user can then send the CV through Optimize My CV.

23. EXTERNAL CV TEMPLATE/API LAYER

CVForge should use an adapter around the external CV template/rendering API.

Do not tightly couple the entire application to the third-party API.

Concept:

CVForge
   ↓
CV Template Adapter
   ↓
External CV API

The adapter should handle:

Template retrieval
Template metadata
Template rendering
Preview rendering
PDF generation
DOCX generation where supported

If the external provider changes, CVForge should only need changes inside the adapter/service layer.

Do not assume unsupported API features.

Create provider interfaces first and map the actual API documentation to them during implementation.

24. EXPORT SYSTEM

Export options:

PDF
DOCX

Flow:

User clicks Export
↓
Check permissions
↓
Validate CV
↓
Generate document
↓
Return file

Premium restrictions must be enforced server-side.

Never rely on frontend checks alone.

25. AUTHENTICATION

Use:

Better Auth

Supported authentication:

Email/password if enabled
Google OAuth
GitHub OAuth

Authenticated APIs must derive the user identity from the server-side session.

Never trust:

user_id

sent by the frontend.

For CV operations:

Session User
↓
Find CV
↓
Verify Ownership
↓
Perform Operation
26. DATABASE

Use:

Neon PostgreSQL

Primary tables:

users
accounts
sessions

cvs
cv_versions
templates

plans
subscriptions
payments
exports

ats_reports
job_matches

ai_usage
ai_requests

public_cv_links

newsletter_subscribers

notifications

branding_settings
site_settings

admin_users
admin_roles
admin_permissions
audit_logs

Additional tables can be added only when justified by a real requirement.

27. IMPORTANT DATABASE RELATIONSHIPS
User
 ├── CVs
 │    └── CV Versions
 │
 ├── Subscriptions
 │
 ├── Payments
 │
 ├── Exports
 │
 ├── ATS Reports
 │
 ├── Job Matches
 │
 ├── AI Usage
 │
 └── AI Requests

Templates are independent resources referenced by CVs.

28. AI USAGE

Track AI usage.

ai_usage

id
user_id
feature
provider
model
tokens_used
estimated_cost
request_status
created_at

Provider request tracking:

ai_requests

id
user_id
feature
primary_provider
fallback_provider
model
status
attempts
tokens_used
latency_ms
error_code
created_at

This allows the admin panel to monitor AI costs and reliability.

29. PAYMENTS

Use:

Paystack

Plans:

Free
Premium Monthly
Premium Yearly

Plan configuration must live in the database.

Store:

Name
Price
Currency
Billing interval
Paystack plan code
Features
Status

Never hard-code subscription pricing in Vue.

30. PAYMENT SECURITY

Paystack secret keys remain server-side.

Payment process:

Frontend
↓
Server initializes payment
↓
Paystack
↓
User pays
↓
Server verifies transaction
↓
Server validates:
  - Reference
  - Amount
  - Currency
  - User
  - Transaction status
↓
Subscription updated

Use webhook verification.

Make payment processing idempotent.

Never store:

Card number
CVV
PIN
Full card credentials
31. USER PROFILE

Profile should include:

Name
Email
Profile photo
Connected Google account
Connected GitHub account
Theme
Subscription
AI usage
Security
Account deletion

Theme options:

Light
System
Dark

Persist the user's preference.

32. BRAND DESIGN
Primary Palette
Light
Background:       #FFFFFF
Secondary:        #FFF8F2
Primary Orange:   #F97316
Hover Orange:     #EA580C
Text:             #171717
Secondary Text:   #6B7280
Border:           #E5E7EB
Cards:            #FFFFFF
Dark
Background:       #111111
Secondary:        #181818
Cards:            #1C1C1C
Primary Orange:   #FB923C
Hover Orange:     #FDBA74
Text:             #F5F5F5
Secondary Text:   #A3A3A3
Border:           #2A2A2A

Orange should be an accent, not the entire interface.

Do not introduce blue/purple as the primary brand colors.

33. LOGO

The CVForge logo should contain:

[Resume/Document Icon] CVForge

The icon must be beside the text.

Style:

Orange icon
Dark charcoal wordmark
White/transparent background
Professional
Minimal
Modern
No tagline
No excessive gradients
No 3D effects

The logo must work in:

Public header
Footer
Login
Registration
Dashboard
Admin
Favicon/app icon variants
34. DESIGN SYSTEM

Use no more than two fonts.

Application:

Bricolage Grotesque

CV:

Times New Roman

Interface requirements:

Generous whitespace
Strong visual hierarchy
Grid alignment
Consistent button sizes
Consistent border radius
Readable typography
Responsive layouts
Professional icons
No cramped controls
Title Case interface labels
Single-colon form labels
(optional) instead of *
Avoid excessive cards
Avoid generic AI/SaaS visual language
Avoid excessive gradients
Avoid oversized dashboard decoration
35. ICON SYSTEM

Use a modern consistent icon library.

Do not default to Font Awesome.

Use the selected icon library consistently throughout:

Dashboard
Editor
Navigation
Admin
Settings
Notifications
Actions

Icons must support accessibility with appropriate labels/tooltips.

36. FEEDBACK SYSTEM

Use different feedback mechanisms for different events.

Spinner

For active operations:

Saving
Creating CV
Exporting
Uploading
AI processing
Skeleton

For:

CV lists
Template grids
Dashboard content
Analytics
Toast

For small background events:

CV saved
Template selected
Autosaved
SweetAlert2

Use for important:

Success
Error
Warning
Confirmation

Examples:

Delete CV?
Cancel Subscription?
Remove Account?
Payment Successful
Export Failed

Do not use SweetAlert2 for every interaction.

37. LOADING STATES

Examples:

Creating your CV...
Saving...
Saved
Couldn't save
Preparing your CV...
Analyzing your CV...
Optimizing your CV...
Generating PDF...
Generating DOCX...

Buttons must retain their dimensions while loading.

38. PWA

The application should be installable as a PWA.

Install prompt should primarily appear on the login page.

Do not permanently display an install prompt on the public marketing site.

Requirements:

manifest.webmanifest
service worker
192x192 icon
512x512 icon
maskable icon
standalone display
theme color
background color

If installed:

Unauthenticated → Login
Authenticated → Dashboard

Do not use /access as the PWA entry point.

Do not broadly cache sensitive authenticated CV data.

39. ADMIN PANEL

Admin route:

/access

Admin authentication must be separate from normal user authentication.

Use a separate:

admin_users

table.

Never use the normal users table as the admin identity table.

No public frontend page should expose an admin link.

40. ADMIN DASHBOARD

Metrics:

Total Users
Total CVs Generated
Total Transactions
Total Revenue
Active Subscriptions
PDF/DOCX Exports

Charts:

User Growth
CV Generation
Revenue & Transactions
Subscription Breakdown

Additional analytics:

Template popularity
ATS usage
Job matching usage
AI requests
Gemini success rate
OpenRouter fallback rate
AI failures
Export volume

All metrics must come from protected backend APIs.

Never hard-code dashboard statistics.

41. ADMIN QUICK ACTIONS
View Users
View CVs
View Transactions
Manage Templates
Manage Plans
Frontend CMS
Branding
Admin Management
Audit Logs
42. ADMIN USER MANAGEMENT

Admins should be able to:

View users
Search users
Suspend users
Restore users
Delete users
View CVs
View subscriptions
View payments
View relevant activity

Do not expose OAuth passwords.

43. ADMIN TEMPLATE MANAGEMENT

Admin controls:

Template name
Description
Preview
Free/Premium
Active/inactive
Sort order
Featured status

The frontend should retrieve template configuration from the backend.

44. ADMIN PLAN MANAGEMENT

Admin controls:

Plan name
Price
Currency
Billing period
Paystack plan code
Features
AI allowance
Status

Pricing is database-driven.

45. FRONTEND CMS

Admin can control:

Hero
Features
Templates section
Pricing
FAQ
Testimonials
CTA
Footer
Site name
Logo
Favicon
Meta title
Meta description
Contact information
Social links
Announcements

Changing frontend content should not require modifying Vue source code.

46. BRANDING MANAGEMENT

Admin → Branding

Fields:

Site Name
Primary Logo
Dark Mode Logo (optional)
Favicon
Use Primary Logo For Admin

Logo files should be stored in:

Vercel Blob

Database stores:

branding_settings

id
logo_url
logo_dark_url
favicon_url
site_name
updated_by
updated_at

Validate:

MIME type
File extension
File size
Image dimensions
File content

Never trust uploaded filenames or client MIME types.

47. ADMIN ROLES

Initial roles:

Super Admin
Admin
Content Manager
Support
Finance

Use permission-based authorization.

Example permissions:

users.view
users.manage

cvs.view
cvs.manage

templates.view
templates.manage

plans.view
plans.manage

payments.view
payments.manage

frontend.manage
branding.manage

admins.manage

audit.view
48. AUDIT LOGGING

Admin actions must be logged.

admin_id
action
resource_type
resource_id
metadata
ip
created_at

Never log:

Passwords
OAuth tokens
API keys
Paystack secrets
AI provider secrets
49. API STRUCTURE

Recommended Vercel API structure:

/api/
├── auth/
│   └── [...all].ts
│
├── users/
│   └── me.ts
│
├── cvs/
│   ├── index.ts
│   ├── [id].ts
│   ├── duplicate.ts
│   ├── autosave.ts
│   └── versions/
│       └── [id].ts
│
├── templates/
│   ├── index.ts
│   └── [id].ts
│
├── uploads/
│   └── avatar.ts
│
├── export/
│   ├── pdf.ts
│   └── docx.ts
│
├── ai/
│   ├── optimize-cv.ts
│   ├── ats-analysis.ts
│   ├── job-match.ts
│   ├── improve-summary.ts
│   └── usage.ts
│
├── ats/
│   ├── analyze.ts
│   └── match-job.ts
│
├── payments/
│   └── paystack/
│       ├── initialize.ts
│       ├── verify.ts
│       └── webhook.ts
│
├── subscriptions/
│   ├── current.ts
│   └── cancel.ts
│
├── settings/
│   └── index.ts
│
└── admin/
    ├── dashboard.ts
    ├── users/
    ├── cvs/
    ├── templates/
    ├── plans/
    ├── payments/
    ├── subscriptions/
    ├── frontend/
    ├── branding/
    ├── admins/
    └── audit-logs/
50. FRONTEND ARCHITECTURE

Use feature-based Vue architecture.

src/
├── components/
├── layouts/
├── pages/
├── features/
│   ├── auth/
│   ├── cv-builder/
│   ├── cv-optimizer/
│   ├── ats/
│   ├── job-matching/
│   ├── templates/
│   ├── billing/
│   ├── profile/
│   └── admin/
│
├── services/
│   ├── api/
│   ├── ai/
│   ├── cv/
│   ├── payments/
│   └── uploads/
│
├── stores/
├── types/
├── schemas/
├── composables/
├── router/
└── styles/

Keep business logic out of presentation components wherever practical.

51. TECHNOLOGY STACK
Frontend
Vue 3
Vite
TypeScript
Tailwind CSS
Bricolage Grotesque
Authentication
Better Auth
Google OAuth
GitHub OAuth
Database
Neon PostgreSQL
Storage
Vercel Blob
Backend/API
Vercel Serverless Functions/API
TypeScript
AI
Gemini
OpenRouter fallback
Zod structured-output validation
Payments
Paystack
Source Control
GitHub
Deployment
Vercel
CV Format
JSON Resume-compatible structured data
CV Rendering
External CV Template/Rendering API
through a CVForge adapter layer
UI Feedback
SweetAlert2
Toast system
Skeleton loaders
Spinners
PWA
Web App Manifest
Service Worker
Install Prompt
52. SECURITY REQUIREMENTS

Implement:

HTTPS
Secure authentication
Argon2id where password authentication is used
Expiring sessions
CSRF protection where applicable
CORS restrictions
Server-side validation
Input sanitization
Prepared database queries
Rate limiting
IP/account endpoint limits
Redis/APCu where appropriate
Security headers
RBAC
Admin isolation
Audit logs
Ownership checks
Idempotency
Webhook signature verification
Secure file upload validation
No frontend secrets
No hard-coded secrets
Server-side premium checks
Server-side AI usage checks
53. FILE UPLOAD SECURITY

CV uploads must be treated as untrusted.

Validate:

PDF
DOCX

Check:

Extension
MIME type
File signature/magic bytes
File size
Content extraction result
Malware/security constraints where infrastructure supports it

Do not execute uploaded files.

Store uploads in controlled storage.

54. RATE LIMITING

Apply different limits to:

Login
Registration
Password operations
CV creation
Autosave
File upload
AI requests
ATS analysis
Job matching
Payment initialization
Admin APIs

AI endpoints require particularly strict rate limits.

55. AI COST CONTROL

AI usage must be tracked.

Admin should be able to see:

AI Requests Today
Gemini Requests
OpenRouter Fallbacks
Failed Requests
Tokens Used
Estimated Cost

User-facing allowance should be enforced server-side.

Example:

AI Optimizations Remaining: 7

Do not expose provider API keys.

56. PERFORMANCE

Optimize for:

Fast initial load
Code splitting
Lazy-loaded application modules
Optimized images
CDN delivery through Vercel
Efficient database queries
Database indexes
Minimal unnecessary API requests
Debounced autosave
Cached template metadata
Server-side validation
Efficient CV rendering

Autosave must not trigger a request for every keystroke.

57. RESPONSIVENESS

Support:

Desktop
Laptop
Tablet
Mobile
Portrait
Landscape
Touch devices
Modern Chrome
Edge
Firefox
Safari

The CV editor should adapt rather than simply shrink the desktop interface.

58. MVP

The first production MVP should include:

Authentication
Better Auth
Google
GitHub
CV Builder
Create CV
3 templates
Structured sections
Editor
Live preview
Autosave
CV management
Duplicate
Delete
AI
AI CV Optimizer
PDF/DOCX upload
CV extraction
Gemini
OpenRouter fallback
Optimization report
Accept/Edit/Reject
Generate optimized CV
Export
PDF
DOCX
Payments
Paystack
Free plan
Premium monthly
Premium yearly
Subscription verification
User App
Dashboard
My CVs
Templates
Profile
Four-item mobile navigation
Public Website
Landing page
Features
Templates
Pricing
FAQ
Testimonials
CTA
Newsletter
Footer
Elite Developers credit
Admin
/access
Separate admin users
Dashboard analytics
Users
CVs
Templates
Plans
Payments
Subscriptions
Frontend CMS
Branding
Admin management
Audit logs
PWA
Manifest
Service worker
Login install prompt
Installed-app routing
59. POST-MVP FEATURES

Potential later additions:

Public CV sharing
Public CV URL
CV import from LinkedIn
More templates
Advanced ATS simulation
Advanced job matching
AI interview preparation
AI cover letter generation
AI application tracking
CV version comparison
Advanced analytics
More export formats
Team/organization plans

These should not unnecessarily complicate the MVP.

60. USER EXPERIENCE PRINCIPLES

CVForge must prioritize:

Simplicity
Readability
Speed
Trust
Professional presentation
Clear actions
Minimal friction

Never make users navigate through unnecessary screens.

Primary actions must always be obvious.

61. ERROR HANDLING

Errors must be human-readable.

Bad:

500 Internal Server Error

Better:

We couldn't save your CV.
Please try again.

For AI:

We couldn't analyze your CV right now.
Your CV has not been changed.
Please try again.

For payment:

We couldn't verify your payment yet.
Your account has not been charged again.

Never expose internal stack traces or secrets.

62. DATA OWNERSHIP

Users own the CV content they create/upload, subject to the application's Terms.

CVForge must not claim ownership over user CV content.

Third-party templates, fonts, APIs, and assets remain subject to their respective licenses.

Do not copy proprietary source code from third-party CV builders.

Use APIs/licensed resources through proper integration.

63. PRIVACY

Privacy policy must explain:

Account information
Google/GitHub authentication information
CV data
Uploaded files
Profile images
AI processing
AI provider processing where applicable
Vercel infrastructure
Neon database
Vercel Blob
Paystack payments
Cookies
Analytics if used
Data retention
Account deletion

Never store payment card details.

64. TERMS

Terms should cover:

Account registration
Authentication
User responsibilities
CV ownership
Uploaded content
AI-generated recommendations
Templates
Premium subscriptions
Paystack payments
Refunds
Cancellation
Account suspension
Acceptable use
Intellectual property
Third-party services
Availability
Liability
Changes to service
Contact

Clearly state that CVForge does not guarantee:

Employment
Interviews
Job offers
ATS passage
Successful applications
65. IMPLEMENTATION PHASES
Phase 1 — Foundation
Vue/Vite/TypeScript
Tailwind
Routing
Design system
Better Auth
Neon
Vercel configuration
Base API architecture
GitHub repository
CI/deployment baseline
Phase 2 — Public Website
Header
Hero
Features
Templates
Pricing
FAQ
CTA
Newsletter
Footer
Elite Developers credit
SEO
Phase 3 — Authentication
Google
GitHub
User session
Protected routes
Profile
Phase 4 — CV Builder
Template system
CV data model
Editor
Preview
Autosave
Versioning
CV management
Phase 5 — CV API Integration
Build CV API adapter
Template synchronization
Preview
Rendering
PDF
DOCX
Error handling
Phase 6 — AI Optimizer
Upload
Extraction
AI service
Gemini
OpenRouter fallback
Structured output
Validation
Suggestions
Accept/Edit/Reject
Optimized CV creation
Phase 7 — ATS + Job Matching
ATS analysis
Job matching
Reports
Recommendations
Phase 8 — Paystack
Plans
Payment initialization
Verification
Webhook
Subscription lifecycle
Premium enforcement
Phase 9 — Admin
/access
Admin authentication
Dashboard
Analytics
Users
CVs
Templates
Plans
Payments
CMS
Branding
Audit logs
Phase 10 — PWA
Manifest
Service worker
Install prompt
Auth-aware startup
Phase 11 — Security & Performance
Rate limiting
Security headers
Ownership checks
Upload security
Database indexes
AI cost controls
Error handling
Performance optimization
Phase 12 — Production QA

Test:

Authentication
CV creation
Autosave
Template switching
PDF
DOCX
AI optimization
AI fallback
ATS
Job matching
Payments
Subscription expiry
Admin permissions
PWA
Mobile
Desktop
Dark mode
File uploads
Error states
66. DEFINITION OF DONE

CVForge MVP is considered complete when:

Public
Landing page works
Responsive design works
Footer includes Developed by Elite Developers
Pricing works
Legal pages exist
Authentication
Google works
GitHub works
Sessions are secure
Protected routes work
CV Builder
User can create CV
User can select template
User can edit sections
Preview updates
Autosave works
CV persists
User can duplicate/delete
PDF/DOCX export works
AI Optimizer
User uploads CV
Content is extracted
Gemini analyzes it
OpenRouter can serve as fallback
Suggestions are structured
User can accept/edit/reject
Original CV is preserved
Optimized CV can be created
Payments
User can purchase Premium
Paystack verification works
Webhook works
Subscription state is correct
Premium features are server-protected
Admin
/access works
Admin identity is separate
Dashboard metrics are real
Templates manageable
Plans manageable
Users manageable
Branding manageable
CMS manageable
Audit logs work
Security
No secrets exposed
API ownership checks work
AI limits work
Payment verification works
Webhooks verified
Upload validation works
Rate limits work
67. FINAL ARCHITECTURE
                         CVForge
                            │
             ┌──────────────┼──────────────┐
             │              │              │
        Public Site     User App       Admin /access
             │              │              │
             │              │              │
             └──────────────┼──────────────┘
                            │
                       Vercel API
                            │
       ┌────────────┬───────┼────────┬────────────┐
       │            │       │        │            │
   Better Auth   CV API   AI      Paystack    Admin API
                    │       │
                    │    ┌──┴──────────┐
                    │    │             │
                    │  Gemini      OpenRouter
                    │   Primary      Fallback
                    │
              CV Template Adapter
                    │
            External CV API
                    │
             PDF / DOCX / Preview
                            │
              ┌─────────────┴─────────────┐
              │                           │
        Neon PostgreSQL              Vercel Blob
              │                           │
        Structured CV data           CV uploads
        Users                        Logos
        Payments                     Profile images
        AI usage                     Assets
        Subscriptions
        Admin
68. CORE PRODUCT PRINCIPLE

The architecture must maintain this separation:

CVForge Application
        │
        ├── Creates CV content
        ├── Stores CV data
        ├── Manages users
        ├── Manages subscriptions
        ├── Runs AI optimization
        ├── Runs ATS analysis
        └── Manages business logic
                 │
                 ↓
        CV Template/Rendering API
                 │
        ├── Template
        ├── Layout
        ├── Rendering
        └── Document generation

And:

Existing CV
     ↓
AI CV Optimizer
     ↓
Better CV Content
     ↓
Structured CV Data
     ↓
CV Template API
     ↓
Professional CV

The AI should improve the user's content, not replace the CV rendering/template engine.

69. MASTER TECHNOLOGY LOCK

Do not change the following without an explicit project decision:

Frontend:
Vue 3 + Vite + TypeScript

Styling:
Tailwind CSS

UI Font:
Bricolage Grotesque

CV Default Font:
Times New Roman

Authentication:
Better Auth

OAuth:
Google + GitHub

Database:
Neon PostgreSQL

Storage:
Vercel Blob

Backend:
Vercel API / Serverless Functions

AI Primary:
Gemini

AI Fallback:
OpenRouter

Payments:
Paystack

CV Data:
JSON Resume-compatible structure

CV Rendering:
External CV Template/Rendering API

Deployment:
Vercel

Repository:
GitHub

PWA:
Web App Manifest + Service Worker

Admin:
Separate /access system + admin_users

Brand:
Orange + White

Developer Credit:
Developed by Elite Developers

No Laravel.

No .env-style PHP architecture is applicable because CVForge is a Vue/Vercel/TypeScript application. Vercel environment secrets should be used for server-side credentials.

70. IMPLEMENTATION RULE FOR THE AI BUILDER

Before writing implementation code:

Inspect the actual external CV API documentation.
Confirm its available template, rendering, PDF, DOCX, and preview capabilities.
Create an adapter around the API.
Do not invent undocumented endpoints.
Lock database schema.
Lock authentication.
Lock API contracts.
Lock CV data structure.
Lock AI response schemas.
Implement feature-by-feature.
Test every feature before moving to the next phase.
Never rewrite working architecture unnecessarily.
Never expose secrets in frontend code.
Never allow AI to overwrite user CV content without explicit approval.
Never fabricate CV information.
Never hard-code plans, templates, branding, or CMS content that should be controlled by the admin.
Maintain the separation between the public website, user application, and admin panel.

The final implementation should be production-oriented, responsive, secure, maintainable, and visually professional rather than looking like a generic AI-generated SaaS dashboard.