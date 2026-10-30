# Raja Boss VIP Channel & Tracking Panel

Telegram VIP Channel landing page and admin tracking panel with Meta Conversions API (CAPI) & Telegram Bot integration, connecting to Supabase.

## 🚀 Features

- **Landing Page (`/`)**:
  - Exact 1:1 replica of `rajabossvip.lovable.app`.
  - 8 Themes with live theme switcher (`royal-crimson`, `emerald-gold`, `midnight-blue`, etc.).
  - Telegram Join CTA with shine effect, animations, and country detection.
  - Privacy policy page (`/privacy`) with ad-measurement opt-out toggle.

- **Admin Panel (`/admin`)**:
  - Supabase Authentication (`/login`) with role-based admin check.
  - Setup Checklist (Bot Token, Channel Admin, Webhook, Meta Pixel).
  - 5 Real-Time Metric Cards (Page visits, Button clicks, Join requests, Subscribe sent, Approved).
  - 14-Day Traffic & Conversion SVG Chart.
  - Live Join Requests table (`/admin/join-requests`).
  - Button Clicks analytics table (`/admin/clicks`).
  - Server-side Meta CAPI Events log (`/admin/events`).
  - Page Content Customizer (`/admin/landing`) with live Mobile & Desktop frame preview.
  - Themes Switcher (`/admin/themes`) with 1-click apply.
  - Telegram Bot Setup (`/admin/telegram`) with `@BotFather` and Channel ID (`-1004394136528`).
  - Meta Pixel & CAPI Settings (`/admin/meta`).

---

## 🌐 cPanel Hosting Deployment (Direct Upload)

Aap is project ko kisi bhi cPanel Shared Hosting (Hostinger, Namecheap, GoDaddy, Bluehost, etc.) par 2 minute me live kar sakte hain:

1. **Build generate karein**:
   ```bash
   npm run build
   ```
2. **`dist` folder ke andar ki saari files**:
   - `.htaccess`
   - `index.html`
   - `assets/`
   - `api/`
3. **cPanel File Manager** kholiye:
   - Apne cPanel me **File Manager** par jaiye.
   - `public_html/` folder kholiye.
   - Yeh saari files `public_html/` me upload kar dijiye (ya `cpanel_public_html.zip` upload karke wahan **Extract** kar lijiye).
4. **Done!** Aapki website live ho jayegi.

---

## 🛠️ Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Admin Login

- **URL**: [https://yourdomain.com/login](https://yourdomain.com/login)
- **Email**: `balajiofficialsatkamatka4@gmail.com`
- **Password**: `balaji8094`
