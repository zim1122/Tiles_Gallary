# Tiles Gallery

Tiles Gallery is a premium, fully responsive Next.js application designed to showcase a curated collection of wall and floor tiles. It features a modern aesthetic, robust authentication, and a dynamic searchable gallery.

## Live URL
- [https://your-tiles-gallery.vercel.app](https://your-tiles-gallery.vercel.app)

## Project Purpose
Developed as a high-end Tiles Gallery platform, this project demonstrates modern web development practices including server-side rendering, secure authentication with Better Auth, and a fluid, responsive UI using DaisyUI.

## Key Features
- **Home Page**: High-impact banner, marquee announcements, and featured tiles with SwiperJS integration.
- **All Tiles Gallery**: Comprehensive browsing with real-time search functionality.
- **Protected Tile Details**: Detailed specifications, high-res previews, and stock status (Private Route).
- **Secure Authentication**: Email/Password and Google Social Login via Better Auth.
- **User Profiles**: Personalized profile dashboard with account details (Private Route).
- **Profile Updates**: Dedicated feature to update user name and image URL.
- **Modern UI/UX**: Premium design with global loading states and custom error pages.

## Challenge Requirements
1.  **My Profile & Update Information**: 
    - Implement a `/my-profile` route displaying user data.
    - Implement a `/my-profile/update` route with a form to update name and photo URL using `better-auth`'s `updateUser` API.
2.  **External Libraries**:
    - **SwiperJS**: Integrated on the home page for a smooth, touch-friendly tile showcase slider.
    - **Lucide React**: For premium, consistent iconography throughout the site.
    - **Framer Motion**: Subtle entry animations for a polished feel.

## NPM Packages Used
- `next` & `react` (Framework)
- `better-auth` (Authentication)
- `mongodb` & `mongoose` (Database)
- `daisyui` & `tailwindcss` (Styling)
- `swiper` (Slider Gallery)
- `lucide-react` & `react-icons` (Icons)
- `framer-motion` (Animations)

## Environment Variables
Create a `.env.local` file in the root directory:
```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGO_DB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

## Route Permissions Summary
- **Public Routes**: `/`, `/all-tiles`, `/login`, `/register`
- **Private Routes**: `/tile/[id]`, `/my-profile`, `/my-profile/update`

## How to Run
1.  Install dependencies: `npm install`
2.  Start dev server: `npm run dev`
3.  Open [http://localhost:3000](http://localhost:3000)
