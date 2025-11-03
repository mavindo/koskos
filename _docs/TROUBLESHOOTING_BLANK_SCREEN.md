# 🚨 Troubleshooting: Blank White Screen Setelah Menjalankan minimal_fix.sh

## 🔍 Kemungkinan Penyebab

1. **Nginx config syntax error**
2. **Wrong file path di config**
3. **Permission issues**
4. **Nginx failed to reload**
5. **Base href mismatch**

## ⚡ Quick Fix

### Step 1: Emergency Rollback

```bash
# Download rollback script
cd /var/www/kosandcost.com/_docs/

# Run emergency rollback
sudo bash emergency_rollback.sh
```

### Step 2: Check Nginx Error Logs

```bash
# Check error log
sudo tail -50 /var/log/nginx/error.log

# Check access log
sudo tail -50 /var/log/nginx/access.log
```

### Step 3: Verify Files

```bash
# Check if index.html exists
ls -la /var/www/kosandcost.com/index.html

# Check directory structure
ls -la /var/www/kosandcost.com/

# Check permissions
stat /var/www/kosandcost.com/index.html
```

## 🔧 Manual Fix

### Option 1: Restore Default Nginx Config

```bash
# Create minimal working config
sudo nano /etc/nginx/sites-available/kosandcost.com
```

Paste ini:
```nginx
server {
    listen 80;
    server_name kosandcost.com www.kosandcost.com;
    
    root /var/www/kosandcost.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Save dan test:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Option 2: Check Root Path

Kemungkinan path di config salah. Edit config:

```bash
sudo nano /etc/nginx/sites-available/kosandcost.com
```

Pastikan `root` path benar:
```nginx
# Salah (jika ada /build/web)
root /var/www/kosandcost.com/build/web;

# Benar
root /var/www/kosandcost.com;
```

### Option 3: Fix Permissions

```bash
# Set correct ownership
sudo chown -R www-data:www-data /var/www/kosandcost.com

# Set correct permissions
sudo chmod -R 755 /var/www/kosandcost.com

# Verify
ls -la /var/www/kosandcost.com/
```

### Option 4: Check Nginx Service

```bash
# Check if nginx is running
sudo systemctl status nginx

# If stopped, start it
sudo systemctl start nginx

# If failed, check why
sudo journalctl -xe -u nginx
```

## 🧪 Testing Commands

### Test 1: Local Access
```bash
# From server
curl -I http://localhost
curl http://localhost | head -20
```

Expected output:
```
HTTP/1.1 200 OK
Content-Type: text/html
```

### Test 2: Check HTML Content
```bash
# View first lines of index.html
head -20 /var/www/kosandcost.com/index.html
```

Should see:
```html
<!DOCTYPE html>
<html>
<head>
...
```

### Test 3: Check Base Href
```bash
# Check base href in index.html
grep "base href" /var/www/kosandcost.com/index.html
```

Should return:
```html
<base href="/">
```

NOT:
```html
<base href="/koskos/">  <!-- Wrong! -->
```

## 🔄 Complete Recovery Procedure

### 1. Stop Everything
```bash
sudo systemctl stop nginx
```

### 2. Backup Current Config
```bash
sudo cp /etc/nginx/sites-available/kosandcost.com /etc/nginx/sites-available/kosandcost.com.broken
```

### 3. Create Fresh Config
```bash
sudo cat > /etc/nginx/sites-available/kosandcost.com << 'EOF'
server {
    listen 80;
    server_name kosandcost.com www.kosandcost.com;
    
    root /var/www/kosandcost.com;
    index index.html index.htm;

    # Enable logging for debugging
    access_log /var/log/nginx/kosandcost.access.log;
    error_log /var/log/nginx/kosandcost.error.log debug;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Serve static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json)$ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }
}
EOF
```

### 4. Enable Site
```bash
sudo ln -sf /etc/nginx/sites-available/kosandcost.com /etc/nginx/sites-enabled/
```

### 5. Test & Start
```bash
# Test config
sudo nginx -t

# Start nginx
sudo systemctl start nginx

# Check status
sudo systemctl status nginx
```

### 6. Verify Access
```bash
# Test from server
curl -I http://localhost

# Test from browser
# Open: http://your-server-ip/
```

## 🚨 Common Errors & Solutions

### Error 1: "Permission denied"
```bash
# Check SELinux (if enabled)
sudo setenforce 0  # Temporary disable

# Fix permissions
sudo chown -R www-data:www-data /var/www/kosandcost.com
sudo chmod -R 755 /var/www/kosandcost.com
```

### Error 2: "404 Not Found"
```bash
# Check root path
sudo nginx -T | grep "root"

# Should be: root /var/www/kosandcost.com;
```

### Error 3: "Connection refused"
```bash
# Check if nginx is running
sudo systemctl status nginx

# Check if port 80 is open
sudo netstat -tulpn | grep :80

# Check firewall
sudo ufw status
sudo ufw allow 80/tcp
```

### Error 4: "Blank white screen but 200 OK"
```bash
# Check browser console (F12)
# Look for JavaScript errors

# Check if main.dart.js exists
ls -la /var/www/kosandcost.com/main.dart.js

# Check if flutter_bootstrap.js exists
ls -la /var/www/kosandcost.com/flutter_bootstrap.js
```

### Error 5: "Base href mismatch"
```bash
# Check current base href
grep "base href" /var/www/kosandcost.com/index.html

# If wrong, rebuild with correct base href
# On local machine:
flutter build web --release  # For root domain
# Or
flutter build web --base-href=/subdirectory/ --release

# Then re-upload
```

## 📋 Diagnostic Commands

### Full System Check
```bash
# 1. Check nginx config
sudo nginx -t

# 2. Check nginx is running
sudo systemctl status nginx

# 3. Check listening ports
sudo netstat -tulpn | grep nginx

# 4. Check file exists
ls -la /var/www/kosandcost.com/index.html

# 5. Check permissions
stat /var/www/kosandcost.com/index.html

# 6. Check logs
sudo tail -20 /var/log/nginx/error.log

# 7. Test HTTP
curl -I http://localhost

# 8. Check HTML content
curl http://localhost | head -50
```

### Get All Info at Once
```bash
echo "=== Nginx Config Test ===" && \
sudo nginx -t && \
echo "" && \
echo "=== Nginx Status ===" && \
sudo systemctl status nginx --no-pager && \
echo "" && \
echo "=== File Check ===" && \
ls -lah /var/www/kosandcost.com/ && \
echo "" && \
echo "=== Error Log (last 10) ===" && \
sudo tail -10 /var/log/nginx/error.log
```

## 🔗 Next Steps

After recovery:
1. ✅ Site accessible
2. ✅ Routes working (test /home, /hotels, etc.)
3. ✅ No console errors
4. ✅ Assets loading

If still having issues:
- Check [NGINX_404_FIX.md](NGINX_404_FIX.md) for detailed guide
- Run emergency_rollback.sh
- Contact support with output from diagnostic commands

## 📞 Getting Help

When asking for help, provide:
```bash
# Run this and share output
sudo bash -c "
echo '=== Nginx Test ===' && \
nginx -t && \
echo '' && \
echo '=== Nginx Config ===' && \
nginx -T | grep -A 20 'kosandcost.com' && \
echo '' && \
echo '=== Files ===' && \
ls -lah /var/www/kosandcost.com/ && \
echo '' && \
echo '=== Error Log ===' && \
tail -20 /var/log/nginx/error.log
"
```

---

**Created**: November 3, 2025  
**For**: Emergency recovery after minimal_fix.sh issues
