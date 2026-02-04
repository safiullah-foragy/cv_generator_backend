# CV Generator - Quick Setup Script
# Run this script to set up both backend and frontend

Write-Host "🚀 CV Generator Setup Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
Write-Host ""

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
Write-Host ""

# Create necessary directories
Write-Host "📁 Creating necessary directories..." -ForegroundColor Yellow
if (!(Test-Path -Path "uploads")) {
    New-Item -ItemType Directory -Path "uploads" | Out-Null
    Write-Host "✅ Created uploads directory" -ForegroundColor Green
}
if (!(Test-Path -Path "generated")) {
    New-Item -ItemType Directory -Path "generated" | Out-Null
    Write-Host "✅ Created generated directory" -ForegroundColor Green
}
Write-Host ""

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location -Path "frontend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    Set-Location -Path ".."
    exit 1
}
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
Set-Location -Path ".."
Write-Host ""

# Check .env file
Write-Host "🔍 Checking configuration files..." -ForegroundColor Yellow
if (!(Test-Path -Path ".env")) {
    Write-Host "⚠️  .env file not found. Creating default .env file..." -ForegroundColor Yellow
    @"
PORT=5000
NODE_ENV=development
"@ | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✅ Created .env file" -ForegroundColor Green
}

if (!(Test-Path -Path "frontend\.env")) {
    Write-Host "⚠️  Frontend .env file not found. Creating default frontend .env file..." -ForegroundColor Yellow
    @"
REACT_APP_API_URL=http://localhost:5000
"@ | Out-File -FilePath "frontend\.env" -Encoding utf8
    Write-Host "✅ Created frontend .env file" -ForegroundColor Green
}
Write-Host ""

Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Start the backend (in this directory):" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Start the frontend (in a new terminal):" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Yellow
Write-Host "   npm start" -ForegroundColor Yellow
Write-Host ""
Write-Host "The backend will run on: http://localhost:5000" -ForegroundColor White
Write-Host "The frontend will run on: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📖 For deployment instructions, see DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
