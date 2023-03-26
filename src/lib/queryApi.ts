import { openai } from "./chatgpt"


export const query = async (prompt: string, chatId: string, model: string) => { 
  const res = await openai
    .createChatCompletion({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9
      // top_p: 1,
      // max_tokens: 1000,
      // frequency_penalty: 0,
      // presence_penalty:0
    })
    .then((res) => res.data.choices[0].message?.content)
    .catch((err) => `ChatGPT was unable to find an answer for that! (Error: ${err.message})`)
  
  return res
}