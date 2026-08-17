Simple newsletter signup with automatic guide delivery

Overview
- This repo shows a minimal landing page that collects an email address and sends a free resource to the subscriber.
- Subscriptions are added to Mailchimp (if configured) so you can manage subscribers and set automations there.
- The guide is delivered via SendGrid transactional email. A resend endpoint is provided with a cooldown.

Files added
- `server.js` — Express backend: `/api/subscribe` and `/api/resend`.
- `index.html`, `styles.css`, `script.js` — frontend signup UX.
- `package.json`, `.env.example`, `README.md` — setup files.

Quick start (local)
1. Copy `.env.example` to `.env` and fill in keys: Mailchimp API key, server prefix (e.g. `us19`), list ID, SendGrid API key, and `FROM_EMAIL`.
2. Install dependencies:

```bash
npm install
```

3. Run the server:

```bash
npm start
```

4. Open `http://localhost:3000` and test the form. The guide file `Financial_Guide_for_Engineers.docx` will be referenced from the site root.

Notes
- Mailchimp: use the Audience (list) ID and API key. Mailchimp can handle welcome automations; you can create automated welcome sequences in the Mailchimp UI.
- SendGrid: This repo uses SendGrid for transactional sends. You can switch to another transactional provider by replacing the `sendGuideEmail` implementation in `server.js`.
- Resend cooldown: controlled by `RESEND_COOLDOWN_SECONDS` env var. Server uses an in-memory map for last-send timestamps — for production use a persistent store (Redis, DB).

Security & deployment
- Keep API keys secret and configure them as environment variables in production.
- Deploy to a Node host (Heroku, Vercel serverless functions, Render, Fly, etc.). When deploying as serverless endpoints, adapt `server.js` into serverless handler functions.

If you'd like, I can:
- Wire this to a specific provider account (Mailchimp/MailerLite/ConvertKit) using API keys you provide.
- Replace SendGrid with Mailchimp transactional or a different provider.
- Add server-side persistent storage for subscribers and resend history.
# Landing page for newsletter signup

This project is a clean one-page landing page built for a LinkedIn audience. It promotes a newsletter signup and gives the reward of the free Financial Guide for Engineers document.

## Files

- `index.html` – landing page structure
- `styles.css` – styling and responsive layout
- `script.js` – form validation and signup interaction
- `Financial_Guide_for_Engineers.docx` – reward document included in the project

## Cloudflare Pages deployment

1. Sign in to Cloudflare and open the Pages section.
2. Create a new project.
3. Choose either:
   - Direct upload of this folder, or
   - Connect a GitHub repository containing this project.
4. If you use direct upload, upload the full folder contents.
5. Use the default build settings because this is a static site.
6. Cloudflare will assign a `.pages.dev` domain automatically after deployment.

## Customize before publishing

- Replace the LinkedIn link in `index.html` with your actual profile URL.
- Update the headline and copy to match your brand voice.
- If you want to connect the form to a real email marketing tool, replace the client-side logic in `script.js` with your provider endpoint or a Cloudflare Pages form integration.

## Local preview

Run a quick local preview using Python:

```bash
python -m http.server 8000
```

Then open: http://localhost:8000

## Note

This landing page is designed so the `.pages.dev` domain can be generated automatically by Cloudflare Pages once the project is published.
