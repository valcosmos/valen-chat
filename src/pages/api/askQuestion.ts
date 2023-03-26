import { useSession } from 'next-auth/react'
import admin from 'firebase-admin'
import { query } from '@/lib/queryApi'
import { adminDB } from '@/utils/firebaseAdmin'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt, chatId, model, session } = req.body

  if (!prompt) return res.status(400).json({ answer: 'Please provide a prompt!' })

  if (!chatId) return res.status(400).json({ answer: 'Please provide a valid chat ID' })

  // ChatGPT Query


  const awaitWrap = (promise:Promise<any>) =>promise.then(res=>[null, res]).catch(err=>[err,null])
    
  const [err, response] = await awaitWrap(query(prompt, chatId, model))
    // const response = await 

  if (err) return res.status(500).json({ answer: 'unknown error' })
  
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
