#!/bin/bash

echo "🔄 Updating API URL for production..."

# Get the Vercel URL from user input
read -p "Enter your Vercel deployment URL (e.g., https://medicare-backend.vercel.app): " VERCEL_URL

# Update the API file
sed -i "s|https://medicare-backend-tau.vercel.app/api|$VERCEL_URL/api|g" "../frontend/src/services/api.js"

echo "✅ API URL updated to: $VERCEL_URL/api"
echo "🔄 Rebuild your React Native app: npx react-native run-android"