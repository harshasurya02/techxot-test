# Techxot Interview – BFF Technical Task

This project implements a **Backend-for-Frontend (BFF)** for a payments company (Articles).  
It provides clean API routes backed by mock data, a minimal UI to render articles, and follows the given interview task requirements.

---

## 📌 Scenario & Goals

- Build a small **BFF** so the frontend can consume a single, consistent API.
- Since real backends are unavailable, **mock data** is used.
- Implement clean BFF routes, simple caching, and a tiny UI.
- UI should render:
  - Article detail page by ID
  - (Optionally) a list view with filters

---

## 🚀 Tech Stack

- **Next.js 14+ (App Router)**
- **TypeScript**
- **TailwindCSS** (styling, no hardcoded hexes)
- **Zod** (schema validation)
- **sanitize-html** (safe rendering of article body)
- (Optional) **Storybook** for UI components

---

## 📂 Project Structure

```
/app
  /api
    /articles/route.ts            # GET /api/articles
    /articles/[id]/route.ts       # GET /api/articles/:id
    /authors/route.ts             # GET /api/authors
    /topics/route.ts              # GET /api/topics
    /search/route.ts              # GET /api/search?q=...
    /seo/articles/[id]/route.ts   # GET /api/seo/articles/:id
  /uptick
    /page.tsx                     # Article list page (filters, pagination)
    /article/[id]/page.tsx        # Article detail page (server component)
/components
  ArticleCard.tsx
  ArticleByline.tsx
  Filters.tsx
/lib
  /bff
    articles.ts
    authors.ts
    topics.ts
  /models/article.ts
/mocks
  articles.json
  authors.json
  topics.json
/styles
  globals.css
```

---

## 🔑 Features

### API Endpoints

- **GET /api/articles**  
  Supports:

  - `topic` → filter by topic id
  - `q` → search title/excerpt/seo.description
  - `limit` (default 10)
  - `offset` (default 0)
  - `sort` (`publishedAt_desc` default, or `publishedAt_asc`)

- **GET /api/articles/:id**  
  Returns full article, with expanded author + topics.

- **GET /api/authors**  
  Returns all authors.

- **GET /api/topics**  
  Returns all topics.

- **GET /api/search?q=...**  
  Searches in `title`, `excerpt`, `seo.description`.

- **GET /api/seo/articles/:id**  
  Returns SEO metadata (`title`, `description`, `openGraph`).

---

### API Error Shape

```json
{
  "error": { "code": "BadRequest", "message": "Invalid query param: limit" }
}
```

---

### UI

- **List page** (`/uptick`)

  - Server component fetches `/api/articles`
  - Filters (client component):
    - Topic dropdown → updates instantly
    - Search input → debounced (500ms)
  - Pagination (server links)

- **Detail page** (`/uptick/article/[id]`)
  - Fetches from `/api/articles/:id`
  - Renders:
    - Title
    - Hero image
    - Author byline (avatar, role, published date, reading time)
    - Article body (sanitized HTML)
    - CTA button
  - Metadata via `/api/seo/articles/:id`

---

## 🛠️ Setup & Run

1. Clone repo

   ```bash
   git clone https://github.com/harshasurya02/techxot-test.git
   cd techxot-bff
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run dev server

   ```bash
   npm run dev
   ```

4. Open app
   ```
   http://localhost:3000/
   ```

---

## 📖 Example Requests

```bash
# List articles
curl http://localhost:3000/api/articles

# Filter by topic
curl "http://localhost:3000/api/articles?topic=tp-risk"

# Single article
curl http://localhost:3000/api/articles/art-001

# SEO metadata
curl http://localhost:3000/api/seo/articles/art-001

# Search
curl "http://localhost:3000/api/search?q=tokenization"
```

---

## ✅ Acceptance Checks

- `GET /api/articles` → returns 2 items sorted by `publishedAt` desc
- `GET /api/articles?topic=tp-risk` → returns both sample articles
- `GET /api/articles/art-001` → full article with expanded author
- `GET /api/search?q=tokenization` → tokenization article
- `/uptick/article/art-001` → renders article page with SEO tags

---

## 📌 Decisions & Tradeoffs

- Repo layer in `/lib/bff` → handles filtering, pagination, joins → keeps API routes clean.
- **SEO** handled by dedicated BFF route → decoupled from article response.
- **Sanitization** via `sanitize-html` to prevent XSS.
- **Caching** → basic `Cache-Control` headers for list/detail.
- **UI** minimal with Tailwind, responsive grid.
- **Zod** used for schema validation, can be extended.
- **Pagination** → server links for simplicity.

---

## 📌 Pending / Optional

- Storybook stories for `ArticleCard` & `ArticleByline`
- Stronger query param validation via Zod
- Sitemap endpoint (`/api/seo/articles`) for sitemap.xml generation
- Rich sanitization rules for embeds/iframes
- SSG for all articles on build

---
