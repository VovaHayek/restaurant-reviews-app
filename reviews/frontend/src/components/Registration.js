import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Registration = ({changeToLogin}) => {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const createUser = async e => {
        e.preventDefault();

        const newUser = {
            username: username,
            password: password
        }

        await axios.post('http://127.0.0.1:8000/auth/registration/', newUser, {headers: {'Content-Type': 'application/json'}, withCredentials: false}).then((response) => { window.location.href = '/authorization/'; });
    }

  return (
    <form className='col-6' onSubmit={createUser}>
        <h1>Registration</h1>

        <div className='my-3 d-flex flex-column'>
            <label>Username</label>
            <input type='text' className='form-control' name='username' placeholder='Enter Username' required onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className='my-3 d-flex flex-column'>
            <label>Password</label>
            <input type='password' className='form-control' name='password1' placeholder='Enter Password' required onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className='my-3 d-flex flex-column'>
            <label>Password Confirmation</label>
            <input type='password' className='form-control' name='password2' placeholder='Confirm Password' required />
        </div>

        <div>
            <button type='submit' className='form-control btn btn-primary'>Submit</button>
        </div>

        <p className='mt-4'>Already have an account? <button className='btn btn-success' onClick={() => changeToLogin('login')}>Login</button></p>
    </form>
  )
}

export default Registration