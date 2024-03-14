import React, { useState } from 'react'
import './forgotPass.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../api'
import Loader from '../../components/loader/Loader'

const ForgotPass = () => {
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

const handleForgotPass = async (data) =>{
    setIsLoading(true)
    setState({status: null, message: null})
    try {
        const res = await apiRequest({
            method: 'POST',
            data: data,
            url: '/auth/forgot-password'
        })

        setState({status: res?.success, message: res?.message})
        setIsLoading(false)
    } catch (error) {
        setIsLoading(false)
        console.log(error)
        setState({status: false, message: "Couldn't connect to server"})
    }
}
  return (
    <div className='forgot__password'>
        <div className="forgot__password__container">
            <h1 className="forgot__password__title">
                Forgot Password
            </h1>
            <span className="forgot__password_subtitle">
                Enter your email addres, a password reset token 
                will be sent to your email address
            </span>

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

            <form onSubmit={handleSubmit(handleForgotPass)} 
            className="forgot__password__form">
                <div className="forgot__password__items">
                    <label htmlFor="email" className="forgot__password__label">
                        Email
                    </label>
                    <input type="email" name='email' 
                    className="forgot__password__input" 
                    {...register('email',{required: 'This field is required'})}/>
                    <span className="forgot__password__error">
                        {errors.email && errors.email.message}
                    </span>
                </div>
                <div className="forgot__password__items">
                    <Link to={'/login'} className='forgot__password__link'>
                        Go to Login
                    </Link>
                </div>
                <div className="forgot__password__items">
                    {isLoading ? <Loader/> : <button type="submit" className="forgot__password__btn button">
                        Submit
                    </button>}
                </div>
            </form>
        </div>
    </div>
  )
}

export default ForgotPass