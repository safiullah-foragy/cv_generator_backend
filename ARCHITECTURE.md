# 🎨 CV Generator Backend - System Architecture

## 📊 System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React/Vue/etc)                    │
│                                                                      │
│  ┌──────────────┐                                                   │
│  │  User Form   │                                                   │
│  │              │                                                   │
│  │ • Name       │                                                   │
│  │ • Email      │                                                   │
│  │ • Education  │                                                   │
│  │ • Skills     │                                                   │
│  │ • Photo      │                                                   │
│  └──────┬───────┘                                                   │
│         │                                                            │
│         │ FormData (multipart/form-data)                            │
│         ▼                                                            │
└─────────┼──────────────────────────────────────────────────────────┘
          │
          │ POST /api/cv/generate
          │
┌─────────▼──────────────────────────────────────────────────────────┐
│                      BACKEND (Express.js)                           │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │                     server.js (Port 5000)                       ││
│  │                                                                  ││
│  │  • Express App                                                  ││
│  │  • CORS Middleware                                              ││
│  │  • File Upload Handler                                          ││
│  │  • Routes Configuration                                         ││
│  └──────────────────────────┬───────────────────────────────────────┘│
│                             │                                        │
│                             ▼                                        │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │                 routes/cvRoutes.js                              ││
│  │                                                                  ││
│  │  POST   /api/cv/generate              → generateCVs()          ││
│  │  GET    /api/cv/:sessionId/:id/:format → getCV()               ││
│  │  GET    /api/cv/download/...          → downloadCV()           ││
│  │  GET    /api/cv/session/:sessionId    → getSessionCVs()        ││
│  └──────────────────────────┬───────────────────────────────────────┘│
│                             │                                        │
│                             ▼                                        │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │            controllers/cvController.js                          ││
│  │                                                                  ││
│  │  generateCVs():                                                 ││
│  │  1. Extract form data                                           ││
│  │  2. Save uploaded photo → uploads/                             ││
│  │  3. Create session ID (UUID)                                   ││
│  │  4. Loop through 10 templates                                  ││
│  │  5. Generate PDF + DOCX for each                               ││
│  │  6. Return URLs for all files                                  ││
│  └──────────────┬─────────────────────┬─────────────────────────────┘│
│                 │                     │                              │
│                 ▼                     ▼                              │
│  ┌──────────────────────┐  ┌──────────────────────┐                │
│  │ services/            │  │ services/            │                │
│  │ templateService.js   │  │ pdfService.js        │                │
│  │                      │  │                      │                │
│  │ • 10 Templates       │  │ • Puppeteer          │                │
│  │ • Color schemes      │  │ • HTML → PDF         │                │
│  │ • Layouts            │  │ • A4 format          │                │
│  │                      │  │ • Styling            │                │
│  └──────────────────────┘  └──────────┬───────────┘                │
│                                       │                              │
│                                       ▼                              │
│                            ┌──────────────────────┐                │
│                            │ services/            │                │
│                            │ docxService.js       │                │
│                            │                      │                │
│                            │ • docx library       │                │
│                            │ • Word format        │                │
│                            │ • Styling            │                │
│                            └──────────┬───────────┘                │
│                                       │                              │
│                                       ▼                              │
└───────────────────────────────────────┼──────────────────────────────┘
                                        │
                                        ▼
                          ┌──────────────────────────┐
                          │   File System Storage    │
                          │                          │
                          │  generated_cvs/          │
                          │    └─ {session-id}/      │
                          │       ├─ cv_template_1.pdf
                          │       ├─ cv_template_1.docx
                          │       ├─ cv_template_2.pdf
                          │       ├─ cv_template_2.docx
                          │       └─ ... (20 files)  │
                          └──────────┬───────────────┘
                                     │
                                     ▼
                          ┌──────────────────────────┐
                          │   Response to Frontend   │
                          │                          │
                          │  {                       │
                          │    sessionId: "uuid",    │
                          │    cvs: [                │
                          │      {                   │
                          │        templateId: 1,    │
                          │        pdf: {url},       │
                          │        docx: {url}       │
                          │      },                  │
                          │      ... × 10            │
                          │    ]                     │
                          │  }                       │
                          └──────────────────────────┘
