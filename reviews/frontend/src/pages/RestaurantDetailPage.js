import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import VisitItem from '../components/VisitItem';

import { ReactComponent as Plus } from '../assets/plus.svg';
import { ReactComponent as Star } from '../assets/star.svg';

const RestaurantDetailPage = () => {

    let urlParams = useParams();
    let [restaurant, setRestaurant] = useState([]);
    let [visits, setVisits] = useState([]);
    let [accountInfo, setAccountInfo] = useState([]);

    //Visit form data
    let [visitDate, setVisitDate] = useState(null);
    let [visitNote, setVisitNote] = useState('');
    let [visitExpence, setVisitExpence] = useState(0);
    let [visitEvaluation, setVisitEvaluation] = useState(1);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/restaurants/${urlParams['restaurantName']}/`).then((response) => {
            setRestaurant(response.data)
        });

        axios.get(`http://127.0.0.1:8000/api/visits/${urlParams['restaurantName']}/`).then((response) => {
            setVisits(response.data);
        });

        axios.get('http://127.0.0.1:8000/auth/account').then((response) => {
            setAccountInfo(response.data);
        });
    }, [visits]);

    const submitVisitForm = async e => {
        e.preventDefault();

        const visitFormData = {
            date: visitDate,
            note: visitNote,
            expence: parseInt(visitExpence),
            evaluation: parseInt(visitEvaluation),
            restaurant: restaurant.id
        }

        await axios.post(`http://127.0.0.1:8000/api/visits/${urlParams['restaurantName']}/`, visitFormData, {headers: {'Content-Type': 'application/json'}, withCredentials: false}).then((response) => {
            axios.get(`http://127.0.0.1:8000/api/visits/${urlParams['restaurantName']}/`).then((response) => {
                setVisits(response.data);
            })
        })
    }

  return (
    <div>
        <div className='px-3'>
            <div>
                <h1 className='fw-bold'>{restaurant?.title}</h1>
                <div>
                    <h5>{restaurant?.address}, {restaurant?.type_of_cuisine?.name}</h5>
                </div>
            </div>
            <div className='d-flex flex-row'>
                <div className='me-3'>
                    <p className='m-0 p-0'>Total amount spent</p>
                    <h3>$ {restaurant?.amount_spent?.expence__sum}</h3>
                </div>

                <div className='mx-3'>
                    <p className='m-0 p-0'>Rating</p>
                    <h3><Star /> {restaurant?.average_rating?.evaluation__avg}</h3>
                </div>
            </div>
        </div>

        {accountInfo?.id === restaurant?.creator ?
        <div className='w-100 d-flex flex-row justify-content-between align-items-end mt-5 px-3'>
            <form className='d-flex flex-column' onSubmit={submitVisitForm}>
                <h3 className='fw-bold'>Create Visit Form</h3>
                <div className='d-flex flex-row'>
                    <div className='my-2 mx-1'>
                        <p className='m-0 p-0'>Date</p>
                        <input type='date' className='form-control' onChange={(e) => setVisitDate(e.target.value)} />
                    </div>

                    <div className='my-2 mx-1'>
                        <p className='m-0 p-0'>Money spent</p>
                        <input type='number' className='form-control' onChange={(e) => setVisitExpence(e.target.value)} />
                    </div>
                </div>

                <div className='d-flex flex-row '>
                    <div className='me-2'>
                        <p className='m-0 p-0'>Rating</p>
                        <select className='form-control' onChange={(e) => setVisitEvaluation(e.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>

                    <div className='w-100'>
                        <p className='m-0 p-0'>Note</p>
                        <textarea className='w-100 form-control' onChange={(e) => setVisitNote(e.target.value)}></textarea>
                    </div>
                </div>

                <button type='submit' className='btn btn-success my-2'>Create Visit</button>
            </form>
        </div> : null }
        
        <hr />
        <div className='w-100 d-flex flex-column'>
            {visits.map((visit, key) => (
                <VisitItem key={key} visit={visit} />
            ))}
        </div>
    </div>
  )
}

export default RestaurantDetailPage