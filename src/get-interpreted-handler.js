import OpenAI from 'openai'

const openai = new OpenAI()
const GPT_MODEL = 'gpt-3.5-turbo'

export const getInterpretedHandler = async ({ userInput, systemMessage, availableFunctions, functionsSchemas }) => {
  const messages = [
    { role: 'system', content: systemMessage },
    { role: 'user', content: userInput }
  ]
  const response = await chatCompletion(messages, functionsSchemas)
  const responseMessage = response.choices[0].message
  const handler = generateHandler(responseMessage, availableFunctions)
  return handler
}

const chatCompletion = async (messages, functions = null, model = GPT_MODEL, functionCall = 'auto') => {
  if (functions) {
    return openai.chat.completions.create({ model, messages, functions, function_call: functionCall })
  }
  return openai.chat.completions.create({ model, messages })
}

const generateHandler = (responseMessage, functions) => {
  if (!responseMessage.function_call) {
    return () => console.log(responseMessage.content)
  }
  const functionName = responseMessage.function_call.name
  const functionArgs = JSON.parse(responseMessage.function_call.arguments)
  const args = Object.values(functionArgs)
  return () => functions[functionName](...args)
}
