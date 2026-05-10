'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Star, Filter, Search, MailOpen as MapOpen } from 'lucide-react'
import { AppointmentModal } from '@/components/appointment-modal'

interface Hospital {
  id: string
  name: string
  location: string
  address: string
  phone: string
  state: string
  contact?: string
  email?: string
  bloodBankServices: string[]
  ratings: number
  accessibility: string[]
  paymentOptions: string[]
  bloodTypes: string[]
  coordinates: { lat: number; lng: number }
}

const HOSPITALS_DATA: Hospital[] = [
  {
    id: '1',
    name: 'Chirayu Health And Medicare Blood Bank',
    location: 'Nakkar Khana, Peer Gate',
    address: 'Bhopal',
    state: 'Madhya Pradesh',
    phone: '+91 755 273 7401',
    bloodBankServices: ['Blood bank services', 'Donation center', 'Component separation'],
    ratings: 4.8,
    accessibility: ['Wheelchair accessible', 'Parking available', 'Easy access'],
    paymentOptions: ['NFC payments', 'Online transfer', 'Cash'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 23.1815, lng: 77.4104 },
  },
  {
    id: '2',
    name: 'Indian Red Cross Society Blood Bank',
    location: 'Shivaji Nagar',
    address: 'Bhopal',
    state: 'Madhya Pradesh',
    phone: '+91 755 248 1234',
    contact: 'Dr.O.P.Shrivastava',
    email: 'mpredcrossbhopal@gmail.com',
    bloodBankServices: ['Blood bank services', 'Volunteer organization', 'Donations'],
    ratings: 4.6,
    accessibility: ['Wheelchair accessible', 'Public transport'],
    paymentOptions: ['Online transfer', 'Donation-based'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 23.1652, lng: 77.4360 },
  },
  {
    id: '3',
    name: 'Government Medical College Blood Bank',
    location: 'Sultania',
    address: 'Bhopal',
    state: 'Madhya Pradesh',
    phone: '+91 755 298 5123',
    bloodBankServices: ['Hospital blood bank', 'Emergency services', 'Testing'],
    ratings: 4.7,
    accessibility: ['Wheelchair accessible', 'Parking', 'Lift available'],
    paymentOptions: ['Cash', 'Card', 'Online'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 23.1532, lng: 77.4255 },
  },
  // Bihar
  {
    id: '4',
    name: 'Indian Red Cross Society Blood Bank - Bhojpur',
    location: 'South Ramana Road',
    address: 'Ara, Bhojpur',
    state: 'Bihar',
    phone: '9934041541',
    contact: 'Sr. Bibha Kumari',
    email: 'ircsbhojpur14@rediffmail.com',
    bloodBankServices: ['Blood bank services', 'Donations', 'Testing'],
    ratings: 4.5,
    accessibility: ['Easy access'],
    paymentOptions: ['Cash', 'Online transfer'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 25.2154, lng: 84.6534 },
  },
  {
    id: '5',
    name: 'Indian Red Cross Society - East Champaran',
    location: 'Hospital Road',
    address: 'Motihari',
    state: 'Bihar',
    phone: '9431233403',
    contact: 'Shri Shriprakash Chaudhary',
    email: 'ircsmotihari1991@gmail.com',
    bloodBankServices: ['Blood bank services', 'Emergency services', 'Donations'],
    ratings: 4.4,
    accessibility: ['Wheelchair accessible'],
    paymentOptions: ['Cash', 'Online'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 26.6349, lng: 84.9307 },
  },
  {
    id: '6',
    name: 'Red Cross Blood Bank - Patna',
    location: 'North of Gandhi Maidan',
    address: 'Patna',
    state: 'Bihar',
    phone: '9431089524',
    contact: 'Dr. S.K Srivastava',
    email: 'biharircs@gmail.com',
    bloodBankServices: ['Blood bank services', 'Component separation', 'Testing'],
    ratings: 4.7,
    accessibility: ['Wheelchair accessible', 'Parking'],
    paymentOptions: ['Cash', 'Card', 'Online'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 25.5941, lng: 85.1376 },
  },
  {
    id: '7',
    name: 'Indian Red Cross Society - Purnia',
    location: 'Line Bazar',
    address: 'Purnia',
    state: 'Bihar',
    phone: '8877571303',
    contact: 'Sr. Om Prakash',
    email: 'dr.deviram@yahoo.com',
    bloodBankServices: ['Blood bank services', 'Donations'],
    ratings: 4.3,
    accessibility: ['Easy access'],
    paymentOptions: ['Cash', 'Online'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-'],
    coordinates: { lat: 25.8050, lng: 87.4750 },
  },
  // Gujarat
  {
    id: '8',
    name: 'Kiran Chudgar Ahmedabad Red Cross',
    location: 'Sherdil Red Cross Marg',
    address: 'Ahmedabad',
    state: 'Gujarat',
    phone: '9099917781',
    contact: 'Dr. Vishvas Amin',
    email: 'redcross.ahmedabad@gmail.com',
    bloodBankServices: ['Blood bank services', 'Donation center', 'Testing'],
    ratings: 4.8,
    accessibility: ['Wheelchair accessible', 'Parking available'],
    paymentOptions: ['Online transfer', 'Cash'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 23.0225, lng: 72.5714 },
  },
  {
    id: '9',
    name: 'Indian Red Cross Blood Bank - Anand',
    location: 'Opp. Anand Maha Nagar Palika',
    address: 'Anand',
    state: 'Gujarat',
    phone: '9428843406',
    contact: 'Dr.K.K. Soni',
    email: 'ircs_anand@yahoo.co.in',
    bloodBankServices: ['Blood bank services', 'Donations', 'Component separation'],
    ratings: 4.6,
    accessibility: ['Easy access'],
    paymentOptions: ['Online', 'Cash'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 22.5645, lng: 72.9289 },
  },
  {
    id: '10',
    name: 'Red Cross Blood Bank - Vadodara',
    location: 'Behind Railway Station, Alkapuri',
    address: 'Vadodara',
    state: 'Gujarat',
    phone: '7874595553',
    contact: 'Dr. Doly Gohel',
    email: 'ircsvadodara@gmail.com',
    bloodBankServices: ['Blood bank services', 'Emergency services', 'Testing'],
    ratings: 4.7,
    accessibility: ['Wheelchair accessible', 'Parking'],
    paymentOptions: ['Cash', 'Card', 'Online'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 22.3072, lng: 73.1812 },
  },
  // Karnataka
  {
    id: '11',
    name: 'Red Cross Blood Bank - Bengaluru',
    location: 'Race Course Road',
    address: 'Bengaluru',
    state: 'Karnataka',
    phone: '9035068435',
    contact: 'Dr. Sunil V. Nayak',
    email: 'ircakarnataka@yahoo.in',
    bloodBankServices: ['Blood bank services', 'Component separation', 'Testing'],
    ratings: 4.8,
    accessibility: ['Wheelchair accessible', 'Parking available'],
    paymentOptions: ['Online', 'Cash', 'Card'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 13.0827, lng: 80.2707 },
  },
  {
    id: '12',
    name: 'Red Cross Blood Bank - Mangalore',
    location: 'Govt. Lady Goschen Hospital',
    address: 'Mangalore',
    state: 'Karnataka',
    phone: '9902310329',
    contact: 'Dr Sukesh Maria',
    email: 'bbircsdkd@gmail.com',
    bloodBankServices: ['Blood bank services', 'Emergency services', 'Donations'],
    ratings: 4.6,
    accessibility: ['Wheelchair accessible'],
    paymentOptions: ['Online', 'Cash'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-'],
    coordinates: { lat: 12.9176, lng: 74.8560 },
  },
  // Delhi
  {
    id: '13',
    name: 'Indian Red Cross Society - NHQ',
    location: '1 Red Cross Road',
    address: 'Delhi',
    state: 'Delhi',
    phone: '011-23711551',
    contact: 'Dr. Vanshree Singh',
    email: 'vanshrees@indianredcross.org',
    bloodBankServices: ['Blood bank services', 'National coordination', 'Testing'],
    ratings: 4.9,
    accessibility: ['Wheelchair accessible', 'Parking', 'Public transport'],
    paymentOptions: ['Online', 'Cash', 'Card'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 28.5355, lng: 77.2013 },
  },
  // Tamil Nadu
  {
    id: '14',
    name: 'Red Cross Blood Centre - Chennai',
    location: 'No.32/50, Red Cross Road, Egmore',
    address: 'Chennai',
    state: 'Tamil Nadu',
    phone: '9444441898',
    contact: 'Dr.P.Yogeshwaran',
    email: 'bloodcentre@ircstnb.org',
    bloodBankServices: ['Blood bank services', 'Donations', 'Testing'],
    ratings: 4.7,
    accessibility: ['Wheelchair accessible', 'Public transport'],
    paymentOptions: ['Cash', 'Online'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 13.0047, lng: 80.2570 },
  },
  // Telangana
  {
    id: '15',
    name: 'Red Cross Blood Center - Hyderabad',
    location: 'Vidyanagar, Achyuthreddy marg',
    address: 'Hyderabad',
    state: 'Telangana',
    phone: '7032888001',
    contact: 'Dr.K.PITCHI REDDY',
    email: 'redcross_bloodbank@yahoo.com',
    bloodBankServices: ['Blood bank services', 'Emergency services', 'Testing'],
    ratings: 4.8,
    accessibility: ['Wheelchair accessible', 'Parking'],
    paymentOptions: ['Online', 'Cash', 'Card'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 17.3850, lng: 78.4867 },
  },
  // Maharashtra
  {
    id: '16',
    name: 'Red Cross Blood Bank - Mumbai',
    location: 'S. B. S. Road, Town Hall Compound',
    address: 'Mumbai',
    state: 'Maharashtra',
    phone: '9819424404',
    contact: 'Dr. N. K. Naidu',
    email: 'narinder.naidu@yahoo.com',
    bloodBankServices: ['Blood bank services', 'Emergency services', 'Testing'],
    ratings: 4.9,
    accessibility: ['Wheelchair accessible', 'Public transport'],
    paymentOptions: ['Online', 'Cash', 'Card'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 18.9676, lng: 72.8194 },
  },
  {
    id: '17',
    name: 'Red Cross Blood Bank - Pune',
    location: 'Baramati',
    address: 'Pune',
    state: 'Maharashtra',
    phone: '9850033891',
    contact: 'Dr.D. N. Dhawade',
    email: 'ircsbbbaramati@gmail.com',
    bloodBankServices: ['Blood bank services', 'Donations', 'Testing'],
    ratings: 4.5,
    accessibility: ['Easy access'],
    paymentOptions: ['Online', 'Cash'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 18.7298, lng: 73.9997 },
  },
  // Madhya Pradesh
  {
    id: '18',
    name: 'Red Cross Blood Bank - Indore',
    location: 'Chawani Hatt Maidan',
    address: 'Indore',
    state: 'Madhya Pradesh',
    phone: '9993636700',
    contact: 'Dr.Radhika Rathi',
    email: 'dr.radhikaredcross01@gmail.com',
    bloodBankServices: ['Blood bank services', 'Component separation', 'Testing'],
    ratings: 4.6,
    accessibility: ['Wheelchair accessible', 'Parking'],
    paymentOptions: ['Online', 'Cash', 'Card'],
    bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    coordinates: { lat: 22.7196, lng: 75.8577 },
  },
]

export default function HospitalsPage() {
  const [filteredHospitals, setFilteredHospitals] = useState(HOSPITALS_DATA)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBloodType, setSelectedBloodType] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [appointmentHospital, setAppointmentHospital] = useState<Hospital | null>(null)

  const states = Array.from(new Set(HOSPITALS_DATA.map(h => h.state)))

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterHospitals(term, selectedBloodType, selectedState)
  }

  const handleBloodTypeFilter = (bloodType: string) => {
    setSelectedBloodType(bloodType)
    filterHospitals(searchTerm, bloodType, selectedState)
  }

  const handleStateFilter = (state: string) => {
    setSelectedState(state)
    filterHospitals(searchTerm, selectedBloodType, state)
  }

  const filterHospitals = (search: string, bloodType: string, state: string) => {
    let filtered = HOSPITALS_DATA

    if (search) {
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(search.toLowerCase()) ||
          h.location.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (bloodType) {
      filtered = filtered.filter((h) => h.bloodTypes.includes(bloodType))
    }

    if (state) {
      filtered = filtered.filter((h) => h.state === state)
    }

    setFilteredHospitals(filtered)
  }

  const openGoogleMaps = (hospital: Hospital) => {
    const { coordinates } = hospital
    const mapsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
    window.open(mapsUrl, '_blank')
  }

  const handleScheduleAppointment = (hospital: Hospital) => {
    setAppointmentHospital(hospital)
    setShowAppointmentModal(true)
  }

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Hospital & Blood Bank Directory</h1>
          <p className="text-muted-foreground text-lg">
            Find verified blood banks and hospitals across India
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card p-6 rounded-lg border mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search hospitals by name or location..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* State Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground">Filter by State:</span>
              <select
                value={selectedState}
                onChange={(e) => handleStateFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Blood Type Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground">Filter by Blood Type:</span>
              <div className="flex gap-2 flex-wrap">
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((type) => (
                  <Button
                    key={type}
                    variant={selectedBloodType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleBloodTypeFilter(selectedBloodType === type ? '' : type)}
                    className="rounded-full"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hospital List */}
          <div className="lg:col-span-2 space-y-6">
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital) => (
                <Card
                  key={hospital.id}
                  className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                  onClick={() => setSelectedHospital(hospital)}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{hospital.name}</h3>
                        <p className="text-sm text-muted-foreground">{hospital.location}</p>
                        <p className="text-xs text-muted-foreground">{hospital.state}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-semibold">{hospital.ratings}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <a href={`tel:${hospital.phone}`} className="text-primary hover:underline">
                        {hospital.phone}
                      </a>
                    </div>

                    {hospital.email && (
                      <div className="text-xs text-muted-foreground">
                        <p><strong>Email:</strong> {hospital.email}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Services</p>
                        <div className="flex gap-2 flex-wrap">
                          {hospital.bloodBankServices.slice(0, 2).map((service) => (
                            <span key={service} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Payment Options</p>
                        <div className="flex gap-2 flex-wrap">
                          {hospital.paymentOptions.slice(0, 2).map((option) => (
                            <span key={option} className="bg-accent/10 text-accent text-xs px-2 py-1 rounded">
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleScheduleAppointment(hospital)
                        }}
                      >
                        Schedule Appointment
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          openGoogleMaps(hospital)
                        }}
                        className="flex items-center justify-center gap-2"
                      >
                        <MapOpen className="w-4 h-4" />
                        View on Map
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hospitals found matching your criteria</p>
              </div>
            )}
          </div>

          {/* Map Preview */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 h-fit">
              <h3 className="font-bold mb-4">Location & Details</h3>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 text-center space-y-4">
                <MapPin className="w-12 h-12 text-primary mx-auto" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold">
                    {selectedHospital ? selectedHospital.name : 'Select a hospital to view details'}
                  </p>
                  {selectedHospital && (
                    <>
                      <p className="text-xs text-muted-foreground">{selectedHospital.address}</p>
                      <div className="flex gap-2 justify-center pt-4 flex-col">
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-accent text-white"
                          onClick={() => openGoogleMaps(selectedHospital)}
                        >
                          Get Directions
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleScheduleAppointment(selectedHospital)}
                        >
                          Schedule Now
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Selected Hospital Details */}
              {selectedHospital && (
                <div className="mt-6 space-y-4 pt-6 border-t">
                  {selectedHospital.contact && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Contact Person</p>
                      <p className="text-sm">{selectedHospital.contact}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Available Blood Types</p>
                    <div className="grid grid-cols-4 gap-1">
                      {selectedHospital.bloodTypes.map((type) => (
                        <div
                          key={type}
                          className="bg-primary/10 text-primary text-xs font-bold p-2 rounded text-center"
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Accessibility</p>
                    <ul className="text-xs space-y-1">
                      {selectedHospital.accessibility.map((item) => (
                        <li key={item} className="text-muted-foreground">✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal 
        hospital={appointmentHospital}
        onClose={() => {
          setShowAppointmentModal(false)
          setAppointmentHospital(null)
        }}
      />
    </main>
  )
}
