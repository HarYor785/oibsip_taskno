import React from 'react'
import './dishes.css'
import { IoIosStar } from "react-icons/io";
import dishe1 from '../../assets/pizza-1.png'
import dishe2 from '../../assets/pizza-2.png'
import dishe3 from '../../assets/pizza-3.png'
import createImg from '../../assets/create-pizza.png'
import { FaRegHeart, FaHeart  } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { toggleCreatePizza } from '../../state/settingsSlice';

const Dishes = () => {
    const {pizza} = useSelector((state)=>state.settings)
    const dispatch = useDispatch()

    const handleTogglePizza = () => {
        dispatch(toggleCreatePizza(!pizza))
    }
  return (
    <div className='dishes'>
        
        {/* CREATE PIZZA */}
        <div className="dishes__card-create">
            <img src={createImg} alt="" className="dishes__create-img" />
            <div className="dishes__create-items">
                <h4 className="dishes__create-name">
                    Create your own pizza
                </h4>
                <span className="dishes__create-price">
                    Choose from our options of designa and make your own pizza.
                </span>
            </div>
            <button onClick={handleTogglePizza}
            className="dishes__create-button">
                Create Now
            </button>
        </div>

        <div className="dishes__card">
            <button className="dishes__card-button">
                <FaRegHeart size={20} className="dishes__card-icon"/>
            </button>
            <img src={dishe1} alt="" className="dishes__img" />
            <div className="dishes__items">
                <div className="dishes__items-ratings">
                    <IoIosStar size={15} className='dishes__items-icon'/>
                    <IoIosStar size={15} className='dishes__items-icon'/>
                    <IoIosStar size={15} className='dishes__items-icon'/>
                    <IoIosStar size={15} className='dishes__items-icon'/>
                    <IoIosStar size={15} className='dishes__items-icon'/>
                </div>
                <div className="dishes__items-list">
                    <div className="dishes__items-div">
                        <h4 className="dishes__items-name">
                            Hawaiian Pizza
                        </h4>
                        <span className="dishes__items-price">
                            <span>$</span>350.00
                        </span>
                    </div>
                    <button className="dishes__items-button">
                        <FaPlus size={20} className="dishes__items-button_icon"/>
                    </button>
                </div>
            </div>
        </div>
        {[1,2,3,4,5,6].map((item, i)=>(
            <div className="dishes__card">
                <button className="dishes__card-button">
                    <FaRegHeart size={20} className="dishes__card-icon"/>
                </button>
                <img src={dishe1} alt="" className="dishes__img" />
                <div className="dishes__items">
                    <div className="dishes__items-ratings">
                        <IoIosStar size={15} className='dishes__items-icon'/>
                        <IoIosStar size={15} className='dishes__items-icon'/>
                        <IoIosStar size={15} className='dishes__items-icon'/>
                        <IoIosStar size={15} className='dishes__items-icon'/>
                        <IoIosStar size={15} className='dishes__items-icon'/>
                    </div>
                    <div className="dishes__items-list">
                        <div className="dishes__items-div">
                            <h4 className="dishes__items-name">
                                Cheese Pizza
                            </h4>
                            <span className="dishes__items-price">
                                <span>$</span>250.00
                            </span>
                        </div>
                        <button className="dishes__items-button">
                            <FaPlus size={20} className="dishes__items-button_icon"/>
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Dishes