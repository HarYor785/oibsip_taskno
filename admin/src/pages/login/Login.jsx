import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { apiRequest } from '../../api'
import { useDispatch } from 'react-redux'
import { loginSlice } from '../../state/userSlice'
import Loader from '../../components/loader/Loader'

const Login = () => {
    const dispath = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        status: null,
        message: null
    })
    const {
        register,
        handleSubmit,
        formState:{errors}
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
                const newdata = {token: res?.token, ...res?.user}
                dispath(loginSlice(newdata))
                navigate('/')
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
            <h1 className="login__title">
                Login
            </h1>

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
                <div className="login__items">
                    <label htmlFor="email" className="login__label">
                        Email
                    </label>
                    <input type="email" name='email' 
                    className="login__input" 
                    {...register('email',{required: 'This field is required'})}/>
                    <span className="login__error">
                        {errors.email && errors.email.message}
                    </span>
                </div>
                <div className="login__items">
                    <label htmlFor="password" className="login__label">
                        Password
                    </label>
                    <input type="password" name='password' 
                    className="login__input" 
                    {...register('password',{required: 'This field is required'})}/>
                    <span className="login__error">
                        {errors.password && errors.password.message}
                    </span>
                </div>
                <div className="login__items">
                    <Link to={'/forgot_password'} className='login__link'>Forgot password?</Link>
                </div>
                <div className="login__items">
                    {isLoading ? <Loader/> : <button type="submit" className="login__btn button">
                        Submit
                    </button>}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login