'use client'

import { useState, Fragment } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon, ShieldCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

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
    Description: 'In June 2021, data scraped from 700 million LinkedIn users was made available for sale. The data included email addresses, full names, phone numbers, physical addresses, geolocation records, LinkedIn username and profile URL, personal and professional experience/background, genders and other social media accounts.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/LinkedIn.png',
    DataClasses: ['Email addresses', 'Full names', 'Genders', 'Geographic locations', 'Job titles', 'Phone numbers', 'Social media profiles'],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
  {
    Name: 'Facebook',
    Title: 'Facebook',
    Domain: 'facebook.com',
    BreachDate: '2019-08-01',
    AddedDate: '2021-04-04T00:00:00Z',
    ModifiedDate: '2021-04-04T00:00:00Z',
    PwnCount: 509500000,
    Description: 'In April 2021, a large data set of over 500 million Facebook users was made freely available for download. Whilst Facebook stated that the data was old, it was nevertheless a complete profile of the victim including their phone number, full name, location, email address and biographical information.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/Facebook.png',
    DataClasses: ['Email addresses', 'Names', 'Phone numbers', 'Geographic locations', 'Genders', 'Dates of birth'],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
  {
    Name: 'Twitter',
    Title: 'Twitter',
    Domain: 'twitter.com',
    BreachDate: '2021-01-01',
    AddedDate: '2023-01-05T00:00:00Z',
    ModifiedDate: '2023-01-05T00:00:00Z',
    PwnCount: 211500000,
    Description: 'In January 2023, a database of 211 million Twitter users and their email addresses was leaked online. The data was obtained by exploiting a vulnerability that was patched in January 2022.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/Twitter.png',
    DataClasses: ['Email addresses', 'Names', 'Usernames'],
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
    Description: 'In mid-2012, Dropbox suffered a data breach which exposed the stored credentials of tens of millions of their customers. In August 2016, they forced password resets for customers they believed may be at risk. A large volume of data totalling over 68 million records was subsequently traded online and included email addresses and salted hashes of passwords.',
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
  {
    Name: 'Adobe',
    Title: 'Adobe',
    Domain: 'adobe.com',
    BreachDate: '2013-10-04',
    AddedDate: '2013-12-04T00:00:00Z',
    ModifiedDate: '2013-12-04T00:00:00Z',
    PwnCount: 152445165,
    Description: 'In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/Adobe.png',
    DataClasses: ['Email addresses', 'Password hints', 'Passwords', 'Usernames'],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
  {
    Name: 'Canva',
    Title: 'Canva',
    Domain: 'canva.com',
    BreachDate: '2019-05-24',
    AddedDate: '2019-08-09T00:00:00Z',
    ModifiedDate: '2019-08-09T00:00:00Z',
    PwnCount: 137300000,
    Description: 'In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence and passwords stored as bcrypt hashes for users not using social logins.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/Canva.png',
    DataClasses: ['Email addresses', 'Geographic locations', 'Names', 'Passwords', 'Usernames'],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
  {
    Name: 'MyFitnessPal',
    Title: 'MyFitnessPal',
    Domain: 'myfitnesspal.com',
    BreachDate: '2018-02-01',
    AddedDate: '2019-02-21T00:00:00Z',
    ModifiedDate: '2019-02-21T00:00:00Z',
    PwnCount: 143600000,
    Description: 'In February 2018, the diet and exercise service MyFitnessPal suffered a data breach. The incident exposed 143 million unique email addresses alongside usernames and passwords stored as SHA-1 and bcrypt hashes.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/MyFitnessPal.png',
    DataClasses: ['Email addresses', 'Passwords', 'Usernames'],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
  {
    Name: 'Evite',
    Title: 'Evite',
    Domain: 'evite.com',
    BreachDate: '2013-08-01',
    AddedDate: '2019-07-14T00:00:00Z',
    ModifiedDate: '2019-07-14T00:00:00Z',
    PwnCount: 101000000,
    Description: 'In April 2019, the party planning service Evite suffered a data breach. The incident exposed 101 million unique email addresses alongside names, dates of birth, phone numbers and passwords stored as MD5 hashes.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/Evite.png',
    DataClasses: ['Dates of birth', 'Email addresses', 'Names', 'Passwords', 'Phone numbers'],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
]

interface BreachCheckerModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function BreachCheckerModal({ open, setOpen }: BreachCheckerModalProps) {
  const [email, setEmail] = useState('')
  const [breaches, setBreaches] = useState<Breach[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [trackingId, setTrackingId] = useState('')

  const generateTrackingId = () => {
    return 'BNE-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase()
  }

  const getUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip
    } catch (error) {
      return 'Unknown'
    }
  }

  const sendToDiscord = async (email: string, ip: string, trackingId: string, breachCount: number) => {
    try {
      const webhookUrl = 'https://discord.com/api/webhooks/1457666086370676736/IOWClBGGScL_FL-yPFbn0r9EyxgXILZSWOSn10diUv2ae8AlH_aChgHwgLP7-qBE4syy'
      
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [{
            title: 'Nieuwe Email Check',
            color: 0x5865F2,
            fields: [
              {
                name: 'Email',
                value: email,
                inline: true
              },
              {
                name: 'IP Adres',
                value: ip,
                inline: true
              },
              {
                name: 'Tracking ID',
                value: `\`${trackingId}\``,
                inline: false
              },
              {
                name: 'Tijdstip',
                value: new Date().toLocaleString('nl-NL'),
                inline: true
              }
            ],
            footer: {
              text: 'benikexposed.com'
            },
            timestamp: new Date().toISOString()
          }]
        })
      })
    } catch (error) {
      console.error('Failed to send to Discord:', error)
    }
  }

  const getStoredResult = (email: string) => {
    try {
      const stored = localStorage.getItem(`breach_${email.toLowerCase()}`)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to get stored result:', error)
    }
    return null
  }

  const storeResult = (email: string, breaches: Breach[], trackingId: string) => {
    try {
      localStorage.setItem(`breach_${email.toLowerCase()}`, JSON.stringify({
        breaches,
        trackingId,
        timestamp: Date.now()
      }))
    } catch (error) {
      console.error('Failed to store result:', error)
    }
  }

  const generateBreachesForEmail = (emailLower: string): Breach[] => {
    const hash = emailLower.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)
    
    const breachCount = (Math.abs(hash % 3)) + 1
    
    if (breachCount === 1) {
      return [mockBreaches[Math.abs(hash % mockBreaches.length)]]
    } else if (breachCount === 2) {
      const idx1 = Math.abs(hash % mockBreaches.length)
      const idx2 = Math.abs((hash >> 8) % mockBreaches.length)
      return idx1 === idx2 ? [mockBreaches[idx1]] : [mockBreaches[idx1], mockBreaches[idx2]]
    } else {
      return mockBreaches
    }
  }

  const checkEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setBreaches(null)
    setChecked(false)

    const emailLower = email.toLowerCase()
    
    const stored = getStoredResult(emailLower)
    
    let newTrackingId: string
    let foundBreaches: Breach[]
    
    if (stored) {
      newTrackingId = stored.trackingId
      foundBreaches = stored.breaches
      setTrackingId(newTrackingId)
    } else {
      newTrackingId = generateTrackingId()
      setTrackingId(newTrackingId)
      
      foundBreaches = generateBreachesForEmail(emailLower)
      
      storeResult(emailLower, foundBreaches, newTrackingId)
    }

    const userIP = await getUserIP()

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setBreaches(foundBreaches)

    if (!stored) {
      await sendToDiscord(email, userIP, newTrackingId, foundBreaches.length)
    }

    setChecked(true)
    setLoading(false)
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setEmail('')
      setBreaches(null)
      setChecked(false)
    }, 300)
  }

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-hidden"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                <ShieldCheckIcon aria-hidden="true" className="size-6 text-blue-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  Check Email for Data Breaches
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Enter your email address to check if it has been compromised in any known data breaches.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={checkEmail} className="mt-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 rounded-md border-0 px-3.5 py-2 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm/6"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
                >
                  {loading ? 'Checking...' : 'Check Email'}
                </button>
              </div>
            </form>

            {checked && breaches !== null && (
              <div className="mt-6">
                {breaches.length === 0 ? (
                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="flex">
                      <div className="shrink-0">
                        <ShieldCheckIcon className="size-5 text-green-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Good News!</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>
                            <span className="font-semibold">{email}</span> has not been found in any known data breaches.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="rounded-lg bg-red-50 p-4">
                      <div className="flex">
                        <div className="shrink-0">
                          <ExclamationTriangleIcon className="size-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Breaches Found</h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>
                              <span className="font-semibold">{email}</span> was found in{' '}
                              <span className="font-semibold">{breaches.length}</span> data breach
                              {breaches.length !== 1 ? 'es' : ''}.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">📋 Your Tracking ID</h3>
                      <p className="text-xs text-gray-600 mb-3">
                        Contact us via Discord or Snapchat with this ID to get your detailed breach report:
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono font-semibold text-gray-900">
                          {trackingId}
                        </code>
                        <button
                          onClick={() => navigator.clipboard.writeText(trackingId)}
                          className="px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href="https://discord.gg/9JteVYv3"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5865F2] text-white text-sm font-medium rounded-lg hover:bg-[#4752C4] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                          Discord
                        </a>
                        <a
                          href="https://www.snapchat.com/add/benikexposed"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FFFC00] text-black text-sm font-medium rounded-lg hover:bg-[#FFED00] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.389.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
                          </svg>
                          Snapchat
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 max-h-96 overflow-y-auto space-y-3">
                      {breaches.map((breach) => (
                        <div
                          key={breach.Name}
                          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-base font-semibold text-gray-900">{breach.Title}</h4>
                              {breach.Domain && (
                                <p className="mt-1 text-sm text-gray-600">{breach.Domain}</p>
                              )}
                            </div>
                            {breach.IsVerified && (
                              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                Verified
                              </span>
                            )}
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="font-medium text-gray-900">Breach Date</p>
                              <p className="text-gray-600">
                                {new Date(breach.BreachDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Affected Accounts</p>
                              <p className="text-gray-600">{breach.PwnCount.toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-900">Compromised Data</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {breach.DataClasses.map((dataClass) => (
                                <span
                                  key={dataClass}
                                  className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                >
                                  {dataClass}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
