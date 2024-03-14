import React, {useState} from 'react'
import './verify.css'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form'
import { apiRequest } from '../../api'
import { loginSlice } from '../../state/userSlice'
import Loader from '../../components/loader/Loader'

const Verify = () => {
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
        getValues
    } = useForm({
        mode: 'onChange'
    })



    const handleVerify= async (data) =>{
        setIsLoading(true)
        setState({status: null, message: null})
        try {
            const res = await apiRequest({
                method: 'POST',
                data: data,
                url: '/auth/verify'
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
    <div className='verify'>
        <div className="verify__container">
            <div className="verify__container-heading">
                <h4 className="verify__container-title">
                    Verify Your Email
                </h4>
                <span className="verify__container-subtitle">
                    Enter Token Sent to your email address for verification
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

            <form onSubmit={handleSubmit(handleVerify)}
            className="verify__form">

                <div className="verify__form-field">
                    <label htmlFor="token" className="verify__form-label">
                        Token
                    </label>
                    <input type="text" name='token' 
                    {...register('token',{required: 'This field is required'})} 
                    className="verify__form-input" />
                    <span className="verify__form-error">
                        {errors.token && errors.token.message}
                    </span>
                </div>

                <span className='verify__form-acc'>
                    <Link to={'/signup'}>Resend Token</Link>
                </span>

                <div className="verify__form-field">
                    {isLoading ? <Loader/> : <button type='submit' 
                    className='verify__form-btn btn'>
                        Submit
                    </button>}
                </div>
                <div className="verify__form-field">
                    <span className='verify__form-acc'>
                        Have an account? <Link to={'/login'}>Login</Link>
                    </span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Verify