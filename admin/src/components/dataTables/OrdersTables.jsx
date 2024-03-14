import React, { useState } from 'react'
import { updateOrder } from '../../api'
import moment from 'moment'

const OrdersTables = ({data, user, getOrders}) => {
    const [popover, setPopover] = useState(null)

    const handlePopOver = (val) =>{
        if(val === popover){
            setPopover(null)
        }else{
            setPopover(val)
        }
    }

    const updateUserOrder = async (id, status) =>{
        try {
            const data = {id, status}
            const res = await updateOrder(user.token, data);
            setPopover(null)
            getOrders()
            window.alert(res?.message)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='table-container'>
        <div className="table__heading">
            <h4 className="table__title">
                Recent Orders
            </h4>
            <div className="table__search">
                <span className="table__search-title">Search:</span>
                <input type="text" name="search" 
                className='table__search-input'
                placeholder='Search...'/>
            </div>
        </div>
        <div className="table-responsive">
            <table className="table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item) => (
                <tr key={item?._id}>
                    <td>{item?._id?.slice(0, 7)}</td>
                    <td>{item?.customer}</td>
                    <td>{item?.name}</td>
                    <td>${item?.totalPrice?.toFixed(2)}</td>
                    <td>{moment(item?.createdAt).calendar()}</td>
                    <td style={{
                        color: `${item?.status === 'Delivered' ? '#00e396'
                    : item?.status === 'Out for Delivery' ? '#008ffb'
                    : item?.status === 'Processing' ? '#feb019'
                    : item?.status === 'Cancelled' ? '#f1415b'  
                    : '#fff'}`
                    }}>{item?.status}</td>
                    <td>
                        <div className="table__action">
                            <button onClick={() =>handlePopOver(item?.createdAt)}
                            className="table__action-btn">
                                Update Order
                            </button>
                            <div className={`table__action-popover 
                            ${popover === item?.createdAt ? 'active' : ''}`}>
                                <button onClick={()=>updateUserOrder(item?._id, 'Delivered')}
                                className="table__action-popover_btn">
                                    Delivered
                                </button>
                                <button onClick={()=>updateUserOrder(item?._id, 'Out for Delivery')}
                                className="table__action-popover_btn">
                                    Out for Delivery
                                </button>
                                <button onClick={()=>updateUserOrder(item?._id, 'Processing')}
                                className="table__action-popover_btn">
                                    Processing
                                </button>
                                <button onClick={()=>updateUserOrder(item?._id, 'Canceled')}
                                className="table__action-popover_btn">
                                    Canceled
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default OrdersTables