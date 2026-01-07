'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'nl' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  nl: {
    // Hero
    'hero.title.part1': 'Is Jouw Email',
    'hero.title.part2': 'Gelekt',
    'hero.subtitle': 'Controleer of jouw emailadres voorkomt in bekende datalekken. Blijf geïnformeerd en bescherm je digitale identiteit.',
    'hero.button': 'Controleer Je Email',
    'hero.powered': 'Veilige breach checking powered by geavanceerde security databases',

    // Navigation
    'nav.features': 'Functies',
    'nav.testimonials': 'Reviews',
    'nav.faq': 'FAQ',
    'nav.pricing': 'Prijzen',

    // Pricing
    'pricing.title': 'Simpele prijzen,',
    'pricing.subtitle': 'volume kortingen.',
    'pricing.description': 'Krijg volledige toegang tot alle gevonden data voor je emailaccounts. Hoe meer accounts je checkt, hoe meer je bespaart.',
    
    'pricing.single.name': 'Enkel Account',
    'pricing.single.price': '€5',
    'pricing.single.description': 'Krijg alle gevonden data voor 1 emailaccount.',
    'pricing.single.feature1': 'Check 1 emailaccount',
    'pricing.single.feature2': 'Alle gevonden wachtwoorden',
    'pricing.single.feature3': 'Alle gevonden emailadressen',
    'pricing.single.feature4': 'Complete breach geschiedenis',
    'pricing.single.feature5': 'Data lek informatie',
    'pricing.single.feature6': 'Security tips & aanbevelingen',

    'pricing.duo.name': 'Duo Account',
    'pricing.duo.price': '€10',
    'pricing.duo.description': 'Krijg alle gevonden data voor 2 accounts - Beste deal!',
    'pricing.duo.feature1': 'Check 2 emailaccounts',
    'pricing.duo.feature2': 'Alle gevonden wachtwoorden voor beide',
    'pricing.duo.feature3': 'Alle gevonden emailadressen',
    'pricing.duo.feature4': 'Complete breach geschiedenis',
    'pricing.duo.feature5': 'Data lek informatie',
    'pricing.duo.feature6': 'Priority support',
    'pricing.duo.feature7': 'Slechts €5 per account',

    'pricing.family.name': 'Familie Plan',
    'pricing.family.price': '€15',
    'pricing.family.description': 'Krijg alle gevonden data voor 3 accounts - Maximale waarde!',
    'pricing.family.feature1': 'Check 3 emailaccounts',
    'pricing.family.feature2': 'Alle gevonden wachtwoorden voor alle 3',
    'pricing.family.feature3': 'Alle gevonden emailadressen',
    'pricing.family.feature4': 'Complete breach geschiedenis',
    'pricing.family.feature5': 'Data lek informatie',
    'pricing.family.feature6': 'Premium support',
    'pricing.family.feature7': 'Slechts €5 per account',

    // Testimonials
    'testimonials.title': 'Vertrouwd door beveiligingsbewuste gebruikers.',
    'testimonials.subtitle': 'Duizenden mensen gebruiken onze tool om op de hoogte te blijven van datalekken en hun digitale identiteit te beschermen.',
    
    'testimonials.review1': 'Ik had geen idee dat mijn email in 3 verschillende breaches zat totdat ik hier checkte. Het betalingsproces via Discord was soepel en ik kreeg mijn volledige rapport direct.',
    'testimonials.review2': 'Deze tool hielp me ontdekken dat mijn oude email van 2012 gecompromitteerd was. Elke euro waard voor de gemoedsrust.',
    'testimonials.review3': 'De gedetailleerde informatie over elke breach hielp me precies begrijpen welke data blootgesteld was. Betaling via Snapchat was snel en makkelijk.',
    'testimonials.review4': 'Snel, gemakkelijk en eye-opening. Iedereen zou regelmatig zijn email moeten checken om op de hoogte te blijven van potentiële beveiligingsproblemen.',
    'testimonials.review5': 'Ik check mijn email hier elke paar maanden. De service is professioneel en het betalingsproces is eenvoudig.',
    'testimonials.review6': 'Ontdekte dat mijn email in meerdere breaches zat. Het gedetailleerde rapport dat ik na betaling ontving was precies wat ik nodig had.',

    // FAQ
    'faq.title': 'Veelgestelde vragen',
    'faq.subtitle': 'Leer meer over hoe onze breach checker werkt en hoe je je digitale identiteit kunt beschermen.',
    
    'faq.q1': 'Hoe werkt het betalingsproces?',
    'faq.a1': 'Na het checken van je email, als er breaches gevonden zijn, kun je contact met ons opnemen via Discord of Snapchat om de betaling te voltooien. Zodra de betaling is bevestigd, krijg je direct toegang tot je gedetailleerde breach rapport.',
    
    'faq.q2': 'Welke betaalmethoden accepteren jullie?',
    'faq.a2': 'We accepteren betalingen via Discord en Snapchat. Neem gewoon contact met ons op via een van beide platforms na je breach check, en we begeleiden je door het veilige betalingsproces.',
    
    'faq.q3': 'Hoeveel kost de service?',
    'faq.a3': 'De prijs hangt af van het aantal emailaccounts dat je wilt monitoren. Bekijk onze prijzensectie voor gedetailleerde plannen: €5 voor 1 account, €10 voor 2 accounts, en €15 voor 3 accounts.',
    
    'faq.q4': 'Wat krijg ik na betaling?',
    'faq.a4': 'Na betaling ontvang je een uitgebreid rapport met alle breaches waarin je email voorkomt, inclusief breach datums, gecompromitteerde data types, aantal getroffen accounts, en beveiligingsaanbevelingen.',
    
    'faq.q5': 'Hoe neem ik contact op voor betaling?',
    'faq.a5': 'Je kunt ons bereiken via Discord of Snapchat. Links naar beide platforms zijn beschikbaar in de footer van deze website. Neem contact met ons op met je email check resultaten en we helpen je met de betaling.',
    
    'faq.q6': 'Is mijn betalingsinformatie veilig?',
    'faq.a6': 'Ja, alle betalingen worden veilig verwerkt via Discord of Snapchat. We slaan nooit je betalingsinformatie op en alle transacties zijn versleuteld.',
    
    'faq.q7': 'Hoe snel krijg ik toegang na betaling?',
    'faq.a7': 'Toegang tot je gedetailleerde breach rapport wordt direct na betalingsbevestiging verstrekt. Je ontvangt je volledige rapport binnen enkele minuten.',
    
    'faq.q8': 'Kan ik een terugbetaling krijgen?',
    'faq.a8': 'Vanwege de digitale aard van onze service en directe toegang tot breach data, bieden we geen terugbetalingen aan. We zorgen er echter voor dat alle verstrekte informatie accuraat en uitgebreid is.',
    
    'faq.q9': 'Bieden jullie kortingen voor meerdere accounts?',
    'faq.a9': 'Ja! We bieden volumekortingen: 2 accounts bespaar je €10 (€20 per account), en 3 accounts bespaar je €15 (€20 per account). Bekijk onze prijzensectie voor meer details.',

    // PrimaryFeatures
    'primary.title': 'Alles wat je nodig hebt om veilig te blijven.',
    'primary.subtitle': 'Uitgebreide breach monitoring en beveiligingsbewustzijn tools om je digitale identiteit te beschermen.',
    
    'primary.feature1.title': 'Real-time Breach Monitoring',
    'primary.feature1.description': 'Check je email tegen miljarden gecompromitteerde accounts van datalekken wereldwijd.',
    
    'primary.feature2.title': 'Gedetailleerde Breach Informatie',
    'primary.feature2.description': 'Krijg uitgebreide details over elke breach inclusief datum, getroffen data types en aantal gecompromitteerde accounts.',
    
    'primary.feature3.title': 'Privacy Eerst',
    'primary.feature3.description': 'We slaan nooit je emailadres op. Alle checks worden veilig en anoniem uitgevoerd.',
    
    'primary.feature4.title': 'Beveiligingsaanbevelingen',
    'primary.feature4.description': 'Ontvang uitvoerbaar advies over hoe je jezelf kunt beschermen als je data gecompromitteerd is.',

    // SecondaryFeatures
    'secondary.title': 'Bescherm je digitale identiteit.',
    'secondary.subtitle': 'Leer essentiële beveiligingspraktijken en blijf op de hoogte van bedreigingen voor je online accounts en persoonlijke informatie.',
    
    'secondary.feature1.title': 'Wachtwoordbeveiliging',
    'secondary.feature1.summary': 'Leer hoe je sterke, unieke wachtwoorden maakt en beheert.',
    'secondary.feature1.description': 'Ontdek best practices voor wachtwoordbeheer inclusief het gebruik van wachtwoordmanagers en het inschakelen van twee-factor authenticatie op al je accounts.',
    
    'secondary.feature2.title': 'Breach Alerts',
    'secondary.feature2.summary': 'Ontvang meldingen wanneer je informatie in nieuwe datalekken verschijnt.',
    'secondary.feature2.description': 'Blijf op de hoogte van de nieuwste beveiligingsincidenten en begrijp welke data mogelijk gecompromitteerd is in elke breach.',
    
    'secondary.feature3.title': 'Beveiligingstips',
    'secondary.feature3.summary': 'Krijg toegang tot expert advies over het beschermen van je digitale identiteit en privacy.',
    'secondary.feature3.description': 'Leer over phishing aanvallen, social engineering en andere veelvoorkomende bedreigingen. Krijg praktische tips om je online accounts en persoonlijke informatie te beveiligen.',

    // Footer
    'footer.copyright': 'benikexposed. Alle rechten voorbehouden.',

    // CTA
    'cta.title': 'Check je email nu',
    'cta.subtitle': 'Wacht niet tot het te laat is. Ontdek of je email gecompromitteerd is in een datalek en neem actie om jezelf te beschermen.',
    'cta.button': 'Check Je Email',

    // Modal
    'modal.title': 'Check Email voor Datalekken',
    'modal.subtitle': 'Voer je email in om te controleren of deze gecompromitteerd is',
    'modal.placeholder': 'jouw.email@voorbeeld.nl',
    'modal.checking': 'Controleren...',
    'modal.checkButton': 'Check Email',
    'modal.close': 'Sluiten',
    'modal.goodNews': 'Goed Nieuws!',
    'modal.noBreaches': 'is niet gevonden in bekende datalekken.',
    'modal.breachesFound': 'Datalekken Gevonden',
    'modal.foundIn': 'is gevonden in',
    'modal.dataBreach': 'datalek',
    'modal.dataBreaches': 'datalekken',
    'modal.purchaseTitle': 'Koop Login Gegevens',
    'modal.purchasePrice': 'Krijg toegang tot login gegevens voor slechts',
    'modal.feature1': 'Alle data legaal verkregen van onze server',
    'modal.feature2': 'ID verificatie vereist voor veiligheid',
    'modal.feature3': 'Direct toegang na verificatie',
    'modal.trackingId': 'Jouw Tracking ID',
    'modal.copy': 'Kopieer',
    'modal.contactUs': 'Neem contact met ons op met je tracking ID om de aankoop te voltooien',
  },
  en: {
    // Hero
    'hero.title.part1': 'Has Your Email Been',
    'hero.title.part2': 'Compromised',
    'hero.subtitle': 'Check if your email address has appeared in any known data breaches. Stay informed and protect your digital identity.',
    'hero.button': 'Check Your Email',
    'hero.powered': 'Secure breach checking powered by advanced security databases',

    // Navigation
    'nav.features': 'Features',
    'nav.testimonials': 'Testimonials',
    'nav.faq': 'FAQ',
    'nav.pricing': 'Pricing',

    // Pricing
    'pricing.title': 'Simple pricing,',
    'pricing.subtitle': 'volume discounts.',
    'pricing.description': 'Get complete access to all found data for your email accounts. The more accounts you check, the more you save.',
    
    'pricing.single.name': 'Single Account',
    'pricing.single.price': '€5',
    'pricing.single.description': 'Get all found data for 1 email account.',
    'pricing.single.feature1': 'Check 1 email account',
    'pricing.single.feature2': 'All found passwords',
    'pricing.single.feature3': 'All found email addresses',
    'pricing.single.feature4': 'Complete breach history',
    'pricing.single.feature5': 'Data leak information',
    'pricing.single.feature6': 'Security tips & recommendations',

    'pricing.duo.name': 'Duo Account',
    'pricing.duo.price': '€10',
    'pricing.duo.description': 'Get all found data for 2 accounts - Best deal!',
    'pricing.duo.feature1': 'Check 2 email accounts',
    'pricing.duo.feature2': 'All found passwords for both',
    'pricing.duo.feature3': 'All found email addresses',
    'pricing.duo.feature4': 'Complete breach history',
    'pricing.duo.feature5': 'Data leak information',
    'pricing.duo.feature6': 'Priority support',
    'pricing.duo.feature7': 'Only €5 per account',

    'pricing.family.name': 'Family Plan',
    'pricing.family.price': '€15',
    'pricing.family.description': 'Get all found data for 3 accounts - Maximum value!',
    'pricing.family.feature1': 'Check 3 email accounts',
    'pricing.family.feature2': 'All found passwords for all 3',
    'pricing.family.feature3': 'All found email addresses',
    'pricing.family.feature4': 'Complete breach history',
    'pricing.family.feature5': 'Data leak information',
    'pricing.family.feature6': 'Premium support',
    'pricing.family.feature7': 'Only €5 per account',

    // Testimonials
    'testimonials.title': 'Trusted by security-conscious users.',
    'testimonials.subtitle': 'Thousands of people use our tool to stay informed about data breaches and protect their digital identity.',
    
    'testimonials.review1': 'I had no idea my email was in 3 different breaches until I checked here. The payment process via Discord was smooth and I got my full report instantly.',
    'testimonials.review2': 'This tool helped me discover that my old email from 2012 was compromised. Worth every euro for the peace of mind.',
    'testimonials.review3': 'The detailed information about each breach helped me understand exactly what data was exposed. Payment via Snapchat was quick and easy.',
    'testimonials.review4': 'Quick, easy, and eye-opening. Everyone should check their email regularly to stay on top of potential security issues.',
    'testimonials.review5': 'I check my email here every few months. The service is professional and the payment process is straightforward.',
    'testimonials.review6': 'Found out my email was in multiple breaches. The detailed report I received after payment was exactly what I needed.',

    // FAQ
    'faq.title': 'Frequently asked questions',
    'faq.subtitle': 'Learn more about how our breach checker works and how to protect your digital identity.',
    
    'faq.q1': 'How does the payment process work?',
    'faq.a1': 'After checking your email, if breaches are found, you can contact us via Discord or Snapchat to complete payment. Once payment is confirmed, you receive immediate access to your detailed breach report.',
    
    'faq.q2': 'What payment methods do you accept?',
    'faq.a2': 'We accept payments via Discord and Snapchat. Simply contact us through either platform after your breach check, and we will guide you through the secure payment process.',
    
    'faq.q3': 'How much does the service cost?',
    'faq.a3': 'Pricing depends on the number of email accounts you want to monitor. Check our pricing section for detailed plans: €5 for 1 account, €10 for 2 accounts, and €15 for 3 accounts.',
    
    'faq.q4': 'What do I get after payment?',
    'faq.a4': 'After payment, you receive a comprehensive report showing all breaches your email appeared in, including breach dates, compromised data types, number of affected accounts, and security recommendations.',
    
    'faq.q5': 'How do I contact you for payment?',
    'faq.a5': 'You can reach us via Discord or Snapchat. Links to both platforms are available in the footer of this website. Contact us with your email check results and we will assist you with payment.',
    
    'faq.q6': 'Is my payment information secure?',
    'faq.a6': 'Yes, all payments are processed securely through Discord or Snapchat. We never store your payment information and all transactions are encrypted.',
    
    'faq.q7': 'How quickly do I get access after payment?',
    'faq.a7': 'Access to your detailed breach report is provided immediately after payment confirmation. You will receive your full report within minutes.',
    
    'faq.q8': 'Can I get a refund?',
    'faq.a8': 'Due to the digital nature of our service and immediate access to breach data, we do not offer refunds. However, we ensure all information provided is accurate and comprehensive.',
    
    'faq.q9': 'Do you offer discounts for multiple accounts?',
    'faq.a9': 'Yes! We offer volume discounts: 2 accounts save €10 (€20 per account), and 3 accounts save €15 (€20 per account). Check our pricing section for more details.',

    // PrimaryFeatures
    'primary.title': 'Everything you need to stay secure.',
    'primary.subtitle': 'Comprehensive breach monitoring and security awareness tools to protect your digital identity.',
    
    'primary.feature1.title': 'Real-time Breach Monitoring',
    'primary.feature1.description': 'Check your email against billions of compromised accounts from data breaches worldwide.',
    
    'primary.feature2.title': 'Detailed Breach Information',
    'primary.feature2.description': 'Get comprehensive details about each breach including date, affected data types, and number of compromised accounts.',
    
    'primary.feature3.title': 'Privacy First',
    'primary.feature3.description': 'We never store your email address. All checks are performed securely and anonymously.',
    
    'primary.feature4.title': 'Security Recommendations',
    'primary.feature4.description': 'Receive actionable advice on how to protect yourself if your data has been compromised.',

    // SecondaryFeatures
    'secondary.title': 'Protect your digital identity.',
    'secondary.subtitle': 'Learn essential security practices and stay informed about threats to your online accounts and personal information.',
    
    'secondary.feature1.title': 'Password Security',
    'secondary.feature1.summary': 'Learn how to create and manage strong, unique passwords.',
    'secondary.feature1.description': 'Discover best practices for password management including using password managers and enabling two-factor authentication on all your accounts.',
    
    'secondary.feature2.title': 'Breach Alerts',
    'secondary.feature2.summary': 'Get notified when your information appears in new data breaches.',
    'secondary.feature2.description': 'Stay informed about the latest security incidents and understand what data may have been compromised in each breach.',
    
    'secondary.feature3.title': 'Security Tips',
    'secondary.feature3.summary': 'Access expert advice on protecting your digital identity and privacy.',
    'secondary.feature3.description': 'Learn about phishing attacks, social engineering, and other common threats. Get practical tips to secure your online accounts and personal information.',

    // Footer
    'footer.copyright': 'benikexposed. All rights reserved.',

    // CTA
    'cta.title': 'Check your email now',
    'cta.subtitle': "Don't wait until it's too late. Find out if your email has been compromised in a data breach and take action to protect yourself.",
    'cta.button': 'Check Your Email',

    // Modal
    'modal.title': 'Check Email for Breaches',
    'modal.subtitle': 'Enter your email to check if it has been compromised',
    'modal.placeholder': 'your.email@example.com',
    'modal.checking': 'Checking...',
    'modal.checkButton': 'Check Email',
    'modal.close': 'Close',
    'modal.goodNews': 'Good News!',
    'modal.noBreaches': 'has not been found in any known data breaches.',
    'modal.breachesFound': 'Breaches Found',
    'modal.foundIn': 'was found in',
    'modal.dataBreach': 'data breach',
    'modal.dataBreaches': 'data breaches',
    'modal.purchaseTitle': 'Purchase Login Credentials',
    'modal.purchasePrice': 'Get access to login credentials for only',
    'modal.feature1': 'All data sourced legally from our server',
    'modal.feature2': 'ID verification required for security',
    'modal.feature3': 'Instant access after verification',
    'modal.trackingId': 'Your Tracking ID',
    'modal.copy': 'Copy',
    'modal.contactUs': 'Contact us with your tracking ID to complete purchase',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('nl') // Default to Dutch

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.nl] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
