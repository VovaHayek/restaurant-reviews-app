import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CreateRestaurantForm = ({creatorData}) => {

    let [typesOfCuisine, setTypesOfCuisine] = useState([]);

    let [restaurantName, setRestaurantName] = useState('');
    let [restaurantAddress, setRestaurantAddress] = useState('');
    let [restaurantCuisine, setRestaurantCuisine] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/type-of-cuisine/').then((response) => {
            setTypesOfCuisine(response.data);
        });
    }, []);

    const submitRestaurantCreationForm = async e => {
        e.preventDefault();

        const newRestaurantData = {
            title: restaurantName,
            address: restaurantAddress,
            type_of_cuisine: restaurantCuisine,
            creator: creatorData?.id
        }

        axios.post('http://127.0.0.1:8000/api/restaurants/', newRestaurantData, {headers: {'Content-Type': 'application/json'}, withCredentials: false}).then((response) => {
            window.location.reload();
        })
    }

  return (
    <form onSubmit={submitRestaurantCreationForm}>
        <div>
            <p className='m-0 p-0'>Restaurant Name</p>
            <input type='text' className='form-control' onChange={(e) => setRestaurantName(e.target.value)} />
        </div>

        <div>
            <p className='m-0 p-0'>Restaurant Address</p>
            <input type='text' className='form-control' onChange={(e) => setRestaurantAddress(e.target.value)} />
        </div>

        <div>
            <p className='m-0 p-0'>Type Of Cuisine</p>
            <select className='form-control' onChange={e => setRestaurantCuisine(e.target.value)}>
                <option>Choose type of cuisine</option>
                {typesOfCuisine.map((cuisineType, key) => (
                    <option key={key} value={cuisineType.id}>{cuisineType.name}</option>
                ))}
            </select>
        </div>

        <button type='submit' className='form-control btn btn-success my-3'>Create Restaurant</button>
    </form>
  )
}

export default CreateRestaurantForm