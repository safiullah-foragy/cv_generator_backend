#!/bin/bash

# CV Generator - Quick Setup Script (Linux/Mac)
# Run this script to set up both backend and frontend

echo "🚀 CV Generator Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js version: $(node --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p uploads
mkdir -p generated
echo "✅ Created necessary directories"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    cd ..
    exit 1
fi
echo "✅ Frontend dependencies installed"
cd ..
echo ""

# Check .env file
echo "🔍 Checking configuration files..."
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating default .env file..."
    cat > .env << EOF
PORT=5000
NODE_ENV=development
EOF
    echo "✅ Created .env file"
fi

if [ ! -f frontend/.env ]; then
    echo "⚠️  Frontend .env file not found. Creating default frontend .env file..."
    cat > frontend/.env << EOF
REACT_APP_API_URL=http://localhost:5000
EOF
    echo "✅ Created frontend .env file"
fi
echo ""

echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "To start the application:"
echo ""
echo "1. Start the backend (in this directory):"
echo "   npm run dev"
echo ""
echo "2. Start the frontend (in a new terminal):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "The backend will run on: http://localhost:5000"
echo "The frontend will run on: http://localhost:3000"
echo ""
echo "📖 For deployment instructions, see DEPLOYMENT_GUIDE.md"
echo ""
