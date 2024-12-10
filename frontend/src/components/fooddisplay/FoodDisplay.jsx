import React from 'react'
import { food_list } from '../../assets/assets'
import FoodItem from '../fooditems/FoodItem'
import { useSelector } from 'react-redux'

const FoodDisplay = ({ category }) => {
  const foodList = useSelector((state)=> state.foodList);

  return (
    <div className='food-display mt-8 ' id='food-display'>
      <h1 className='text-2xl pb-4 font-semibold'>Top Dishes Near You</h1>
      <div className="food-display-list flex flex-wrap gap-6 justify-center items-center">
        {foodList?.map((item, idx) => {
          if(category === "All" || category === item.category) {
            return (
              <FoodItem key={idx} item={item}/>
            )
          }
        }
        )}
      </div>
    </div>
  )
}

export default FoodDisplay