const defaultState = {
  error: {
    open: false,
    status: '',
    message: ''
  }
}

function notificationsReducer (state = defaultState, { type, payload }) {
  switch(type) {
    case 'NOTIFICATIONS_SET_ERROR':
      return {
        ...state,
        error: payload
      }
    case 'NOTIFICATIONS_CLEAR_ERROR':
      return {
        ...state,
        error: defaultState.error
      }
    default:
      return state
  }
}

export default notificationsReducer
