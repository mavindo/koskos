# Kos and Cost - Server Configuration & Documentation

## 📁 Files in this Directory

### Configuration Files
- **nginx-kosandcost.conf** - Complete Nginx configuration for production
- **minimal_fix.sh** - Quick fix script for 404 errors
- **deploy.sh** - Full deployment automation script
- **.htaccess** - Apache configuration (alternative to Nginx)

### Documentation
- **NGINX_404_FIX.md** - Complete guide to fix 404 routing errors
- **QUICK_FIX.md** - Quick reference for fixing 404 errors
- **WEB_LOADING_OPTIMIZATION.md** - Loading screen optimization guide

## 🚀 Quick Start

### Fix 404 Error (Most Common Issue)

If routes like `/home`, `/hotels` don't work when refreshed:

```bash
# Run this on server
sudo bash minimal_fix.sh
```

Or manually add to your nginx config:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Full Deployment

```bash
# Copy files to server
scp -r . user@server:/var/www/kosandcost.com/

# Run deployment script
sudo bash _docs/deploy.sh
```

## 📞 Support

For detailed instructions, see the documentation files above.

Generated: $(date)
