import openai from '../../../lib/chatgpt'

type Option = {
  value: string
  label: string
}

export async function GET() {
  try {
    const models = await openai.models.list()
    
    const modelOptions: Option[] = models.data.map((model) => ({
      value: model.id,
      label: model.id,
    }))

    return Response.json(modelOptions, { status: 200 })
  } catch (error) {
    return Response.json(
      { answer: 'Cannot get model options' },
      { status: 400 }
    )
  }
}