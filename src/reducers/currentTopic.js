import { CHOOSE_TOPIC } from '../actions/choose-topic'

export default function chooseTopic(state = 1, { type, payload }) {
  switch (type) {
    case CHOOSE_TOPIC :
      return payload

    default :
      return state
  }
}
