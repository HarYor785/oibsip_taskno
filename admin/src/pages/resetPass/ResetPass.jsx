import React, { useState } from 'react'
import './resetPass.css'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../../api'
import Loader from '../../components/loader/Loader'

const ResetPass = () => {
    const {id} = useParams()
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
    getValues,
} = useForm({
    mode: 'onChange'
})

const handleResetPass = async (data) =>{
    setIsLoading(true)
    setState({status: null, message: null})
    try {
        const res = await apiRequest({
            method: 'POST',
            data: data,
            url: `/auth/reset-password/${id}`,
        })

        if(res?.success){
            setState({status: res?.success, message: res?.message})
            setTimeout(() => {
                navigate('/')
            }, 2000);
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
    <div className='reset__password'>
        <div className="reset__password__container">
            <h1 className="reset__password__title">
                Reset Password
            </h1>

            <span className="forgot__password_subtitle">
                Enter your new password to reset your password
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

            <form onSubmit={handleSubmit(handleResetPass)} 
            className="reset__password__form">
                <div className="reset__password__items">
                    <label htmlFor="password" className="reset__password__label">
                        New Password
                    </label>
                    <input type="password" name='password' 
                    className="reset__password__input" 
                    {...register('password',{required: 'This field is required'})}/>
                    <span className="reset__password__error">
                        {errors.password && errors.password.message}
                    </span>
                </div>
                <div className="reset__password__items">
                    <label htmlFor="cpassword" className="reset__password__label">
                        Confirm New Password
                    </label>
                    <input type="password" name='cpassword' 
                    className="reset__password__input" 
                    {...register('cpassword',{
                        validate: (value) => {
                        const {password} = getValues()
                        if(value !== password){
                            return 'Password does not match'
                        }
                        }
                    })}/>
                    <span className="reset__password__error">
                        {errors.cpassword && errors.cpassword.message}
                    </span>
                </div>
                <div className="reset__password__items">
                    <Link to={'/login'} className='reset__password__link'>
                        Go to login
                    </Link>
                </div>
                <div className="reset__password__items">
                    {isLoading ? <Loader/> : <button type="submit" className="reset__password__btn button">
                        Submit
                    </button>}
                </div>
            </form>
        </div>
    </div>
  )
}

export default ResetPass