```

## 🔄 Request/Response Flow

### 1️⃣ User Submits Form

```javascript
// Frontend sends multipart/form-data
const formData = new FormData();
formData.append('name', 'Ahmed Hassan');
formData.append('gmail', 'ahmed@example.com');
formData.append('photo', photoFile);
// ... all other fields

axios.post('http://localhost:5000/api/cv/generate', formData);
```

### 2️⃣ Backend Receives Request

```
POST /api/cv/generate
│
├─► Express Middleware
│   ├─► CORS check ✓
│   ├─► Parse multipart data ✓
│   └─► File upload validation ✓
│
├─► Router (cvRoutes.js)
│   └─► Route to controller.generateCVs()
│
└─► Controller (cvController.js)
    └─► Process request
```

### 3️⃣ Backend Processing

```
cvController.generateCVs()
│
├─► Extract form data
│   ├─► Personal info
│   ├─► Education data
│   ├─► Skills & experience
│   └─► Photo file
│
├─► Save photo
│   └─► uploads/{timestamp}_{filename}
│
├─► Create session
│   └─► sessionId = UUID()
│
├─► Generate CVs (Loop 10 times)
│   │
│   ├─► For template 1:
│   │   ├─► Get template style
│   │   ├─► Generate HTML with data
│   │   ├─► PDF: Puppeteer → .pdf
│   │   └─► DOCX: docx lib → .docx
│   │
│   ├─► For template 2:
│   │   └─► Same process...
│   │
│   └─► ... up to template 10
│
└─► Return response
    └─► Session ID + 20 URLs
```

### 4️⃣ File Generation Detail

```
Template Processing (per template)
│
├─► templateService.js
│   └─► Get template config
│       ├─► name: "Professional Classic"
│       ├─► colors: {primary, secondary, accent}
│       └─► layout: "single-column"
│
├─► pdfService.js
│   ├─► Generate HTML
│   │   ├─► Apply template styles
│   │   ├─► Insert user data
│   │   └─► Format sections
│   │
│   └─► Puppeteer
│       ├─► Launch headless browser
│       ├─► Load HTML
│       ├─► Render to PDF
│       └─► Save: generated_cvs/{sessionId}/cv_template_{id}.pdf
│
└─► docxService.js
    ├─► Create Document object
    ├─► Add sections
    │   ├─► Header (name, contact)
    │   ├─► Personal info
    │   ├─► Education
    │   ├─► Experience
    │   └─► Skills
    │
    └─► Save: generated_cvs/{sessionId}/cv_template_{id}.docx
```

### 5️⃣ Response Structure

```json
{
  "success": true,
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "cvs": [
    {
      "templateId": 1,
      "templateName": "Professional Classic",
      "templateDescription": "A clean, traditional CV format...",
      "pdf": {
        "path": "generated_cvs/550e.../cv_template_1.pdf",
        "url": "/api/cv/550e.../1/pdf",
        "downloadUrl": "/api/cv/download/550e.../1/pdf"
      },
      "docx": {
        "path": "generated_cvs/550e.../cv_template_1.docx",
        "url": "/api/cv/550e.../1/docx",
        "downloadUrl": "/api/cv/download/550e.../1/docx"
      }
    },
    // ... 9 more templates
  ],
  "message": "Successfully generated 10 CV variants"
}
```

### 6️⃣ Frontend Display

```javascript
// Frontend receives response
response.data.cvs.forEach(cv => {
  // Display template preview
  <div>
    <h3>{cv.templateName}</h3>
    <p>{cv.templateDescription}</p>
    
    // View buttons
    <a href={cv.pdf.url}>View PDF</a>
    <a href={cv.docx.url}>View DOCX</a>
    
    // Download buttons
    <a href={cv.pdf.downloadUrl}>Download PDF</a>
    <a href={cv.docx.downloadUrl}>Download DOCX</a>
  </div>
});
```

## 📂 Directory Structure Flow

```
Project Root
│
├─► uploads/                    [Photo Storage]
│   └─► {timestamp}_{filename}
│       └─► Example: 1709839200_profile.jpg
│
├─► generated_cvs/              [CV Storage]
│   └─► {sessionId}/            [Session Folder]
│       ├─► cv_template_1.pdf
│       ├─► cv_template_1.docx
│       ├─► cv_template_2.pdf
│       ├─► cv_template_2.docx
│       └─► ... (20 files total)
│
├─► controllers/                [Business Logic]
│   └─► cvController.js
│       ├─► generateCVs()
│       ├─► getCV()
│       ├─► downloadCV()
│       └─► getSessionCVs()
│
├─► routes/                     [API Routes]
│   └─► cvRoutes.js
│       └─► Define all endpoints
│
├─► services/                   [Core Services]
│   ├─► templateService.js     [Template Definitions]
│   ├─► pdfService.js          [PDF Generation]
│   ├─► docxService.js         [DOCX Generation]
│   └─► htmlService.js         [HTML Fallback]
│
└─► server.js                   [Entry Point]
    ├─► Express app
    ├─► Middleware
    ├─► Routes
    └─► Start server
