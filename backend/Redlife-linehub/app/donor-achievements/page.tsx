'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Download, Share2, Trophy, Zap, Heart, Star } from 'lucide-react'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  achieved: boolean
  requirement: string
}

interface Certificate {
  id: string
  donorName: string
  donationCount: number
  totalUnits: number
  dateIssued: string
  organizationName: string
  certificateNumber: string
}

const BADGES: Badge[] = [
  {
    id: '1',
    name: 'First Donor',
    description: 'Complete your first blood donation',
    icon: '🩸',
    color: 'from-red-500 to-red-600',
    achieved: true,
    requirement: '1 donation',
  },
  {
    id: '2',
    name: 'Blood Hero',
    description: 'Complete 5 blood donations',
    icon: '🦸',
    color: 'from-yellow-500 to-amber-600',
    achieved: true,
    requirement: '5 donations',
  },
  {
    id: '3',
    name: 'Life Savior',
    description: 'Complete 10 blood donations',
    icon: '💪',
    color: 'from-emerald-500 to-teal-600',
    achieved: true,
    requirement: '10 donations',
  },
  {
    id: '4',
    name: 'Legend Donor',
    description: 'Complete 25 blood donations',
    icon: '👑',
    color: 'from-purple-500 to-violet-600',
    achieved: false,
    requirement: '25 donations',
  },
  {
    id: '5',
    name: 'Consistent Giver',
    description: 'Donate every month for 6 months',
    icon: '📅',
    color: 'from-blue-500 to-cyan-600',
    achieved: true,
    requirement: '6 months consistent',
  },
  {
    id: '6',
    name: 'O-Negative Hero',
    description: 'Donate rare O-negative blood 5 times',
    icon: '⚡',
    color: 'from-orange-500 to-red-600',
    achieved: false,
    requirement: 'O- donation x5',
  },
]

const CERTIFICATE: Certificate = {
  id: 'CERT-2024-001',
  donorName: 'John Doe',
  donationCount: 12,
  totalUnits: 6,
  dateIssued: '2024-12-15',
  organizationName: 'RedLifeline Hub Foundation',
  certificateNumber: 'RLH-CERT-2024-12345',
}

export default function DonorAchievementsPage() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [showCertificate, setShowCertificate] = useState(false)

  const achievedBadgesCount = BADGES.filter(b => b.achieved).length

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-amber-500" />
            Donor Achievements & Recognition
          </h1>
          <p className="text-muted-foreground">Unlock badges and earn certificates for your lifesaving donations</p>
        </div>

        {/* Achievement Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
            <p className="text-sm text-muted-foreground mb-1">Badges Earned</p>
            <p className="text-4xl font-bold text-primary">{achievedBadgesCount}</p>
            <p className="text-xs text-muted-foreground mt-2">of {BADGES.length} total</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/10">
            <p className="text-sm text-muted-foreground mb-1">Total Donations</p>
            <p className="text-4xl font-bold text-amber-600">{CERTIFICATE.donationCount}</p>
            <p className="text-xs text-muted-foreground mt-2">Lives impacted</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10">
            <p className="text-sm text-muted-foreground mb-1">Units Donated</p>
            <p className="text-4xl font-bold text-emerald-600">{CERTIFICATE.totalUnits}</p>
            <p className="text-xs text-muted-foreground mt-2">Total blood units</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10">
            <p className="text-sm text-muted-foreground mb-1">Streak</p>
            <p className="text-4xl font-bold text-blue-600">6</p>
            <p className="text-xs text-muted-foreground mt-2">months consistent</p>
          </Card>
        </div>

        {/* Badges Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Achievement Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BADGES.map((badge) => (
              <Card
                key={badge.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg border-2 ${
                  badge.achieved ? 'border-primary/30 bg-primary/5' : 'border-muted opacity-60'
                }`}
                onClick={() => setSelectedBadge(badge)}
              >
                <div className="text-center space-y-4">
                  {/* Badge Icon */}
                  <div className="flex justify-center">
                    <div className={`text-6xl p-4 rounded-full bg-gradient-to-br ${badge.color} bg-gradient-text flex items-center justify-center w-24 h-24 ${badge.achieved ? 'shadow-lg' : 'opacity-30'}`}>
                      {badge.icon}
                    </div>
                  </div>

                  {/* Badge Info */}
                  <div>
                    <h3 className="font-bold text-lg">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </div>

                  {/* Requirement */}
                  <div className={`text-xs font-semibold px-3 py-1 rounded-full w-fit mx-auto ${
                    badge.achieved 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200' 
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-200'
                  }`}>
                    {badge.achieved ? '✓ Unlocked' : `Requires: ${badge.requirement}`}
                  </div>

                  {/* Share Button */}
                  {badge.achieved && (
                    <Button size="sm" variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Badge
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Certificate Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recognition Certificates</h2>
          <Card className="p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-950/20 dark:to-orange-900/20 opacity-30" />
            
            <div className="relative z-10">
              {/* Certificate Header */}
              <div className="text-center space-y-2 mb-8 pb-8 border-b-2 border-amber-300">
                <Award className="w-12 h-12 text-amber-600 mx-auto" />
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">Certificate of Recognition</p>
                <p className="text-sm text-amber-700 dark:text-amber-200">RedLifeline Hub Foundation</p>
              </div>

              {/* Certificate Content */}
              <div className="text-center space-y-6 py-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">This Certificate is Proudly Presented To</p>
                  <p className="text-3xl font-bold text-primary">{CERTIFICATE.donorName}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-4">For Outstanding Service and Dedication to Lifesaving</p>
                  <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{CERTIFICATE.donationCount}</p>
                      <p className="text-xs text-muted-foreground">Donations</p>
                    </div>
                    <div className="bg-accent/5 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-accent">{CERTIFICATE.totalUnits}</p>
                      <p className="text-xs text-muted-foreground">Units Donated</p>
                    </div>
                    <div className="bg-emerald-500/5 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-emerald-600">∞</p>
                      <p className="text-xs text-muted-foreground">Lives Saved</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 space-y-2">
                  <p className="text-sm text-muted-foreground">Certificate Number: {CERTIFICATE.certificateNumber}</p>
                  <p className="text-sm text-muted-foreground">Issued: {new Date(CERTIFICATE.dateIssued).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-8 pt-8 border-t justify-center">
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Certificate
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress to Next Badge */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10">
          <h3 className="font-bold mb-4">Next Achievement: Legend Donor</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>12/25 donations</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div className="h-3 rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: '48%' }} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Complete 13 more donations to unlock the Legend Donor badge and lifetime recognition.</p>
          </div>
        </Card>
      </div>
    </main>
  )
}
