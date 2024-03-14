import React from 'react'
import './favourite.css'
import { Link } from 'react-router-dom'
import Dishes from '../../components/dishes/Dishes'

const Favourite = () => {
  return (
    <section className='favourite'>
      <div className="heading">
        <h2 className="heading__title">
          Favourites |
        </h2>
        <Link to={'/'} className='heading__link'>Home {'>'}</Link>
        <span className='heading__text'>Favourite</span>
      </div>

      <div className="favourite__container">
        <Dishes/>
      </div>
    </section>
  )
}

export default Favourite