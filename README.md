# Tiles Gallery

Tiles Gallery is a responsive Next.js app for showcasing premium wall and floor tiles with authentication, searchable gallery browsing, and protected details/profile features.

## Live URL
- Add your deployed URL here after deployment:
- [https://your-tiles-gallery.vercel.app](https://your-tiles-gallery.vercel.app)

## Project Purpose
- Build a modern tile-gallery web app following assignment requirements
- Implement Better Auth with MongoDB adapter and Google social login
- Practice public/private route control in Next.js App Router

## Key Features
- Home page with banner CTA, marquee text, featured tiles, and SwiperJS showcase slider
- All Tiles page with live search (title/category/tags) and loading/error/empty states
- Private tile details route with high-res preview, creator, description, tags, and stock info
- Authentication: Login, Register, Google login, logout, protected redirects
- My Profile page with Update Information form (name and image URL)
- Global loading UI and custom `not-found` page
- Fully responsive layout for mobile, tablet, and desktop

## Route Permissions
- Public: `/`, `/all-tiles`, `/login`, `/register`
- Private: `/tile/[id]`, `/my-profile`, `/my-profile/update`

## JSON Data Shape
Each tile entry follows the assignment structure:

```json
{
  "id": "tile_001",
  "title": "Ceramic Blue Tile",
  "description": "Premium ceramic tile with blue glaze finish",
  "image": "/images/tiles/tile_001.jpg",
  "category": "ceramic",
  "price": 45.99,
  "currency": "USD",
  "dimensions": "60x60 cm",
  "material": "Ceramic",
  "creator": "Aesthetic Ceramics Studio",
  "inStock": true
}
```

## NPM Packages Used
- `next`, `react`, `react-dom`
- `better-auth`, `mongodb`, `mongoose`
- `tailwindcss`, `daisyui`
- `swiper`
- `lucide-react`, `react-icons`
- `clsx`, `tailwind-merge`, `framer-motion`

## Environment Variables
Copy `.env.example` to `.env.local` and set real values:

```bash
cp .env.example .env.local
```

Required keys:
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_APP_URL`
- `MONGODB_URI`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Run Locally
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment Notes
- Deploy easily with [Vercel](https://vercel.com/) or Render
- Add all environment variables in your deployment dashboard
- App Router handles direct route reloads without SPA refresh errors

## Assignment Checklist
- [x] Unique design and responsive UI
- [x] Better Auth + MongoDB adapter
- [x] Google social login
- [x] Private/public routes
- [x] Loader and not-found page
- [x] Profile update feature
- [x] SwiperJS integration
- [ ] Add at least 10 meaningful commits (do this in your own git history)
