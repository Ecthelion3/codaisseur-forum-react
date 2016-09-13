import { APP_LOADING } from '../actions/app-loading'
import { APP_DONE_LOADING } from '../actions/app-done-loading'
import { CONTENT_LOADED } from '../actions/content-loaded'

export default function loading(state = [ loading = false, loaded = false ], { type }) {
  switch (type) {
    case APP_LOADING :
      return [ true, state.loaded ]

    case APP_DONE_LOADING :
      return [ false, state.loaded ]

    case CONTENT_LOADED :
      return [ state.loading, true ]

    default :
      return state
  }
}
