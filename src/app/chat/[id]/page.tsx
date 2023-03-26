import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";

type Props = {
  params: {
    id: string
  }
}

export default function ChatPage ({ params: { id} }:Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* chat */}
      <Chat chatId={id} />

      {/* chat input */}
      <ChatInput chatId={id} />

    </div>
  )
}
