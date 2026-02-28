#!/bin/bash

# Default configuration
# You can override these with environment variables
# Example: APP_URL=https://my-site.com bash scripts/clear-cache.sh

TARGET_URL="${APP_URL:-http://localhost:4000}"
API_ENDPOINT="$TARGET_URL/api/cache/clear"
TARGET_PATH="${1:-docs}" # Default path to clear is 'docs'

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}Triggering cache clear for path: '${TARGET_PATH}' at ${TARGET_URL}...${NC}"

# Check if curl is installed
if ! command -v curl &> /dev/null; then
    echo -e "${RED}Error: curl is not installed.${NC}"
    exit 1
fi

# Execute request
response=$(curl -s -w "\n%{http_code}" -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "{\"path\": \"$TARGET_PATH\"}")

# Parse response
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}Success! Cache cleared.${NC}"
    echo -e "Response: $body"
else
    echo -e "${RED}Failed with HTTP status $http_code${NC}"
    echo -e "Response: $body"
    exit 1
fi
