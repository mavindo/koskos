# Web Loading Optimization - RentKos

## Masalah yang Diperbaiki

Saat pertama kali load web Flutter di server, terasa lambat dan hanya muncul blank screen putih tanpa loading indicator apapun. Ini terjadi karena:

1. Flutter Web perlu download JavaScript engine (main.dart.js) yang berukuran besar
2. Tidak ada visual feedback kepada user saat proses loading
3. Tidak ada caching strategy yang optimal

## Solusi yang Diimplementasikan

### 1. Loading Screen dengan Splash Screen
**File: `web/index.html`**

Menambahkan loading screen yang tampil saat Flutter sedang initialize:
- Logo aplikasi dengan animasi pulse
- Spinner loading dengan animasi rotate
- Text "Loading RentKos..." dengan animasi fade
- Automatic removal saat Flutter first frame sudah render

```html
<div id="loading">
  <img class="logo" src="icons/Icon-192.png" alt="RentKos Logo">
  <div class="spinner"></div>
  <p class="loading-text">Loading RentKos...</p>
</div>
```

Event listener untuk menghilangkan loading screen:
```javascript
window.addEventListener('flutter-first-frame', function () {
  document.body.classList.add('flutter-ready');
  // Remove loading screen after fade animation
});
```

### 2. Performance Optimization

**Preconnect & DNS Prefetch:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://rentkos-api.stg.jtisrv.com">
```

**Preload Critical Resources:**
```html
<link rel="preload" href="flutter_bootstrap.js" as="script">
```

**Viewport Meta:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### 3. Service Worker untuk Caching
**File: `web/flutter_service_worker.js`**

Implementasi caching strategy:
- **Precache**: Cache essential resources saat install
- **Runtime Cache**: Cache resources on-demand saat diakses
- **Cache First Strategy**: Serve dari cache jika tersedia, fallback ke network

Benefits:
- Load kedua dan seterusnya jauh lebih cepat
- Offline capability (partial)
- Reduced bandwidth usage

## Hasil

### Before:
❌ Blank white screen 3-5 detik  
❌ Tidak ada feedback visual  
❌ User bingung apakah app error atau loading  

### After:
✅ Loading screen muncul immediately  
✅ Animated logo & spinner  
✅ Loading text yang informatif  
✅ Smooth transition ke aplikasi  
✅ Repeat visits lebih cepat (cached)  

## Testing

1. **First Load (Cold Start):**
   ```bash
   flutter build web --base-href=/koskos/ --release
   ```
   - Clear browser cache
   - Open application
   - Should see loading screen immediately

2. **Subsequent Loads:**
   - Refresh page
   - Should load faster with cached resources
   - Loading screen duration should be shorter

3. **Network Throttling Test:**
   - Chrome DevTools → Network → Slow 3G
   - Test loading experience
   - Loading screen should remain visible longer

## Customization

### Ubah Warna Loading Screen
Edit `web/index.html` section `<style>`:
```css
#loading {
  background-color: #ffffff; /* Ubah background */
}

.spinner {
  border-top: 4px solid #5A67D8; /* Ubah warna spinner */
}
```

### Ubah Loading Text
Edit `web/index.html`:
```html
<p class="loading-text">Loading RentKos...</p>
```

### Tambah Progress Bar
Tambahkan di dalam `<div id="loading">`:
```html
<div class="progress-bar">
  <div class="progress-fill"></div>
</div>
```

## Best Practices

1. **Optimize Asset Size:**
   - Compress images di `web/icons/`
   - Use WebP format untuk web
   - Minimize icon sizes

2. **Enable Compression:**
   Ensure server menggunakan gzip/brotli compression untuk:
   - `.js` files
   - `.json` files
   - `.html` files

3. **CDN Usage:**
   Consider hosting di CDN untuk:
   - Faster global delivery
   - Better caching
   - Reduced server load

4. **Monitor Performance:**
   - Use Lighthouse audit
   - Check First Contentful Paint (FCP)
   - Check Time to Interactive (TTI)

## Additional Optimizations (Future)

- [ ] Implement code splitting
- [ ] Lazy load routes
- [ ] Progressive Web App (PWA) features
- [ ] Web Workers untuk heavy computation
- [ ] Image lazy loading
- [ ] Font display swap strategy

## References

- [Flutter Web Performance](https://docs.flutter.dev/perf/web-performance)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Loading Best Practices](https://web.dev/fast/)
