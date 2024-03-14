import React from 'react'
import thin from '../../assets/thin-base.png'
import thick from '../../assets/thick-base.png'
import gluten from '../../assets/gluten-base.png'
import stuffed from '../../assets/stuffed-base.png'
import cauliflower from '../../assets/cauli-base.png'
import classic from '../../assets/classic-sauce.png'
import garlic from '../../assets/garlic-sauce.png'
import pesto from '../../assets/pesto-sauce.png'
import barbecue from '../../assets/bbq-sauce.png'
import buffalo from '../../assets/buffalo-sauce.png'

import mozzarella from '../../assets/mozz-cheese.png'
import parmesan from '../../assets/parm-cheese.png'
import cheddar from '../../assets/cheddar-cheese.png'
import gouda from '../../assets/gouda-cheese.png'
import goat from '../../assets/goat-cheese.png'

import bell from '../../assets/bell-peppers.png'
import mushrooms from '../../assets/mushrooms.png'
import onions from '../../assets/onions.png'
import spinach from '../../assets/spinach.png'
import olives from '../../assets/olives.png'

import pepperoni from '../../assets/pepperoni.png'
import italian from '../../assets/Italian-sausage.png'
import bacon from '../../assets/bacon.png'
import ham from '../../assets/ham.png'
import chicken from '../../assets/chicken.png'


const images = {
    thin: thin,
    thick: thick,
    gluten: gluten,
    stuffed: stuffed,
    cauliflower: cauliflower,
    classic: classic,
    garlic: garlic,
    pesto: pesto,
    barbecue: barbecue,
    buffalo: buffalo,
    mozzarella: mozzarella,
    parmesan: parmesan,
    cheddar: cheddar,
    gouda: gouda,
    goat: goat,
    bell: bell,
    mushrooms: mushrooms,
    onions: onions,
    spinach: spinach,
    olives: olives,
    pepperoni: pepperoni,
    italian: italian,
    bacon: bacon,
    ham: ham,
    chicken: chicken 
  };

const MenuBox = ({key, item, handleOpenItem, handleOpenMenu}) => {
  return (
    <div className="menu__item" key={key}>
        <div className="menu__header">
            <div className="menu__heading">
                <h4 className="menu__title">{item?.name}</h4>
                <span className="menu__count">{item?.type?.length}</span>
            </div>
            <button className="menu__btn button"
            onClick={()=>handleOpenItem(item?.name)}>Add Type</button>
        </div>

        <div className="menu__list">
            {
                item?.type?.map((data, i)=>(
                    <div className="menu__content" key={i}>
                        <img src={images[data?.name?.split(' ')[0].toLowerCase()]} 
                        alt={data?.name} className="menu__img" />
                        <div className="menu__div">
                            <h4 className="menu__type">{data?.name}:</h4>
                            <div className="menu__div-stock">
                                <span className="menu__stock-title">In Stock:</span>
                                <span className="menu__stock-number">{data?.stock} Pcs.</span>
                            </div>
                            <button className="menu__content-btn" 
                            onClick={()=>handleOpenMenu(item?._id, item?.name, data?.name)}>
                                Add Stock
                            </button>
                        </div>
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default MenuBox