# Quick Fix for 404 Error on kosandcost.com

## The Problem
Routes like `/home`, `/hotels`, etc. return 404 when accessed directly or refreshed.

## The Solution
Add this to your nginx config:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## Copy-Paste Commands (Run on Server)

```bash
# 1. Create nginx config
sudo nano /etc/nginx/sites-available/kosandcost.com

# Paste the configuration from nginx-kosandcost.conf
# Save with Ctrl+X, then Y, then Enter

# 2. Enable the site
sudo ln -sf /etc/nginx/sites-available/kosandcost.com /etc/nginx/sites-enabled/

# 3. Test configuration
sudo nginx -t

# 4. Reload nginx
sudo systemctl reload nginx

# 5. Test it works
curl -I https://kosandcost.com/home
# Should return 200 OK, not 404
```

## Quick Test
After running commands above, open browser and try:
- https://kosandcost.com/home (should work!)
- Press F5 to refresh (should still work!)

## Files Created
1. `nginx-kosandcost.conf` - Full nginx configuration
2. `deploy.sh` - Automated deployment script
3. `NGINX_404_FIX.md` - Complete documentation

## Need Help?
Run: `sudo tail -f /var/log/nginx/error.log` to see errors
