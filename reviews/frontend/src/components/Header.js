import React, {useEffect, useState} from 'react';

import { ReactComponent as Logout } from '../assets/logout.svg';

const Header = () => {

    let [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

  return (
    <div className='container-fluid mb-5 d-flex flex-row justify-content-between'>
        <div className='d-flex justify-content-center align-items-center'>
          <a href='/' className='text-center text-dark fw-bold'>Home</a>
        </div>

        {isAuth ? <a href='/logout/'><Logout /></a> : <a href='/authorization/' className='btn btn-primary p-3 m-3'>Authorization</a>}
    </div>
  )
}

export default Header