```

## 🎨 Template Generation Flow

```
User Data + Template Style
          │
          ▼
    ┌─────────────┐
    │   Combine   │
    └──────┬──────┘
           │
           ├──────────────────────┬────────────────────┐
           ▼                      ▼                    ▼
    ┌────────────┐         ┌────────────┐      ┌────────────┐
    │  Template 1 │         │  Template 2 │      │  Template 10│
    │            │         │            │      │            │
    │ Classic    │         │ Modern     │  ... │ Fresh Teal │
    │ Blue theme │         │ Blue theme │      │ Teal theme │
    │ 1-column   │         │ 2-column   │      │ 2-column   │
    └──────┬─────┘         └──────┬─────┘      └──────┬─────┘
           │                      │                    │
           ├──────┬───────────────┼────────┬───────────┤
           ▼      ▼               ▼        ▼           ▼
        ┌────┐ ┌─────┐        ┌────┐  ┌─────┐     ┌────┐
        │PDF │ │DOCX │        │PDF │  │DOCX │ ... │DOCX│
        └────┘ └─────┘        └────┘  └─────┘     └────┘
           │      │               │        │           │
           └──────┴───────────────┴────────┴───────────┘
                           │
                           ▼
                   20 Files Generated
```

## 🔐 Security Flow

```
Request
  │
  ├─► File Upload Check
  │   ├─► Size: max 5MB ✓
  │   ├─► Type: image/* ✓
  │   └─► Extension validation ✓
  │
  ├─► CORS Validation
  │   └─► Allowed origins ✓
  │
  ├─► Input Sanitization
  │   ├─► Remove dangerous chars
  │   └─► Validate data types ✓
  │
  └─► Path Security
      ├─► Prevent directory traversal
      └─► Isolated session folders ✓
```

## 📊 Performance Optimization

```
Request comes in
      │
      ├─► Session ID generation (fast)
      │
      ├─► Parallel processing
      │   ├─► Template 1 ─┐
      │   ├─► Template 2 ─┤
      │   ├─► Template 3 ─┤─► Can be parallelized
      │   ├─► ...        ─┤   (future enhancement)
      │   └─► Template 10─┘
      │
      ├─► File caching (optional)
      │   └─► Reuse template HTML
      │
      └─► Cleanup old sessions
          └─► Delete files older than 24hrs
```

## 🌐 Deployment Architecture

```
                     Internet
                        │
                        ▼
                ┌───────────────┐
                │  Load Balancer │
                │   (nginx)     │
                └───────┬───────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
    ┌─────────┐   ┌─────────┐   ┌─────────┐
    │ Node.js │   │ Node.js │   │ Node.js │
    │ Server 1│   │ Server 2│   │ Server 3│
    └────┬────┘   └────┬────┘   └────┬────┘
         │             │             │
         └─────────────┼─────────────┘
                       │
                       ▼
              ┌────────────────┐
              │ Shared Storage │
              │   (NFS/S3)     │
              └────────────────┘
```

---

## 📝 Quick Reference

### Main Components:
1. **server.js** - Express app entry point
2. **cvRoutes.js** - API endpoint definitions
3. **cvController.js** - Request handling logic
4. **templateService.js** - 10 template configurations
5. **pdfService.js** - PDF generation with Puppeteer
6. **docxService.js** - DOCX generation with docx lib

### Data Flow:
```
Form → Route → Controller → Service → File → Response
```

### File Output:
```
1 Request → 10 Templates → 20 Files (PDF + DOCX each)
```

---

**Understanding the architecture?** Check [README.md](README.md) for API details!
