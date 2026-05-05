"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Fitness Enthusiast",
    content: "Karishma Healthy Kitchen has transformed my meal prep routine! The grilled chicken salad is absolutely divine, and the protein content is perfect for my post-workout meals.",
    rating: 5,
    initials: "PS",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Software Engineer",
    content: "Finally found healthy food in Bhopal that actually tastes amazing! The Friday specials are a must-try. I've been ordering every week for the past 3 months.",
    rating: 5,
    initials: "RV",
  },
  {
    id: 3,
    name: "Anjali Patel",
    role: "Yoga Instructor",
    content: "As someone who's very particular about what I eat, I'm impressed by the quality and freshness. The quinoa bowl is my go-to order. Highly recommend to all health-conscious folks!",
    rating: 5,
    initials: "AP",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Business Owner",
    content: "Great taste, generous portions, and delivered on time every single time. The packaging is eco-friendly too! Karishma has become our family's favorite healthy food option.",
    rating: 4,
    initials: "VS",
  },
]

export function Testimonials() {
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
      id="testimonials"
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
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our happy customers have to say about their Karishma experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`relative overflow-hidden hover:shadow-lg transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="h-16 w-16 text-primary" />
              </div>

              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 bg-primary/10">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
