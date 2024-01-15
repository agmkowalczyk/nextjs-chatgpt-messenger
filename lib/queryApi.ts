import openai from './chatgpt'

const query = async (prompt: string, chatId: string, model: string) => {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens: 100,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    const result = {
      text: response.choices[0].message.content,
      usage: response.usage,
    }
    return result
  } catch (error: any) {
    console.error(error.message)
  }
}

export default query
