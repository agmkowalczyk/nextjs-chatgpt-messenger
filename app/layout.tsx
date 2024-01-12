import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatGPT Messenger',
  description: 'ChatGPT Messenger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='flex'>
        {/* Sidebar */}

        {/* ClinetProvider - Notification */}

        <div className='bg-[#343541] flex-1'>{children}</div>
      </body>
    </html>
  )
}
