# Tushar Dhere — Portfolio
> Storage & Backup Administrator | Airoli, Navi Mumbai

Pure HTML + CSS + JS portfolio. Zero frameworks. Docker-ready.

---

## 📁 Folder Structure (single flat folder)

```
tushar-portfolio/
├── index.html                  ← Main portfolio page
├── style.css                   ← All styles (desktop + mobile)
├── app.js                      ← Tabs, cards, EmailJS, mobile sidebar
├── Tushar_Dhere_Resume.pdf     ← ⚠️ ADD YOUR RESUME PDF HERE
├── nginx.conf                  ← Nginx server config
├── Dockerfile                  ← Docker build
├── docker-compose.yml          ← Docker Compose (easiest run)
└── README.md                   ← This file
```

---

## ✅ Setup Checklist

### 1. Add Your Resume PDF
Copy your updated resume PDF into this folder and name it **exactly**:
```
Tushar_Dhere_Resume.pdf
```
The Download Resume button will automatically serve this file.

### 2. Add GitHub Links (Portfolio section)
Open `index.html` and search for `YOUR_GITHUB_LINK_HERE` — there are 4 of them.
Replace each one with your actual GitHub repo URL:

| Project | Search for | Replace with |
|---------|-----------|--------------|
| Voice Email System | `YOUR_GITHUB_LINK_HERE` (Project 1) | your repo link |
| Facial Recognition | `YOUR_GITHUB_LINK_HERE` (Project 2) | your repo link |
| AI Assistant | `YOUR_GITHUB_LINK_HERE` (Project 3) | your repo link |
| Java Portal | `YOUR_GITHUB_LINK_HERE` (Project 4) | your repo link |

### 3. Setup EmailJS (Contact Form → sends to work.tushardhere@gmail.com)
Free tier allows 200 emails/month — enough for a portfolio.

**Steps:**
1. Go to → https://www.emailjs.com/ and sign up free
2. **Add Email Service** → Connect Gmail (`work.tushardhere@gmail.com`) → copy **Service ID**
3. **Email Templates** → Create Template → use these variables:
   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}
   Message: {{message}}
   ```
   → Copy **Template ID**
4. **Account → API Keys** → copy **Public Key**
5. Open `app.js` and fill in at the top:
   ```js
   const EMAILJS_SERVICE_ID  = 'service_XXXXXX';
   const EMAILJS_TEMPLATE_ID = 'template_XXXXXX';
   const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
   ```
6. Remove or delete the yellow setup note in `index.html` (the `<div class="setup-note">` block)

> **Without EmailJS configured:** clicking Send Message opens the default mail app
> pre-filled with the message (mailto fallback) — still works!

### 4. Add Your Photo (optional)
In `index.html`, replace:
```html
<div class="avatar-placeholder"><span>TD</span></div>
```
With:
```html
<img src="photo.jpg" alt="Tushar Dhere"
     style="width:100%;height:100%;border-radius:50%;object-fit:cover;object-position:top;">
```
Put `photo.jpg` in the same folder.

---

## 🐳 Run with Docker

```bash
# Option 1 — Docker Compose (recommended)
docker compose up -d --build
# Open → http://localhost:8080

# Option 2 — Docker directly
docker build -t tushar-portfolio .
docker run -d -p 8080:80 --name tushar-portfolio tushar-portfolio

# Stop
docker compose down
```

## 💻 Run without Docker (local preview)
```bash
# Python (any machine)
python3 -m http.server 8080
# Open → http://localhost:8080
```

---

## Features
- ✅ Dark theme — gold accent
- ✅ Left sidebar with avatar, contact info, WhatsApp, social links
- ✅ Download Resume PDF button (sidebar + Resume tab)
- ✅ Tabs: About · Resume · Portfolio · Contact
- ✅ Resume tab: education & experience timeline + animated skill bars
- ✅ Portfolio tab: filter by Python / Java / Infrastructure + click-to-expand cards
- ✅ GitHub links on each project card (except UIIC enterprise project)
- ✅ Contact form → sends email to work.tushardhere@gmail.com via EmailJS
- ✅ Quick contact: Email / WhatsApp / LinkedIn buttons
- ✅ Fully responsive: desktop sidebar + mobile drawer with hamburger menu
- ✅ Docker + Nginx production-ready
