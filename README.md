# Librica Med

Sri Lankan online medical bookstore — [Next.js](https://nextjs.org) App Router, [Tailwind CSS](https://tailwindcss.com), [Airtable](https://airtable.com) for catalogue and orders, WhatsApp-assisted checkout (no card payments on-site).

**Live site:** [libricamed.lk](https://libricamed.lk)

## Getting started

```bash
npm install
cp .env.local.example .env.local
# Add AIRTABLE_PAT and AIRTABLE_BASE_ID
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

Import this repo in the [Vercel dashboard](https://vercel.com/new). Set environment variables:

| Variable | Description |
|----------|-------------|
| `AIRTABLE_PAT` | Airtable personal access token (server-only) |
| `AIRTABLE_BASE_ID` | Base id for `librica-med-store` |

Do not commit `.env.local`; use Vercel **Settings → Environment Variables** for production.

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- Field mapping for Airtable tables is described in `.env.local.example` and `src/lib/airtable/mappers.ts`
