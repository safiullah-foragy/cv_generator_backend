# 🚀 Deploy CV Generator Backend to Render.com

## Complete Step-by-Step Deployment Guide

### 📋 Prerequisites

- ✅ GitHub account
- ✅ Render.com account (free tier available)
- ✅ Git installed on your computer

---

## 🔥 Quick Deploy (5 Steps)

### Step 1: Initialize Git Repository

```powershell
# In your project directory (d:\cv_generator_backend)
git init
git add .
git commit -m "Initial commit - CV Generator Backend"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **"New Repository"**
3. Name: `cv-generator-backend`
4. Description: `CV Generator Backend with 10 templates`
5. Keep it **Public** or **Private**
6. **Don't** initialize with README
7. Click **"Create Repository"**

### Step 3: Push to GitHub

```powershell
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/cv-generator-backend.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy on Render

1. Go to [Render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `cv-generator-backend`
   - **Region:** Singapore (or closest to you)
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Click **"Create Web Service"**

### Step 5: Wait for Deployment

- Render will automatically:
  - Install dependencies
  - Build your application
  - Start the server
- **First deploy takes ~5-10 minutes**
- You'll get a URL like: `https://cv-generator-backend.onrender.com`

---

## 🎯 Alternative: Deploy with render.yaml (Recommended)

The project already includes `render.yaml` configuration.

### Using Blueprint (Easier):

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render auto-detects `render.yaml`
5. Click **"Apply"**
6. Done! 🎉

---

## ⚙️ Manual Configuration (If Not Using render.yaml)

### Environment Variables on Render:

1. Go to your service dashboard
2. Click **"Environment"** tab
3. Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` (Render provides this) |

### Advanced Settings:

| Setting | Value |
|---------|-------|
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Auto-Deploy** | Yes |
| **Health Check Path** | `/health` |

---

## 📝 Complete PowerShell Commands

```powershell
# Step 1: Navigate to project directory
cd d:\cv_generator_backend

# Step 2: Initialize Git
git init

# Step 3: Add all files
git add .

# Step 4: Commit
git commit -m "Initial commit - CV Generator Backend with 10 templates"

# Step 5: Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cv-generator-backend.git

# Step 6: Push to GitHub
git branch -M main
git push -u origin main

# Done! Now go to Render.com to deploy
```

---

## 🔍 Testing Your Deployed Backend

### 1. Health Check

```powershell
# Replace with your Render URL
Invoke-RestMethod -Uri "https://cv-generator-backend.onrender.com/health"
```

Expected response:
```json
{
  "status": "OK",
  "message": "CV Generator Backend is running"
}
```

### 2. Generate CVs

```powershell
# Test CV generation
$formData = @{
    name = "Ahmed Hassan"
    gmail = "ahmed@example.com"
    graduationSubject = "Computer Science"
    graduationCGPA = "3.85"
    skills = "JavaScript, React, Node.js"
}

Invoke-RestMethod -Uri "https://cv-generator-backend.onrender.com/api/cv/generate" `
  -Method Post -Form $formData
```

---

## 🌐 Update Frontend to Use Render URL

### React Example:

```javascript
// Before (local)
const API_URL = 'http://localhost:5000';

// After (production)
const API_URL = 'https://cv-generator-backend.onrender.com';

// Or use environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

### .env.production (React):

```
REACT_APP_API_URL=https://cv-generator-backend.onrender.com
```

---

## ⚠️ Important Notes for Render Free Tier

### 1. Cold Starts
- Free tier services **sleep after 15 minutes** of inactivity
- First request after sleep takes **30-60 seconds** to wake up
- Subsequent requests are fast

### 2. Storage Limitations
- Render's free tier has **ephemeral storage**
- Uploaded photos and generated CVs are **deleted on service restart**
- For permanent storage, upgrade to paid plan or use cloud storage (AWS S3, Cloudinary)

### 3. Performance
- Free tier has limited CPU/RAM
- Good for testing and small-scale use
- Upgrade for production traffic

---

## 💾 Adding Persistent Storage (Optional - Paid Plans)

### Using AWS S3 for File Storage:

1. Install AWS SDK:
```powershell
npm install aws-sdk
```

2. Add environment variables on Render:
```
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_BUCKET_NAME=your_bucket
AWS_REGION=us-east-1
```

3. Update file upload logic to use S3

---

## 🔧 Troubleshooting

### Issue: Build Fails

**Solution 1:** Check Node version
- Render uses Node 14+ by default
- Specify version in `package.json`:
```json
"engines": {
  "node": ">=14.0.0"
}
```

**Solution 2:** Check build logs
- Go to Render dashboard → Your service → "Logs"
- Look for error messages

### Issue: Puppeteer Installation Fails

Puppeteer is large and may cause issues on free tier.

**Solution:** The backend already handles this gracefully:
- PDFs are generated via Puppeteer
- If Puppeteer fails, HTML files are generated instead
- Users can convert HTML to PDF in browser

**Better Solution (Advanced):**
Use Puppeteer with external Chrome:
```javascript
// In pdfService.js
const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  executablePath: process.env.CHROME_EXECUTABLE_PATH || undefined
});
```

### Issue: Service Won't Start

**Check logs for:**
1. Missing dependencies → Run `npm install`
2. Port conflicts → Render provides PORT via env var
3. File permissions → Check directory creation

### Issue: CORS Errors

**Solution:** Update CORS in `server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.com'
  ],
  credentials: true
}));
```

---

## 📊 Monitoring Your Deployment

### Render Dashboard:

1. **Metrics** - CPU, Memory, Request count
2. **Logs** - Real-time application logs
3. **Events** - Deploy history
4. **Settings** - Configuration

### Health Monitoring:

Render automatically checks `/health` endpoint every few minutes.

---

## 🚀 Deployment Checklist

- [ ] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] Render service created
- [ ] Environment variables configured
- [ ] Build successful
- [ ] Service running
- [ ] Health check passing
- [ ] API endpoints tested
- [ ] Frontend updated with new URL
- [ ] CORS configured for frontend domain

---

## 🎯 Post-Deployment Steps

### 1. Test All Endpoints

```powershell
$BASE_URL = "https://cv-generator-backend.onrender.com"

