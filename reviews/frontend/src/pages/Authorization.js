import React, {useState} from 'react';

import Login from '../components/Login';
import Registration from '../components/Registration';

const Authorization = () => {

    let [authenticationMethod, setAuthenticationMethod] = useState('login');

    function changeAuthenticationType(authType) {
        setAuthenticationMethod(authType);
    };

  return (
    <div className='container mt-5 d-flex justify-content-center align-items-center'>
        {authenticationMethod === 'registration' ? <Registration changeToLogin={changeAuthenticationType} /> : <Login changeToRegistration={changeAuthenticationType} />}
    </div>
  )
}

export default Authorization