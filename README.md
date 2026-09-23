# EMR Commerce website

A responsive single-page corporate website built with React, TypeScript, and Vite.

## Local development

1. Install dependencies with `npm install`.
2. Use `npm run dev` for frontend-only Vite development.
3. When testing the complete Worker locally, copy `.env.example` to `.dev.vars` and add a Resend API key. Wrangler reads `.dev.vars`; `.env.example` is only the tracked template.
4. Run `npm start` to build the site and serve the static output together with the Cloudflare Worker.
5. Create a production build with `npm run build`.

The contact form posts to `/api/contact` by default, so no frontend environment variable is required.

## Cloudflare Workers deployment

- Worker service: `emr`
- Static assets directory: `dist`
- Worker API route: `/api/contact`
- Deployment command: `npm run deploy`

The Worker uses selective Worker-first routing for `/api/*`. Other requests remain on Cloudflare's static asset path, and client-side navigation falls back to `index.html`.

Verify `emrcommerce.co` in Resend before enabling production delivery. Then configure `RESEND_API_KEY` as an encrypted secret on the `emr` Worker through the Cloudflare dashboard or with:

```sh
npx wrangler secret put RESEND_API_KEY
```

The Worker calls the Resend Email API directly, sends plain-text inquiries from `EMR Commerce <sales@emrcommerce.co>` to `sales@emrcommerce.co`, and uses the visitor's address as `Reply-To`.

To inspect contact delivery logs without exposing the Resend API key or submitted message content, run:

```sh
npx wrangler tail emr
```

Contact logs include a request ID, whether the secret binding is present, the Resend request stage, the provider status, and sanitized provider error details.

`.env.example` documents the only required secret name. Never add a real API key to that file, expose `RESEND_API_KEY` through a `VITE_` variable, or commit `.dev.vars` to the repository. Running `npm run deploy` updates the existing `emr` Worker, so review the dry-run output before deploying.

Business details are kept in `src/config.ts`. Confirm the placeholder email, location, canonical URL, and Open Graph URL before launch.
