import { openai } from '@/lib/chatgpt'
import { NextApiRequest, NextApiResponse } from 'next'

type Option = {
  label: string
  value: string
}

type Data = {
  modelOptions: Option[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const models = await openai.listModels().then((res) => res.data.data)

  const modelOptions = models.map((model) => ({
    label: model.id,
    value: model.id
  }))

  res.status(200).json({ modelOptions })
}
