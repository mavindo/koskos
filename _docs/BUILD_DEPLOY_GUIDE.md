# 📦 Kos and Cost - Build & Deployment Guide

## ✨ New Feature: Auto-Include Documentation & Config

Setiap kali build, dokumentasi dan konfigurasi server otomatis ter-copy ke `build/web/_docs/`

## 🚀 Quick Build & Deploy

### Build dengan Dokumentasi (Recommended)
```bash
./build_with_docs.sh
```

Ini akan:
1. ✅ Build Flutter web (release mode)
2. ✅ Copy semua dokumentasi ke `build/web/_docs/`
3. ✅ Copy konfigurasi nginx dan apache
4. ✅ Copy script deployment
5. ✅ Membuat index.html untuk dokumentasi

### Upload ke Server
```bash
# Method 1: SCP
scp -r build/web/* user@kosandcost.com:/var/www/kosandcost.com/

# Method 2: Rsync (recommended)
rsync -avz --delete build/web/ user@kosandcost.com:/var/www/kosandcost.com/

# Method 3: FTP/SFTP
# Upload seluruh folder build/web/ ke server
```

### Fix 404 Error di Server
```bash
# SSH ke server
ssh user@kosandcost.com

# Jalankan fix script
sudo bash /var/www/kosandcost.com/_docs/minimal_fix.sh

# Atau lihat dokumentasi lengkap
cd /var/www/kosandcost.com/_docs/
cat NGINX_404_FIX.md
```

## 📁 Struktur Build Output

```
build/web/
├── index.html              # Flutter app utama
├── main.dart.js           # Flutter compiled code
├── flutter_bootstrap.js   # Flutter bootstrap
├── .htaccess             # Apache config (auto-copied)
├── assets/               # App assets
├── icons/                # App icons
├── canvaskit/           # Flutter rendering engine
└── _docs/               # 📚 DOKUMENTASI & CONFIG
    ├── index.html                    # Docs landing page (akses via browser)
    ├── NGINX_404_FIX.md             # Fix 404 error guide
    ├── QUICK_FIX.md                 # Quick reference
    ├── WEB_LOADING_OPTIMIZATION.md  # Loading optimization
    ├── nginx-kosandcost.conf        # Nginx config
    ├── .htaccess                    # Apache config
    ├── minimal_fix.sh               # Quick fix script ⚡
    ├── deploy.sh                    # Full deployment
    └── README.md                    # Docs info
```

## 🌐 Akses Dokumentasi di Browser

Setelah upload ke server, akses:
- **Landing Page**: `https://kosandcost.com/_docs/`
- **404 Fix Guide**: `https://kosandcost.com/_docs/NGINX_404_FIX.md`
- **Quick Fix**: `https://kosandcost.com/_docs/QUICK_FIX.md`

## 🔧 Manual Build (Tanpa Docs)

Jika hanya ingin build tanpa dokumentasi:
```bash
flutter build web --release
```

## 📝 Custom Build dengan Base Href

Jika deploy di subdirectory:
```bash
# Edit build_with_docs.sh, ubah baris:
flutter build web --base-href=/subdirectory/ --release

# Lalu run:
./build_with_docs.sh
```

## 🎯 Workflow Lengkap

### 1. Development
```bash
flutter run -d chrome  # Test locally
```

### 2. Build
```bash
./build_with_docs.sh   # Build + copy docs
```

### 3. Upload
```bash
rsync -avz --delete build/web/ user@server:/var/www/kosandcost.com/
```

### 4. Configure Server
```bash
ssh user@server
sudo bash /var/www/kosandcost.com/_docs/minimal_fix.sh
```

### 5. Test
```bash
curl -I https://kosandcost.com/
curl -I https://kosandcost.com/home
# Both should return 200 OK
```

## 🆘 Troubleshooting

### Build Failed
```bash
flutter clean
flutter pub get
./build_with_docs.sh
```

### Documentation Not Copied
```bash
# Run post-build script manually
chmod +x post_build.sh
./post_build.sh
```

### 404 Error on Server
```bash
# Di server, jalankan:
sudo bash _docs/minimal_fix.sh

# Atau baca dokumentasi:
less _docs/NGINX_404_FIX.md
```

## 📚 File References

| File | Purpose |
|------|---------|
| `build_with_docs.sh` | Main build script dengan auto-copy docs |
| `post_build.sh` | Script untuk copy dokumentasi ke build output |
| `nginx-kosandcost.conf` | Production nginx config |
| `minimal_fix.sh` | Quick fix untuk 404 error |
| `deploy.sh` | Full automated deployment |
| `docs_index.html` | Template untuk docs landing page |

## 🔒 Security Notes

- Files di `_docs/` bisa diakses publik
- Tidak ada informasi sensitif di dokumentasi
- Script `.sh` hanya bisa dijalankan di server (bukan via browser)

## 🎉 Benefits

✅ Dokumentasi selalu sync dengan build  
✅ Server admin tidak perlu download file terpisah  
✅ Akses dokumentasi via browser (`/_docs/`)  
✅ Script fix tersedia langsung di server  
✅ Support nginx dan apache (via .htaccess)  

## 📧 Support

Jika ada masalah, cek:
1. `_docs/NGINX_404_FIX.md` - Troubleshooting lengkap
2. `_docs/QUICK_FIX.md` - Solusi cepat
3. Server logs: `sudo tail -f /var/log/nginx/error.log`

---

**Last Updated**: November 3, 2025  
**Version**: 1.0.0
