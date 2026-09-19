# سامانه تصمیم‌یار قیمت‌گذاری و مشارکت سپ (PWA)

نسخه Progressive Web App سامانه تصمیم‌یار قیمت‌گذاری و مشارکت در توسعه شبکه پذیرندگی — **پرداخت الکترونیک سامان کیش (سپ)**

- قابل نصب روی iPhone / iPad (Safari) و اندروید (Chrome)
- کار آفلاین پس از اولین بارگذاری
- مناسب استقرار روی **GitHub Pages**

---

## استقرار سریع روی GitHub Pages

### ۱. ساخت ریپازیتوری
1. در GitHub یک ریپو جدید بسازید (مثلاً `sep-pricing-dss`).
2. می‌تواند Public یا Private باشد (برای Pages رایگان بهتر است Public).

### ۲. آپلود فایل‌ها
همهٔ محتویات پوشه `sep-pwa` را در ریشهٔ ریپو قرار دهید:

```
/
├── index.html
├── manifest.webmanifest
├── sw.js
├── README.md
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-512-maskable.png
    ├── apple-touch-icon.png
    └── ...
```

با Git:

```bash
git init
git add .
git commit -m "SEP Pricing Decision Support PWA"
git branch -M main
git remote add origin https://github.com/YOUR_USER/sep-pricing-dss.git
git push -u origin main
```

### ۳. فعال‌سازی GitHub Pages
1. بروید به **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Save

بعد از ۱–۲ دقیقه آدرس شما آماده است:

```
https://YOUR_USER.github.io/sep-pricing-dss/
```

### ۴. نصب به‌عنوان اپ (PWA)

**روی iPhone / iPad (Safari):**
1. آدرس بالا را در Safari باز کنید.
2. دکمه Share → **Add to Home Screen**
3. نام: «تصمیم‌یار سپ» → Add

**روی اندروید (Chrome):**
- منوی ⋮ → **Install app** یا **Add to Home screen**

---

## نکات عملیاتی (برای تیم فروش و مدیریت)

| موضوع | توضیح |
|--------|--------|
| **داده** | همهٔ تصمیم‌ها و عکس‌برداری‌های بازار در `localStorage` مرورگر ذخیره می‌شوند (دستگاه‌محور). برای اشتراک بین چند نفر، از خروجی PDF صورتجلسه استفاده کنید. |
| **آفلاین** | پس از اولین باز شدن، شل اپ کش می‌شود و بدون اینترنت هم باز می‌شود. |
| **به‌روزرسانی** | با تغییر `CACHE` در `sw.js` (مثلاً به `sep-dss-v2`) و push دوباره، کاربران نسخهٔ جدید را می‌گیرند. |
| **Safari** | از iOS 16.4 به بعد Service Worker پایدار است. قبل از آن هم اپ با «Add to Home Screen» کار می‌کند. |

---

## ساختار تصمیم‌گیری (یادآوری مدل)

```
شرایط بازار ← قیمت سپ ← نرخ ارز ← پیشنهاد قیمت ← اثر تصمیم ← تعهدات کارگزار ← ریسک ← صورتجلسه
```

سامانه محاسبه می‌کند؛ مدیرعامل تصمیم می‌گیرد؛ سامانه اثر تصمیم را نشان می‌دهد؛ صورتجلسه تصمیم را ثبت می‌کند.

---

## توسعه بعدی پیشنهادی

- اتصال به API نرخ ارز یا داشبورد داخلی
- بک‌اند سبک برای اشتراک‌گذاری تصمیم‌ها بین مدیران (به‌جای فقط localStorage)
- آیکون رسمی سپ به‌جای placeholder فعلی

---

© پرداخت الکترونیک سامان کیش (سپ) — استفاده داخلی
