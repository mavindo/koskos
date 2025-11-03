#!/bin/bash
# Deployment script for Kos and Cost Flutter Web App

echo "🚀 Kos and Cost - Deployment Script"
echo "===================================="
echo ""

# Configuration
DOMAIN="kosandcost.com"
WEB_ROOT="/var/www/kosandcost.com"
NGINX_CONF="/etc/nginx/sites-available/kosandcost.com"
BUILD_DIR="build/web"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Please run as root (use sudo)${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Step 1: Building Flutter Web App${NC}"
flutter build web --release
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Flutter build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build successful${NC}"
echo ""

echo -e "${YELLOW}📁 Step 2: Creating web root directory${NC}"
mkdir -p $WEB_ROOT
echo -e "${GREEN}✅ Directory created${NC}"
echo ""

echo -e "${YELLOW}📋 Step 3: Copying build files${NC}"
rm -rf $WEB_ROOT/*
cp -r $BUILD_DIR/* $WEB_ROOT/
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to copy files${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Files copied${NC}"
echo ""

echo -e "${YELLOW}🔒 Step 4: Setting permissions${NC}"
chown -R www-data:www-data $WEB_ROOT
chmod -R 755 $WEB_ROOT
echo -e "${GREEN}✅ Permissions set${NC}"
echo ""

echo -e "${YELLOW}⚙️  Step 5: Configuring Nginx${NC}"
if [ ! -f "$NGINX_CONF" ]; then
    echo "Creating nginx configuration..."
    cp nginx-kosandcost.conf $NGINX_CONF
    ln -sf $NGINX_CONF /etc/nginx/sites-enabled/
else
    echo "Nginx config already exists, skipping..."
fi
echo -e "${GREEN}✅ Nginx configured${NC}"
echo ""

echo -e "${YELLOW}🔍 Step 6: Testing Nginx configuration${NC}"
nginx -t
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Nginx configuration test failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
echo ""

echo -e "${YELLOW}🔄 Step 7: Reloading Nginx${NC}"
systemctl reload nginx
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to reload Nginx${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Nginx reloaded${NC}"
echo ""

echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo "Your app is now available at:"
echo -e "${GREEN}https://$DOMAIN${NC}"
echo ""
echo "Next steps:"
echo "1. Test the app: curl -I https://$DOMAIN"
echo "2. Test routing: curl -I https://$DOMAIN/home"
echo "3. Check logs: tail -f /var/log/nginx/access.log"
