#!/bin/bash

# Configuration
APP_NAME="nuxt3-demo"
BUILD_DIR=".output"
RELEASE_DIR="release"
ARCHIVE_NAME="release.tar.gz"
PORT=3000

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment process for ${APP_NAME}...${NC}"

# 1. Clean previous build
echo -e "${YELLOW}Cleaning previous build...${NC}"
rm -rf $BUILD_DIR $RELEASE_DIR $ARCHIVE_NAME

# 2. Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# 3. Build project
echo -e "${YELLOW}Building project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed! Aborting.${NC}"
    exit 1
fi

# 4. Create release package
echo -e "${YELLOW}Creating release package...${NC}"
mkdir -p $RELEASE_DIR
cp ecosystem.config.js $RELEASE_DIR/
cp package.json $RELEASE_DIR/
cp -r $BUILD_DIR $RELEASE_DIR/

# Compress for transfer (optional step for real deployment)
tar -czf $ARCHIVE_NAME -C $RELEASE_DIR .
echo -e "${GREEN}Release package created: ${ARCHIVE_NAME}${NC}"

# 5. Local Deployment Simulation (or actual run)
echo -e "${YELLOW}Do you want to run the built application locally? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then
    echo -e "${GREEN}Starting local server on port ${PORT}...${NC}"
    echo -e "${YELLOW}Press Ctrl+C to stop the server.${NC}"
    
    # Set environment variables for production mode
    export PORT=$PORT
    export NODE_ENV=production
    
    node $RELEASE_DIR/.output/server/index.mjs
else
    echo -e "${GREEN}Build complete. You can deploy ${ARCHIVE_NAME} to your server.${NC}"
    echo -e "${YELLOW}Example deployment commands:${NC}"
    echo "  scp ${ARCHIVE_NAME} user@your-server:/path/to/app/"
    echo "  ssh user@your-server 'cd /path/to/app && tar -xzf ${ARCHIVE_NAME} && pm2 restart ecosystem.config.js'"
fi
