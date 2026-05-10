'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, MapPin, Calendar, LogIn, Map, Download, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface GuideSection {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  steps: string[]
}

const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'search-hospitals',
    title: 'How to Search for Hospitals and Blood Banks',
    icon: <Search className="w-6 h-6" />,
    description: 'Learn how to find nearby hospitals and blood banks using our directory.',
    steps: [
      'Navigate to the Hospitals section from the main menu',
      'Use the search bar to search by hospital name or location',
      'Filter results by State using the dropdown filter',
      'Filter by Blood Type to find banks that have your needed blood group',
      'Click on a hospital card to view detailed information',
      'Check availability, services, payment options, and accessibility features',
    ],
  },
  {
    id: 'view-maps',
    title: 'How to View Location on Google Maps',
    icon: <MapPin className="w-6 h-6" />,
    description: 'Get directions to hospitals and blood banks using Google Maps.',
    steps: [
      'Go to the Hospitals page and select or search for a hospital',
      'Click the "View on Map" button on any hospital card',
      'Google Maps will open in a new tab showing the exact location',
      'Use Google Maps features to get real-time directions',
      'You can also use "Get Directions" button in the location preview panel',
      'Share the location with others using the Share button',
    ],
  },
  {
    id: 'schedule-appointment',
    title: 'How to Schedule an Appointment',
    icon: <Calendar className="w-6 h-6" />,
    description: 'Book an appointment at your preferred blood bank or hospital.',
    steps: [
      'Navigate to the Hospitals page',
      'Find and click on "Schedule Appointment" button on any hospital card',
      'Fill in your personal details: Name, Phone, Email',
      'Select your preferred Date and Time',
      'Choose your Blood Group from the dropdown',
      'Click Submit to confirm - you will see a confirmation message',
      'Your appointment details are saved and you can view them in your dashboard',
    ],
  },
  {
    id: 'login',
    title: 'How to Log In',
    icon: <LogIn className="w-6 h-6" />,
    description: 'Create an account and log in to access personalized features.',
    steps: [
      'Click the "Login" button in the top right corner',
      'Enter your email address and password',
      'For new users, click "Register" to create an account',
      'Fill in registration details and submit',
      'Once logged in, you will see your personalized dashboard',
      'Your welcome message will show your username',
      'Access exclusive features like appointment tracking and campaign requests',
    ],
  },
  {
    id: 'campaigns',
    title: 'How to See Ongoing Blood Donation Campaigns',
    icon: <Calendar className="w-6 h-6" />,
    description: 'Discover and participate in blood donation campaigns.',
    steps: [
      'Click on "Campaigns" in the navigation menu',
      'View all active blood donation campaigns in your area',
      'Each campaign card shows: Date, Time, Location, and Expected Donors',
      'Read the campaign description to understand the impact',
      'Click "Learn More" to get additional details about any campaign',
      'Filter campaigns by state or blood type if needed',
      'Follow social media or check back for updates on campaign results',
    ],
  },
  {
    id: 'request-campaign',
    title: 'How to Request a Campaign',
    icon: <Calendar className="w-6 h-6" />,
    description: 'Request a blood donation campaign for your college, office, or community.',
    steps: [
      'Go to the Campaigns page',
      'Scroll down to find the "Request a Blood Donation Campaign" section',
      'Click "Request a Campaign Today" button',
      'Fill in your personal information: Name, Email, Phone',
      'Select the type of place (College, School, Office, Society, Other)',
      'Enter the institution/place name and full address',
      'Specify your city and expected number of donors',
      'Choose preferred dates for the campaign',
      'Click Submit to send your request',
      'Our team will contact you within 2-3 business days to confirm',
    ],
  },
]

export default function UserGuidePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">User Guide</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn how to use RedLifeline Hub Foundation to find blood banks, schedule appointments, and participate in campaigns.
          </p>
        </div>

        {/* Quick Start Card */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Getting Started</h2>
            <p className="text-muted-foreground">
              RedLifeline Hub makes it easy to connect with blood donation services. Whether you're looking for a blood bank, scheduling an appointment, or starting a campaign, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="bg-primary hover:bg-accent text-primary-foreground">
                <Link href="/hospitals">Find Hospitals</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/campaigns">View Campaigns</Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Guide Sections */}
        <div className="space-y-4 mb-16">
          {GUIDE_SECTIONS.map((section) => (
            <Card
              key={section.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )
                }
                className="w-full p-6 flex items-start gap-4 hover:bg-accent/5 transition-colors"
              >
                <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                  {section.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.description}
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Expanded Content */}
              {expandedSection === section.id && (
                <div className="px-6 pb-6 border-t">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-md">Steps:</h4>
                    <ol className="space-y-3">
                      {section.steps.map((step, index) => (
                        <li key={index} className="flex gap-4">
                          <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-semibold text-sm">
                            {index + 1}
                          </div>
                          <p className="text-muted-foreground pt-0.5">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="p-8 mb-16 border-2 border-accent/20">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-semibold">Is there a fee to use RedLifeline Hub?</h4>
              <p className="text-muted-foreground">
                No, RedLifeline Hub is completely free to use. Our mission is to connect blood donors with those in need at no cost to either party.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Can I schedule multiple appointments?</h4>
              <p className="text-muted-foreground">
                Yes! You can schedule appointments at multiple blood banks. We recommend spacing donations at least 3 months apart to maintain healthy blood levels.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">How do I know if my blood type is available?</h4>
              <p className="text-muted-foreground">
                Use the Blood Type filter on the Hospitals page to see which banks have your specific blood type available. Each hospital card shows the blood types they offer.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">What happens after I request a campaign?</h4>
              <p className="text-muted-foreground">
                After submitting your campaign request, our team will review it and contact you within 2-3 business days. We'll discuss logistics, dates, and coordination details.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Can I donate if I'm not registered?</h4>
              <p className="text-muted-foreground">
                Yes, you can visit any blood bank in our directory without registration. However, registering on RedLifeline Hub helps us send you targeted alerts matching your blood group.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">How do I update my profile information?</h4>
              <p className="text-muted-foreground">
                After logging in, go to your Dashboard to update your personal information, blood type, and contact preferences. Changes are saved automatically.
              </p>
            </div>
          </div>
        </Card>

        {/* Tips Section */}
        <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
          <h2 className="text-2xl font-bold mb-6">Helpful Tips</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="text-primary font-bold text-lg">•</div>
              <p className="text-muted-foreground">
                <strong>Filter Smartly:</strong> Use both State and Blood Type filters to quickly find exactly what you need.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="text-primary font-bold text-lg">•</div>
              <p className="text-muted-foreground">
                <strong>Save Locations:</strong> Use your browser's bookmark feature to save your favorite blood banks for quick access.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="text-primary font-bold text-lg">•</div>
              <p className="text-muted-foreground">
                <strong>Check Hours:</strong> Call ahead before visiting to confirm operating hours and any requirements.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="text-primary font-bold text-lg">•</div>
              <p className="text-muted-foreground">
                <strong>Mobile Friendly:</strong> Our site works great on mobile - check donor status on the go.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="text-primary font-bold text-lg">•</div>
              <p className="text-muted-foreground">
                <strong>Share Campaigns:</strong> Know someone who should donate? Share campaign links with your network.
              </p>
            </li>
          </ul>
        </Card>

        {/* Contact Support */}
        <div className="mt-16 text-center space-y-4">
          <h2 className="text-2xl font-bold">Need More Help?</h2>
          <p className="text-muted-foreground">
            If you can't find what you're looking for, contact our support team.
          </p>
          <Button asChild className="bg-primary hover:bg-accent text-primary-foreground">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
