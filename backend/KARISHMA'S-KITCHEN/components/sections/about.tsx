"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Clock, Truck, Utensils } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Daily delivery from 6:00 PM to 8:30 PM",
  },
  {
    icon: Utensils,
    title: "Dine-In Available",
    description: "Visit our restaurant for a healthy dining experience",
  },
  {
    icon: Clock,
    title: "Fresh Daily",
    description: "All meals prepared fresh with quality ingredients",
  },
]

export function About() {
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
      id="about"
      className="py-20 lg:py-32 bg-card"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Karishma Healthy Kitchen brings you nutritious, delicious meals right to your doorstep in Bhopal.
            We believe healthy food should never compromise on taste.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image & Map */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
                alt="Healthy colorful salad bowl"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117251.51738548447!2d77.35051244365236!3d23.25990814999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1706000000000!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Karishma Healthy Kitchen Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Features & Info */}
          <div
            className={`space-y-8 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Location Badge */}
            <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-xl">
              <MapPin className="h-6 w-6 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Our Location</p>
                <p className="text-muted-foreground">Bhopal 462043, Madhya Pradesh, India</p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Hours */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 rounded-xl">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                Delivery Hours
              </h3>
              <div className="space-y-2 text-foreground/80">
                <p className="flex justify-between">
                  <span>Mon - Thu, Sat - Sun:</span>
                  <span className="font-medium">6:00 PM - 8:30 PM</span>
                </p>
                <p className="flex justify-between text-primary font-medium">
                  <span>Friday Special:</span>
                  <span>9:00 AM - 3:30 PM</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
