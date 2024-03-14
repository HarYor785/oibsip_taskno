import React from 'react'
import './menu.css'
import Dishes from '../../components/dishes/Dishes'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <section className='menu'>
      <div className="heading">
        <h2 className="heading__title">
          Explore our Menu |
        </h2>
        <Link to={'/'} className='heading__link'>Home {'>'}</Link>
        <span className='heading__text'>Menu</span>
      </div>

      <div className="menu__container">
        <Dishes/>
      </div>
    </section>
  )
}

export default Menu