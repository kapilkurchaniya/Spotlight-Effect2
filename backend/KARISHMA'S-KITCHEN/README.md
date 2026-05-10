# Karishma Healthy Kitchen 🌿🥗

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn--ui-2.5-00d1b2?logo=shadcn)](https://ui.shadcn.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000?logo=vercel)](https://vercel.com)

Bhopal's premier **high-protein, fiber-rich, low-gluten** vegetarian meal delivery service. Modern, responsive Next.js website with 3D hero animations, lazy-loaded sections, WhatsApp ordering integration, and full SEO optimization.

![Hero Preview](https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80) <!-- Placeholder; replace with screenshot -->

## 🚀 Quick Start

```bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

## ✨ Features

- **Modern Next.js 16 App Router** with TypeScript
- **Performance Optimized**: Lazy loading with React Suspense, optimized images
- **3D Hero Section** powered by Three.js / @react-three/fiber
- **Responsive Design** with Tailwind CSS v4 + shadcn/ui components
- **Daily Thali Menu** with nutrition info (high-protein/fiber tracking)
- **WhatsApp Ordering**: One-click ordering to +91-9109017628
- **SEO Ready**: Meta tags, OpenGraph, Schema.org restaurant JSON-LD
- **Dark/Light Mode** support via next-themes
- **Analytics**: Vercel Analytics integrated
- **Smooth Animations**: Framer Motion, page flips, scroll reveals

## 📁 Project Structure

```
KARISHMA'S-KITCHEN/
├── app/
│   ├── globals.css          # Tailwind/PostCSS styles
│   ├── layout.tsx           # Root layout + metadata
│   └── page.tsx             # Main page with sections
├── components/
│   ├── sections/            # Hero, Menu, About, etc.
│   ├── ui/                  # shadcn/ui components
│   └── theme-provider.tsx   # Theme context
├── lib/utils.ts             # cn() utility
├── public/                  # Static assets (icons, placeholders)
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind v4 config
├── next.config.mjs          # Next.js config
└── README.md                # This file!
```

## 🥘 Website Sections

| Section | Description | Key Features |
|---------|-------------|--------------|
| **Hero** | 3D animated landing with nutrition badges | WhatsApp CTA, scroll indicator |
| **Menu** | Daily thalis + a la carte bowls/salads | Nutrition stats, page flip animation, weekly schedule |
| **About** | Kitchen story & philosophy | Fiber/protein focus |
| **Services** | Delivery details, meal plans | Bhopal coverage |
| **Testimonials** | Customer reviews | Social proof carousel |
| **Contact** | Order form + WhatsApp | Direct ordering |
| **Footer** | Links, social, copyright | Quick navigation |

**Sample Menu Items**:
- **Daily Thalis**: ₹200-₹280 (e.g., Sunday Special: Paneer Butter Masala + Gulab Jamun)
- **A La Carte**: Quinoa Power Bowl (18g protein), Paneer Tikka Bowl (28g protein), etc.

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, shadcn/ui, clsx/cva |
| **UI Components** | Radix UI primitives |
| **3D/Animations** | Three.js, @react-three/fiber/drei |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Toasts** | Sonner |
| **State** | React Context (themes) |
| **Utils** | date-fns, lodash-es |

Full dependencies in [package.json](package.json).

## ⚙️ Customization

### Update Menu/Thalis
Edit `components/sections/menu.tsx`:
```typescript
const dayThalis: Record<string, {...}> = {
  Sunday: { name: "New Thali", items: [...], price: 300 },
  // Add your custom items
}
```

### WhatsApp Number
Update in `hero.tsx`, `menu.tsx`:
```typescript
href="https://wa.me/YOUR_NUMBER?text=..."
```

### Colors/Branding
- `components.json` (shadcn config)
- `tailwind.config.ts`
- Primary brand color: Tailwind `primary`

### Add Sections
Import in `app/page.tsx`:
```typescript
const NewSection = lazy(() => import("@/components/sections/new"))
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. [vercel.com](https://vercel.com) → Import repo → Deploy

CLI:
```bash
pnpm add -g vercel
vercel --prod
```

### Other Platforms
- **Netlify**: `pnpm build` → `out/` folder
- **Self-host**: `pnpm build` → `pnpm start`

Environment variables (optional): None required.

## 📱 Local Commands

```bash
pnpm dev     # Development: http://localhost:3000
pnpm build   # Production build
pnpm start   # Production server: http://localhost:3000
pnpm lint    # ESLint
```

## 🤝 Ordering Info

- **WhatsApp**: [+91-9109017628](https://wa.me/919109017628)
- **Delivery**: Bhopal only
- **Timing**: Mon-Thu/Sat-Sun 6-8:30PM, Fri 9AM-3:30PM
- **Payment**: Cash/UPI on delivery

## 📄 License

This project is [MIT licensed](LICENSE) ✨

---

⭐ **Star on GitHub if you found this useful!**  
Built with ❤️ for healthy eating in Bhopal.

