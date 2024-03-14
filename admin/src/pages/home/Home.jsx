import React, { useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import { FaUsers } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import IncomeChart from '../../components/charts/IncomeChart';
import OrdersChart from '../../components/charts/OrdersChart';
import OrdersTables from '../../components/dataTables/OrdersTables';
import {useSelector} from 'react-redux'
import { fetchOrders, getUsers, getItems } from '../../api';

const Home = () => {
    const [usersArray, setUsersArray] = useState()
    const [itemsArray, setItemsArray] = useState()
    const [ordersArray, setOrdersArray] = useState()
    const {user} = useSelector((state)=>state.user)

    const fetchUsers = async ()=>{
        const res = await getUsers(user?.token)
        setUsersArray(res?.data)
    }
    const fetchItems = async ()=>{
        const res = await getItems(user?.token)
        setItemsArray(res?.item)
    }
    const getOrders = async ()=>{
        const res = await fetchOrders(user?.token)
        setOrdersArray(res?.data)
    }
    useEffect(()=>{
        fetchUsers()
        fetchItems()
        getOrders()
    },[])

    const totalPriceBeforeTax = ordersArray?.reduce((total, item) => parseFloat(total) + parseFloat(item.totalPrice), 0);

    
  return (
    <section className='home'>
        {/* HEADING */}
        <div className="heading">
            <h3 className="heading__title">Overview</h3>
            <div className="heading__item">
                <span className="heading__text">Home</span>
                <span className="heading__text">{'>'}</span>
                <Link to={'/'} className='heading__link'>Home</Link>
            </div>
        </div>

        <div className="home__cards">
            <div className="home__card">
                <span className="home__card-span">
                    <FaUsers size={25} className='home__card-icon'/>
                </span>
                <div className="home__card-item">
                    <span className="home__card-title">Total Users</span>
                    <h4 className="home__card-value">{usersArray?.length}</h4>
                </div>
            </div>
            <div className="home__card">
                <span className="home__card-span">
                    <IoFastFoodOutline size={25} className='home__card-icon'/>
                </span>
                <div className="home__card-item">
                    <span className="home__card-title">Total Pizza</span>
                    <h4 className="home__card-value">{itemsArray?.length}</h4>
                </div>
            </div>
            <div className="home__card">
                <span className="home__card-span">
                    <MdOutlineShoppingCart size={25} className='home__card-icon'/>
                </span>
                <div className="home__card-item">
                    <span className="home__card-title">Total Orders</span>
                    <h4 className="home__card-value">{ordersArray?.length}</h4>
                </div>
            </div>
            <div className="home__card">
                <span className="home__card-span">
                    <MdAttachMoney size={25} className='home__card-icon'/>
                </span>
                <div className="home__card-item">
                    <span className="home__card-title">Total Income</span>
                    <h4 className="home__card-value">
                        ${parseFloat(totalPriceBeforeTax).toFixed(2)}
                    </h4>
                </div>
            </div>
        </div>

        <div className="home__charts">
            <IncomeChart data={ordersArray}/>
            <OrdersChart orders={ordersArray}/>
        </div>

        <div className="home__table">
            <OrdersTables data={ordersArray}/>
        </div>
    </section>
  )
}

export default Home