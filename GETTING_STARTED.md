# 🚀 Getting Started - Step by Step

Complete guide to get your CV Generator up and running in minutes!

---

## ⚡ Quick Start (3 Steps)

### Step 1: Setup (2 minutes)
```powershell
# Windows
.\setup.ps1

# Linux/Mac
chmod +x setup.sh && ./setup.sh
```

### Step 2: Start Backend (30 seconds)
```bash
npm run dev
# Should show: "Server is running on port 5000"
```

### Step 3: Start Frontend (30 seconds)
```bash
# Open new terminal
cd frontend
npm start
# Browser opens automatically at http://localhost:3000
```

✅ **Done!** Your CV Generator is running!

---

## 📋 Detailed Setup Guide

### Prerequisites Check

Before starting, verify you have:

1. **Node.js (version 18 or higher)**
   ```bash
   node --version
   # Should show: v18.x.x or higher
   ```
   
   Don't have it? Download from: https://nodejs.org/

2. **npm (comes with Node.js)**
   ```bash
   npm --version
   # Should show: 9.x.x or higher
   ```

3. **Git (for deployment)**
   ```bash
   git --version
   # Should show git version
   ```
   
   Don't have it? Download from: https://git-scm.com/

4. **Text Editor (recommended: VS Code)**
   Download from: https://code.visualstudio.com/

### Step-by-Step Installation

#### Option 1: Automatic Setup (RECOMMENDED) ⭐

**Windows:**
1. Open PowerShell in project directory
2. Run:
   ```powershell
   .\setup.ps1
   ```
3. Wait for installation to complete
4. Check for success messages ✅

**Linux/Mac:**
1. Open Terminal in project directory
2. Run:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
3. Wait for installation to complete
4. Check for success messages ✅

#### Option 2: Manual Setup

**Backend Setup:**
1. Open terminal in project directory
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Wait for completion (may take 1-2 minutes)
4. Verify `node_modules` folder was created

**Frontend Setup:**
1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Wait for completion (may take 1-2 minutes)
4. Return to root:
   ```bash
   cd ..
   ```

**Create Directories:**
```bash
mkdir uploads
mkdir generated
```

### Verify Installation

Check that these exist:
- ✅ `node_modules/` folder (backend)
- ✅ `frontend/node_modules/` folder
- ✅ `uploads/` folder
- ✅ `generated/` folder
- ✅ `.env` file
- ✅ `frontend/.env` file

---

## 🏃 Running the Application

### Development Mode (Daily Use)

**Terminal 1 - Backend:**
```bash
npm run dev
```

Expected output:
```
Server is running on port 5000
Environment: development
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
You can now view cv-generator-frontend in the browser.

  Local:            http://localhost:3000
```

### Accessing the Application

- **Frontend (User Interface):** http://localhost:3000
- **Backend (API Server):** http://localhost:5000
- **Health Check:** http://localhost:5000/health

### Stopping the Application

Press `Ctrl+C` in both terminals to stop the servers.

---

## 🧪 First Test

### 1. Access the Application
Open your browser and go to: http://localhost:3000

You should see:
- Title: "Professional CV Generator"
- A comprehensive form
- Multiple sections

### 2. Fill the Form

Use this quick test data:

**Personal Information:**
- Name: `John Smith`
- Email: `john.smith@email.com`
- Phone: `1234567890`
- Date of Birth: `1995-06-15`
- Age: `29`
- Gender: `Male`

**Education - SSC:**
- GPA: `5.00`
- School: `Test School`
- Board: `Dhaka`

**Education - HSC:**
- GPA: `5.00`
- College: `Test College`
- Board: `Dhaka`

**Education - Graduation:**
- Subject: `Computer Science`
- CGPA: `3.75`
- Institution: `Test University`

**Skills:**
```
JavaScript, React, Node.js
```

### 3. Generate CVs

1. Click "🚀 Generate CVs" button
2. Wait 3-5 seconds
3. You should see 10 CV templates displayed!

### 4. Download a CV

1. Choose any template
2. Click "⬇️ Download" under PDF or DOCX
3. File downloads to your computer
4. Open and verify your CV looks good!

✅ **Success!** Your CV Generator is working perfectly!

---

## 🔧 Troubleshooting Setup

### Problem: npm install fails

**Solution 1: Clear cache**
```bash
npm cache clean --force
npm install
```

**Solution 2: Delete and reinstall**
```bash
# Windows
rmdir /s /q node_modules

# Linux/Mac
rm -rf node_modules

npm install
```

