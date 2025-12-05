# Build script for Render deployment
#!/bin/bash

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
npm run build
cd ..

# Install frontend dependencies and build
cd frontend
npm install
npm run build
cd ..

echo "Build completed successfully!"
