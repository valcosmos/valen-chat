'use client'

import { db } from '@/utils/firebase'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'

type Props = {
  chatId: string
}

export default function Chat({ chatId }: Props) {
  const { data: session } = useSession()

  const [messages] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats', chatId, 'messages'),
        orderBy('createdAt', 'asc')
      )
  )

  const messageListRef = useRef<HTMLDivElement | null>(null)
  
  const scrollToBottom = () => {
    if (messageListRef.current?.lastElementChild) {
      messageListRef.current?.lastElementChild.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto" ref={messageListRef}>
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">Type a prompt in below to get started</p>
          <ArrowDownCircleIcon className="w-10 h-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}

      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  )
}
