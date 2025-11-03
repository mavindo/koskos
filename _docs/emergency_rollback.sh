#!/bin/bash
# Emergency rollback script untuk restore nginx config
# Run: sudo bash emergency_rollback.sh

echo "🚨 Emergency Rollback - Nginx Configuration"
echo "==========================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Please run as root (use sudo)${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Step 1: Checking backup${NC}"
if [ -f /etc/nginx/sites-available/kosandcost.com.backup ]; then
    echo -e "${GREEN}✅ Backup found${NC}"
else
    echo -e "${RED}❌ No backup found${NC}"
    echo "Creating emergency default config..."
fi

echo ""
echo -e "${YELLOW}📋 Step 2: Restoring configuration${NC}"

# If backup exists, restore it
if [ -f /etc/nginx/sites-available/kosandcost.com.backup ]; then
    cp /etc/nginx/sites-available/kosandcost.com.backup /etc/nginx/sites-available/kosandcost.com
    echo -e "${GREEN}✅ Backup restored${NC}"
else
    # Create minimal working config
    cat > /etc/nginx/sites-available/kosandcost.com << 'EOF'
server {
    listen 80;
    server_name kosandcost.com www.kosandcost.com;
    
    root /var/www/kosandcost.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
    echo -e "${GREEN}✅ Emergency config created${NC}"
fi

echo ""
echo -e "${YELLOW}📋 Step 3: Testing configuration${NC}"
nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Configuration is valid${NC}"
else
    echo -e "${RED}❌ Configuration test failed!${NC}"
    echo "Removing bad config..."
    rm /etc/nginx/sites-enabled/kosandcost.com
    systemctl reload nginx
    echo -e "${YELLOW}⚠️  Site disabled. Check logs: sudo tail -f /var/log/nginx/error.log${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📋 Step 4: Reloading Nginx${NC}"
systemctl reload nginx

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx reloaded successfully${NC}"
else
    echo -e "${RED}❌ Failed to reload Nginx${NC}"
    systemctl status nginx
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Recovery Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Test site: curl -I http://localhost"
echo "2. Check logs: sudo tail -f /var/log/nginx/error.log"
echo "3. If still blank, check: ls -la /var/www/kosandcost.com/"
