'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { BreachResults } from '@/components/BreachResults'

interface Breach {
  Name: string
  Title: string
  Domain: string
  BreachDate: string
  AddedDate: string
  ModifiedDate: string
  PwnCount: number
  Description: string
  LogoPath: string
  DataClasses: string[]
  IsVerified: boolean
  IsFabricated: boolean
  IsSensitive: boolean
  IsRetired: boolean
  IsSpamList: boolean
  IsMalware: boolean
  IsSubscriptionFree: boolean
}

const mockBreaches: Breach[] = [
  {
    Name: 'LinkedIn',
    Title: 'LinkedIn',
    Domain: 'linkedin.com',
    BreachDate: '2021-06-22',
    AddedDate: '2021-06-22T00:00:00Z',
    ModifiedDate: '2021-06-22T00:00:00Z',
    PwnCount: 700000000,
    Description:
      'In June 2021, data scraped from 700 million LinkedIn users was made available for sale. The data included email addresses, full names, phone numbers, physical addresses, geolocation records, LinkedIn username and profile URL, personal and professional experience/background, genders and other social media accounts.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/LinkedIn.png',
    DataClasses: [
      'Email addresses',
      'Full names',
      'Genders',
      'Geographic locations',
      'Job titles',
      'Phone numbers',
      'Social media profiles',
    ],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
  {
    Name: 'Adobe',
    Title: 'Adobe',
    Domain: 'adobe.com',
    BreachDate: '2013-10-04',
    AddedDate: '2013-12-04T00:00:00Z',
    ModifiedDate: '2013-12-04T00:00:00Z',
    PwnCount: 152445165,
    Description:
      'In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/Adobe.png',
    DataClasses: [
      'Email addresses',
      'Password hints',
      'Passwords',
      'Usernames',
    ],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
  {
    Name: 'Dropbox',
    Title: 'Dropbox',
    Domain: 'dropbox.com',
    BreachDate: '2012-07-01',
    AddedDate: '2016-08-31T00:00:00Z',
    ModifiedDate: '2016-08-31T00:00:00Z',
    PwnCount: 68648009,
    Description:
      'In mid-2012, Dropbox suffered a data breach which exposed the stored credentials of tens of millions of their customers. In August 2016, they forced password resets for customers they believed may be at risk. A large volume of data totalling over 68 million records was subsequently traded online and included email addresses and salted hashes of passwords.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/Dropbox.png',
    DataClasses: ['Email addresses', 'Passwords'],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
]

export function BreachChecker() {
  const [email, setEmail] = useState('')
  const [breaches, setBreaches] = useState<Breach[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)

  const checkEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setBreaches(null)
    setChecked(false)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate breach check based on email pattern
    const emailLower = email.toLowerCase()
    
    // Simulate different scenarios based on email
    if (emailLower.includes('safe') || emailLower.includes('secure')) {
      // No breaches found
      setBreaches([])
    } else if (emailLower.includes('test') || emailLower.includes('demo')) {
      // Show all mock breaches
      setBreaches(mockBreaches)
    } else if (emailLower.includes('gmail') || emailLower.includes('yahoo')) {
      // Show 2 breaches
      setBreaches([mockBreaches[0], mockBreaches[2]])
    } else {
      // Show 1 breach by default
      setBreaches([mockBreaches[0]])
    }

    setChecked(true)
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={checkEmail} className="flex flex-col gap-4 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 rounded-full border border-slate-300 px-6 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? 'Checking...' : 'Check Email'}
        </Button>
      </form>

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-center">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {checked && breaches !== null && (
        <BreachResults breaches={breaches} email={email} />
      )}

      <div className="mt-8 rounded-lg bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>Demo Mode:</strong> Try different emails to see various results:
        </p>
        <ul className="mt-2 space-y-1 text-xs text-blue-700">
          <li>• Email with &quot;safe&quot; or &quot;secure&quot; = No breaches found</li>
          <li>• Email with &quot;test&quot; or &quot;demo&quot; = Multiple breaches found</li>
          <li>• Email with &quot;gmail&quot; or &quot;yahoo&quot; = 2 breaches found</li>
          <li>• Any other email = 1 breach found</li>
        </ul>
      </div>
    </div>
  )
}
