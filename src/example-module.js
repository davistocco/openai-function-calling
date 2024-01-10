const quizzes = []

export const getQuizzes = () => quizzes

export const createQuiz = ({ name, questions }) => {
  quizzes.push({ name, questions })
}

export const quizSchemas = [
  {
    name: 'getQuizzes',
    description: 'Get all quizzes'
  },
  {
    name: 'createQuiz',
    description: 'Create a new quiz',
    parameters: {
      type: 'object',
      properties: {
        quiz: {
          type: 'object',
          description: 'The quiz to create',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the quiz.'
            },
            questions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'The name of the question.'
                  },
                  answers: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          description: 'The name of the answer.'
                        },
                        isCorrect: {
                          type: 'boolean',
                          description: 'Whether the answer is correct.'
                        }
                      },
                      required: ['name', 'isCorrect']
                    }
                  }
                },
                required: ['name', 'answers']
              }
            }
          }
        }
      },
      required: ['name', 'questions']
    }
  }
]
