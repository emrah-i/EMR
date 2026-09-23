# EMR Commerce website

A responsive single-page corporate website built with React, TypeScript, and Vite.

## Local development

1. Install dependencies with `npm install`.
2. Use `npm run dev` for frontend-only Vite development.
3. When testing the complete Worker locally, copy `.env.example` to `.dev.vars` and add the Gmail App Password for `accounts@ibraem.com`. Wrangler reads `.dev.vars`; `.env.example` is only the tracked template.
4. Run `npm start` to build the site and serve the static output together with the Cloudflare Worker.
5. Create a production build with `npm run build`.

The contact form posts to `/api/contact` by default, so no frontend environment variable is required.

## Cloudflare Workers deployment

- Worker service: `emr`
- Static assets directory: `dist`
- Worker API route: `/api/contact`
- Deployment command: `npm run deploy`

The Worker uses selective Worker-first routing for `/api/*`. Other requests remain on Cloudflare's static asset path, and client-side navigation falls back to `index.html`.

Configure `SMTP_TOKEN` as an encrypted secret on the `emr` Worker. It must be the Gmail App Password for `accounts@ibraem.com`. You can configure it in the Cloudflare dashboard or with:

```sh
npx wrangler secret put SMTP_TOKEN
```

The Worker connects to `smtp.gmail.com` using STARTTLS on port `587`, sends from `accounts@ibraem.com` to `sales@emrcommerce.co`, and uses the visitor's address as `Reply-To`.

To inspect contact delivery logs without exposing the SMTP token or submitted message content, run:

```sh
npx wrangler tail emr
```

Contact logs include a request ID, whether the secret binding is present, the SMTP stage, and safe Nodemailer status fields such as the response code and failed SMTP command.

`.env.example` documents the only required secret name. Never add a real token to that file, expose `SMTP_TOKEN` through a `VITE_` variable, or commit `.dev.vars` to the repository. Running `npm run deploy` updates the existing `emr` Worker, so review the dry-run output before deploying.

Business details are kept in `src/config.ts`. Confirm the placeholder email, location, canonical URL, and Open Graph URL before launch.
