"use client"

import Link from "next/link"
import { Droplet, Heart, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <footer className="bg-foreground text-background">
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 fill-background" />
              <span className="font-bold text-lg">RedLifeline Hub</span>
            </div>
            <p className="text-sm opacity-90">Connecting life-saving blood donations with those in need.</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline transition-all duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:underline transition-all duration-300">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:underline transition-all duration-300">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link href="/compatibility" className="hover:underline transition-all duration-300">
                  Blood Types
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Information */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <h3 className="font-semibold">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:underline transition-all duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline transition-all duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline transition-all duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline transition-all duration-300">
                  About Us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (800) RED-LIFE</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@redlifelinehub.org</span>
              </li>
            </ul>
            <div className="flex gap-3 pt-2">
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-background hover:opacity-80 transition-opacity">
                  <Heart className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-background hover:opacity-80 transition-opacity">
                  <Droplet className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div className="border-t border-background/20 pt-6 text-center text-sm" variants={itemVariants}>
          <p>&copy; 2025 RedLifeline Hub Foundation. All rights reserved. Saving lives, one donation at a time.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
