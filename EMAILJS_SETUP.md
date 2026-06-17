# Fix: "Send Message" opens my mail app instead of sending directly

This happens because the contact form is built on **EmailJS** — a free
service that lets a static website (no backend server) send real emails.
Right now the 3 EmailJS keys in `app.js` are still placeholders, so the
code falls back to opening your mail app with the message pre-filled.

Once you complete the steps below (about 3 minutes), that fallback goes
away completely. Clicking "Send Message" will send the email silently
in the background and show a green "Message sent!" confirmation — no
redirect, no mail app, nothing opens.

---

## Step 1 — Create a free EmailJS account
Go to **https://www.emailjs.com/** → click **Sign Up** → verify your email.

## Step 2 — Connect your Gmail
1. In the EmailJS dashboard, go to **Email Services** (left sidebar)
2. Click **Add New Service**
3. Choose **Gmail**
4. Click **Connect Account** and log in with `work.tushardhere@gmail.com`
5. Once connected, you'll see a **Service ID** like `service_abc1234`
   → copy it

## Step 3 — Create an email template
1. Go to **Email Templates** (left sidebar)
2. Click **Create New Template**
3. In the template editor, set:
   - **To Email**: `work.tushardhere@gmail.com`
   - **Subject**: `{{subject}}`
   - **Content** (body), paste this:
     ```
     New message from your portfolio site

     Name: {{from_name}}
     Email: {{from_email}}

     Message:
     {{message}}
     ```
4. Click **Save**
5. Copy the **Template ID** shown at the top, like `template_xyz789`

## Step 4 — Get your Public Key
1. Click your account icon (top right) → **Account**
2. Under **API Keys**, copy your **Public Key**

## Step 5 — Paste the 3 values into `app.js`
Open `app.js` in this folder, find these lines near the top:

```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
```

Replace with your real values, for example:

```js
const EMAILJS_SERVICE_ID  = 'service_abc1234';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY  = 'aBcDeFgHiJkLmNoP';
```

Save the file.

## Step 6 — Remove the yellow setup notice
Open `index.html`, search for `id="setupNote"`, and delete that entire
`<div class="setup-note" id="setupNote"> ... </div>` block.

## Step 7 — Test it
Open the site, go to Contact, fill the form, hit Send Message.
You should see a green "Message sent! I'll get back to you soon."
confirmation appear — and a real email should land in
`work.tushardhere@gmail.com` within seconds. No redirect.

---

### Free tier limits
EmailJS's free plan allows **200 emails/month** — more than enough for
a personal portfolio contact form.

### Still redirecting to mail app after setup?
Double check:
- No typos in the 3 IDs (they're case-sensitive)
- The template's variable names match exactly: `from_name`, `from_email`,
  `subject`, `message` (these are set automatically by the form — just
  make sure your EmailJS template uses the same names in `{{ }}`)
- You saved `app.js` and refreshed/rebuilt the site
