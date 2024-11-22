import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function ChatPage(props:Props) {
  const params = await props.params;

  const {
    id
  } = params;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* chat */}
      <Chat chatId={id} />

      {/* chat input */}
      <ChatInput chatId={id} />

    </div>
  )
}
