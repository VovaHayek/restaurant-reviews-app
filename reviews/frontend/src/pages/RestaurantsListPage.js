import React, {useState, useEffect} from 'react';
import axios from 'axios';

import RestaurantItem from '../components/RestaurantItem';
import UpdateRestaurantForm from '../components/UpdateRestaurantForm';
import CreateRestaurantForm from '../components/CreateRestaurantForm';

const RestaurantsListPage = () => {
    let [restaurants, setRestaurants] = useState([]);
    let [updateRestaurantData, setUpdateRestaurantData] = useState([]);
    let [showForm, setShowForm] = useState(false);
    let [accountInfo, setAccountInfo] = useState([]);
    let [isAuth, setIsAuth] = useState(false);
    let [deleteRestaurant, setDeleteRestaurant] = useState('');

    useEffect(() => {
        console.log(deleteRestaurant);
        axios.get('http://127.0.0.1:8000/api/restaurants/').then((response) => {
            setRestaurants(response.data);
        });

        axios.get('http://127.0.0.1:8000/auth/account').then((response) => {
            setAccountInfo(response.data);
        });

        if(localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    useEffect(() => {
        setDeleteRestaurant('');
        axios.get('http://127.0.0.1:8000/api/restaurants/').then((response) => {
            setRestaurants(response.data);
        });
    }, [deleteRestaurant])

  return (
    <div className='container-fluid pt-5'>
        <UpdateRestaurantForm restaurant={updateRestaurantData} hide={setShowForm} show={showForm} creatorData={accountInfo} />

        {isAuth ? 
            <div>
                <CreateRestaurantForm creatorData={accountInfo} />
            </div>
        : 
            <div></div>
        }

        <div className='row mt-1 d-flex justify-content-around'>
            <h1 className='text-center my-5'>Restaurants List</h1>
            {restaurants.map((restaurant, key) => (
                <RestaurantItem key={key} restaurant={restaurant} updateForm={setUpdateRestaurantData} showForm={setShowForm} account={accountInfo} deleteRestaurantButton={setDeleteRestaurant} />
            ))}
        </div>
    </div>
  )
}

export default RestaurantsListPage