import { GET_QUESTIONS } from '../actions/get-questions'

export default function getQuestions( state = [], { type, payload } ) {
  switch (type) {
    case GET_QUESTIONS :
      return payload.questions

    default :
      return state
  }
}
