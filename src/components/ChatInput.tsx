'use client'

import { db } from '@/utils/firebase'
import useSWR from 'swr'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import ModelSelection from './ModelSelection'
import { MODEL } from '@/constant'


type Props = {
  chatId: string
}
export default function ChatInput({ chatId }: Props) {
  const { data: session } = useSession()
  const [prompt, setPrompt] = useState('')

  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: MODEL
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
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`
      }
    }
    await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
      message
    )

    // Toast notification

    const notification = toast.loading('ChatGPT is thinking')


    const eventSource = new EventSource(`/api/ask-question/${model}/${input}`)

    let answer = ''

    const resMessage: Message = {
      text: answer,
      createdAt: serverTimestamp(),
      user: {
        _id: 'ChatGPT',
        name: 'ChatGPT',
        avatar: 'https://links.papareact.com/89k'
      }
    }
    // adminDB
    //   .collection('users')
    //   .doc(session?.user?.email!)
    //   .collection('chats')
    //   .doc(chatId)
    //   .collection('messages')
    //   .add(resMessage)
    const doc = await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
      resMessage
    )

    

    eventSource.addEventListener('message',async (event) => {
      toast.success('ChatGPT is answering!', {
        id: notification,
      })
      if (event.data === '[DONE]') {
        toast.success('ChatGPT has responded!', {
          id: notification
        })
        return eventSource.close()
      }

      const data = JSON.parse(event.data)
      if (data.choices[0].delta.content) {
        answer += data.choices[0].delta.content
      }

      await updateDoc(doc, {text: answer })
    })

    eventSource.addEventListener('error', (err) => {
      toast.error('Something wrong', {
        id: notification
      })
      eventSource.close()
    })
  }

  return (
    <div className="text-sm text-gray-400 rounded-lg bg-gray-700/50 ">
      <form onSubmit={sendMessage} className="flex p-5 space-x-5">
        <input
          className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          type={'text'}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here"
        />

        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden">
        {/* model selection */}
        <ModelSelection />
      </div>
    </div>
  )
}
