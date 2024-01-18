import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { ReactComponent as CloseButton } from '../assets/close.svg';

const UpdateRestaurantForm = ({restaurant, hide, show, creatorData}) => {
    
    let [showForm, setShowForm] = useState(show);
    let [typesOfCuisine, setTypesOfCuisine] = useState([])
    let [oldRestaurantName, setOldRestaurantName] = useState(restaurant?.title)
    let [updatedRestaurantName, setUpdatedRestaurantName] = useState(restaurant?.title);
    let [updatedRestaurantAddress, setUpdatedRestaurantAddress] = useState(restaurant?.address);
    let [updatedRestaurantCuisine, setUpdatedRestaurantCuisine] = useState(restaurant?.type_of_cuisine?.id);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/type-of-cuisine/').then((response) => {
            setTypesOfCuisine(response.data);
        });

        setShowForm(show);
        setOldRestaurantName(restaurant?.title);
        setUpdatedRestaurantName(restaurant?.title);
        setUpdatedRestaurantAddress(restaurant?.address);
        setUpdatedRestaurantCuisine(restaurant?.type_of_cuisine?.id);
    }, [show, restaurant]);

    const updateRestaurantData = async e => {
        e.preventDefault();

        const updatedRestaurantData = {
            id: restaurant?.id,
            title: updatedRestaurantName,
            address: updatedRestaurantAddress,
            type_of_cuisine: updatedRestaurantCuisine,
            creator: creatorData?.id,
        }

        axios.put(`http://127.0.0.1:8000/api/restaurants/${oldRestaurantName}/`, updatedRestaurantData, {
            headers: {'Content-Type': 'application/json'},
            withCredentials: false}).then((response) => {
                window.location.reload();
        })
    }

  return (
    <div className={showForm === true ? 'container-fluid position-fixed top-0 start-0 m-0 p-0 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center' : 'invisible opacity-0 position-absolute'} style={{height: "100vh"}}>
        <form className='col-6 bg-black p-5 rounded-3' onSubmit={updateRestaurantData}>
            <div>
                <a onClick={(e) => hide(false)}><CloseButton /></a>
            </div>

            <h1 className='text-white'>Update Restaurant Info</h1>

            <div className='my-3'>
                <p className='text-white m-0'>Restaurant Name</p>
                <input type='text' value={updatedRestaurantName} onChange={(e) => setUpdatedRestaurantName(e.target.value)} />
            </div>

            <div className='my-3'>
                <p className='text-white m-0'>Restaurant Address</p>
                <input type='text' value={updatedRestaurantAddress} onChange={(e) => setUpdatedRestaurantAddress(e.target.value)} />
            </div>

            <div className='my-3'>
                <p className='text-white m-0'>Restaurant Cuisine</p>
                <select className='form-control' value={updatedRestaurantCuisine} onChange={e => setUpdatedRestaurantCuisine(e.target.value)}>
                    {typesOfCuisine.map((cuisineType, key) => (
                        <option key={key} value={cuisineType.id}>{cuisineType.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <button type='submit' className='form-control btn btn-success'>Update</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateRestaurantForm