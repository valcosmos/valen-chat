'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import NewChat from './NewChat'
import Image from 'next/image'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '../utils/firebase'
import ChatRow from './ChatRow'
import ModelSelection from './ModelSelection'

export default function Sidebar() {
  const { data: session } = useSession()
  const [chats, loading, error] = useCollection(
    session &&
      query(collection(db, 'users', session.user?.email!, 'chats'), orderBy('createdAt', 'asc'))
  )

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="flex-1">
        <div>
          {/* new chat */}
          <NewChat />
          <div className="hidden sm:inline">
            {/* model selection */}
            <ModelSelection />
          </div>

          {/* map through the chat rows */}
          <div className="flex flex-col my-2 space-y-2">
            {loading && (
              <div className="text-center text-white animate-pulse">
                <p>Loading Chats...</p>
              </div>
            )}

            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image || ''}
          alt="user avatar"
          className="w-12 h-12 mx-auto mb-2 rounded-full cursor-pointer hover:opacity-50"
        />
      )}
    </div>
  )
}
