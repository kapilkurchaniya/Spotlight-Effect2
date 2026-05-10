"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Droplet, Heart, Users, TrendingUp, Clock, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { motion } from "framer-motion"

export default function Home() {
  const router = useRouter()
  const { isLoggedIn, userType } = useAuth()

  const handleDonorCTA = () => {
    if (isLoggedIn && userType === "donor") {
      router.push("/donor-dashboard")
    } else {
      router.push("/register")
    }
  }

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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-muted">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div className="space-y-2" variants={itemVariants}>
                <p className="text-primary font-semibold text-sm tracking-widest uppercase">
                  Verified Blood Donation Network
                </p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight gradient-text">
                  Life Flows Through Giving
                </h1>
              </motion.div>

              <motion.p className="text-lg text-muted-foreground text-balance leading-relaxed" variants={itemVariants}>
                Connect with verified donors, request urgent blood supplies, and save lives. Timely, secure, and trusted
                blood donation matching platform.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={handleDonorCTA}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold rounded-full glow-effect transition-all duration-300"
                  >
                    {isLoggedIn && userType === "donor" ? "Go to Dashboard" : "Become a Donor"}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-2 border-primary text-primary hover:bg-primary/5 rounded-full bg-transparent"
                  >
                    <Link href="/request">Request Blood Now</Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div className="grid grid-cols-3 gap-4 pt-8" variants={containerVariants}>
                {[
                  { value: "50K+", label: "Active Donors" },
                  { value: "100%", label: "Verified" },
                  { value: "24/7", label: "Support" },
                ].map((stat, idx) => (
                  <motion.div key={idx} className="space-y-1" variants={itemVariants} whileHover={{ scale: 1.05 }}>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-80 h-80">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="relative glass rounded-3xl p-8 flex flex-col items-center justify-center space-y-6 border-2 border-white/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="relative w-32 h-32 flex items-center justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Droplet className="w-32 h-32 text-primary/30" />
                    <Heart className="w-20 h-20 text-gradient-text absolute fill-primary" />
                  </motion.div>
                  <div className="text-center space-y-1">
                    <p className="font-bold text-lg">One Donation</p>
                    <p className="text-sm text-muted-foreground">Can save up to 3 lives</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive blood donation solutions designed for donors, patients, and healthcare providers.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: Droplet,
                title: "Easy Registration",
                description: "Quick eligibility assessment and health questionnaire to become a verified donor.",
                color: "primary",
              },
              {
                icon: TrendingUp,
                title: "Real-Time Matching",
                description: "Instant alerts for urgent blood requests matching your blood group and location.",
                color: "accent",
              },
              {
                icon: Shield,
                title: "Secure & Safe",
                description: "HIPAA compliant platform with verified healthcare providers and secure data handling.",
                color: "primary",
              },
              {
                icon: Users,
                title: "Doctor Verified",
                description: "All blood requests are verified by licensed medical professionals.",
                color: "accent",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Round-the-clock support for emergency blood requests and donor coordination.",
                color: "primary",
              },
              {
                icon: Heart,
                title: "Track Your Impact",
                description: "Monitor your donations and see how you're making a difference.",
                color: "accent",
              },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 card-hover">
                    <div className="flex items-start gap-4">
                      <motion.div
                        className={`p-3 bg-${feature.color}/10 rounded-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                      </motion.div>
                      <div className="space-y-2 flex-1">
                        <h3 className="font-bold text-lg">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blood Type Section */}
      <section id="compatibility" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Blood Type Compatibility</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understand how different blood types work and who can donate to whom.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Compatibility Chart */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((blood) => (
                  <div
                    key={blood}
                    className="p-4 rounded-lg border-2 border-primary bg-primary/5 text-center font-semibold text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    {blood}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Click on a blood type to learn about donors and recipients.
              </p>
            </div>

            {/* Educational Content */}
            <Card className="p-8 bg-card border-2 border-primary/20">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Universal Donor</h3>
                  <p className="text-sm text-muted-foreground">
                    O- (O negative) blood type is the universal donor. Anyone can receive it in emergencies.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Universal Recipient</h3>
                  <p className="text-sm text-muted-foreground">
                    AB+ (AB positive) blood type is the universal recipient. They can receive from any blood type.
                  </p>
                </div>
                <Button asChild className="w-full bg-primary hover:bg-accent text-primary-foreground">
                  <Link href="/compatibility">Learn More</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-primary text-primary-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            className="text-lg opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Join thousands of verified donors who are saving lives every day.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" asChild variant="secondary">
                <Link href="/register">Start Donating Today</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}
