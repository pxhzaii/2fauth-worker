#!/bin/bash
# Cloudflare Workers deployment build script
# Install dependencies, build frontend, then deploy

set -e

echo "=== Installing backend dependencies ==="
npm install --legacy-peer-deps --prefix backend

echo "=== Installing frontend dependencies ==="
npm install --legacy-peer-deps --prefix frontend

echo "=== Building frontend ==="
npm run build --prefix frontend

echo "=== Deploying to Cloudflare Workers ==="
npx wrangler deploy
