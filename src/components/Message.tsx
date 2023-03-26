import type { DocumentData } from 'firebase/firestore'

type Props = {
  message: DocumentData
}

export default function message ({ message }: Props) {
  const isChatGPT = message.user.name === 'ChatGPT'
  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`
} >
      <div className="flex max-w-2xl px-10 mx-auto space-x-5">
        <img src={message.user.avatar} className="w-8 h-8" alt="avatar" />
        <p className="pt-1 text-sm ">{message.text}</p>
      </div>
    </div>
  )
}
