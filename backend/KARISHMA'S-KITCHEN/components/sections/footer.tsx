"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Heart } from "lucide-react"

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

const quickLinks = [
  { href: "#about", label: "About Us" },
  { href: "#menu", label: "Menu" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-3xl font-bold">करिश्ma</h3>
              <p className="text-sm text-background/70">Healthy Kitchen</p>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Bhopal's premier healthy food destination. We serve high-protein, fiber-rich, and low-gluten meals that taste amazing.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Opening Hours</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex justify-between">
                <span>Mon - Thu</span>
                <span>6:00 PM - 8:30 PM</span>
              </li>
              <li className="flex justify-between text-background">
                <span>Friday (Special!)</span>
                <span>9:00 AM - 3:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sat - Sun</span>
                <span>6:00 PM - 8:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Bhopal 462043, Madhya Pradesh, India</span>
              </li>
              <li>
                <a href="tel:+919109017628" className="flex items-center gap-3 hover:text-background transition-colors">
                  <Phone className="h-5 w-5 shrink-0" />
                  <span>+91 91090 17628</span>
                </a>
              </li>
              <li>
                <a href="mailto:khk@gmail.com" className="flex items-center gap-3 hover:text-background transition-colors">
                  <Mail className="h-5 w-5 shrink-0" />
                  <span>khk@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <p>
              © {currentYear} Karishma Healthy Kitchen. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-400 fill-red-400" /> in Bhopal
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
