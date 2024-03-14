import React from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form'
import { apiRequest } from '../../api'
import { useState } from 'react'
import { loginSlice } from '../../state/userSlice'
import Loader from '../../components/loader/Loader'

const Login = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        status: null,
        message: null
    })
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm({
        mode: 'onChange'
    })

const handleLogin = async (data) =>{
    setIsLoading(true)
    setState({status: null, message: null})
    try {
        const res = await apiRequest({
            method: 'POST',
            data: data,
            url: '/auth/login'
        })
        
        if(res?.success){
            setState({status: res?.success, message: res?.message})
            const newData = {token: res?.token, ...res?.user}
            dispatch(loginSlice(newData))
            setTimeout(() => {
                navigate('/')
            }, 3000);
        }else{
            setState({status: res?.success, message: res?.message})
        }
        setIsLoading(false)
    } catch (error) {
        setIsLoading(false)
        console.log(error)
        setState({status: false, message: "Couldn't connect to server"})
    }
}
  return (
    <div className='login'>
        <div className="login__container">
            <div className="login__container-heading">
                <h4 className="login__container-title">
                    Login into your account
                </h4>
                <span className="login__container-subtitle">
                    Log in to Explore Our Mouthwatering Menu and Place Your Order!
                </span>
            </div>

            {
                state.message && (
                    <div className={`form__message ${
                        state.status ? 'success' : 'error'
                    }`}>
                        <span className="form__message-text">
                            {state.message}
                        </span>
                    </div>
                )
            }

            <form onSubmit={handleSubmit(handleLogin)}
            className="login__form">

                <div className="login__form-field">
                    <label htmlFor="email" className="login__form-label">
                        Email
                    </label>
                    <input type="email" name='email' 
                    {...register('email',{required: 'This field is required'})} 
                    className="login__form-input" />
                    <span className="login__form-error">
                        {errors.email && errors.email.message}
                    </span>
                </div>

                <div className="login__form-field">
                    <label htmlFor="password" className="login__form-label">
                        Password
                    </label>
                    <input type="password" name='password' 
                    {...register('password',{required: 'This field is required'})} 
                    className="login__form-input" />
                    <span className="login__form-error">
                        {errors.password && errors.password.message}
                    </span>
                </div>

                <span className='login__form-acc'>
                    <Link to={'/forgot-password'}>Forgot password</Link>
                </span>

                <div className="login__form-field">
                    {isLoading ? <Loader/> : <button type='submit' 
                    className='login__form-btn btn'>
                        Submit
                    </button>}
                </div>
                <div className="login__form-field">
                    <span className='login__form-acc'>
                        Don't have an account? <Link to={'/signup'}>Create Account</Link>
                    </span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login