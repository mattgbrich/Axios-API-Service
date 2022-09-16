export const setFoods = payload => ({
  type: 'FOOD_LIST',
  payload
})

export const clearFoods = () => ({
  type: 'FOOD_LIST',
  payload: []
})

export const addFood = payload => ({
  type: 'FOOD_ADD',
  payload
})

export const updateFood = payload => ({
  type: 'FOOD_UPDATE',
  payload
})

export const deleteFood = payload => ({
  type: 'FOOD_DELETE',
  payload
})

