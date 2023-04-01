'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import pkg from '../../package.json'
import { SparklesIcon } from '@heroicons/react/24/outline'

export default function Login() {
  return (
    <div className="bg-[#11a37f] h-screen flex flex-col items-center justify-center text-center">
      {/* <Image src="https://links.papareact.com/2i6" width={300} height={300} alt="logo" /> */}
      <div className="p-2 mb-5 border-4 rounded-3xl">
        <SparklesIcon className="w-[100px] h-[100px] text-white" />
      </div>

      <button
        className="text-3xl font-bold text-white animate-pulse"
        onClick={() => signIn('google')}
      >
        Sign In to use {pkg.name}
      </button>
    </div>
  )
}
