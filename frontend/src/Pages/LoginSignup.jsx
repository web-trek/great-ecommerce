import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { toast } from "react-toastify";

const LoginSignup = () => {
  const [state, setState]= useState('Login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const Login = async ()=> {
    console.log('Login', formData)
    let responseData;
    await fetch('http://localhost:4000/api/login',{
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>  response.json()).then((data)=> responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/')
      toast.success(responseData.message)
    }else{
      toast.error(responseData.message)
    }
  }

  const SignUp = async ()=> {
    console.log('Signup', formData)
    let responseData;
    await fetch('http://localhost:4000/api/signup',{
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>  response.json()).then((data)=> responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/')
      toast.success(responseData.message)
    }else{
      toast.error(responseData.message)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup_container">
        <h1>{state}</h1>
        <div className="loginsignup_fields">
          {state ==='Signup' && <input type="text" name='name' value={formData.name} onChange={changeHandler} placeholder='Your Name' /> }
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />
          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
          <button onClick={()=>{state==='Login'?Login():SignUp()}}>Continue</button>
        </div>

        {state==='Login' && <p className='loginsignup_login'>Already Have An Account? <span onClick={()=>{setState('Signup')}}>Signup Here</span></p>}
        {state==='Signup' && <p className='loginsignup_login'>Don't Have An Account? <span onClick={()=>{setState('Login')}}>Login Here</span></p> }

        <div className="loginsignup_agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignup
