"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplet } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { WelcomeMessage } from "@/components/welcome-message"
import { motion } from "framer-motion"

export function Header() {
  const { isLoggedIn, userType, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <motion.header
      className="sticky top-0 z-40 glass border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-primary hover:text-accent transition-colors"
            >
              <Droplet className="w-6 h-6 fill-primary" />
              <div className="hidden sm:flex flex-col">
                <span className="leading-none">RedLifeline Hub</span>
                <span className="text-xs text-muted-foreground font-normal">Foundation</span>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {isLoggedIn && userType === "donor" && (
              <>
                <Link href="#features" className="text-foreground hover:text-primary transition-colors duration-300">
                  Services
                </Link>
                <Link href="/hospitals" className="text-foreground hover:text-primary transition-colors duration-300">
                  Hospitals
                </Link>
                <Link href="/campaigns" className="text-foreground hover:text-primary transition-colors duration-300">
                  Campaigns
                </Link>
                <Link
                  href="/compatibility"
                  className="text-foreground hover:text-primary transition-colors duration-300"
                >
                  Blood Types
                </Link>
                <Link href="/about" className="text-foreground hover:text-primary transition-colors duration-300">
                  About
                </Link>
                <Link href="/user-guide" className="text-foreground hover:text-primary transition-colors duration-300">
                  Guide
                </Link>
                <Link href="/contact" className="text-foreground hover:text-primary transition-colors duration-300">
                  Contact
                </Link>
              </>
            )}

            {isLoggedIn && userType === "hospital" && (
              <>
                <Link
                  href="/campaign-requests"
                  className="text-foreground hover:text-primary transition-colors duration-300"
                >
                  Campaign Requests
                </Link>
                <Link href="/hospitals" className="text-foreground hover:text-primary transition-colors duration-300">
                  Hospitals
                </Link>
                <Link href="/inventory" className="text-foreground hover:text-primary transition-colors duration-300">
                  Blood Inventory
                </Link>
              </>
            )}
          </nav>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isLoggedIn ? (
              <>
                <WelcomeMessage />
                <span className="text-sm text-muted-foreground">
                  ({userType.charAt(0).toUpperCase() + userType.slice(1)})
                </span>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </motion.div>
                <div className="hidden sm:block">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      <Link href="/blood-centre-login">Centre Login</Link>
                    </Button>
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" asChild className="bg-primary hover:bg-accent text-primary-foreground">
                    <Link href="/register">Register</Link>
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
