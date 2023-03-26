import { useSession } from 'next-auth/react'
import admin from 'firebase-admin'
import { query } from '@/lib/queryApi'
import { adminDB } from '@/utils/firebaseAdmin'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt, chatId, model, session } = req.body

  if (!prompt) return res.status(400).json({ answer: 'Please provide a prompt!' })

  if (!chatId) return res.status(400).json({ answer: 'Please provide a valid chat ID' })

  // ChatGPT Query

  const response = await query(prompt, chatId, model)

  const message: Message = {
    text: response || 'ChatGPT was unable to find an answer for that',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://links.papareact.com/89k'
    }
  }

  await adminDB
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

  res.status(200).json({ answer: message.text })
}
