#!/bin/bash
# Minimal fix untuk 404 error di kosandcost.com
# Run: sudo bash minimal_fix.sh

echo "🔧 Fixing 404 Error for kosandcost.com"
echo ""

# Backup existing config if exists
if [ -f /etc/nginx/sites-available/kosandcost.com ]; then
    echo "📦 Backing up existing config..."
    cp /etc/nginx/sites-available/kosandcost.com /etc/nginx/sites-available/kosandcost.com.backup
fi

# Create minimal working config
cat > /etc/nginx/sites-available/kosandcost.com << 'EOF'
server {
    listen 80;
    server_name kosandcost.com www.kosandcost.com;
    
    root /var/www/kosandcost.com;
    index index.html;

    # FIX: This line solves the 404 error for Flutter routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
EOF

echo "✅ Config created"

# Enable site
ln -sf /etc/nginx/sites-available/kosandcost.com /etc/nginx/sites-enabled/
echo "✅ Site enabled"

# Test config
echo "🧪 Testing nginx config..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Config is valid"
    
    # Reload nginx
    echo "🔄 Reloading nginx..."
    systemctl reload nginx
    
    echo ""
    echo "🎉 Done! Test it:"
    echo "   curl -I https://kosandcost.com/home"
    echo ""
else
    echo "❌ Config test failed! Check errors above."
    exit 1
fi
