'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Droplet, CheckCircle, XCircle, ArrowRight } from 'lucide-react'

export default function CompatibilityPage() {
  const [selectedDonor, setSelectedDonor] = useState('O+')
  const [selectedRecipient, setSelectedRecipient] = useState('A+')

  // Blood type compatibility data
  const compatibilityMatrix = {
    'O+': { canDonate: ['O+', 'A+', 'B+', 'AB+'], canReceive: ['O+', 'O-'] },
    'O-': { canDonate: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], canReceive: ['O-'] },
    'A+': { canDonate: ['A+', 'AB+'], canReceive: ['O+', 'O-', 'A+', 'A-'] },
    'A-': { canDonate: ['A+', 'A-', 'AB+', 'AB-'], canReceive: ['O-', 'A-'] },
    'B+': { canDonate: ['B+', 'AB+'], canReceive: ['O+', 'O-', 'B+', 'B-'] },
    'B-': { canDonate: ['B+', 'B-', 'AB+', 'AB-'], canReceive: ['O-', 'B-'] },
    'AB+': { canDonate: ['AB+'], canReceive: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] },
    'AB-': { canDonate: ['AB+', 'AB-'], canReceive: ['O-', 'A-', 'B-', 'AB-'] },
  }

  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

  const isCompatible = (donor: string, recipient: string) => {
    return compatibilityMatrix[donor as keyof typeof compatibilityMatrix].canDonate.includes(recipient)
  }

  const canDonor = compatibilityMatrix[selectedDonor as keyof typeof compatibilityMatrix].canDonate
  const canReceive = compatibilityMatrix[selectedRecipient as keyof typeof compatibilityMatrix].canReceive

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Blood Type Compatibility</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about ABO and Rh blood group systems and check compatibility between donors and recipients.
          </p>
        </div>

        {/* Educational Section */}
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-bold">ABO System</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                The ABO blood group system has four main types: O, A, B, and AB. These are determined by antigens on red blood cells.
              </p>
              <div className="space-y-1 text-xs">
                <p><span className="font-semibold">Type O:</span> No A or B antigens</p>
                <p><span className="font-semibold">Type A:</span> Has A antigen</p>
                <p><span className="font-semibold">Type B:</span> Has B antigen</p>
                <p><span className="font-semibold">Type AB:</span> Has both A and B antigens</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-bold">Rh Factor</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                The Rh factor is another important antigen. You're either Rh positive (+) if you have the antigen or Rh negative (-) if you don't.
              </p>
              <div className="space-y-1 text-xs">
                <p><span className="font-semibold">Rh+:</span> Has the Rh antigen (positive)</p>
                <p><span className="font-semibold">Rh-:</span> Lacks the Rh antigen (negative)</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-bold">Universal Types</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                O- is the universal donor, and AB+ is the universal recipient. This makes them critical in emergency situations.
              </p>
              <div className="space-y-1 text-xs">
                <p><span className="font-semibold">O-:</span> Can donate to everyone</p>
                <p><span className="font-semibold">AB+:</span> Can receive from everyone</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Compatibility Checker */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selector */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Check Compatibility</h2>

            <div className="space-y-8">
              {/* Donor Selection */}
              <div>
                <label className="block text-sm font-semibold mb-4 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-primary fill-primary" />
                  Donor Blood Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedDonor(type)}
                      className={`p-3 rounded-lg font-bold text-sm transition-all ${
                        selectedDonor === type
                          ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                          : 'bg-muted hover:bg-primary/20 text-foreground border border-border'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-12 h-0.5 bg-border"></div>
                  <ArrowRight className="w-5 h-5" />
                  <div className="w-12 h-0.5 bg-border"></div>
                </div>
              </div>

              {/* Recipient Selection */}
              <div>
                <label className="block text-sm font-semibold mb-4 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-accent" />
                  Recipient Blood Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedRecipient(type)}
                      className={`p-3 rounded-lg font-bold text-sm transition-all ${
                        selectedRecipient === type
                          ? 'bg-accent text-accent-foreground shadow-lg scale-105'
                          : 'bg-muted hover:bg-accent/20 text-foreground border border-border'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Result */}
          <div className="flex flex-col gap-4">
            {/* Compatibility Result */}
            <Card className={`p-8 text-center flex flex-col justify-center items-center space-y-4 ${
              isCompatible(selectedDonor, selectedRecipient)
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-red-50 border-2 border-red-200'
            }`}>
              {isCompatible(selectedDonor, selectedRecipient) ? (
                <>
                  <CheckCircle className="w-12 h-12 text-green-600" />
                  <div>
                    <p className="font-bold text-green-900 text-lg">Compatible</p>
                    <p className="text-sm text-green-800 mt-1">
                      {selectedDonor} blood can be transfused to {selectedRecipient}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-12 h-12 text-red-600" />
                  <div>
                    <p className="font-bold text-red-900 text-lg">Not Compatible</p>
                    <p className="text-sm text-red-800 mt-1">
                      {selectedDonor} blood cannot be transfused to {selectedRecipient}
                    </p>
                  </div>
                </>
              )}
            </Card>

            {/* Quick Reference */}
            <Card className="p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Quick Reference</p>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-semibold text-primary">{selectedDonor} Can Give To:</p>
                  <p className="text-xs text-muted-foreground">{canDonor.join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-accent">{selectedRecipient} Can Receive From:</p>
                  <p className="text-xs text-muted-foreground">{canReceive.join(', ')}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Compatibility Matrix */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Complete Compatibility Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold">Donor</th>
                  {bloodTypes.map((type) => (
                    <th key={type} className="text-center py-3 px-2 font-semibold text-primary">
                      {type}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bloodTypes.map((donor) => (
                  <tr key={donor} className="border-b border-border hover:bg-muted/50">
                    <td className="text-left py-3 px-2 font-bold text-primary">{donor}</td>
                    {bloodTypes.map((recipient) => (
                      <td
                        key={`${donor}-${recipient}`}
                        className={`text-center py-3 px-2 font-bold ${
                          isCompatible(donor, recipient)
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {isCompatible(donor, recipient) ? '✓' : '✗'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Facts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-l-4 border-l-primary">
            <h3 className="font-bold text-lg mb-3">Did You Know?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Only 7% of the world's population has O- blood (universal donor)</li>
              <li>• AB+ blood type is the rarest among most populations</li>
              <li>• One pint of blood can save up to three lives</li>
              <li>• Blood has a shelf life of only 42 days</li>
              <li>• Donated blood is tested for multiple diseases before use</li>
            </ul>
          </Card>

          <Card className="p-6 border-l-4 border-l-accent">
            <h3 className="font-bold text-lg mb-3">Important Facts</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Type O- blood is in highest demand in emergencies</li>
              <li>• Rh incompatibility can occur during pregnancy</li>
              <li>• Blood transfusions must be type-matched for safety</li>
              <li>• Cross-matching tests ensure compatibility before transfusion</li>
              <li>• A single donation can help multiple patients</li>
            </ul>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            Know your blood type? Help save lives today!
          </p>
          <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground">
            Become a Donor
          </Button>
        </div>
      </div>
    </div>
  )
}
