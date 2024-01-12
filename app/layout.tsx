import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SideBar from '@/components/SideBar'

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
        <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[15rem]'>
          <SideBar />
        </div>

        {/* ClinetProvider - Notification */}

        <div className='bg-[#343541] flex-1'>{children}</div>
      </body>
    </html>
  )
}
