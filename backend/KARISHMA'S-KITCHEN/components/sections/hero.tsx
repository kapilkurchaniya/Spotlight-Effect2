"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Leaf, Dumbbell, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Hero3DScene } from "./hero-3d-scene"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10"
    >
      {/* 3D Background */}
      <Hero3DScene />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Logo */}
          <div className="mb-6">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary drop-shadow-lg">
              करिश्ma
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mt-2">
              Healthy Kitchen
            </p>
          </div>

          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-8 text-balance">
            High-Protein, Fiber-Rich, Low-Gluten{" "}
            <span className="text-primary font-semibold">Deliciousness</span> Delivered!
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Dumbbell className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">High Protein</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Fiber Rich</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Low Gluten</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#menu">View Our Menu</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <a
                href="https://wa.me/919109017628?text=Hi!%20I'd%20like%20to%20order%20from%20Karishma%20Healthy%20Kitchen"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Now
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        aria-label="Scroll to learn more"
      >
        <ChevronDown className="h-10 w-10 text-primary/70" />
      </button>
    </section>
  )
}
