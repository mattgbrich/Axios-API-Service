const defaultState = {
  baseURL: 'http://localhost:8080'
}

const envReducer = (state = defaultState, { type, payload }) => state

export default envReducer
