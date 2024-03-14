import React, { useEffect, useState } from 'react'
import './orders.css'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { MdShoppingCartCheckout } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { TbQuestionMark } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { userOrders } from '../../api';
import {handleOrders} from '../../state/orderSlice'

const columns = [
  { field: '_id', headerName: 'Order ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    editable: true,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 100,
    editable: true,
  },
  {
    field: 'totalPrice',
    headerName: 'Price',
    width: 150,
    renderCell: (param) => {
      return(
      <span className='orders__table-price'>${parseFloat(param.row.totalPrice).toFixed(2)}</span>
    )}
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    renderCell: (param) => {
      return(
      <span className={`orders__table-status ${
        param.row.status === 'Delivered' ? 'green'
        : param.row.status === 'Canceled' ? 'red'
        : param.row.status === 'Out for Delivery' ? 'yellow'
        : param.row.status === 'Processing' ? 'orange' : ''
      }`}>
        {param.row.status}
      </span>
    )}
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 120,
    renderCell: (param) => {
      return (
        <div className='orders__table-actions'>
          <button className="orders__table-button">
            <MdOutlineDeleteForever size={25}/>
          </button>
          <button className="orders__table-button">
            <FaRegEdit size={20}/>
          </button>
        </div>
      )
    }
  }
  
];

const Orders = () => {
  const {user} = useSelector((state)=>state.user)
  const {orders} = useSelector((state)=>state.orders)
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchOrders = async () =>{
      const res = await userOrders(user?.token)
      dispatch(handleOrders(res?.data))
    }

    fetchOrders()
  },[orders])


  return (
    <section className='orders'>
      <div className="heading">
        <h2 className="heading__title">
          Track Orders |
        </h2>
        <Link to={'/'} className='heading__link'>Home {'>'}</Link>
        <span className='heading__text'>orders</span>
      </div>

      <div className="orders__container">

        <div className="orders__cards">

          <div className="orders__card">
            <span className="orders__card-icon">
              <MdShoppingCartCheckout size={20}/>
            </span>
            <div className="orders__card-items">
              <h4 className="orders__card-title">
                Total Orders
              </h4>
              <p className="orders__card-value">
                {[orders]?.length}
              </p>
            </div>
          </div>
          <div className="orders__card">
            <span className="orders__card-icon">
              <IoMdCheckmark size={20}/>
            </span>
            <div className="orders__card-items">
              <h4 className="orders__card-title">
                Completed Orders
              </h4>
              <p className="orders__card-value">
                {[orders].filter((item)=>item.status === 'Deleivered').length}
              </p>
            </div>
          </div>
          <div className="orders__card">
            <span className="orders__card-icon">
              <TbQuestionMark size={20}/>
            </span>
            <div className="orders__card-items">
              <h4 className="orders__card-title">
                Processing Orders
              </h4>
              <p className="orders__card-value">
              {[orders].filter((item)=>item.status === 'Processing' || item.status === 'Out for Delivery').length}
              </p>
            </div>
          </div>
          <div className="orders__card">
            <span className="orders__card-icon">
              <FaXmark size={20}/>
            </span>
            <div className="orders__card-items">
              <h4 className="orders__card-title">
                Canceled Orders
              </h4>
              <p className="orders__card-value">
                {[orders].filter((item)=>item.status === 'Canceled').length}
              </p>
            </div>
          </div>

        </div>
        <div className="orders__items">
          <div className="orders__search">
            <h4 className="orders__title">
              My Orders
            </h4>
            <div className="orders__search-box">
              <span className="orders__search-text">Search:</span>
              <input type="text" className="orders__search-input" 
              placeholder='Search...'/>
            </div>
          </div>
          <div className="orders__table">
              <DataGrid
              getRowId={(row)=>row._id ?? []}
              rows={[orders] ?? []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Orders