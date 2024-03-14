import React from 'react'
import './signup.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { apiRequest } from '../../api'
import Loader from '../../components/loader/Loader'

const Signup = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        status: null,
        message: null
    })
    const {
        register,
        handleSubmit,
        formState:{errors},
        getValues
    } = useForm({
        mode: 'onChange'
    })



    const handleSignup = async (data) =>{
        setIsLoading(true)
        setState({status: null, message: null})
        try {
            const res = await apiRequest({
                method: 'POST',
                data: data,
                url: '/auth/register'
            })

            if(res?.success){
                setState({status: res?.success, message: res?.message})
                setTimeout(() => {
                    navigate('/verify')
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
    <div className='signup'>
        <div className="signup__container">
            <div className="signup__container-heading">
                <h4 className="signup__container-title">
                    Create an account
                </h4>
                <span className="signup__container-subtitle">
                    Get Started and Enjoy Tasty Pizzas and Special Offers!
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

            <form onSubmit={handleSubmit(handleSignup)}
            className="signup__form">
                <div className="signup__forms-items">
                    <div className="signup__form-field">
                        <label htmlFor="firstName" className="signup__form-label">
                            First Name
                        </label>
                        <input type="text" name='firstName'
                        {...register('firstName',{required: 'This field is required'})} 
                        className="signup__form-input" />
                        <span className="signup__form-error">
                            {errors.firstName && errors.firstName.message}
                        </span>
                    </div>
                    <div className="signup__form-field">
                        <label htmlFor="lastName" className="signup__form-label">
                            Last Name
                        </label>
                        <input type="text" name='lastName' 
                        {...register('lastName',{required: 'This field is required'})} 
                        className="signup__form-input" />
                        <span className="signup__form-error">
                            {errors.lastName && errors.lastName.message}
                        </span>
                    </div>
                    <div className="signup__form-field">
                        <label htmlFor="email" className="signup__form-label">
                            Email
                        </label>
                        <input type="email" name='email' 
                        {...register('email',{required: 'This field is required'})} 
                        className="signup__form-input" />
                        <span className="signup__form-error">
                            {errors.email && errors.email.message}
                        </span>
                    </div>
                    <div className="signup__form-field">
                        <label htmlFor="phone" className="signup__form-label">
                            Phone
                        </label>
                        <input type="tel" name='phone' 
                        {...register('phone',{required: 'This field is required'})} 
                        className="signup__form-input" />
                        <span className="signup__form-error">
                            {errors.phone && errors.phone.message}
                        </span>
                    </div>
                    <div className="signup__form-field">
                        <label htmlFor="password" className="signup__form-label">
                            Password
                        </label>
                        <input type="password" name='password' 
                        {...register('password',{required: 'This field is required'})} 
                        className="signup__form-input" />
                        <span className="signup__form-error">
                            {errors.password && errors.password.message}
                        </span>
                    </div>
                    <div className="signup__form-field">
                        <label htmlFor="cpassword" className="signup__form-label">
                            Comfirm Password
                        </label>
                        <input type="password" name='cpassword' 
                        {...register('cpassword',{
                            validate: (value)=>{
                                const {password} = getValues()
                                if(value !== password){
                                    return 'Password not match'
                                }
                            }
                        })} 
                        className="signup__form-input" />
                        <span className="signup__form-error">
                            {errors.cpassword && errors.cpassword.message}
                        </span>
                    </div>
                </div>
                <div className="signup__form-field">
                    {isLoading ? <Loader/> : <button type='submit' 
                    className='signup__form-btn btn'>
                        Submit
                    </button>}
                </div>
                <div className="signup__form-field">
                    <span className='signup__form-acc'>
                        Already have an account? <Link to={'/login'}>Login</Link>
                    </span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup