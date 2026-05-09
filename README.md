<div align="center">

# 🧱 Tiles Gallery  
### ✨ Discover Your Perfect Aesthetic ✨

A modern, fully responsive tile showcase platform built with **Next.js App Router**, **BetterAuth**, and **MongoDB**.  
Explore premium tile collections, discover aesthetic designs, and experience a clean modern UI.

<br/>

![Next JS](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)
![BetterAuth](https://img.shields.io/badge/Auth-BetterAuth-orange?style=for-the-badge)

</div>

---

# 🌐 Live Website

🔗 **Live Site:**  
https://tiles-gallary-h6ig.vercel.app

---

# 📖 About The Project

**Tiles Gallery** is a modern interior-inspired web application where users can browse elegant tile collections, search for aesthetic designs, explore tile details, and manage their profile securely.

The project focuses on:

- Modern UI/UX
- Responsive Design
- Secure Authentication
- Dynamic Data Rendering
- Clean Component Architecture

---

# ✨ Core Features

## 🏠 Stunning Home Page
✔ Eye-catching Hero Banner  
✔ Animated Marquee Section  
✔ Featured Tile Showcase  
✔ Smooth CTA Navigation  
✔ Responsive Layout  

---

## 🖼️ Dynamic Tile Gallery
✔ Search tiles instantly by title  
✔ Dynamic cards from JSON server  
✔ Clean masonry/grid layout  
✔ Responsive gallery system  

---

## 🔍 Tile Details Page
✔ Large high-resolution preview  
✔ Tile descriptions & categories  
✔ Tags & style information  
✔ Protected route access  

---

## 🔐 Authentication System
✔ Login with Email & Password  
✔ Register New Account  
✔ Google Social Login  
✔ BetterAuth Integration  
✔ Secure Route Protection  
✔ Error & Success Toasts  

---

## 👤 My Profile Dashboard
✔ View user information  
✔ Update profile image  
✔ Update display name  
✔ Dynamic user session handling  

---

## 🚀 Additional Features
✔ Custom Loading Spinner  
✔ 404 Not Found Page  
✔ Environment Variables Security  
✔ Mobile-First Responsive Design  
✔ Smooth Animations  
✔ Protected Private Routes  
✔ JSON Server API Integration  

---

# 🧩 Tech Stack

| Technology | Usage |
|---|---|
| Next.js 15 | Frontend Framework |
| React | UI Development |
| Tailwind CSS | Styling |
| DaisyUI / HeroUI | UI Components |
| BetterAuth | Authentication |
| MongoDB | Database |
| JSON Server | Mock Backend |
| Axios | API Requests |
| SwiperJS | Slider & Carousel |
| Animate.css | Animations |
| React Hot Toast | Notifications |

---

# 📂 Project Structure

```bash
src/
│
├── app/
│   ├── login/
│   ├── register/
│   ├── all-tiles/
│   ├── tile/[id]/
│   ├── my-profile/
│   └── not-found.jsx
│
├── components/
│   ├── Navbar
│   ├── Footer
│   ├── Banner
│   ├── TileCard
│   └── Loader
│
├── providers/
├── hooks/
├── services/
├── lib/
└── utils/
```

---

# 🔐 Environment Variables

Create a `.env.local` file and add:

```env
MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_secret_key

BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

# 📦 Installation Guide

## 📥 Clone Repository

```bash
git clone https://github.com/your-username/tiles-gallery.git
```

---

## 📁 Move To Project Folder

```bash
cd tiles-gallery
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## ▶ Run JSON Server

```bash
npx json-server --watch db.json --port 5000
```

---

## 🚀 Start Development Server

```bash
npm run dev
```

---

## 🌍 Open Browser

```bash
http://localhost:3000
```

---

# 🛣️ Route Permissions

| Route | Type |
|---|---|
| `/` | 🌐 Public |
| `/all-tiles` | 🌐 Public |
| `/login` | 🌐 Public |
| `/register` | 🌐 Public |
| `/tile/[id]` | 🔒 Private |
| `/my-profile` | 🔒 Private |

---

# 🧱 Sample Tile JSON

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
  "inStock": true
}
```

---

# 📱 Responsive Design

The application is fully optimized for:

✅ Mobile Devices  
✅ Tablets  
✅ Laptops  
✅ Desktop Screens  

---

# 🎯 Challenge Features Implemented

## 👤 My Profile Feature
- Dynamic user profile page
- Update user name
- Update profile image

## 🔄 Update Information System
- Separate update route
- BetterAuth update-user integration

## 🎨 Library Integration
- SwiperJS
- Animate.css

---

# 🚀 Deployment

This project is deployed on:

### ▲ Vercel
https://your-live-site-url.vercel.app

---

# 📸 Project Preview

## 🏠 Home Page
_Add screenshot here_

## 🖼️ All Tiles Page
_Add screenshot here_

## 👤 Profile Page
_Add screenshot here_

---

# 📋 Requirements Checklist

- [x] Next.js App Router
- [x] BetterAuth Authentication
- [x] MongoDB Integration
- [x] Responsive Design
- [x] Private Routes
- [x] JSON Server
- [x] Search Functionality
- [x] Google Login
- [x] User Profile Update
- [x] Dynamic Tile Details
- [x] Custom UI Design

---

# 👨‍💻 Author

## Your Name

🔗 GitHub:  
https://github.com/your-username

🔗 LinkedIn:  
https://linkedin.com/in/your-profile

---

<div align="center">

# ⭐ If you like this project, give it a star ⭐

</div>

---

# 📜 License

This project is created for educational and assignment purposes only.
