"use client"

import React, { useEffect, useRef, useState, useMemo } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, Leaf, Wheat, ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react"

// Day-based Thali Menu
const dayThalis: Record<string, { name: string; description: string; items: string[]; price: number }> = {
  Sunday: {
    name: "Sunday Special Thali",
    description: "A royal feast to start your week with energy",
    items: ["Paneer Butter Masala", "Dal Makhani", "Jeera Rice", "2 Roti", "Raita", "Salad", "Gulab Jamun"],
    price: 280,
  },
  Monday: {
    name: "Protein Power Thali",
    description: "High-protein start for a productive week",
    items: ["Soya Chunk Curry", "Chana Dal", "Brown Rice", "Multigrain Roti", "Sprout Salad", "Buttermilk"],
    price: 220,
  },
  Tuesday: {
    name: "South Indian Thali",
    description: "Authentic South Indian flavors with a healthy twist",
    items: ["Sambar", "Rasam", "Vegetable Kootu", "Rice", "Papad", "Coconut Chutney", "Banana"],
    price: 200,
  },
  Wednesday: {
    name: "Gujarati Thali",
    description: "Sweet, salty, and perfectly balanced",
    items: ["Undhiyu", "Kadhi", "Rice", "Bajra Roti", "Thepla", "Pickle", "Shrikhand"],
    price: 240,
  },
  Thursday: {
    name: "Rajasthani Thali",
    description: "Royal flavors from the land of kings",
    items: ["Dal Baati", "Gatte ki Sabzi", "Ker Sangri", "Rice", "Churma", "Raita"],
    price: 260,
  },
  Friday: {
    name: "Friday Detox Thali",
    description: "Light and cleansing for the weekend prep",
    items: ["Mixed Veg Soup", "Quinoa Pulao", "Grilled Vegetables", "Hummus", "Salad Bowl", "Fresh Juice"],
    price: 250,
  },
  Saturday: {
    name: "Punjabi Thali",
    description: "Hearty Punjabi comfort food",
    items: ["Chole", "Paneer Bhurji", "Jeera Rice", "Tandoori Roti", "Lassi", "Pickle", "Onion Salad"],
    price: 260,
  },
}

// Regular menu items (veg only)
const menuItems = [
  {
    id: 1,
    name: "Quinoa Power Bowl",
    description: "Organic quinoa with roasted vegetables, chickpeas, and tahini dressing",
    price: 220,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
    badges: ["high-fiber", "high-protein"],
    protein: "18g",
    fiber: "12g",
  },
  {
    id: 2,
    name: "Paneer Tikka Bowl",
    description: "Spiced cottage cheese with brown rice, grilled vegetables, and mint chutney",
    price: 200,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    badges: ["high-protein", "low-gluten"],
    protein: "28g",
    fiber: "6g",
  },
  {
    id: 3,
    name: "Sprouted Moong Salad",
    description: "Fresh sprouted moong beans with cucumber, tomato, lemon, and herbs",
    price: 150,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    badges: ["high-protein", "high-fiber"],
    protein: "14g",
    fiber: "10g",
  },
  {
    id: 4,
    name: "Avocado Toast",
    description: "Multigrain toast topped with fresh avocado, seeds, and microgreens",
    price: 180,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&q=80",
    badges: ["high-fiber", "low-gluten"],
    protein: "12g",
    fiber: "10g",
  },
  {
    id: 5,
    name: "Dal Tadka with Brown Rice",
    description: "Protein-rich lentils tempered with cumin, garlic, and served with brown rice",
    price: 160,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
    badges: ["high-protein", "high-fiber"],
    protein: "22g",
    fiber: "14g",
  },
  {
    id: 6,
    name: "Protein Smoothie Bowl",
    description: "Blended banana with plant protein, topped with nuts, seeds, and fresh fruits",
    price: 180,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80",
    badges: ["high-protein", "high-fiber"],
    protein: "20g",
    fiber: "9g",
  },
  {
    id: 7,
    name: "Mediterranean Platter",
    description: "Hummus, falafel, tabbouleh, and whole wheat pita with fresh vegetables",
    price: 250,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
    badges: ["high-fiber", "high-protein"],
    protein: "16g",
    fiber: "14g",
  },
  {
    id: 8,
    name: "Palak Paneer Wrap",
    description: "Creamy spinach with cottage cheese in a whole wheat roti wrap",
    price: 170,
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80",
    badges: ["high-protein", "low-gluten"],
    protein: "24g",
    fiber: "8g",
  },
]

const badgeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  "high-protein": { icon: Dumbbell, color: "bg-blue-100 text-blue-700" },
  "high-fiber": { icon: Leaf, color: "bg-green-100 text-green-700" },
  "low-gluten": { icon: Wheat, color: "bg-amber-100 text-amber-700" },
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function Menu() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")
  const sectionRef = useRef<HTMLElement>(null)
  const menuGridRef = useRef<HTMLDivElement>(null)

  // Get today's day name
  const today = useMemo(() => days[new Date().getDay()], [])
  const todayThali = dayThalis[today]

  // Items per page for pagination
  const itemsPerPage = 4
  const totalPages = Math.ceil(menuItems.length / itemsPerPage)
  const currentItems = menuItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Auto-open menu with delay for dramatic effect
          setTimeout(() => setIsMenuOpen(true), 500)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handlePageChange = (direction: "next" | "prev") => {
    if (isFlipping) return
    
    setFlipDirection(direction)
    setIsFlipping(true)
    
    setTimeout(() => {
      if (direction === "next" && currentPage < totalPages - 1) {
        setCurrentPage(prev => prev + 1)
      } else if (direction === "prev" && currentPage > 0) {
        setCurrentPage(prev => prev - 1)
      }
      setIsFlipping(false)
    }, 400)

    // Smooth scroll to menu grid
    menuGridRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="py-20 lg:py-32 bg-background scroll-smooth"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            100% Vegetarian. Carefully crafted meals that fuel your body and delight your taste buds.
          </p>
        </div>

        {/* Today's Special Thali */}
        <div
          className={`mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 p-1">
            <div className="bg-card rounded-[22px] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">{today}'s Special</span>
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {todayThali.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{todayThali.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {todayThali.items.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-2xl text-primary">₹{todayThali.price}</span>
                    <Button asChild>
                      <a
                        href={`https://wa.me/919109017628?text=Hi!%20I'd%20like%20to%20order%20today's%20${encodeURIComponent(todayThali.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Order Now
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80"
                    alt={todayThali.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Thali Schedule */}
        <div
          className={`mb-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
            Weekly Thali Menu
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {days.map((day) => (
              <div
                key={day}
                className={`p-3 rounded-xl text-center transition-all duration-300 cursor-pointer hover:scale-105 ${
                  day === today
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card hover:bg-primary/10"
                }`}
              >
                <p className="font-semibold text-sm mb-1">{day.slice(0, 3)}</p>
                <p className={`text-xs ${day === today ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  ₹{dayThalis[day].price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Book Animation */}
        <div
          className={`relative transition-all duration-1000 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Book Cover */}
          <div
            className={`relative mx-auto max-w-5xl transition-all duration-1000 ease-out ${
              isMenuOpen ? "perspective-1000" : ""
            }`}
          >
            {/* Menu Header with Page Turn Effect */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                A La Carte Menu
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange("prev")}
                  disabled={currentPage === 0 || isFlipping}
                  className="bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground px-2">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange("next")}
                  disabled={currentPage === totalPages - 1 || isFlipping}
                  className="bg-transparent"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Menu Grid with Page Flip Animation */}
            <div
              ref={menuGridRef}
              className={`relative transition-all duration-500 ease-out ${
                isFlipping
                  ? flipDirection === "next"
                    ? "animate-page-flip-out"
                    : "animate-page-flip-in"
                  : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentItems.map((item, index) => (
                  <Card
                    key={item.id}
                    className={`group overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer transform-gpu ${
                      isMenuOpen
                        ? "opacity-100 translate-y-0 rotate-0"
                        : "opacity-0 translate-y-10 -rotate-3"
                    }`}
                    style={{
                      transitionDelay: `${index * 150 + 400}ms`,
                      transformOrigin: "left center",
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Nutrition Info on Hover */}
                      <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="bg-white/90 text-xs font-medium px-2 py-1 rounded">
                          Protein: {item.protein}
                        </span>
                        <span className="bg-white/90 text-xs font-medium px-2 py-1 rounded">
                          Fiber: {item.fiber}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.badges.map((badge) => {
                          const config = badgeConfig[badge]
                          const Icon = config?.icon || Leaf
                          return (
                            <Badge
                              key={badge}
                              variant="secondary"
                              className={`text-xs ${config?.color || ""}`}
                            >
                              <Icon className="h-3 w-3 mr-1" />
                              {badge.replace("-", " ")}
                            </Badge>
                          )
                        })}
                      </div>
                      
                      {/* Name & Description */}
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      {/* Price */}
                      <p className="font-bold text-lg text-primary">
                        ₹{item.price}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button size="lg" className="text-lg px-8" asChild>
            <a
              href="https://wa.me/919109017628?text=Hi!%20I'd%20like%20to%20see%20the%20full%20menu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order via WhatsApp
            </a>
          </Button>
        </div>
      </div>

      {/* CSS for page flip animation */}
      <style jsx>{`
        @keyframes pageFlipOut {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: rotateY(-90deg);
            opacity: 0;
          }
        }
        
        @keyframes pageFlipIn {
          0% {
            transform: rotateY(90deg);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }
        
        .animate-page-flip-out {
          animation: pageFlipOut 0.4s ease-in-out forwards;
        }
        
        .animate-page-flip-in {
          animation: pageFlipIn 0.4s ease-in-out forwards;
        }
      `}</style>
    </section>
  )
}
