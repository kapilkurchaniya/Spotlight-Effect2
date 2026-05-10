'use client'

import { Card } from '@/components/ui/card'
import { Shield, Lock, Eye, Database } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">Your privacy and data security are our top priority</p>
          <p className="text-sm text-muted-foreground">Last updated: October 2025</p>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 border-l-4 border-l-primary">
            <div className="flex gap-4">
              <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Data Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  All personal and medical data is encrypted using industry-standard protocols.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-accent">
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">HIPAA Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  We comply with HIPAA regulations for protected health information.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-primary">
            <div className="flex gap-4">
              <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Transparent Practices</h3>
                <p className="text-sm text-muted-foreground">
                  We inform you about how your data is collected and used.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-accent">
            <div className="flex gap-4">
              <Database className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Limited Retention</h3>
                <p className="text-sm text-muted-foreground">
                  We only keep your data as long as necessary for service provision.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {[
            {
              title: '1. Information We Collect',
              content: `We collect information necessary to facilitate blood donations and transfusions:
              
• Personal Information: Name, date of birth, contact details, address
• Medical Information: Blood type, health questionnaire responses, medical history
• Account Information: Email, password, login history
• Transaction Data: Donation records, blood request information`
            },
            {
              title: '2. How We Use Your Information',
              content: `Your information is used solely for:

• Verifying donor eligibility and matching
• Processing blood requests and doctor verification
• Managing hospital inventory and appointments
• Sending important alerts and notifications
• Improving platform security and reliability
• Complying with legal requirements and regulations`
            },
            {
              title: '3. Data Security',
              content: `We implement multiple security measures:

• End-to-end encryption for all sensitive data
• Secure authentication protocols
• Regular security audits and penetration testing
• Limited staff access with strict permissions
• Secure data centers with physical security
• Automatic backups and disaster recovery`
            },
            {
              title: '4. Sharing Your Information',
              content: `We only share information when necessary:

• With verified healthcare providers for blood matching
• With hospital staff for inventory management
• With legal authorities when required by law
• With service providers who sign privacy agreements
• Never sold to third parties or marketers`
            },
            {
              title: '5. Your Rights',
              content: `As a user, you have the right to:

• Access your personal and medical data
• Request corrections to inaccurate information
• Request deletion of your account and data
• Opt-out of non-essential communications
• File a complaint with relevant authorities
• Request data portability in standard formats`
            },
            {
              title: '6. Cookies and Tracking',
              content: `We use cookies for:

• Session management and authentication
• Remembering user preferences
• Analyzing platform usage and performance
• Improving user experience

You can control cookie preferences in your browser settings.`
            },
            {
              title: '7. Changes to This Policy',
              content: `We may update this policy to reflect changes in our practices. We will notify you of significant changes via email or prominent website notices. Your continued use of the platform after changes constitutes acceptance of the updated policy.`
            },
            {
              title: '8. Contact Us',
              content: `For privacy-related questions or concerns:

Email: privacy@redlifelinehub.org
Phone: +1 (800) RED-LIFE
Address: RedLifeline Hub Foundation, 123 Medical Center Dr, Healthcare City`
            },
          ].map((section, idx) => (
            <Card key={idx} className="p-6">
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{section.content}</p>
            </Card>
          ))}
        </div>

        {/* GDPR Notice */}
        <Card className="p-6 mt-8 bg-primary/5 border-2 border-primary">
          <h3 className="font-bold text-lg mb-2">GDPR Compliance</h3>
          <p className="text-sm text-muted-foreground">
            For users in the European Union, we comply with the General Data Protection Regulation (GDPR). You have additional rights including data portability and the right to be forgotten. For GDPR-specific inquiries, please contact our Data Protection Officer.
          </p>
        </Card>
      </div>
    </div>
  )
}
