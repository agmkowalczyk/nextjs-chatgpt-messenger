'use client'

import { FormEvent, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import ModelSelection from './ModelSelection'

const ChatInput = ({ chatId }: { chatId: string }) => {
  const [prompt, setPrompt] = useState('')
  const { data: session } = useSession()

  const user = session?.user

  const { data: model } = useSWR('model', {
    fallbackData: 'gpt-3.5-turbo-1106',
  })

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!prompt) return

    const input = prompt.trim()
    setPrompt('')

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: user?.email!,
        name: user?.name!,
        avatar: user?.image || `https://ui-avatars.com/api/?name=${user?.name}`,
      },
    }

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    )

    const notification = toast.loading('ChatGPT is thinking...')

    try {
      await fetch('/api/ask-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input, chatId, model, session }),
      })
      toast.success('ChatGTP has responded!', { id: notification })
    } catch (error) {}
  }

  return (
    <div className='bg-gray-700/50 text-gray-400 rouded-lg text-sm'>
      <form onSubmit={sendMessage} className='p-5 space-x-5 flex'>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type='text'
          placeholder='Type your message here...'
          className='bg-transparent focus:outline-none flex-1 disabled:text-gray-300'
          disabled={!session}
        />
        <button
          type='submit'
          disabled={!prompt || !session}
          className='bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed'
        >
          <PaperAirplaneIcon className='h-5 w-4 -rotate-45' />
        </button>
      </form>

      <div className='md:hidden'>
        <ModelSelection />
      </div>
    </div>
  )
}

export default ChatInput
