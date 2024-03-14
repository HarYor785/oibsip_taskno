import React, { useEffect, useState } from 'react'
import './customers.css'
import { Link } from 'react-router-dom'
import UsersTable from '../../components/dataTables/UsersTable'
import { getUsers } from '../../api';
import { useSelector } from 'react-redux';


const data = [
  { 
      id: 1, 
      name: 'John Doe', 
      email: 'hisic@ce.pm', 
      phone: '08124823198',
      date: '5/20/2068',
  },
  { 
      id: 2, 
      name: 'Nina Hart', 
      email: 'wateka@sipeboca.ai', 
      phone: '08124823198',
      date: '5/20/2068',
  },
  { 
      id: 3, 
      name: 'Nina Hart', 
      email: 'pu@luac.lv', 
      phone: '08124823198',
      date: '5/20/2068',
  },
  { 
      id: 4, 
      name: 'Nina Hart', 
      email: 'kasdipo@fuosa.br', 
      phone: '08124823198',
      date: '5/20/2068',
  },
];

const Customers = () => {
  const {user} = useSelector((state)=>state.user)
  const [usersArray, setUsersArray] = useState()

  const fetchUsers = async ()=>{
    const res = await getUsers(user?.token)
    console.log(res?.data)
    setUsersArray(res?.data)
  }

  useEffect(()=>{
    fetchUsers()
  },[])
  return (
    <section>
        {/* HEADING */}
        <div className="heading">
          <h3 className="heading__title">Customers</h3>
          <div className="heading__item">
              <span className="heading__text">Customers</span>
              <span className="heading__text">{'>'}</span>
              <Link to={'/'} className='heading__link'>Home</Link>
          </div>
        </div>

        <div className="customers__container">
          <div className="customers__table">
            <UsersTable data={usersArray}/>
          </div>
        </div>

    </section>
  )
}

export default Customers