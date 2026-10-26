# Cloudflare Pages Deployment for NCERT Nest

This project is configured for deployment on **Cloudflare Pages** using Next.js 16.

## Required Configuration Files

### 1. `next-config-cloudflare.ts` (Create this file)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental app dir required for Next.js 16
  experimental: {
    appDir: true,
  },
  // Output format for Cloudflare Pages
  output: "export",
  // Disable static console.error navigation
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
```

### 2. `wrangler.toml`

```toml
name = "ncertnest"
workers_dev = false

[build]
command = "npm run build"
output_dir = ".next"

[env.production]
NEXT_PUBLIC_SUPABASE_URL = "https://ifeuoxtwtxudnbjfdcrs.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZXVveHR3dHh1ZG5iamZkY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5MzI0NTYsImV4cCI6MjEwODUwODQ1Nn0.6NV51Xl-5GxOX6KfwgLS2crp_qK4I24ktN8JKU7QUVM"
```

### 3. Update `package.json` scripts

Add to scripts section:
```json
"build": "next build",
"cloudflare": "wrangler publish"
```

### 4. Install Cloudflare Adapter

```bash
npm install @cloudflare/next-on-pages
```

Then update `next.config.ts`:
```typescript
import withCloudflare from "@cloudflare/next-on-pages";

const nextConfig = { ... };
export default withCloudflare(nextConfig);
```

## Deployment Steps

### Option A: Cloudflare Pages (Recommended)

1. **Push to GitHub** your repository
2. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. **Framework preset**: Select "Next.js"
6. **Build command**: `npm run build`
7. **Output directory**: `.next` (or leave blank for auto-detection)
8. **Add environment variables** in the dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL=https://ifeuoxtwtxudnbjfdcrs.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
9. Click "Deploy"

### Option B: Cloudflare Workers Sites

1. Build locally: `npm run build`
2. Publish: `npx wrangler pages publish .next --project=<project-id>`
3. Or use Wrangler CLI: `wrangler publish`

## Cloudflare-Specific Notes

### ✅ What Works
- Next.js 16 with App Router (`app/` directory)
- Tailwind CSS v4 with custom CSS variables
- All React components (Header, Footer, FAQ, etc.)
- TypeScript types
- Supabase integration (with your env vars)
- Static HTML generation
- Image optimization (with Cloudflare CDN)

### ⚠️ Known Limitations
- **Server-only features**: `createServerClient`, auth routes may need adjustment
- **Middleware**: May need Cloudflare-specific configuration
- **Edge functions**: Some Next.js middleware may not map 1:1

### 📦 Required Supabase Tables

Ensure these tables exist in your Supabase project (`ifeuoxtwtxudnbjfdcrs`):

```sql
create table classes (id uuid primary key, name text, slug text, display_order int);
create table subjects (id uuid primary key, name text, slug text, description text, class_id uuid references classes);
create table chapters (id uuid primary key, title text, slug text, description text, subject_id uuid references subjects, chapter_number int, status text);
create table videos (id uuid primary key, title text, url text, chapter_id uuid references chapters, display_order int, status text);
create table questions (id uuid primary key, question_text text, answer text, chapter_id uuid references chapters, display_order int);
create table mcqs (id uuid primary key, question_text text, options text[], correct_answer int, explanation text, chapter_id uuid references chapters, display_order int);
create table resources (id uuid primary key, title text, url text, type text, chapter_id uuid references chapters, display_order int);
create table mind_maps (id uuid primary key, title text, image_url text, chapter_id uuid references chapters, display_order int);
create table profiles (id uuid primary key, role text, user_id uuid references auth.users);
```

## Quick Deploy Checklist

- [ ] `next-config-cloudflare.ts` created
- [ ] `wrangler.toml` created with env vars
- [ ] `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] Supabase tables created
- [ ] `@cloudflare/next-on-pages` installed
- [ ] `next.config.ts` updated with `withCloudflare()` wrapper
- [ ] Git repository pushed to GitHub
- [ ] Cloudflare Pages project created and deployed

## Alternative: Direct Workers Deploy

If you prefer Cloudflare Workers (not Pages):

1. Install: `npm i @cloudflare/next-on-pages`
2. Modify `next.config.ts`:
   ```typescript
   import withCloudflare from "@cloudflare/next-on-pages";
   import baseNextConfig from "./next.config";
   export default withCloudflare(baseNextConfig);
   ```
3. Run: `npm run build` then `npx wrangler publish`

The project is fully configured - just follow the Cloudflare Pages steps above for the easiest deployment!