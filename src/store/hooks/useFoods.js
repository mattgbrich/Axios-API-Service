import {
  setFoods,
  clearFoods as clearFoodsAction,
  addFood,
  updateFood,
  deleteFood
} from '../actions/foodActions'
import { useDispatch, useSelector } from 'react-redux'
import useAPI from './useAPI'

function useFoods() {
  const dispatch = useDispatch()
  const food = useSelector(state => state.food)
  const API = useAPI();

  const getFoods = () => API.get('/foods').then(res => dispatch(setFoods(res.data)))

  const clearFoods = () => dispatch(clearFoodsAction())

  const postFoods = () => API.post('/foods', {
    data: {
      id: 5,
      name: 'Asparagus'
    }
  }).then(res => dispatch(addFood(res.data)))

  const putFoods = () => API.put('/foods', {
    data: {
      id: 2,
      name: 'Nectarine'
    }
  }).then(res => dispatch(updateFood(res.data)))


  const deleteFoods = () => API.delete('/foods', {
    data: {
      id: 1
    }
  }).then(res => dispatch(deleteFood(res.data)))


  return {
    food,
    getFoods,
    clearFoods,
    putFoods,
    postFoods,
    deleteFoods
  }
}

export default useFoods

