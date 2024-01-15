import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import Provider from '@/components/SessionProvider'
import SideBar from '@/components/SideBar'
import Login from '@/components/Login'

import './globals.css'
import ClientProvider from '@/components/ClientProvider'

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
      <body>
        <Provider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className='flex'>
              <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[15rem]'>
                <SideBar />
              </div>

              <ClientProvider />

              <div className='bg-[#343541] flex-1'>{children}</div>
            </div>
          )}
        </Provider>
      </body>
    </html>
  )
}
