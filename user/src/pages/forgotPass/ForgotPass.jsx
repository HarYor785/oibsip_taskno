import React from 'react'
import './forgotPass.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const ForgotPass = () => {
    const {
        register,
        handleSubmit,
        formState:{errors},
        getValues
    } = useForm({
        mode: 'onChange'
    })

    const handleFormSubmit = (data)=>{
        console.log(data)
    }
  return (
    <div className='forgotpass'>
        <div className="forgotpass__container">
            <div className="forgotpass__container-heading">
                <h4 className="forgotpass__container-title">
                    Forgot Password
                </h4>
                <span className="forgotpass__container-subtitle">
                    Enter your email address, a password reset 
                    link will be sent to your mailbox
                </span>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)}
            className="forgotpass__form">

                <div className="forgotpass__form-field">
                    <label htmlFor="email" className="forgotpass__form-label">
                        Email
                    </label>
                    <input type="email" name='email' 
                    {...register('email',{required: 'This field is required'})} 
                    className="forgotpass__form-input" />
                    <span className="forgotpass__form-error">
                        {errors.email && errors.email.message}
                    </span>
                </div>

                <div className="forgotpass__form-field">
                    <button type='submit' className='forgotpass__form-btn btn'>
                        Submit
                    </button>
                </div>
                <div className="forgotpass__form-field">
                    <span className='forgotpass__form-acc'>
                        Remember password? <Link to={'/login'}>Login</Link>
                    </span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ForgotPass