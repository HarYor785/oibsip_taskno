import React, { useEffect, useState } from 'react'
import './orders.css'
import { Link } from 'react-router-dom'
import { MdDone } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { MdDownloading } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import OrdersTables from '../../components/dataTables/OrdersTables';
import { fetchOrders } from '../../api';
import { useSelector } from 'react-redux';


const data = [
  { 
      id: 1, 
      customer: 'John Doe', 
      item: 'Cheese Pizza', 
      price: 200,
      date: '5/20/2068',
      status: 'Delivered',
  },
  { 
      id: 2, 
      customer: 'Nina Hart', 
      item: 'Cheese Pizza', 
      price: 400,
      date: '5/20/2068',
      status: 'Out for Delivery',
  },
  { 
      id: 3, 
      customer: 'Nina Hart', 
      item: 'Cheese Pizza', 
      price: 400,
      date: '5/20/2068',
      status: 'Processing',
  },
  { 
      id: 4, 
      customer: 'Nina Hart', 
      item: 'Cheese Pizza', 
      price: 400,
      date: '5/20/2068',
      status: 'Cancelled',
  },
];

const Orders = () => {
  const [ordersArray, setOrdersArray] = useState()
  const {user} = useSelector((state)=>state.user)

  const getOrders = async ()=>{
    const res = await fetchOrders(user?.token)
    setOrdersArray(res?.data)
  }

  useEffect(()=>{
    getOrders()
  },[])

  return (
    <section>
        {/* HEADING */}
        <div className="heading">
          <h3 className="heading__title">Orders</h3>
          <div className="heading__item">
              <span className="heading__text">Orders</span>
              <span className="heading__text">{'>'}</span>
              <Link to={'/'} className='heading__link'>Home</Link>
          </div>
        </div>

        <div className="orders__container">

          <div className="orders__cards">

            <div className="orders__card">
              <span className="orders__card-icon">
                <MdDone size={24}/>
              </span>
              <div className="orders__card-item">
                <span className="orders__card-title">Delivered</span>
                <h4 className="orders__card-value">
                  {ordersArray?.filter((item)=>item?.status === 'Delivered').length}
                </h4>
              </div>
            </div>

            <div className="orders__card">
              <span className="orders__card-icon">
                <GrDeliver size={24}/>
              </span>
              <div className="orders__card-item">
                <span className="orders__card-title">Out for Delivery</span>
                <h4 className="orders__card-value">
                  {ordersArray?.filter((item)=>item?.status === 'Out for Delivery').length}
                </h4>
              </div>
            </div>

            <div className="orders__card">
              <span className="orders__card-icon">
                <MdDownloading size={24}/>
              </span>
              <div className="orders__card-item">
                <span className="orders__card-title">Processing</span>
                <h4 className="orders__card-value">
                  {ordersArray?.filter((item)=>item?.status === 'Processing').length}
                </h4>
              </div>
            </div>

            <div className="orders__card">
              <span className="orders__card-icon">
                <LiaTimesSolid size={24}/>
              </span>
              <div className="orders__card-item">
                <span className="orders__card-title">Cancelled</span>
                <h4 className="orders__card-value">
                  {ordersArray?.filter((item)=>item?.status === 'Canceled').length}
                </h4>
              </div>
            </div>

          </div>

          <div className="orders__table">
            <OrdersTables data={ordersArray} getOrders={getOrders} user={user}/>
          </div>
        </div>
        
    </section>
  )
}

export default Orders