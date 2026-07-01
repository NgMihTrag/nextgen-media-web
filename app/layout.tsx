import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { ContactModalProvider } from '@/context/contact-modal-context'
import { ContactModal } from '@/components/contact-modal'

const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'NextGen Media - Setup Livestream Chuyên Nghiệp',
  description: 'Dịch vụ setup livestream trọn gói, ánh sáng, camera, phần mềm, vận hành livestream chuyên nghiệp cho cá nhân, shop và doanh nghiệp.',
  generator: 'v0.app',
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: 'NextGen Media - Setup Livestream Chuyên Nghiệp',
    description: 'Giải pháp livestream chuyên nghiệp từ setup thiết bị đến vận hành.',
    type: 'website',
    locale: 'vi_VN',
    url: 'https://www.nexttgenmedia.com',
    siteName: 'NextGen Media',
    images: [
      {
        url: 'https://www.nexttgenmedia.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NextGen Media - Setup Livestream Chuyên Nghiệp',
        type: 'image/jpeg',
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'NextGen Media - Setup Livestream Chuyên Nghiệp',
    description: 'Giải pháp livestream chuyên nghiệp từ setup thiết bị đến vận hành.',
    images: ['https://www.nexttgenmedia.com/og-image.jpg'],
    site: '@nexttgenmedia',
    creator: '@nexttgenmedia',
  },
  
  icons: {
    icon: [
      {
        url: '/Favicon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/Favicon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/Favicon.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/Favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="bg-background">
      <body className={`${inter.className} antialiased`}>
        <ContactModalProvider>
          <Header />
          {children}
          <ContactModal />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ContactModalProvider>
      </body>
    </html>
  )
}
