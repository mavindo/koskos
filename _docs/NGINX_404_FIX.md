# 404 Error Fix - Kos and Cost Flutter Web App

## Masalah

Ketika mengakses route langsung seperti `https://kosandcost.com/home`, server mengembalikan **404 Not Found** karena:

1. Flutter Web adalah **Single Page Application (SPA)** dengan client-side routing
2. Nginx mencoba mencari file fisik `/home` yang tidak ada di server
3. Semua routes seharusnya di-handle oleh `index.html`

## Solusi

### 🔧 Konfigurasi Nginx yang Benar

File: `/etc/nginx/sites-available/kosandcost.com`

**Bagian paling penting:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Penjelasan:
- `$uri` - Coba file yang diminta
- `$uri/` - Coba sebagai directory
- `/index.html` - **Fallback ke index.html** (ini yang mengatasi 404!)

## 📝 Langkah-langkah Deploy

### Otomatis (Recommended)
```bash
# Di server production
sudo chmod +x deploy.sh
sudo ./deploy.sh
```

### Manual

#### 1. Copy konfigurasi nginx
```bash
sudo cp nginx-kosandcost.conf /etc/nginx/sites-available/kosandcost.com
sudo ln -sf /etc/nginx/sites-available/kosandcost.com /etc/nginx/sites-enabled/
```

#### 2. Test konfigurasi
```bash
sudo nginx -t
```

#### 3. Reload nginx
```bash
sudo systemctl reload nginx
```

#### 4. Upload build files
```bash
# Build di local
flutter build web --release

# Upload ke server (gunakan scp, rsync, atau FTP)
rsync -avz build/web/ user@kosandcost.com:/var/www/kosandcost.com/
```

#### 5. Set permissions
```bash
sudo chown -R www-data:www-data /var/www/kosandcost.com
sudo chmod -R 755 /var/www/kosandcost.com
```

## 🧪 Testing

### Test routes dengan curl:
```bash
# Homepage
curl -I https://kosandcost.com/

# Routes lain (seharusnya return 200 OK, bukan 404)
curl -I https://kosandcost.com/home
curl -I https://kosandcost.com/hotels
curl -I https://kosandcost.com/profile
```

### Test di browser:
1. Buka: `https://kosandcost.com/home`
2. Tekan F5 (refresh)
3. Seharusnya tetap load halaman home, bukan 404

## 🔍 Troubleshooting

### Masih 404?

**1. Cek nginx error log:**
```bash
sudo tail -f /var/log/nginx/error.log
```

**2. Cek apakah konfigurasi aktif:**
```bash
sudo nginx -T | grep kosandcost
```

**3. Cek file index.html ada:**
```bash
ls -la /var/www/kosandcost.com/index.html
```

**4. Cek ownership & permissions:**
```bash
ls -la /var/www/kosandcost.com/
```

### Base Href Issue?

Jika deploy di subdirectory (misal: `/koskos/`), pastikan build dengan:
```bash
flutter build web --base-href=/koskos/ --release
```

Dan di nginx:
```nginx
location /koskos/ {
    alias /var/www/kosandcost.com/;
    try_files $uri $uri/ /koskos/index.html;
}
```

## 📊 Monitoring

### Check nginx status:
```bash
sudo systemctl status nginx
```

### Check access logs:
```bash
sudo tail -f /var/log/nginx/access.log
```

### Check Flutter app errors (browser console):
- Open Developer Tools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

## 🔐 SSL/HTTPS Setup (Bonus)

Jika belum ada SSL, gunakan Let's Encrypt:

```bash
# Install certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d kosandcost.com -d www.kosandcost.com

# Auto-renewal (cron job)
sudo certbot renew --dry-run
```

## ✅ Verifikasi Final

Setelah deploy, pastikan:
- ✅ `https://kosandcost.com` → OK
- ✅ `https://kosandcost.com/home` → OK (bukan 404!)
- ✅ `https://kosandcost.com/hotels` → OK
- ✅ Refresh di route manapun → OK
- ✅ Browser back/forward button → OK

## 📚 Resources

- [Nginx SPA Configuration](https://www.nginx.com/blog/deploying-nginx-nginx-plus-docker/)
- [Flutter Web Deployment](https://docs.flutter.dev/deployment/web)
- [Let's Encrypt SSL](https://letsencrypt.org/getting-started/)

## 🆘 Masih Bermasalah?

Kirim output dari:
```bash
# 1. Nginx config test
sudo nginx -t

# 2. Current nginx config
sudo nginx -T | grep -A 20 "kosandcost.com"

# 3. Error log
sudo tail -50 /var/log/nginx/error.log

# 4. File structure
ls -la /var/www/kosandcost.com/
```
