import React from 'react'
import NewChat from './NewChat'

export default function Sidebar() {
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        {/* new chat */}
        <NewChat />
        <div>
          <div>{/* model selection */}</div>

          {/* map through the chat rows */}

        </div>
      </div>
    </div>
  )
}
