'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Droplet, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const BLOOD_CENTRES = [
  {
    email: 'centre@redlinehub.org',
    password: 'redline123',
    name: 'RedlineHub Central Blood Bank',
    centreId: 'RH001',
  },
  {
    email: 'hospital@rgpv.edu',
    password: 'rgpv2025',
    name: 'RGPV Medical Centre',
    centreId: 'RH002',
  },
  {
    email: 'bhopal@bloodbank.org',
    password: 'bhopal2025',
    name: 'Bhopal District Blood Bank',
    centreId: 'RH003',
  },
  {
    email: 'delhi@redcross.org',
    password: 'delhi2025',
    name: 'Delhi Red Cross Blood Centre',
    centreId: 'RH004',
  },
]

export default function BloodCentreLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Find matching blood centre
    const centre = BLOOD_CENTRES.find(
      c => c.email === email && c.password === password
    )

    if (centre) {
      // Store centre info in localStorage
      localStorage.setItem('bloodCentreName', centre.name)
      localStorage.setItem('centreId', centre.centreId)
      localStorage.setItem('isBloodCentre', 'true')
      localStorage.setItem('centreEmail', email)
      
      if (rememberMe) {
        localStorage.setItem('rememberBloodCentre', 'true')
        localStorage.setItem('rememberedCentreEmail', email)
      }

      // Redirect to dashboard
      router.push('/blood-centre-dashboard')
    } else {
      setError('Invalid email or password. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-primary mb-4">
            <Droplet className="w-6 h-6 fill-primary" />
            <span>RedLifeline Hub</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Blood Centre Login</h1>
          <p className="text-muted-foreground">
            Access your blood bank dashboard
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Centre Email or ID</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-border cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground py-2 font-semibold"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Demo Credentials</span>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="space-y-3 pt-2">
            <p className="text-xs text-muted-foreground text-center font-semibold">
              Try these test credentials:
            </p>
            {BLOOD_CENTRES.map((centre, idx) => (
              <div
                key={idx}
                className="p-3 bg-accent/5 border border-accent/20 rounded-lg text-xs space-y-1"
              >
                <p className="font-semibold text-foreground">{centre.name}</p>
                <p className="text-muted-foreground">
                  <span className="font-mono">{centre.email}</span>
                </p>
                <p className="text-muted-foreground">
                  Pass: <span className="font-mono">{centre.password}</span>
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Info Section */}
        <Card className="p-6 mt-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-2">Blood Centre Access</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This login is exclusively for blood bank and hospital centers. If you're a donor or patient, please use the regular login.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/login">Regular User Login</Link>
            </Button>
            <Button asChild className="flex-1 bg-primary hover:bg-accent text-primary-foreground">
              <Link href="/register">Register as Donor</Link>
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Back to <Link href="/" className="text-primary hover:underline">home</Link>
        </p>
      </div>
    </main>
  )
}
