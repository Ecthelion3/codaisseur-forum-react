import { GET_TOPICS } from '../actions/get-topics'

export default function getTopics( state = [], { type, payload } ) {
  switch (type) {
    case GET_TOPICS :
      return payload.topics

    default :
      return state
  }
}
