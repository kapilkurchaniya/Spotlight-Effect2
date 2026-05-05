"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Phone, MessageCircle, Mail, Send, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
}

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>()

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

  const onSubmit = (data: ContactForm) => {
    console.log("[v0] Form submitted:", data)
    // In production, this would send to an API
    setIsSubmitted(true)
    reset()
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container mx-auto px-4">
        {/* Friday Banner */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-primary-foreground">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-10 animate-pulse">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="absolute bottom-4 right-10 animate-pulse delay-300">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="absolute top-1/2 left-1/4 animate-pulse delay-500">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-sm font-medium mb-4">
                <Clock className="h-4 w-4" />
                Friday Promo
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Friday Healthy Eats Special!
              </h3>
              <p className="text-lg opacity-90 mb-4">
                Exclusive healthy treats available every Friday from 9:00 AM to 3:30 PM
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <a
                  href="https://wa.me/919109017628?text=Hi!%20I'd%20like%20to%20know%20about%20Friday%20specials"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to order or have questions? Reach out to us through any of these channels!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Options */}
          <div
            className={`space-y-6 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* WhatsApp Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#25D366]/10 rounded-xl">
                    <MessageCircle className="h-8 w-8 text-[#25D366]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      WhatsApp (Fastest!)
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Quick orders and instant responses
                    </p>
                    <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white" asChild>
                      <a
                        href="https://wa.me/919109017628?text=Hi!%20I'd%20like%20to%20order%20from%20Karishma%20Healthy%20Kitchen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phone Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      Call Us
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Speak directly for bulk orders or inquiries
                    </p>
                    <Button variant="outline" asChild>
                      <a href="tel:+919109017628" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 rounded-xl">
                    <Mail className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      Email Us
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      For detailed inquiries and feedback
                    </p>
                    <a
                      href="mailto:khk@gmail.com"
                      className="text-primary hover:underline font-medium"
                    >
                      khk@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                  Send us a Message
                </h3>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg text-foreground mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-muted-foreground">
                      We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        {...register("name", { required: "Name is required" })}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        placeholder="+91 XXXXX XXXXX"
                        {...register("phone")}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={4}
                        {...register("message", { required: "Message is required" })}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
