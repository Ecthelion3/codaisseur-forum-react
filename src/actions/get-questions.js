export const GET_QUESTIONS = 'GET_QUESTIONS'

export default function getQuestions(data) {
  return {
    type: GET_QUESTIONS,
    payload: data,
  }
}
