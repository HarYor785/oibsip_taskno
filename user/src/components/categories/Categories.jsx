import React from 'react'
import './categories.css'
import category1 from '../../assets/category-1.png'
import category2 from '../../assets/category-2.png'
import category3 from '../../assets/category-3.png'
import category4 from '../../assets/category-4.png'
import category5 from '../../assets/category-5.png'
import category6 from '../../assets/category-6.png'

const Categories = () => {
  return (
    <div className='categories'>
        <div className="categories__card">
            <img src={category1} alt="" className="categories__img" />
            <h4 className="categories__text">
                Popular
            </h4>
        </div>
        <div className="categories__card">
            <img src={category2} alt="" className="categories__img" />
            <h4 className="categories__text">
                Fast Delivery
            </h4>
        </div>
        <div className="categories__card">
            <img src={category3} alt="" className="categories__img" />
            <h4 className="categories__text">
                Dine in
            </h4>
        </div>
        <div className="categories__card">
            <img src={category4} alt="" className="categories__img" />
            <h4 className="categories__text">
                High Class
            </h4>
        </div>
        <div className="categories__card">
            <img src={category5} alt="" className="categories__img" />
            <h4 className="categories__text">
                Nearest
            </h4>
        </div>
        <div className="categories__card">
            <img src={category6} alt="" className="categories__img" />
            <h4 className="categories__text">
                Pick Up
            </h4>
        </div>
    </div>
  )
}

export default Categories