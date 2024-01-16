'use client'

import { useEffect, useRef } from 'react'
import { db } from '@/lib/firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'

const Chat = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession()
  const ref = useRef<HTMLDivElement>(null)

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session?.user?.email!,
          'chats',
          chatId,
          'messages'
        ),
        orderBy('createdAt', 'asc')
      )
  )

  useEffect(() => {
    if (messages?.docs.length) {
      ref.current?.scrollIntoView({
        // behavior: "smooth",
        block: 'end',
      })
    }
  }, [messages?.docs.length])

  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden'>
      {messages?.empty && (
        <>
          <p className='mt-10 text-center text-white'>
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className='h-10 w-10 mx-auto mt-5 text-white animate-bounce' />
        </>
      )}

      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
      <div ref={ref} />
    </div>
  )
}

export default Chat
