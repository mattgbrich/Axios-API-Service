export const setError = ({status, message}) => ({
  type: 'NOTIFICATIONS_SET_ERROR',
  payload: {
    open: true,
    status,
    message
  }
})

export const clearError = () => ({
  type: 'NOTIFICATIONS_CLEAR_ERROR'
})

