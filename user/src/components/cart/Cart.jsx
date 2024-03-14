import React from 'react'
import './cart.css'
import { CgLogOut } from "react-icons/cg";
import { BiTransfer } from "react-icons/bi";
import piza1 from '../../assets/pizza-1.png'
import { useDispatch, useSelector } from 'react-redux';
import { handleCart } from '../../state/cartSlice';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { addToUserCart, createOrder, userCartQuantty } from '../../api';
import Loader from '../loader/Loader';

const Cart = ({getCart}) => {
    const {toggle, cart} = useSelector((state)=>state.cart)
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleTogleCart = () => {
        dispatch(handleCart(!toggle))
    }

    const totalPriceBeforeTax = cart?.reduce((total, item) => parseFloat(total) + parseFloat(item.price), 0);
    const taxAmount = totalPriceBeforeTax * 0.1;
    const allTotal = totalPriceBeforeTax + taxAmount;

    const handleOrder = async () =>{
        try {
            setIsLoading(true)
            const name = cart?.map((item)=>item?.item?.name)
            const quantity = cart?.map((item)=>item?.item?.quantity)
            const data = {
                cart,
                name,
                quantity,
                totalAmount: allTotal
            }
            const res = await createOrder(user?.token, data)
            setIsLoading(false)
            window.location.replace(res?.url)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    const handleAddToCart = async (itemId, quantity, price)=>{
        try {
            const data = {
                itemId, quantity, price
            }
            await addToUserCart(user?.token, data)
            getCart()
        } catch (error) {
            console.log(error)
        }
    }

    const handleCartQuantity = async (itemId,quantity,price)=>{
        try {
            const data = {
                itemId,
                quantity,
                price
            }
            await userCartQuantty(user?.token, data)
            getCart()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='cart'>
        <div className="cart__overlay"
        onClick={handleTogleCart}></div>
        <div className="cart__container">
            <div className="cart__balance">
                <h4 className="cart__balance-title">My Balance</h4>
                <div className="cart__balance-box">
                    <h4 className="cart__balance-name">Balance</h4>
                    <span className="cart__balance-value">
                        ${parseFloat(user?.balance).toFixed(2)}
                    </span>
                    <div className="cart__balance-buttons">
                        <button className="cart__balance-button">
                            <CgLogOut size={15} className='cart__balance-icon'/>
                            Top up
                        </button>
                        <button className="cart__balance-button">
                            <BiTransfer size={15} className='cart__balance-icon'/>
                            Transfer
                        </button>
                    </div>
                </div>
            </div>
            <div className="cart__list">
                <h4 className="cart__list-title">My Order</h4>

                <div className="cart__list-cards">
                    {cart?.map((item, i)=>(
                        <div className="cart__list-card" key={i}>
                            <div className="cart__list-card-item">
                                <img src={piza1} alt="" className="cart__list-img" />
                                <h4 className="cart__list-name">{item?.item?.name}</h4>
                            </div>
                            <div className="cart__list-div">
                                <span className="cart__list-price">
                                    ${parseFloat(item?.item?.price).toFixed(2)}
                                </span>
                                <div className="cart__list-addon">
                                    <button onClick={()=>handleCartQuantity(item?.item?._id,item?.item?.quantity,item?.item?.price)}
                                    className="cart__list-addon_btn">-</button>
                                    <span className="cart__list-addon_quantity">
                                        {item?.quantity}
                                    </span>
                                    <button 
                                    onClick={()=>handleAddToCart(item?.item?._id,item?.item?.quantity,item?.item?.price)}
                                    className="cart__list-addon_btn">+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart__total">
                    <div className="cart__total-items">
                        <span className="cart__total-name">Services</span>
                        <span className="cart__total-value">
                            ${totalPriceBeforeTax}
                        </span>
                    </div>
                    <div className="cart__total-items">
                        <span className="cart__total-name">Tax(10%)</span>
                        <span className="cart__total-value">
                            ${taxAmount.toFixed(2)}
                        </span>
                    </div>
                    <hr />
                    <div className="cart__total-items">
                        <span className="cart__total-name">Total</span>
                        <span className="cart__total-value">
                            ${allTotal}
                        </span>
                    </div>
                </div>
            </div>
            {isLoading ? <Loader/> : cart?.length > 0 && <button onClick={handleOrder}
            className="cart__button">Check Out</button>}
            
        </div>
    </div>
  )
}

export default Cart