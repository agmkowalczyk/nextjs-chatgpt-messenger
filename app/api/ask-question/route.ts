import query from '@/lib/queryApi'
import admin from 'firebase-admin'
import { adminDb } from '@/lib/firebaseAdmin'

export async function POST(req: Request) {
  const { prompt, chatId, model, session } = await req.json()
  
  if (!prompt) {
    return Response.json(
      { answer: 'Please provide a prompt!' },
      { status: 400 }
    )
  }

  if (!chatId) {
    return Response.json(
      { answer: 'Please provide avalid chat ID!' },
      { status: 400 }
    )
  }

  const response = await query(prompt, chatId, model)

  const message: Message = {
    text: response?.text || 'ChatGPT was unable to find an answer for that!',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: '',
    },
    usage: response?.usage
  }

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

  return Response.json({ answer: message.text }, { status: 200 })
}

