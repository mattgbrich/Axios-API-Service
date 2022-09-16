import React from 'react'
import Button from '@mui/material/Button'

import useFoods from './store/hooks/useFoods'

function Foods() {
  const {
    getFoods,
    clearFoods,
    putFoods,
    postFoods,
    deleteFoods,
    food
  } = useFoods();

  return (
    <div style={{marginLeft: 16}}>
      <h2>Foods</h2>
      <Button variant="contained" sx={{ marginRight: 2 }} onClick={getFoods}>get foods</Button>
      <Button variant="outlined"  sx={{ marginRight: 2 }} onClick={clearFoods}>clear foods</Button>
      <Button color="secondary" variant="outlined"  sx={{ marginRight: 2 }} onClick={putFoods}>put foods</Button>
      <Button color="success" variant="outlined"  sx={{ marginRight: 2 }} onClick={postFoods}>post foods</Button>
      <Button color="warning" variant="outlined"  sx={{ marginRight: 2 }} onClick={deleteFoods}>delete foods</Button>
      <ul>
        {food.list.map(food => (
          <li key={food.id}>{food.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Foods
