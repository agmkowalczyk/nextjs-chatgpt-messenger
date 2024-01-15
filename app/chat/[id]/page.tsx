import Chat from '@/components/Chat'
import ChatInput from '@/components/ChatInput'

const ChatPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  )
}

export default ChatPage
