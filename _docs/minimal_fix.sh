#!/bin/bash
# Minimal fix untuk 404 error di kosandcost.com
# Run: sudo bash minimal_fix.sh

echo "🔧 Fixing 404 Error for kosandcost.com"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Please run as root (use sudo)${NC}"
    exit 1
fi

# Safety check: verify web root exists
if [ ! -d /var/www/kosandcost.com ]; then
    echo -e "${RED}❌ Web root not found: /var/www/kosandcost.com${NC}"
    echo "Please upload your build files first!"
    exit 1
fi

# Safety check: verify index.html exists
if [ ! -f /var/www/kosandcost.com/index.html ]; then
    echo -e "${RED}❌ index.html not found in /var/www/kosandcost.com/${NC}"
    echo "Please upload your Flutter web build files!"
    exit 1
fi

# Backup existing config if exists
if [ -f /etc/nginx/sites-available/kosandcost.com ]; then
    echo "📦 Backing up existing config..."
    cp /etc/nginx/sites-available/kosandcost.com /etc/nginx/sites-available/kosandcost.com.backup
    echo -e "${GREEN}✅ Backup saved to: /etc/nginx/sites-available/kosandcost.com.backup${NC}"
fi

# Create minimal working config
echo "📝 Creating nginx config..."
cat > /etc/nginx/sites-available/kosandcost.com << 'EOF'
server {
    listen 80;
    server_name kosandcost.com www.kosandcost.com;
    
    root /var/www/kosandcost.com;
    index index.html;

    # Logging for debugging
    access_log /var/log/nginx/kosandcost.access.log;
    error_log /var/log/nginx/kosandcost.error.log;

    # FIX: This line solves the 404 error for Flutter routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
EOF

echo -e "${GREEN}✅ Config created${NC}"

# Enable site
ln -sf /etc/nginx/sites-available/kosandcost.com /etc/nginx/sites-enabled/
echo -e "${GREEN}✅ Site enabled${NC}"

# Test config
echo "🧪 Testing nginx config..."
nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Config is valid${NC}"
    
    # Reload nginx
    echo "🔄 Reloading nginx..."
    systemctl reload nginx
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Nginx reloaded successfully${NC}"
        echo ""
        echo -e "${GREEN}🎉 Done! Test it:${NC}"
        echo "   curl -I http://kosandcost.com/"
        echo "   curl -I http://kosandcost.com/home"
        echo ""
        echo "If site is blank, run:"
        echo "   sudo bash emergency_rollback.sh"
    else
        echo -e "${RED}❌ Failed to reload nginx${NC}"
        echo "Restoring backup..."
        cp /etc/nginx/sites-available/kosandcost.com.backup /etc/nginx/sites-available/kosandcost.com
        systemctl reload nginx
        exit 1
    fi
else
    echo -e "${RED}❌ Config test failed! Check errors above.${NC}"
    echo "Restoring backup..."
    if [ -f /etc/nginx/sites-available/kosandcost.com.backup ]; then
        cp /etc/nginx/sites-available/kosandcost.com.backup /etc/nginx/sites-available/kosandcost.com
        echo "Backup restored"
    fi
    exit 1
fi
