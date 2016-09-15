export const CHOOSE_TOPIC = 'CHOOSE_TOPIC'

export default function chooseTopic(topic_id) {
  return {
    type: CHOOSE_TOPIC,
    payload: topic_id,
  }
}
