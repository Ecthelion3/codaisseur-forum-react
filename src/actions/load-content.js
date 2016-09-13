import appLoading from './app-loading'
import getQuestions from './get-questions'
import appDoneLoading from './app-done-loading'
import contentLoaded from './content-loaded'

export default function authenticateUser(user) {
  return dispatch => {
    dispatch(appLoading())
    dispatch(getQuestions()).then((response) => {
      dispatch(appDoneLoading())
      dispatch(contentLoaded())
    })
  }
}
