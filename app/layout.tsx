import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import SessionProvider from '@/components/SessionProvider'
import SideBar from '@/components/SideBar'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatGPT Messenger',
  description: 'ChatGPT Messenger',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <body className='flex'>
        <SessionProvider session={session}>
          <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[15rem]'>
            <SideBar />
          </div>

          {/* ClinetProvider - Notification */}

          <div className='bg-[#343541] flex-1'>{children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}
