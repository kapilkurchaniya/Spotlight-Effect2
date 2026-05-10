'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, TrendingUp, Users, Droplet, AlertCircle, Calendar, Activity, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock data
const donationTrendData = [
  { date: 'Mon', donations: 45, requests: 28 },
  { date: 'Tue', donations: 52, requests: 35 },
  { date: 'Wed', donations: 48, requests: 32 },
  { date: 'Thu', donations: 61, requests: 40 },
  { date: 'Fri', donations: 55, requests: 38 },
  { date: 'Sat', donations: 70, requests: 52 },
  { date: 'Sun', donations: 65, requests: 48 },
]

const bloodTypeDistribution = [
  { name: 'O+', value: 32, fill: '#DC2626' },
  { name: 'O-', value: 8, fill: '#991B1B' },
  { name: 'A+', value: 28, fill: '#EA580C' },
  { name: 'A-', value: 6, fill: '#C2410C' },
  { name: 'B+', value: 22, fill: '#F59E0B' },
  { name: 'B-', value: 4, fill: '#D97706' },
  { name: 'AB+', value: 14, fill: '#FBBF24' },
  { name: 'AB-', value: 3, fill: '#F3AD1A' },
]

const requestFulfillmentData = [
  { status: 'Fulfilled', value: 156 },
  { status: 'Pending', value: 42 },
  { status: 'Cancelled', value: 12 },
]

const FULFILLMENT_COLORS = ['#10B981', '#F59E0B', '#EF4444']

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('week')

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive platform insights and performance metrics</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Time Range Filter */}
        <div className="flex gap-2 mb-8">
          {['day', 'week', 'month', 'year'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="capitalize"
            >
              {range}
            </Button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Donors</p>
                <p className="text-3xl font-bold text-primary">5,234</p>
                <p className="text-xs text-emerald-600 mt-1">+12% this month</p>
              </div>
              <Users className="w-8 h-8 text-primary/30" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Donations This Week</p>
                <p className="text-3xl font-bold text-accent">396</p>
                <p className="text-xs text-emerald-600 mt-1">+8% vs last week</p>
              </div>
              <Droplet className="w-8 h-8 text-accent/30" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Requests Fulfilled</p>
                <p className="text-3xl font-bold text-emerald-600">156</p>
                <p className="text-xs text-emerald-600 mt-1">94% success rate</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-600/30" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-600">8</p>
                <p className="text-xs text-red-600 mt-1">Require attention</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600/30" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Response Time</p>
                <p className="text-3xl font-bold text-blue-600">8.2 min</p>
                <p className="text-xs text-emerald-600 mt-1">-15% improvement</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600/30" />
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Donation vs Request Trend */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="font-bold mb-4">Donation vs Request Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donationTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)' 
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)' }}
                  name="Donations"
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)' }}
                  name="Requests"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Request Fulfillment Status */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Request Fulfillment</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={requestFulfillmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {requestFulfillmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={FULFILLMENT_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {requestFulfillmentData.map((item, idx) => (
                <div key={item.status} className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: FULFILLMENT_COLORS[idx] }} />
                    {item.status}
                  </span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Blood Type Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="p-6 lg:col-span-2">
            <h3 className="font-bold mb-4">Blood Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bloodTypeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)' 
                  }} 
                />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]}>
                  {bloodTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Donor Activity */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Top Active Donors</h3>
            <div className="space-y-4">
              {[
                { name: 'Rajesh Kumar', donations: 24, blood: 'O+' },
                { name: 'Priya Singh', donations: 18, blood: 'A-' },
                { name: 'Amit Patel', donations: 15, blood: 'B+' },
                { name: 'Neha Sharma', donations: 12, blood: 'AB+' },
                { name: 'Vikram Desai', donations: 11, blood: 'O-' },
              ].map((donor, idx) => (
                <div key={idx} className="flex justify-between items-center pb-3 border-b last:border-0">
                  <div>
                    <p className="font-semibold text-sm">{donor.name}</p>
                    <p className="text-xs text-muted-foreground">{donor.blood}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">{donor.donations}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* System Health & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Status */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">System Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold">Database Performance</span>
                  <span className="text-sm text-emerald-600">98%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold">API Response Time</span>
                  <span className="text-sm text-emerald-600">142ms</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold">System Uptime</span>
                  <span className="text-sm text-emerald-600">99.9%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '99.9%' }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Activity Log */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Recent Activity</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[
                { action: 'New blood request', time: '2 mins ago', type: 'urgent' },
                { action: 'Donor registered', time: '5 mins ago', type: 'success' },
                { action: 'Critical alert: O- low stock', time: '8 mins ago', type: 'alert' },
                { action: 'Request fulfilled', time: '15 mins ago', type: 'success' },
                { action: 'Certificate issued', time: '22 mins ago', type: 'success' },
                { action: 'Hospital inventory updated', time: '1 hour ago', type: 'info' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 pb-3 border-b last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    item.type === 'urgent' ? 'bg-red-600' :
                    item.type === 'alert' ? 'bg-amber-600' :
                    item.type === 'success' ? 'bg-emerald-600' :
                    'bg-blue-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
