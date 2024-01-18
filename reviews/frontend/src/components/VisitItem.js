import React from 'react';

import { ReactComponent as Star } from '../assets/star.svg';

const VisitItem = ({visit}) => {
  return (
    <div className='w-100 bg-dark my-2 py-5 d-flex flex-row justify-content-around align-items-center'>
        <h5 className='text-white'>{visit.date}</h5>
        <p className='col-5 text-white'>{visit.note}</p>
        <h5 className='text-white'>$ {visit.expence}</h5>
        <h5 className='text-white'><Star /> {visit.evaluation}</h5>
    </div>
  )
}

export default VisitItem