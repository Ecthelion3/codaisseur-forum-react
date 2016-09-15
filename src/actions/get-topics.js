export const GET_TOPICS = 'GET_TOPICS'

export default function getTopics(data) {
  return {
    type: GET_TOPICS,
    payload: data,
  }
}
