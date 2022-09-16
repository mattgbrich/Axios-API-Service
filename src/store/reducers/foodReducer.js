const defaultState = {
  list: []
}

function foodReducer (state = defaultState, { type, payload }) {
  let list = state.list.reduce((acc, item) => [...acc, item], new Array())
  switch(type) {
    case 'FOOD_LIST':
      return {
        ...state,
        list: payload
      }
    case 'FOOD_ADD':
      return {
        ...state,
        list: [...state.list, payload]
      }
    case 'FOOD_UPDATE':
      const indexToUpdate = list.findIndex(food => food.id === payload.id)
      if (indexToUpdate === -1) return state
      list[indexToUpdate] = payload
      return {
        ...state,
        list
      }
    case 'FOOD_DELETE':
      const toDelete = list.findIndex(food => food.id === payload.id)
      if (toDelete !== -1) list.splice(toDelete, 1)
      return {
        ...state,
        list
      }
    default:
      return state
  }
}

export default foodReducer
