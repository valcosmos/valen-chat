import type { DocumentData } from 'firebase/firestore'
import { CSSProperties } from 'react'

import ReactMarkdown from 'react-markdown'

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'


type Props = {
  message: DocumentData
}

export default function message ({ message }: Props) {
  const isChatGPT = message.user.name === 'ChatGPT'

  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`}>
      <div className="flex max-w-2xl px-10 mx-auto space-x-5">
        <img src={message.user.avatar} className="w-8 h-8" alt="avatar" />
        <div className="pt-1 space-y-2 text-sm">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter style={atomDark as any} language={match[1]} PreTag="div" {...props}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {message.text}
          </ReactMarkdown>
          {/* {} */}
        </div>
      </div>
    </div>
  )
}
