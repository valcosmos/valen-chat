import type { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import { openai } from '@/lib/chatgpt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('X-Accel-Buffering', 'no')

  const {
    params: [model, prompt]
  } = req.query as { params: string[] }

  try {
    const streamResponse = await openai.createChatCompletion(
      {
        model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true
      },
      {
        timeout: 100000,
        responseType: 'stream'
      }
    )

    const stream = streamResponse.data as unknown as Readable
    stream.on('data', (chunk) => {
      res.write(chunk)
    })

    stream.on('end', () => {
      res.end()
    })
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
  }
}
