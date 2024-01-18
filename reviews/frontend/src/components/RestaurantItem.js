import React, {useEffect} from 'react';
import axios from 'axios'

import { ReactComponent as Star } from '../assets/star.svg';
import { ReactComponent as Trash } from '../assets/trash.svg';
import { ReactComponent as Edit } from '../assets/edit.svg';

const RestaurantItem = ({restaurant, updateForm, showForm, account, deleteRestaurantButton}) => {

    let deleteRestaurant = () => {
        axios.delete(`http://127.0.0.1:8000/api/restaurants/${restaurant.title}/`);
        deleteRestaurantButton(restaurant.title);
    }

  return (
    <div className='col-11 col-lg-5 col-xl-4 bg-dark m-2 p-4 rounded-2'>
        { account?.id === restaurant.creator ?
        <div className='d-flex justify-content-end'>
            <a className='me-2' onClick={(e) => {updateForm(restaurant); showForm(true)}}><Edit /></a>
            <a className='ms-2' onClick={(e) => deleteRestaurant()}><Trash /></a>
        </div> : null }

        <div className='d-flex flex-row justify-content-between align-items-center'>
            <h1 className='text-white mb-0 pb-0'>{restaurant.title}</h1>
            <h2 className='text-white mb-0 pb-0'><Star /> {restaurant.average_rating.evaluation__avg}</h2>
        </div>

        <div>
            <h5 className='text-white mt-0 pt-0'>{restaurant.address}, {restaurant.type_of_cuisine.name}</h5>
        </div>

        <div className='d-flex flex-row justify-content-between align-items-end'>
            <div>
                <p className='m-0 p-0 text-white text-opacity-75'>Spent in total:</p>
                <h2 className='m-0 p-0 text-white'>${restaurant.amount_spent.expence__sum}</h2>
            </div>

            <a href={`/restaurant/${restaurant.title}`} className='btn btn-primary'>Visit a restaurant</a>
        </div>
    </div>
  )
}

export default RestaurantItem