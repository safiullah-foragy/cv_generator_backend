# 📸 Photo Upload Feature Guide

## ✅ Yes! The backend supports photo uploads and includes them in generated CVs!

### 🎯 Features

- ✓ **Photo Upload** - Upload profile pictures with your CV data
- ✓ **Automatic Processing** - Photos are saved and embedded automatically
- ✓ **PDF Integration** - Photos appear in all PDF CVs
- ✓ **DOCX Integration** - Photos appear in all DOCX CVs
- ✓ **Professional Display** - Circular avatar with themed borders
- ✓ **All Templates** - Photo included in all 10 CV templates

### 📋 Photo Specifications

| Feature | Details |
|---------|---------|
| **Max Size** | 5 MB |
| **Formats** | JPG, PNG, GIF |
| **Display Size** | 120x120 pixels |
| **Style** | Circular avatar |
| **Border** | 3px colored (matches template theme) |
| **Position** | Top center of CV header |

### 🔧 How It Works

#### Backend Processing:
```javascript
// 1. Photo is uploaded via multipart/form-data
// 2. Backend saves it to uploads/ directory
// 3. Photo path is stored with CV data
// 4. PDF/DOCX generators embed the photo
// 5. Photo appears in all 10 CV templates
```

#### Code Implementation:

**In cvController.js:**
```javascript
// Handle photo upload
let photoPath = null;
if (req.files && req.files.photo) {
  const photo = req.files.photo;
  const photoName = `${Date.now()}_${photo.name}`;
  photoPath = path.join('uploads', photoName);
  await photo.mv(photoPath);
  cvData.photoPath = photoPath;
}
```

**In pdfService.js:**
```javascript
// Generate photo HTML
const photoHtml = data.photoPath 
  ? `<img src="file://${path.resolve(data.photoPath)}" 
         alt="Profile Photo" 
         style="width: 120px; 
                height: 120px; 
                border-radius: 50%; 
                object-fit: cover; 
                border: 3px solid ${style.accentColor};">` 
  : '';
```

**In HTML Template:**
```html
<div class="header">
  <div class="photo">${photoHtml}</div>
  <h1>${data.name}</h1>
  <!-- Rest of header -->
</div>
```

### 💻 Frontend Integration Examples

#### React Example:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  
  // Add text fields
  formData.append('name', 'Ahmed Hassan');
  formData.append('gmail', 'ahmed@example.com');
  
  // Add photo (from file input)
  const photoInput = document.getElementById('photoInput');
  if (photoInput.files[0]) {
    formData.append('photo', photoInput.files[0]);
  }
  
  // Send to backend
  const response = await axios.post(
    'http://localhost:5000/api/cv/generate',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  
  console.log('CVs generated:', response.data.cvs);
};
```

#### HTML Form:
```html
<form id="cvForm" enctype="multipart/form-data">
  <input type="text" name="name" placeholder="Full Name" required>
  <input type="email" name="gmail" placeholder="Email" required>
  
  <!-- Photo upload -->
  <label>Profile Photo (optional)</label>
  <input type="file" 
         name="photo" 
         accept="image/jpeg,image/png,image/gif"
         id="photoInput">
  
  <button type="submit">Generate CV</button>
</form>

<script>
document.getElementById('cvForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const response = await fetch('http://localhost:5000/api/cv/generate', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  console.log('Generated:', result.cvs);
});
</script>
```

#### Vue.js Example:
```vue
<template>
  <form @submit.prevent="generateCV">
    <input v-model="formData.name" placeholder="Name" />
    <input type="file" @change="handlePhoto" accept="image/*" />
    <button type="submit">Generate CV</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        photo: null
      }
    }
  },
  methods: {
    handlePhoto(event) {
      this.formData.photo = event.target.files[0];
    },
    async generateCV() {
      const formData = new FormData();
      formData.append('name', this.formData.name);
      
      if (this.formData.photo) {
        formData.append('photo', this.formData.photo);
      }
      
      const response = await axios.post(
        'http://localhost:5000/api/cv/generate',
        formData
      );
      
      console.log(response.data);
    }
  }
}
</script>
```

### 🧪 Testing Photo Upload (PowerShell)

