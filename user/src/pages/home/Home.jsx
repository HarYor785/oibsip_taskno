import React from 'react'
import './home.css'
import homeAvatar from '../../assets/home.png'
import homePizza from '../../assets/home-pizza.png'
import homeSpiral from '../../assets/spiral-1.png'
import Categories from '../../components/categories/Categories'
import Dishes from '../../components/dishes/Dishes'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

const Home = () => {
    const {cart} = useSelector((state)=>state.cart)
    console.log(cart)
  return (
    <section className='home'>
        <div className="home__container">
            <div className="home__dashboard">
                <img src={homeAvatar} alt="" className="home__dashboard-img" />
                <img src={homeSpiral} alt="" className="home__dashboard-img" />
                <div className="home__dashboard-item">
                    <div className="home__dashboard-heading">
                        <h2 className="home__dashboard-title">
                            Your Slice of Control
                        </h2>
                        <span className="home__dashboard-subtitle">
                            Manage Orders, Explore Menu, and Dive into <br/> Deliciousness with Ease
                        </span>
                    </div>
                    <img src={homePizza} alt="" className="home__dashboard-item_img" />
                </div>
            </div>

            <div className="home__categories">
                <h4 className="home__categories-title">
                    Exploy Categories
                </h4>
                <Categories/>
            </div>

            <div className="home__products">
                <div className="home__products-heading">
                    <h4 className="home__products-title">
                        Popular Dishes
                    </h4>
                    <Link to={'/menu'} className='home__products-link'>view all</Link>
                </div>
                <Dishes/>
            </div>
        </div>
    </section>
  )
}

export default Home