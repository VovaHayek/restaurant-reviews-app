import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Login = ({changeToRegistration}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = async e => {
        e.preventDefault();

        const user = {
            username: username,
            password: password
        };

        const {data} = await axios.post('http://localhost:8000/token/', user, {headers: {'Content-Type': 'application/json'}, withCredentials: false});
    
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;

        window.location.href = '/';
    }

  return (
    <form className='col-6 d-flex flex-column justify-content-around' onSubmit={submit}>
        <h1 className='text-center'>Login</h1>

        <div className=' my-3 d-flex flex-column justify-content-center align-items-start'>
            <p className='m-0 p-0'>Username</p>
            <input type='text' className='form-control' onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div className=' my-3 d-flex flex-column justify-content-center align-items-start'>
            <p className='m-0 p-0'>Password</p>
            <input type='password' className='form-control' onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div>
            <button type='submit' className='form-control btn btn-primary'>Submit</button>
        </div>

        <p className='mt-4'>Don't have an account? <button className='btn btn-success' onClick={() => changeToRegistration('registration')}>Registration</button></p>
    </form>
  )
}

export default Login