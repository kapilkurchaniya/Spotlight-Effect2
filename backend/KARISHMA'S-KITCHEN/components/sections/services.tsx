"use client"

import { useEffect, useRef, useState } from "react"
import { Truck, Store, Sparkles, Clock, Leaf, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    icon: Truck,
    title: "Home Delivery",
    description: "Fresh, healthy meals delivered right to your doorstep in Bhopal. We ensure your food arrives hot and fresh.",
    features: ["Fast delivery", "Eco-friendly packaging", "Real-time tracking"],
    timing: "Daily 6:00 PM - 8:30 PM",
  },
  {
    icon: Store,
    title: "Dine-In Restaurant",
    description: "Visit our cozy restaurant for a relaxing healthy dining experience. Perfect for family gatherings and casual meet-ups.",
    features: ["Comfortable seating", "Fresh ambiance", "Full menu available"],
    timing: "Same as delivery hours",
  },
  {
    icon: Sparkles,
    title: "Friday Specials",
    description: "Exclusive healthy treats and special menu items available only on Fridays. Don't miss our signature healthy eats!",
    features: ["Limited edition dishes", "Special discounts", "Early bird offers"],
    timing: "Fridays 9:00 AM - 3:30 PM",
    isPromo: true,
  },
]

const highlights = [
  { icon: Clock, label: "Quick Service" },
  { icon: Leaf, label: "Fresh Ingredients" },
  { icon: Heart, label: "Made with Love" },
]

export function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 lg:py-32 bg-gradient-to-b from-card to-background"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Multiple ways to enjoy Karishma Healthy Kitchen. Choose what works best for you!
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`relative overflow-hidden hover:shadow-xl transition-all duration-500 group ${
                service.isPromo ? "border-primary/50 bg-primary/5" : ""
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Promo Badge */}
              {service.isPromo && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground animate-pulse">
                    Special!
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  service.isPromo 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                }`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Timing */}
                <div className={`p-3 rounded-lg ${service.isPromo ? "bg-primary/10" : "bg-secondary"}`}>
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {service.timing}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Highlights */}
        <div
          className={`flex flex-wrap justify-center gap-6 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <highlight.icon className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">{highlight.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
