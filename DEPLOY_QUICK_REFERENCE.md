# 🚀 Quick Deploy to Render - Cheat Sheet

## 📋 5-Minute Deployment

### 1️⃣ Push to GitHub (2 minutes)
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cv-generator-backend.git
git push -u origin main
```

### 2️⃣ Deploy on Render (3 minutes)
1. Go to [render.com](https://render.com) → Sign in
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repository
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Click **"Create Web Service"**

### 3️⃣ Done! ✅
Your API will be live at:
```
https://cv-generator-backend.onrender.com
```

---

## 🔧 Essential Commands

```powershell
# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Deploy to Render"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cv-generator-backend.git

# Push
git push -u origin main

# Update after changes
git add .
git commit -m "Update"
git push
```

---

## 🧪 Test Deployed API

```powershell
# Health check (replace with your URL)
Invoke-RestMethod "https://cv-generator-backend.onrender.com/health"

# Generate CV
$data = @{
    name = "Test User"
    gmail = "test@example.com"
    skills = "JavaScript"
}
Invoke-RestMethod "https://your-app.onrender.com/api/cv/generate" -Method Post -Form $data
```

---

## ⚙️ Render Configuration

### Environment Variables:
| Key | Value |
|-----|-------|
| NODE_ENV | production |
| PORT | 10000 |

### Service Settings:
- **Auto-Deploy:** ON
- **Health Check:** /health
- **Region:** Singapore (or nearest)

---

## ⚠️ Important Notes

### Free Tier Limits:
- ❌ Sleeps after 15 min inactivity
- ❌ First request slow (cold start)
- ❌ Ephemeral storage (files deleted on restart)
- ✅ Free SSL certificate
- ✅ Automatic deployments

### For Production:
- Upgrade to Starter ($7/mo) for:
  - Always-on service
  - Persistent storage
  - No cold starts

---

## 🔗 Quick Links

- **Render Dashboard:** [dashboard.render.com](https://dashboard.render.com)
- **Full Guide:** `RENDER_DEPLOYMENT_GUIDE.md`
- **API Docs:** `README.md`

---

**That's it! Your CV generator is now live! 🎉**
