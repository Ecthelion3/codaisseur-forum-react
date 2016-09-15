// import api from '../middleware/api'
import appLoading from './app-loading'
import appDoneLoading from './app-done-loading'
import userAuthenticated from './user-authenticated'
import setFormErrors from './set-form-errors'
import resetFormErrors from './reset-form-errors'
import userSignedOut from './user-signed-out'

export default function authenticateUser(user) {
  console.log("User Data: ", user)

  return dispatch =>
  fetch('http://localhost:4000/users/sign_in', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: user
    }),
  })
  .then((response) => {
    console.log('Response:', response)
    // response.data has the currentUser...
    dispatch(userAuthenticated(user))
    dispatch(appDoneLoading())
  })
  .catch(error => {
    console.error('Error authenticating!', error);
    dispatch(setFormErrors({ email: error.message }))
    dispatch(userSignedOut())
    dispatch(appDoneLoading())
  })
}

// export default function authenticateUser(user) {
//   console.log("User Data: ", user)
//   return dispatch => {
//     dispatch(resetFormErrors())
//     // We're loading (communicating with the API asynchronously)
//     dispatch(appLoading())
//
//     // Here's the new user data, create a User with it
//     api.authenticate(user).then((response) => {
//       // response.data has the currentUser...
//       dispatch(userAuthenticated(response.data))
//       dispatch(appDoneLoading())
//     }).catch((error) => {
//       console.error('Error authenticating!', error);
//       dispatch(setFormErrors({ email: error.message }))
//       dispatch(userSignedOut())
//       dispatch(appDoneLoading())
//     })
//   }
// }
