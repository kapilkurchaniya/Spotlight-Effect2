'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart, Users, Shield, Zap } from 'lucide-react'

export default function AboutPage() {
  const team = [
    { name: 'Dr. Sarah Johnson', role: 'Founder & Medical Director', bio: 'Former head of transfusion medicine at Central Hospital' },
    { name: 'Dr. James Smith', role: 'Clinical Advisor', bio: 'Emergency medicine specialist with 15 years experience' },
    { name: 'Emily Chen', role: 'Operations Manager', bio: 'Healthcare logistics expert' },
    { name: 'Michael Rodriguez', role: 'Technology Lead', bio: 'Full-stack developer specializing in health tech' },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of giving and saving lives through voluntary blood donation.',
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Every donation is carefully verified and tested to ensure patient safety and quality.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We build a network of dedicated donors and healthcare providers working together.',
    },
    {
      icon: Zap,
      title: 'Efficiency',
      description: 'Technology enables faster matching and reduces wait times for critical blood needs.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Our Mission: Save Lives Through Blood Donation
            </h1>
            <p className="text-lg text-muted-foreground">
              RedLifeline Hub Foundation is dedicated to connecting life-saving blood donations with patients in need through technology, verification, and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Why We Started</h2>
              <p className="text-muted-foreground leading-relaxed">
                In 2020, our founder Dr. Sarah Johnson witnessed critical shortages of rare blood types during an emergency. A patient's life hung in the balance while precious hours were wasted searching for compatible blood. This experience sparked a vision: what if technology could connect verified donors with patients in real-time?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                RedLifeline Hub was born from this conviction. We combined medical expertise with cutting-edge technology to create a platform that saves lives through verified, instant blood donation matching.
              </p>
              <div className="flex gap-4 pt-4">
                <Button className="bg-primary hover:bg-accent text-primary-foreground" asChild>
                  <Link href="/register">Start Donating</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/request">Request Blood</Link>
                </Button>
              </div>
            </div>
            <Card className="p-8 bg-primary/10 border-2 border-primary">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-5xl font-bold text-primary">50K+</p>
                  <p className="text-muted-foreground">Verified Donors</p>
                </div>
                <div className="h-0.5 bg-border"></div>
                <div className="text-center space-y-2">
                  <p className="text-5xl font-bold text-accent">150K+</p>
                  <p className="text-muted-foreground">Lives Saved</p>
                </div>
                <div className="h-0.5 bg-border"></div>
                <div className="text-center space-y-2">
                  <p className="text-5xl font-bold text-primary">98%</p>
                  <p className="text-muted-foreground">Satisfaction Rate</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by these principles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-bold text-lg">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Meet the Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Healthcare professionals and technologists united by a mission to save lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <Card key={idx} className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-primary font-semibold mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-2 border-primary/20">
              <p className="text-4xl font-bold text-primary mb-2">24/7</p>
              <p className="text-muted-foreground">Support available anytime, anywhere</p>
            </Card>
            <Card className="p-8 text-center border-2 border-accent/20">
              <p className="text-4xl font-bold text-accent mb-2">100%</p>
              <p className="text-muted-foreground">Verified healthcare professionals</p>
            </Card>
            <Card className="p-8 text-center border-2 border-primary/20">
              <p className="text-4xl font-bold text-primary mb-2">HIPAA</p>
              <p className="text-muted-foreground">Full compliance with data privacy</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
