# 🎨 CV Generator - Visual Project Guide

A visual representation of the CV Generator architecture and workflow.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CV GENERATOR SYSTEM                      │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│              │         │              │         │              │
│   FRONTEND   │────────▶│   BACKEND    │────────▶│  FILE SYSTEM │
│   (React)    │◀────────│   (Express)  │◀────────│   (Storage)  │
│              │         │              │         │              │
└──────────────┘         └──────────────┘         └──────────────┘
      │                         │                         │
      │                         │                         │
      ▼                         ▼                         ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│  Form Input  │         │ PDF Service  │         │  uploads/    │
│  Display     │         │ DOCX Service │         │  generated/  │
│  Results     │         │ Controllers  │         │              │
└──────────────┘         └──────────────┘         └──────────────┘
```

## 📊 Application Flow

```
USER JOURNEY
═══════════════════════════════════════════════════════════════

1. USER VISITS SITE
   │
   ├─▶ Frontend loads (http://localhost:3000)
   │   └─▶ Shows CV Form
   │
2. USER FILLS FORM
   │
   ├─▶ Personal Information
   ├─▶ Contact Details
   ├─▶ Education (SSC, HSC, Graduation)
   ├─▶ Work Experience
   ├─▶ Skills, Languages, Hobbies
   └─▶ Photo Upload (optional)
   │
3. USER SUBMITS FORM
   │
   ├─▶ Frontend validates data
   ├─▶ Creates FormData object
   └─▶ Sends POST to /api/generate-cv
   │
4. BACKEND PROCESSES
   │
   ├─▶ Multer handles photo upload
   ├─▶ Controller receives data
   ├─▶ Generates 10 CVs
   │   ├─▶ PDF Service creates 10 PDFs
   │   └─▶ DOCX Service creates 10 DOCXs
   └─▶ Returns download links
   │
5. USER RECEIVES RESULTS
   │
   ├─▶ 10 CV templates displayed
   ├─▶ Each with PDF and DOCX options
   └─▶ View and Download buttons
   │
6. USER DOWNLOADS CVs
   │
   ├─▶ Clicks download button
   ├─▶ Backend serves file
   └─▶ File downloaded to user's device
   │
7. USER CAN CREATE NEW CV
   │
   └─▶ Clicks "Create New CV"
       └─▶ Returns to step 1
```

## 📁 Directory Structure Visualization

```
cv_generator_backend/
│
├── 📄 server.js                 [Main Express server]
├── 📄 package.json              [Backend dependencies]
├── 📄 .env                      [Environment variables]
├── 📄 .gitignore               [Git ignore rules]
│
├── 📁 controllers/
│   └── 📄 cvController.js       [Handle API requests]
│
├── 📁 middleware/
│   └── 📄 uploadMiddleware.js   [Multer configuration]
│
├── 📁 routes/
│   └── 📄 cvRoutes.js           [API endpoints]
│
├── 📁 services/
│   ├── 📄 pdfService.js         [10 PDF templates]
│   └── 📄 docxService.js        [10 DOCX templates]
│
├── 📁 frontend/                 [React Application]
│   ├── 📁 public/
│   │   └── 📄 index.html
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📄 CVForm.js     [Input form]
│   │   │   ├── 📄 CVForm.css
│   │   │   ├── 📄 CVResults.js  [Display results]
│   │   │   └── 📄 CVResults.css
│   │   ├── 📄 App.js            [Main component]
│   │   ├── 📄 App.css
│   │   ├── 📄 index.js          [Entry point]
│   │   └── 📄 index.css
│   ├── 📄 package.json          [Frontend deps]
│   └── 📄 .env                  [Frontend config]
│
├── 📁 uploads/                  [User photos]
│   └── 🖼️ [uuid].jpg
│
├── 📁 generated/                [Generated CVs]
│   ├── 📄 cv_template_1.pdf
│   ├── 📄 cv_template_1.docx
│   └── ...
│
└── 📁 Documentation/
    ├── 📄 README.md
    ├── 📄 DEPLOYMENT_GUIDE.md
    ├── 📄 PROJECT_SUMMARY.md
    ├── 📄 TEST_DATA.md
    ├── 📄 TROUBLESHOOTING.md
    ├── 📄 CHECKLIST.md
    └── 📄 QUICK_REFERENCE.md
```

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      DATA FLOW                               │
└─────────────────────────────────────────────────────────────┘

[USER INPUT]
     │
     │ Form Data + Photo
     ▼
[CVForm Component]
     │
     │ FormData Object
     ▼
[Axios POST Request]
     │
     │ /api/generate-cv
     ▼
[Express Server]
     │
     ├─▶ [Multer Middleware] ─▶ Save photo to uploads/
     │
     ▼
[CV Controller]
     │
     ├─▶ Parse form data
     ├─▶ Structure CV data object
     │
     ├─▶ Loop 10 times
     │   │
     │   ├─▶ [PDF Service]
     │   │   ├─▶ Select template (1-10)
     │   │   ├─▶ Generate PDF
     │   │   └─▶ Save to generated/
     │   │
     │   └─▶ [DOCX Service]
     │       ├─▶ Select template (1-10)
     │       ├─▶ Generate DOCX
     │       └─▶ Save to generated/
     │
     └─▶ Build response with download links
         │
         ▼
[JSON Response]
     │
     │ Array of 10 CV objects
     ▼
[CVResults Component]
     │
     ├─▶ Display template cards
     ├─▶ Show download buttons
     └─▶ Enable view buttons
         │
         ▼
[USER DOWNLOADS]
```

## 🎯 Component Hierarchy

```
App.js (Main Container)
│
├─▶ App-header
│   ├─▶ Title: "Professional CV Generator"
│   └─▶ Subtitle: "Create your perfect CV"
│
├─▶ App-main (Content Area)
│   │
│   ├─▶ CVForm Component (if !generatedCVs)
│   │   │
│   │   ├─▶ Personal Information Section
│   │   │   ├─▶ Name, Father's Name, Mother's Name
│   │   │   ├─▶ Addresses, DOB, Age, Gender
│   │   │   └─▶ Marital Status, Nationality, Photo
│   │   │
│   │   ├─▶ Contact Information Section
│   │   │   └─▶ Email, Phone
│   │   │
│   │   ├─▶ Education Sections
│   │   │   ├─▶ SSC (GPA, School, Board, Year)
│   │   │   ├─▶ HSC (GPA, College, Board, Year)
│   │   │   └─▶ Graduation (Subject, CGPA, Institution)
│   │   │
│   │   ├─▶ Professional Experience
│   │   │   ├─▶ Current Job (optional)
│   │   │   └─▶ Previous Jobs (dynamic list)
│   │   │
│   │   ├─▶ Additional Information
│   │   │   ├─▶ Skills
│   │   │   ├─▶ Languages
│   │   │   └─▶ Hobbies
│   │   │
│   │   └─▶ Submit Button
│   │
│   └─▶ CVResults Component (if generatedCVs)
│       │
│       ├─▶ Results Header
│       │   └─▶ "Create New CV" button
│       │
│       ├─▶ CV Grid (10 templates)
│       │   │
│       │   └─▶ CV Card (x10)
│       │       ├─▶ Template Header
│       │       ├─▶ Preview Placeholder
│       │       ├─▶ PDF Section
│       │       │   ├─▶ View Button
│       │       │   └─▶ Download Button
│       │       └─▶ DOCX Section
│       │           ├─▶ View Button
│       │           └─▶ Download Button
│       │
│       └─▶ Results Footer
│           └─▶ "Create Another CV" button
│
└─▶ App-footer
    └─▶ Copyright notice
```

## 📡 API Endpoint Map

```
EXPRESS SERVER (http://localhost:5000)
│
├─▶ GET /health
│   └─▶ Returns: {"status": "OK", "message": "..."}
│
├─▶ POST /api/generate-cv
│   ├─▶ Middleware: upload.single('photo')
│   ├─▶ Handler: cvController.generateCV
│   ├─▶ Input: FormData (multipart/form-data)
│   └─▶ Output: JSON with 10 CV objects
│
├─▶ GET /api/download/:filename
│   ├─▶ Handler: cvController.downloadCV
│   ├─▶ Input: filename parameter
│   └─▶ Output: File download
│
├─▶ Static Files
│   ├─▶ /uploads/* (uploaded photos)
│   └─▶ /generated/* (generated CVs)
│
└─▶ Error Handler
    └─▶ Catches all errors
```

## 🎨 Template Layout Visualization

```
TEMPLATE 1: Professional Header
┌──────────────────────────────────┐
│  ┌────────────────────────────┐  │
│  │   JOHN SMITH (centered)    │  │ ◀─ Colored header
│  │  email@mail.com | phone    │  │
│  └────────────────────────────┘  │
├──────────────────────────────────┤
│  PERSONAL INFORMATION            │
│  • Details in key-value format  │
├──────────────────────────────────┤
│  EDUCATION                       │
│  • SSC, HSC, Graduation         │
├──────────────────────────────────┤
│  EXPERIENCE                      │
│  • Jobs listed chronologically  │
├──────────────────────────────────┤
│  SKILLS • LANGUAGES • HOBBIES    │
└──────────────────────────────────┘

TEMPLATE 2: Two-Column
┌───────────┬──────────────────────┐
│           │  JOHN SMITH          │
│           │  Professional Title  │
│ CONTACT   ├──────────────────────┤
│ • Email   │  EDUCATION           │
│ • Phone   │  • Graduation        │
│           │  • HSC               │
│ SKILLS    │  • SSC               │
│ • Skill 1 ├──────────────────────┤
│ • Skill 2 │  EXPERIENCE          │
│           │  • Current Job       │
│ LANGUAGES │  • Previous Jobs     │
│ • Lang 1  │                      │
│ • Lang 2  │                      │
└───────────┴──────────────────────┘

TEMPLATE 3: Sidebar
┌────────┬─────────────────────────┐
│        │                         │
│ PHOTO  │  JOHN SMITH             │
│        │  Professional Profile   │
├────────┤                         │
│CONTACT │  ─────────────────────  │
│        │  EDUCATION              │
│ SKILLS │  Details here...        │
│        │                         │
│LANGUAGE│  ─────────────────────  │
│        │  EXPERIENCE             │
│ HOBBIES│  Details here...        │
│        │                         │
└────────┴─────────────────────────┘
```

## 🔄 State Management

```
App Component State
├─▶ generatedCVs: null | Array
├─▶ loading: boolean
└─▶ Methods:
    ├─▶ handleCVGenerated(cvs)
    └─▶ handleReset()

CVForm Component State
├─▶ formData: Object
│   ├─▶ Personal info fields
│   ├─▶ Contact fields
│   ├─▶ Education fields
│   └─▶ Professional fields
├─▶ previousJobs: Array
├─▶ currentPrevJob: Object
├─▶ photo: File | null
├─▶ errors: Object
└─▶ Methods:
    ├─▶ handleChange(e)
    ├─▶ handlePhotoChange(e)
    ├─▶ handlePrevJobChange(e)
    ├─▶ addPreviousJob()
    ├─▶ removePreviousJob(index)
    ├─▶ validateForm()
    └─▶ handleSubmit(e)

CVResults Component Props
├─▶ cvs: Array[10]
└─▶ onReset: Function
```

## 🎯 Template Selection Logic

```
templateId (1-10)
    │
    ├─▶ PDF Service
    │   │
    │   └─▶ switch(templateId)
    │       ├─▶ case 1: generateTemplate1()
    │       ├─▶ case 2: generateTemplate2()
    │       ├─▶ case 3: generateTemplate3()
    │       ├─▶ ...
    │       └─▶ case 10: generateTemplate10()
    │
    └─▶ DOCX Service
        │
        └─▶ switch(templateId)
            ├─▶ case 1: createTemplate1()
            ├─▶ case 2: createTemplate2()
            ├─▶ case 3: createTemplate3()
            ├─▶ ...
            └─▶ case 10: createTemplate10()
```

## 🚀 Deployment Flow

```
LOCAL DEVELOPMENT
├─▶ Write code
├─▶ Test locally
└─▶ Commit to Git
    │
    ▼
PUSH TO GITHUB
├─▶ git add .
├─▶ git commit -m "message"
└─▶ git push origin main
    │
    ▼
RENDER.COM DEPLOYMENT
├─▶ Detects new commit
├─▶ Runs build command
│   └─▶ npm install
├─▶ Starts application
│   └─▶ npm start
└─▶ App goes live
    │
    ▼
PRODUCTION
├─▶ https://your-app.onrender.com
├─▶ Auto-deploys on new commits
└─▶ Health checks running
```

## 📊 File Generation Process

```
For i = 1 to 10:
    │
    ├─▶ Generate PDF
    │   ├─▶ Create PDFDocument
    │   ├─▶ Apply template styles
    │   ├─▶ Add user data
    │   ├─▶ Draw sections
    │   └─▶ Save to generated/cv_template_{i}.pdf
    │
    └─▶ Generate DOCX
        ├─▶ Create Document
        ├─▶ Add paragraphs
        ├─▶ Apply formatting
        ├─▶ Insert user data
        └─▶ Save to generated/cv_template_{i}.docx
```

## 🎨 Color Palette Map

```
Template 1  ━━━  #2C3E50  #3498DB  (Professional Blue)
Template 2  ━━━  #27AE60  #2ECC71  (Modern Green)
Template 3  ━━━  #8E44AD  #9B59B6  (Creative Purple)
Template 4  ━━━  #E74C3C  #C0392B  (Bold Red)
Template 5  ━━━  #F39C12  #F1C40F  (Elegant Gold)
Template 6  ━━━  #1ABC9C  #16A085  (Clean Teal)
Template 7  ━━━  #34495E  #95A5A6  (Minimal Gray)
Template 8  ━━━  #E67E22  #D35400  (Warm Orange)
Template 9  ━━━  #16A085  #1ABC9C  (Fresh Turquoise)
Template 10 ━━━  #2980B9  #3498DB  (Classic Blue)
```

---

**Visual Guide Complete!** Use this for understanding system architecture and flow.
