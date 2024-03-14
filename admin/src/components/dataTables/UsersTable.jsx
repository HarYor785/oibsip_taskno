import moment from 'moment'
import React from 'react'

const UsersTable = ({data}) => {
  return (
    <div className='table-container'>
        <div className="table__heading">
            <h4 className="table__title">
                Customers
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item) => (
                <tr key={item?._id}>
                    <td>{item?._id.slice(0, 6)}</td>
                    <td>{item?.firstName + ' ' + item?.lastName}</td>
                    <td>{item?.email}</td>
                    <td>{item?.phone}</td>
                    <td>{moment(item?.createdAt).calendar()}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default UsersTable