'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Droplet, AlertCircle, TrendingUp, Bell, Download } from 'lucide-react'

interface BloodInventory {
  bloodType: string
  units: number
  rh: string
  lastUpdated: string
  threshold: number
  expiry: number
  status: 'critical' | 'low' | 'normal' | 'optimal'
  trend: number
}

const BLOOD_INVENTORY_DATA: BloodInventory[] = [
  { bloodType: 'O', rh: '+', units: 45, lastUpdated: '2 mins ago', threshold: 20, expiry: 3, status: 'optimal', trend: 5 },
  { bloodType: 'O', rh: '-', units: 12, lastUpdated: '5 mins ago', threshold: 15, expiry: 1, status: 'low', trend: -2 },
  { bloodType: 'A', rh: '+', units: 38, lastUpdated: '3 mins ago', threshold: 20, expiry: 5, status: 'normal', trend: 2 },
  { bloodType: 'A', rh: '-', units: 8, lastUpdated: '8 mins ago', threshold: 10, expiry: 2, status: 'critical', trend: -4 },
  { bloodType: 'B', rh: '+', units: 32, lastUpdated: '1 min ago', threshold: 15, expiry: 4, status: 'normal', trend: 1 },
  { bloodType: 'B', rh: '-', units: 5, lastUpdated: '10 mins ago', threshold: 10, expiry: 1, status: 'critical', trend: -3 },
  { bloodType: 'AB', rh: '+', units: 18, lastUpdated: '4 mins ago', threshold: 12, expiry: 6, status: 'normal', trend: 3 },
  { bloodType: 'AB', rh: '-', units: 3, lastUpdated: '7 mins ago', threshold: 8, expiry: 2, status: 'critical', trend: -5 },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'optimal': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950'
    case 'normal': return 'bg-blue-50 text-blue-700 dark:bg-blue-950'
    case 'low': return 'bg-amber-50 text-amber-700 dark:bg-amber-950'
    case 'critical': return 'bg-red-50 text-red-700 dark:bg-red-950'
    default: return 'bg-gray-50 text-gray-700'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'critical': return '⚠️'
    case 'low': return '⚡'
    default: return '✓'
  }
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState(BLOOD_INVENTORY_DATA)
  const [alerts, setAlerts] = useState<string[]>([])
  const [subscriptions, setSubscriptions] = useState<string[]>([])

  useEffect(() => {
    const criticalItems = inventory.filter(item => item.status === 'critical' || item.status === 'low')
    setAlerts(criticalItems.map(item => `${item.bloodType}${item.rh} - ${item.units} units available`))
  }, [inventory])

  const toggleSubscription = (bloodType: string) => {
    setSubscriptions(prev => 
      prev.includes(bloodType) 
        ? prev.filter(b => b !== bloodType)
        : [...prev, bloodType]
    )
  }

  const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0)
  const criticalCount = inventory.filter(item => item.status === 'critical').length

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Live Blood Inventory Dashboard</h1>
          <p className="text-muted-foreground">Real-time blood stock updates from verified blood banks</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Units Available</p>
                <p className="text-3xl font-bold text-primary">{totalUnits}</p>
              </div>
              <Droplet className="w-8 h-8 text-primary/30" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Critical Stock</p>
                <p className="text-3xl font-bold text-red-500">{criticalCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500/30" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Last Update</p>
                <p className="text-lg font-semibold">Just Now</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent/30" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="text-lg font-semibold text-emerald-600">Active</p>
              </div>
              <Bell className="w-8 h-8 text-emerald-600/30" />
            </div>
          </Card>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <Card className="p-6 mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-red-900 dark:text-red-400 mb-2">Critical Stock Alerts</h3>
                <ul className="space-y-1">
                  {alerts.map((alert, idx) => (
                    <li key={idx} className="text-sm text-red-800 dark:text-red-300">
                      ⚠️ {alert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {inventory.map((item) => (
            <Card key={`${item.bloodType}${item.rh}`} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Blood Type Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-4xl font-bold text-primary">
                      {item.bloodType}{item.rh}
                    </p>
                    <p className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mt-2 ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)} {item.status.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Units Display */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available Units</span>
                    <span className="font-bold">{item.units}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.status === 'critical' ? 'bg-red-500' :
                        item.status === 'low' ? 'bg-amber-500' :
                        item.status === 'normal' ? 'bg-blue-500' :
                        'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min((item.units / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Threshold</p>
                    <p className="font-semibold">{item.threshold}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expiry (days)</p>
                    <p className="font-semibold">{item.expiry}</p>
                  </div>
                </div>

                {/* Trend */}
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className={`w-4 h-4 ${item.trend > 0 ? 'text-emerald-600' : 'text-red-600'}`} />
                  <span className={item.trend > 0 ? 'text-emerald-600' : 'text-red-600'}>
                    {item.trend > 0 ? '+' : ''}{item.trend} units/day
                  </span>
                </div>

                {/* Subscribe Button */}
                <Button
                  variant={subscriptions.includes(`${item.bloodType}${item.rh}`) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleSubscription(`${item.bloodType}${item.rh}`)}
                  className="w-full rounded-full"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  {subscriptions.includes(`${item.bloodType}${item.rh}`) ? 'Subscribed' : 'Subscribe'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Download Report */}
        <div className="flex justify-end">
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Inventory Report
          </Button>
        </div>
      </div>
    </main>
  )
}
