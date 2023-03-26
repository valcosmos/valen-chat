import { openai } from './chatgpt'

export const query = async (prompt: string, chatId: string, model: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await openai.createChatCompletion({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true
      }, {
        timeout: 100000
      })
      resolve(res.data.choices[0].message?.content)
      // return res.data.choices[0].message?.content
    } catch (error: any) {
      reject(error)
      if (error.response) {
        console.log(error.response.status)
        console.log(error.response.data)
      } else {
        console.log(error.message)
      }
    }
  })

// .then((res) => res.data.choices[0].message?.content)
// .catch((err) => `ChatGPT was unable to find an answer for that! (Error: ${err.message})`)
// }
