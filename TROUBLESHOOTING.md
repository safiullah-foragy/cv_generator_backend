# 🔧 Troubleshooting Guide

Common issues and their solutions for the CV Generator application.

## Table of Contents
- [Installation Issues](#installation-issues)
- [Backend Issues](#backend-issues)
- [Frontend Issues](#frontend-issues)
- [File Upload Issues](#file-upload-issues)
- [CV Generation Issues](#cv-generation-issues)
- [Deployment Issues](#deployment-issues)

---

## Installation Issues

### Problem: npm install fails

**Symptoms:**
- Errors during `npm install`
- Missing packages
- Permission errors

**Solutions:**

1. **Check Node.js version:**
   ```bash
   node --version
   ```
   Required: >= 18.0.0

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Delete node_modules and reinstall:**
   ```bash
   # Windows
   rmdir /s /q node_modules
   
   # Linux/Mac
   rm -rf node_modules
   
   npm install
   ```

4. **Use npm with elevated permissions (if needed):**
   ```bash
   # Windows (Run PowerShell as Administrator)
   npm install
   
   # Linux/Mac
   sudo npm install
   ```

5. **Try with different registry:**
   ```bash
   npm install --registry=https://registry.npmjs.org/
   ```

### Problem: Setup script won't run

**Windows:**
```powershell
# Enable script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then run
.\setup.ps1
```

**Linux/Mac:**
```bash
# Make script executable
chmod +x setup.sh

# Then run
./setup.sh
```

---

## Backend Issues

### Problem: Port 5000 already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

1. **Change port in .env file:**
   ```
   PORT=5001
   ```

2. **Kill process using port 5000:**
   
   **Windows:**
   ```powershell
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```
   
   **Linux/Mac:**
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

### Problem: Backend won't start

**Symptoms:**
- Server crashes on startup
- Module not found errors

**Solutions:**

1. **Check if all dependencies are installed:**
   ```bash
   npm install
   ```

2. **Verify .env file exists:**
   ```
   PORT=5000
   NODE_ENV=development
   ```

3. **Check for syntax errors:**
   ```bash
   node server.js
   ```
   Look at the error message for specific file/line

4. **Ensure directories exist:**
   ```bash
   mkdir uploads
   mkdir generated
   ```

### Problem: Module not found errors

**Symptoms:**
```
Error: Cannot find module 'express'
```

**Solutions:**

1. **Install missing module:**
   ```bash
   npm install express
   ```

2. **Reinstall all dependencies:**
   ```bash
   rm -rf node_modules
   npm install
   ```

---

## Frontend Issues

### Problem: Frontend won't start

**Symptoms:**
- React app doesn't load
- Webpack errors
- Blank page

**Solutions:**

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   npm install
   ```

2. **Clear React cache:**
   ```bash
   rm -rf node_modules
   rm -rf build
   npm install
   npm start
   ```

3. **Check for port conflicts:**
   React typically uses port 3000. If occupied:
   ```bash
   # Set different port
   PORT=3001 npm start
   ```

### Problem: Cannot connect to backend

**Symptoms:**
- API calls fail
- CORS errors
- Network errors in console

**Solutions:**

1. **Verify backend is running:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Check proxy setting in frontend/package.json:**
   ```json
   {
     "proxy": "http://localhost:5000"
   }
   ```

3. **Verify .env file in frontend:**
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Check CORS configuration in server.js:**
   ```javascript
   app.use(cors());
   ```

### Problem: Page is blank

**Symptoms:**
- White screen
- No errors in console

**Solutions:**

1. **Check browser console for errors:**
   Press F12 and look for JavaScript errors

2. **Verify React is properly imported:**
   Check `frontend/src/index.js`

3. **Clear browser cache:**
   Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

4. **Try incognito/private mode**

---

## File Upload Issues

### Problem: Photo upload fails

**Symptoms:**
- "File upload failed" error
- Image doesn't appear
- Error 400 or 500

**Solutions:**

1. **Check file size:**
   Maximum: 5MB
   Compress image if too large

2. **Verify file format:**
   Allowed: JPEG, JPG, PNG
   Convert other formats

3. **Ensure uploads directory exists:**
   ```bash
   mkdir uploads
   ```

4. **Check file permissions:**
   
   **Linux/Mac:**
   ```bash
   chmod 755 uploads/
   ```

5. **Check multer configuration:**
   Verify `middleware/uploadMiddleware.js` is correct

### Problem: Large file uploads timing out

**Solutions:**

1. **Increase timeout in axios:**
   ```javascript
   axios.post('/api/generate-cv', formData, {
     timeout: 60000 // 60 seconds
   });
   ```

2. **Compress images before upload**

3. **Add file size validation on frontend**

---

## CV Generation Issues

### Problem: PDFs not generating

**Symptoms:**
- Error during CV generation
- Missing PDF files
- Corrupted PDFs

**Solutions:**

1. **Verify pdfkit is installed:**
   ```bash
   npm list pdfkit
   npm install pdfkit
   ```

2. **Check generated directory exists:**
   ```bash
   mkdir generated
   ```

3. **Check directory permissions:**
   
   **Linux/Mac:**
   ```bash
   chmod 755 generated/
   ```

4. **Verify all CV data is provided:**
   Check required fields are not empty

5. **Check console for specific errors:**
   ```bash
   npm run dev
   ```

### Problem: DOCX files corrupted

**Symptoms:**
- Can't open DOCX files
- "File is corrupted" error

**Solutions:**

1. **Verify docx package version:**
   ```bash
   npm list docx
   npm install docx@latest
   ```

2. **Check if file write completed:**
   Files might be partially written

3. **Try downloading again:**
   Previous download might have failed

### Problem: Some templates missing

**Symptoms:**
- Less than 10 CVs generated
- Specific templates fail

**Solutions:**

1. **Check loop in controller:**
   Verify loop runs 1 to 10

2. **Check template switch statements:**
   Ensure all 10 cases exist

3. **Look for errors in specific template:**
   Check console for template-specific errors

---

## Deployment Issues (Render.com)

### Problem: Build fails on Render

**Symptoms:**
- Deployment fails during build
- npm install errors
- Missing dependencies

**Solutions:**

1. **Verify package.json is committed:**
   ```bash
   git add package.json
   git commit -m "Add package.json"
   git push
   ```

2. **Check Node version in Render:**
   Add to package.json:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

3. **Check build logs:**
   Look at detailed logs in Render dashboard

4. **Verify all dependencies are in dependencies, not devDependencies**

### Problem: App crashes after deployment

**Symptoms:**
- Build succeeds but app won't run
- Health check fails
- 503 errors

**Solutions:**

1. **Check start command:**
   Should be: `npm start` or `node server.js`

2. **Verify environment variables:**
   - PORT should be set (Render provides this)
   - NODE_ENV should be "production"

3. **Check logs in Render dashboard:**
   Look for runtime errors

4. **Ensure PORT is read from environment:**
   ```javascript
   const PORT = process.env.PORT || 5000;
   ```

### Problem: File uploads fail in production

**Solutions:**

1. **Use persistent disk (if available)**
   Render's free tier uses ephemeral storage

2. **Consider cloud storage:**
   Implement AWS S3 or Cloudinary for production

3. **Check file permissions in Render**

### Problem: Frontend can't reach backend

**Symptoms:**
- CORS errors in production
- API calls fail
- 404 errors

**Solutions:**

1. **Update REACT_APP_API_URL:**
   Set to production backend URL

2. **Configure CORS properly:**
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL || '*'
   }));
   ```

3. **Use environment variables:**
   Add FRONTEND_URL in Render dashboard

---

## Performance Issues

### Problem: Slow CV generation

**Solutions:**

1. **Generate templates in parallel:**
   Use Promise.all() instead of sequential generation

2. **Optimize PDF generation:**
   Reduce image quality
   Simplify templates

3. **Add caching if possible**

### Problem: High memory usage

**Solutions:**

1. **Clean up generated files:**
   Implement automatic cleanup after 24 hours

2. **Limit concurrent generations:**
   Add queue system

3. **Optimize templates:**
   Reduce complexity

---

## Browser-Specific Issues

### Problem: Works in Chrome but not in other browsers

**Solutions:**

1. **Check browser console for errors**

2. **Test with polyfills if needed**

3. **Verify CSS compatibility**

4. **Check JavaScript features used:**
   Ensure ES6+ features are transpiled

---

## Data Issues

### Problem: Form validation not working

**Solutions:**

1. **Check required fields in form:**
   Verify all required fields have `required` attribute

2. **Check validation logic:**
   Review `validateForm()` function

3. **Check error state:**
   Verify errors are displayed

### Problem: Data not saving

**Solutions:**

1. **Check form submission:**
   Verify preventDefault() is called

2. **Check FormData construction:**
   Verify all fields are appended

3. **Check network tab:**
   See what data is being sent

---

## Quick Diagnostic Commands

**Check if backend is running:**
```bash
curl http://localhost:5000/health
```

**Check if frontend is running:**
```bash
curl http://localhost:3000
```

**Check Node version:**
```bash
node --version
```

**Check npm version:**
```bash
npm --version
```

**List all running processes on port 5000:**

**Windows:**
```powershell
netstat -ano | findstr :5000
```

**Linux/Mac:**
```bash
lsof -i :5000
```

**Check installed packages:**
```bash
npm list --depth=0
```

---

## Getting Help

If your issue isn't listed here:

1. **Check the logs:**
   - Backend: Terminal running npm run dev
   - Frontend: Browser console (F12)
   - Render: Deployment logs

2. **Search for error message:**
   Copy exact error and search online

3. **Check documentation:**
   - [README.md](README.md)
   - [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
   - [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

4. **Create an issue:**
   Provide:
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version, etc.)
   - Screenshots if applicable

---

## Prevention Tips

✅ **Always commit package.json and package-lock.json**
✅ **Use version control (Git)**
✅ **Test locally before deploying**
✅ **Keep dependencies updated**
✅ **Read error messages carefully**
✅ **Check logs regularly**
✅ **Use environment variables for configuration**
✅ **Test with sample data first**

---

**Still having issues?** Double-check the error message and search for it specifically. Most errors have solutions documented online.
