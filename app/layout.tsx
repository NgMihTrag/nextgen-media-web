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
  title: 'NextGen Media - Giải Pháp Livestream Chuyên Nghiệp',
  description: 'NextGen Media chuyên setup livestream TikTok Shop, ánh sáng, camera, vận hành livestream và xây dựng studio chuyên nghiệp tại Hà Nội.',
  generator: 'v0.app',
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
