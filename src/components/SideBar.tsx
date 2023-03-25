'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import NewChat from './NewChat'
import Image from 'next/image'

export default function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="flex-1">
        {/* new chat */}
        <NewChat />
        <div>
          <div>{/* model selection */}</div>

          {/* map through the chat rows */}
        </div>
      </div>
      {session && <img onClick={()=>signOut()} src={session.user?.image||''} alt="user avatar" className='w-12 h-12 mx-auto mb-2 rounded-full cursor-pointer hover:opacity-50' />}
    </div>
  )
}