# Health check
Invoke-RestMethod "$BASE_URL/health"

# Generate CVs
# (Use test script with new URL)
```

### 2. Update Documentation

Update README.md with production URL:
```
API Endpoint: https://cv-generator-backend.onrender.com
```

### 3. Monitor Performance

- Check Render dashboard regularly
- Monitor response times
- Watch for errors in logs

### 4. Set Up Alerts (Optional)

Use services like:
- **UptimeRobot** - Free uptime monitoring
- **Better Uptime** - Status page
- **Sentry** - Error tracking

---

## 💰 Upgrading to Paid Plan (Optional)

### Benefits:
- ✅ No cold starts (always running)
- ✅ Persistent storage
- ✅ More CPU/RAM
- ✅ Custom domains
- ✅ Priority support

### Pricing:
- **Starter Plan:** $7/month
- **Standard Plan:** $25/month

---

## 🔐 Security Best Practices

### 1. Use Environment Variables

Never commit sensitive data. Use Render's environment variables.

### 2. Enable HTTPS

Render provides free SSL certificates automatically.

### 3. Rate Limiting (Add this)

```javascript
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. Validate Inputs

Already implemented in the backend.

---

## 📱 Example Frontend Integration After Deployment

### React Hook:

```javascript
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://cv-generator-backend.onrender.com';

export function useCV() {
  const [loading, setLoading] = useState(false);
  const [cvs, setCvs] = useState([]);

  const generateCV = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/cv/generate`,
        formData
      );
      setCvs(response.data.cvs);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { generateCV, loading, cvs };
}
```

---

## 🎉 Success Indicators

Your deployment is successful when:

1. ✅ Service shows "Live" status on Render
2. ✅ Health endpoint returns OK
3. ✅ CV generation works
4. ✅ Files are downloadable
5. ✅ No errors in logs

---

## 📞 Getting Help

### Render Support:
- [Render Docs](https://render.com/docs)
- [Render Community](https://community.render.com)
- [Render Status](https://status.render.com)

### Project Documentation:
- `README.md` - Complete API guide
- `SETUP.md` - Installation help
- `ARCHITECTURE.md` - System design

---

## 🔄 Continuous Deployment

### Auto-Deploy Setup:

1. Enable auto-deploy in Render settings
2. Every push to `main` branch triggers deployment
3. Render automatically:
   - Pulls latest code
   - Installs dependencies
   - Restarts service

### Workflow:

```powershell
# Make changes locally
# Test locally

# Commit and push
git add .
git commit -m "Update: feature description"
git push

# Render auto-deploys in ~2-5 minutes
```

---

## ✅ Deployment Complete!

Your CV Generator Backend is now live at:
```
https://cv-generator-backend.onrender.com
```

### Next Steps:
1. ✅ Test all endpoints
2. ✅ Integrate with frontend
3. ✅ Share with users
4. ✅ Monitor performance

---

**Congratulations! Your CV generator is now deployed and accessible worldwide!** 🎉🚀

For questions or issues, check the troubleshooting section or Render's documentation.
