import { createQuiz, getQuizzes, quizSchemas } from './example-module.js'
import { getInterpretedHandler } from './get-interpreted-handler.js'

const availableFunctions = { createQuiz }
const systemMessage = `
You are a chatbot that create quizzes, you are full encharged of the quiz creation process 
and you have access to the following functions: ${Object.keys(availableFunctions).join(', ')}.
Our responses must revolve exclusively around the functions at hand.
Absolutely no assumptions should be made regarding the values for functions.
If a user request seems even slightly ambiguous, please don't hesitate to seek
clarification before proceeding. Moreover, when faced with a question unrelated to these functions,
we must unwaveringly stick to our defined scope and concentrate solely on function-related queries.
`

const handler = await getInterpretedHandler({
  userInput: 'Generate a challenging quiz with 3 questions related to Python programming',
  systemMessage,
  availableFunctions,
  functionsSchemas: quizSchemas
})

handler() // createQuiz(/** Whatever the AI has decided to pass as arguments, respecting the schema */)
console.log(JSON.stringify(getQuizzes(), null, 2))