### Problem: Port 5000 already in use

**Solution: Change port**
1. Open `.env` file
2. Change `PORT=5000` to `PORT=5001`
3. Update `frontend/.env`: `REACT_APP_API_URL=http://localhost:5001`
4. Restart servers

### Problem: Frontend won't start

**Solution 1: Install dependencies**
```bash
cd frontend
npm install
npm start
```

**Solution 2: Clear React cache**
```bash
cd frontend
rm -rf node_modules
rm -rf build
npm install
npm start
```

### Problem: Can't connect to backend

**Checklist:**
- [ ] Is backend running? (Terminal 1 should show "Server is running")
- [ ] Check http://localhost:5000/health in browser
- [ ] Verify `.env` has `PORT=5000`
- [ ] Verify `frontend/.env` has `REACT_APP_API_URL=http://localhost:5000`

### Problem: Setup script won't run

**Windows:**
```powershell
# Enable scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run setup
.\setup.ps1
```

**Linux/Mac:**
```bash
# Make executable
chmod +x setup.sh

# Run setup
./setup.sh
```

---

## 📚 Next Steps

### After Successful Setup

1. **Explore the Application**
   - Try different form fields
   - Upload a photo
   - Generate multiple CVs
   - Compare templates

2. **Read Documentation**
   - [README.md](README.md) - Overview
   - [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Commands
   - [TEST_DATA.md](TEST_DATA.md) - More test data

3. **Customize**
   - Change colors in templates
   - Modify form fields
   - Add new features

4. **Deploy**
   - Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
   - Deploy to Render.com
   - Share with the world!

---

## ✅ Verification Checklist

Before you start development, ensure:

- [ ] Node.js installed (version 18+)
- [ ] npm installed
- [ ] All dependencies installed (`node_modules` exists)
- [ ] Backend starts without errors
- [ ] Frontend starts and opens in browser
- [ ] Can access http://localhost:3000
- [ ] Can generate test CV successfully
- [ ] Can download PDF
- [ ] Can download DOCX

---

## 🎯 Common Workflows

### Daily Development

**Start:**
```bash
# Terminal 1
npm run dev

# Terminal 2
cd frontend && npm start
```

**Make changes:**
1. Edit files
2. Save
3. Auto-reload (no restart needed)

**Stop:**
- Press Ctrl+C in both terminals

### Adding Features

1. Edit appropriate files
2. Test locally
3. Check for errors in browser console (F12)
4. Verify functionality works
5. Commit to Git

### Testing Changes

1. Fill form with test data
2. Generate CVs
3. Download and verify
4. Test on different screen sizes
5. Check browser console for errors

---

## 💡 Pro Tips

### Development Tips

1. **Use two terminal windows/tabs**
   - One for backend
   - One for frontend

2. **Keep browser console open (F12)**
   - See errors immediately
   - Debug issues faster

3. **Use nodemon for backend**
   - Auto-restarts on file changes
   - Included in `npm run dev`

4. **Test frequently**
   - Generate CVs after each change
   - Verify both PDF and DOCX

5. **Use Git**
   - Commit working code
   - Easy to revert if needed

### Productivity Tips

1. **Bookmark local URLs**
   - http://localhost:3000
   - http://localhost:5000/health

2. **Use VS Code extensions**
   - ES7 React snippets
   - Prettier code formatter
   - ESLint

3. **Keep test data handy**
   - Use [TEST_DATA.md](TEST_DATA.md)
   - Save your own test profiles

---

## 📞 Getting Help

### If you're stuck:

1. **Check Troubleshooting Guide**
   [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

2. **Search error message**
   Copy exact error and search online

3. **Check documentation**
   Use [INDEX.md](INDEX.md) to find relevant docs

4. **Verify installation**
   Use [CHECKLIST.md](CHECKLIST.md)

### Providing error information:

When asking for help, include:
- Error message (full text)
- What you were trying to do
- Node.js version (`node --version`)
- Operating system
- Steps to reproduce

---

## 🎉 Success!

If you've reached this point and everything is working:

✅ **Congratulations!** You've successfully set up the CV Generator!

**You can now:**
- Generate professional CVs
- Customize templates
- Add new features
- Deploy to production
- Share with users

---

## 📖 Further Reading

| Document | Purpose |
|----------|---------|
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Daily commands |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Architecture details |
| [VISUAL_GUIDE.md](VISUAL_GUIDE.md) | System diagrams |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Deploy to Render.com |

---

**Ready to create amazing CVs?** Start generating! 🚀
