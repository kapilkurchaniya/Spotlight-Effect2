import { Suspense, lazy } from "react"
import { Navigation } from "@/components/sections/navigation"
import { Hero } from "@/components/sections/hero"
import { Footer } from "@/components/sections/footer"

// Lazy load below-the-fold sections for performance
const About = lazy(() => import("@/components/sections/about").then(m => ({ default: m.About })))
const Menu = lazy(() => import("@/components/sections/menu").then(m => ({ default: m.Menu })))
const Services = lazy(() => import("@/components/sections/services").then(m => ({ default: m.Services })))
const Testimonials = lazy(() => import("@/components/sections/testimonials").then(m => ({ default: m.Testimonials })))
const Contact = lazy(() => import("@/components/sections/contact").then(m => ({ default: m.Contact })))

// Loading fallback component
function SectionLoader() {
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Menu />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      
      <Footer />
    </main>
  )
}
