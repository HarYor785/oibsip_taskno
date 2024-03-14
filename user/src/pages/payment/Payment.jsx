import React, {useState, useEffect} from 'react'
import './payment.css'
import { Link } from 'react-router-dom'
import success from '../../assets/success.png'
import error from '../../assets/error.png'
import {clearUserCart} from '../../api'
import { useDispatch, useSelector } from 'react-redux';
import { loginSlice } from '../../state/userSlice'

const Payment = () => {
    const [message, setMessage] = useState()
    const [status, setStatus] = useState()
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search);
    useEffect(() => {
        const paymentStatus = async ()=>{
            if (query.get("success")) {
                setMessage("Order placed! You will receive an email confirmation.");
                setStatus(true)
                const res = await clearUserCart(user?.token)
                const newData = {token: res?.token, ...res?.user}
                dispatch(loginSlice(newData))
            }
        
            if (query.get("canceled")) {
                setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
                setStatus(false)
            }
        }

        paymentStatus()
    
    }, []);
  return (
    <section className='payment'>
        <div className="heading">
            <h2 className="heading__title">
                Payment |
            </h2>
            <Link to={'/'} className='heading__link'>Home {'>'}</Link>
            <span className='heading__text'>Menu</span>
        </div>

        <div className="payment__container">
    
        <div className="payment__box">
            <img src={status ? success : error} className="payment__img"/>
            <p className="payment__text">{message}</p>
        </div>

        </div>
    </section>
  )
}

export default Payment