```powershell
# Test with a sample image
$photoPath = "C:\path\to\your\photo.jpg"

# Create multipart form data
$fileBin = [System.IO.File]::ReadAllBytes($photoPath)
$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"

# Build request body with photo
$bodyLines = @()
$bodyLines += "--$boundary"
$bodyLines += 'Content-Disposition: form-data; name="name"'
$bodyLines += ''
$bodyLines += 'Ahmed Hassan'
$bodyLines += "--$boundary"
$bodyLines += 'Content-Disposition: form-data; name="photo"; filename="photo.jpg"'
$bodyLines += 'Content-Type: image/jpeg'
$bodyLines += ''
# Add photo binary data
$bodyLines += "--$boundary--"

$body = $bodyLines -join $LF

# Send request
Invoke-RestMethod -Uri "http://localhost:5000/api/cv/generate" `
  -Method Post `
  -ContentType "multipart/form-data; boundary=$boundary" `
  -Body $body
```

### 📸 Photo Display in Templates

#### Single Column Templates (1, 3, 5, 7, 8):
```
┌────────────────────────┐
│                        │
│    ┌─────────────┐    │
│    │   Photo     │    │  ← Circular, centered
│    │  (120x120)  │    │
│    └─────────────┘    │
│                        │
│    Ahmed Hassan        │  ← Name below photo
│                        │
│  ahmed@example.com     │
│  +880 1234-567890      │
│                        │
└────────────────────────┘
```

#### Two Column Templates (2, 4, 6, 9, 10):
```
┌──────────┬─────────────────┐
│ SIDEBAR  │  MAIN CONTENT   │
│ (colored)│                 │
│          │                 │
│  ┌────┐  │                 │
│  │Photo│ │                 │  ← Photo in sidebar
│  │120px│ │                 │
│  └────┘  │                 │
│          │                 │
│  Ahmed   │                 │
│  Hassan  │                 │
│          │                 │
│  Contact │                 │
│  • Email │                 │
│  • Phone │                 │
│          │                 │
└──────────┴─────────────────┘
```

### 🎨 Photo Styling by Template

| Template | Border Color | Background |
|----------|--------------|------------|
| Professional Classic | #3498db (Blue) | White |
| Modern Blue | #60a5fa (Light Blue) | Dark sidebar |
| Executive Elite | #d97706 (Gold) | White |
| Creative Bold | #c4b5fd (Purple) | Purple sidebar |
| Minimalist Green | #10b981 (Green) | White |
| Corporate Gray | #9ca3af (Gray) | Gray sidebar |
| Tech Orange | #fb923c (Orange) | White |
| Academic Formal | #64748b (Slate) | White |
| Elegant Purple | #a855f7 (Purple) | Purple sidebar |
| Fresh Teal | #2dd4bf (Teal) | Teal sidebar |

### ⚠️ Important Notes

1. **Photo is Optional** - If no photo is uploaded, CVs are generated without it
2. **File Validation** - Backend validates file size (max 5MB)
3. **Auto-Resizing** - Photos are displayed at 120x120px with CSS
4. **Aspect Ratio** - Circular crop maintains photo quality
5. **Path Security** - Photos stored in secure uploads/ directory
6. **Session-Based** - Each photo is associated with its session

### 🔒 Security Features

- ✓ File size limit (5MB max)
- ✓ File type validation
- ✓ Sanitized file names (timestamp prefix)
- ✓ Separate uploads directory
- ✓ No direct file access from URL
- ✓ Photo paths are server-side only

### 📝 Response Example (with photo)

```json
{
  "success": true,
  "sessionId": "uuid-here",
  "cvs": [
    {
      "templateId": 1,
      "templateName": "Professional Classic",
      "pdf": {
        "url": "/api/cv/session-id/1/pdf",
        "downloadUrl": "/api/cv/download/session-id/1/pdf"
      },
      "docx": {
        "url": "/api/cv/session-id/1/docx",
        "downloadUrl": "/api/cv/download/session-id/1/docx"
      }
    }
    // ... 9 more templates, all with photo included
  ],
  "message": "Successfully generated 10 CV variants"
}
```

### ✅ What Happens When You Upload a Photo:

1. **Upload** - Photo sent via multipart/form-data
2. **Save** - Backend saves to `uploads/timestamp_filename.jpg`
3. **Process** - Path stored with CV data
4. **Generate** - PDF/DOCX generators embed photo
5. **Display** - Photo appears in all 10 templates
6. **Download** - All 20 files (10 PDF + 10 DOCX) include photo

### 🎯 Summary

**YES!** The backend:
- ✅ Accepts photo uploads
- ✅ Saves photos securely
- ✅ Embeds photos in PDFs
- ✅ Embeds photos in DOCX files
- ✅ Displays photos beautifully in all templates
- ✅ Handles photos automatically

**All 10 CV templates will include your profile photo when uploaded!**

---

For more information, see:
- [README.md](README.md) - API documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [example-data.json](example-data.json) - Sample data format
