import React , {useState} from 'react'

import loginImg from '../assets/Signin-pana.png';
import { useDataContext } from '../context/DataContext';

function Login() {

  const {login} = useDataContext();


  const [user, setUser] = useState({
    userName : '',
    password : ''
  });

  function handelUserInputs(e){
    let {name , value} = e.target;
    setUser({...user,[name] : value});
  }

  // add new user
  function handelUser(e){
      e.preventDefault();
      login(user);
  }

  return (
    <div className='login mainSection'>
        <div  className='container'>
            <div className='row align-items-center justify-content-between column-gap row-gap'>
                <div className='login__content login__img'>
                    <img src={loginImg} alt='login'/>
                </div>
                <div className='login__content login__form'>
                    <h4 className='login__form--title'>Welcome Back!</h4>
                    <p>Login continue</p>
                    <form onSubmit={handelUser}>
                        <label>
                            <span>user name</span>
                            <input 
                              type='text' 
                              placeholder='text userName..'
                              name='userName'
                              value={user.userName}
                              onChange={handelUserInputs}
                            />
                        </label>
                        <label>
                            <span>password</span>
                            <input 
                              type='password' 
                              placeholder='text password..'
                              name='password'
                              value={user.password}
                              onChange={handelUserInputs}
                            />
                        </label>
                        <button className='btn'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
