# EMR Commerce website

A responsive single-page corporate website built with React, TypeScript, and Vite.

## Local development

1. Install dependencies with `npm install`.
2. Use `npm run dev` for frontend-only Vite development.
3. When testing the complete Pages application locally, copy `.env.example` to `.dev.vars` and add a development Cloudflare SMTP token. Wrangler reads `.dev.vars`; `.env.example` is only the tracked template.
4. Run `npm start` to build the site and serve the static output together with the Cloudflare Pages Function.
5. Create a production build with `npm run build`.

The contact form posts to `/api/contact` by default, so no frontend environment variable is required.

## Cloudflare Pages deployment

- Build command: `npm run build`
- Build output directory: `dist`
- Function route: `/api/contact`

Configure these values under the Pages project's production and preview Variables and Secrets settings:

- `SMTP_TOKEN` as an encrypted secret. The token must have the Cloudflare Email Sending: Edit permission.

Onboard `emrcommerce.co` under Cloudflare Email Service > Email Sending before enabling production submissions. Set the Pages compatibility date to `2026-08-04` or later for both production and preview so the Node networking and TLS APIs required by Nodemailer are available. The contact Function connects to `smtp.mx.cloudflare.net` over implicit TLS on port `465`, sends from and to `sales@emrcommerce.co`, and uses the visitor's address as `Reply-To`.

`.env.example` documents the only required secret name. Never add a real token to that file, expose `SMTP_TOKEN` through a `VITE_` variable, or commit `.dev.vars` to the repository.

Business details are kept in `src/config.ts`. Confirm the placeholder email, location, canonical URL, and Open Graph URL before launch.
