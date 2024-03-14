import React, { useState } from 'react'
import './createPizza.css'
import pizza4 from '../../assets/pizza-4.png'
import { useDispatch, useSelector } from 'react-redux';
import { toggleCreatePizza } from '../../state/settingsSlice';
import { pizzaCheese, pizzaCrust, pizzaSauce, pizzaSize, pizzaVeggies } from '../../utils';
import { useEffect } from 'react';
import { createUserPizza, fetchUserCart } from '../../api';
import { handleCart, handleCartItem } from '../../state/cartSlice';
import Loader from '../loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreatePizza = () => {
    const {toggle, cart} = useSelector((state)=>state.cart)
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [pizzaTab, setPizzaTab] = useState(1)
    const {pizza} = useSelector((state)=>state.settings)
    const [total, setTotal] = useState(0)
    const [sizeInput, setSizeInput] = useState({name: null, price: 0})
    const [crustInput, setCrustInput] = useState({name: null, price: 0})
    const [sauceInput, setSauceInput] = useState({name: null, price: 0})
    const [cheeseInput, setCheeseInput] = useState({name: null, price: 0})
    const [veggiesInput, setVeggiesInput] = useState([{name: null, price: 0}])
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        status: null,
        message: null
    })


    useEffect(()=>{
        const calculateTotal = () => {
            const sizesTotal = sizeInput.price || 0;
            const crustTotal = crustInput.price || 0;
            const sauceTotal = sauceInput.price || 0;
            const cheeseTotal = cheeseInput.price || 0;
            const veggiesTotal = veggiesInput.reduce((acc, veggie) => acc + veggie.price, 0);
            setTotal(parseFloat(sizesTotal + crustTotal + sauceTotal + cheeseTotal + veggiesTotal).toFixed(2))
        };

        calculateTotal()
    },[sizeInput, crustInput, sauceInput, cheeseInput, veggiesInput])
    
    
    const handleClose = () =>{
        dispatch(toggleCreatePizza(!pizza))
    }

    const addToast = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 4000, // Close the toast after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        setState({status: null, message: null})
        try {
            const data = {
                create: true,
                name: 'Custom Pizza',
                sauce: sauceInput,
                base: crustInput,
                size: sizeInput,
                cheese: cheeseInput,
                veggies: veggiesInput,
                price: total
            }

            const res = await createUserPizza(user?.token, data)

            if(res?.success){
                addToast(res?.message)
                const cart = await fetchUserCart(user?.token)
                dispatch(handleCartItem(cart?.data))
                setTimeout(() => {
                    handleClose()
                    dispatch(handleCart(!toggle))
                }, 1000);
            }else{
                setState({status: res?.success, message: res?.message})
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            setState({status: false, message: "Couldn't connect to server"})
        }

    }

    
  return (
    <div className='create__pizza'>
        <div className="create__pizza-overlay"
        onClick={handleClose}></div>
        <ToastContainer/>
        <div className="create__pizza-container">
            <div className="create__pizza-content">
                <div className="create__pizza-progress">
                    <span className='create__pizza-progress_count'>1</span>
                    <span className={`create__pizza-progress_bar 
                    ${pizzaTab === 2 && 'active'}`}></span>
                    <span className='create__pizza-progress_count'>2</span>
                </div>
                <h3 className="create__pizza-title">
                    Create Your Own Pizza
                </h3>
                <span className="create__pizza-subtitle">
                    Create your own pizza by choosing a crust, sauce 
                    and toppings! Select from three crust size and 
                    thickness, choice of sauce over 10 individual toppings
                </span>
                {
                    state.message && (
                        <div className={`form__message ${
                            state.status ? 'success' : 'error'
                        }`}>
                            <span className="form__message-text">
                                {state.message}
                            </span>
                        </div>
                    )
                }

                <div className="create__pizza-form">

                    {/* SIZE */}
                    <div className={`create__pizza-form_items 
                    ${pizzaTab === 1 && 'active'}`}>
                        <label htmlFor="size" className="create__pizza-form_label">
                            Size
                        </label>
                        <div className="create__pizza-form_list">
                            {
                                pizzaSize.map((item,index)=>(
                                    <div className="create__pizza-form_div">
                                        <input type="radio" name='size' 
                                        id={`radio${index + 1}`} value={item.size}
                                        onChange={(e)=>setSizeInput({name: e.target.value, price: item.price})}
                                        className="create__pizza-form-radio" />
                                        <label htmlFor={`radio${index + 1}`} 
                                        className="create__pizza-form_field">
                                            <span>{item.size}</span>
                                            <span>${item.price}</span>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>

                    {/* CRUST */}
                    <div className={`create__pizza-form_items 
                    ${pizzaTab === 1 && 'active'} grid`}>
                        <label htmlFor="crust" className="create__pizza-form_label">
                            Crust
                        </label>
                        <div className="create__pizza-form_list">
                            {
                                pizzaCrust.map((item, i)=>(
                                    <div className="create__pizza-form_div">
                                        <input type="radio" name='crust' 
                                        id={`crust_radio${i + 1}`} value={item.name}
                                        onChange={(e)=>setCrustInput({name: e.target.value, price: item.price})}
                                        className="create__pizza-form-radio" />
                                        <label htmlFor={`crust_radio${i + 1}`} 
                                        className="create__pizza-form_field">
                                            {item.name}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                
                    {/* SAUCE */}
                    <div className={`create__pizza-form_items 
                    ${pizzaTab === 1 && 'active'} grid`}>
                        <label htmlFor="sauce" 
                        className="create__pizza-form_label">
                            Sauce
                        </label>
                        <div className="create__pizza-form_list">
                            {
                                pizzaSauce.map((item, i)=>(
                                    <div className="create__pizza-form_div">
                                        <input type="radio" name='sauce' 
                                        id={`sauce_radio${i + 1}`} value={item.name}
                                        onChange={(e)=>setSauceInput({name: e.target.value, price: item.price})}
                                        className="create__pizza-form-radio" />
                                        <label htmlFor={`sauce_radio${i + 1}`} 
                                        className="create__pizza-form_field">
                                            {item.name}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>
                    
                    {/* CHEESE */}
                    <div className={`create__pizza-form_items 
                    ${pizzaTab === 2 && 'active'} grid`}>
                        <label htmlFor="cheese" 
                        className="create__pizza-form_label">
                            Cheese Type
                        </label>
                        <div className="create__pizza-form_list">
                            {
                                pizzaCheese.map((item, i)=>(
                                    <div className="create__pizza-form_div">
                                        <input type="radio" name='cheese' 
                                        id={`cheese_radio${i + 1}`} value={item.name}
                                        onChange={(e)=>setCheeseInput({name: e.target.value, price: item.price})}
                                        className="create__pizza-form-radio" />
                                        <label htmlFor={`cheese_radio${i + 1}`}
                                        className="create__pizza-form_field">
                                            {item.name}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* VEGGIES */}
                    <div className={`create__pizza-form_items 
                    ${pizzaTab === 2 && 'active'} grid`}>
                        <label htmlFor="veggies" className="create__pizza-form_label">
                            Choose Toppings 
                        </label>
                        <div className="create__pizza-form_list">
                            {
                                pizzaVeggies.map((item, i)=>(
                                    <div className="create__pizza-form_div" key={i}>
                                        <input type="checkbox" name='veggies' 
                                        id={`veggies_radio${i + 1}`} value={item.name}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setVeggiesInput((prevState) => [
                                                ...prevState,
                                                { name: e.target.value, price: item.price }
                                                ]);
                                            } else {
                                                setVeggiesInput((prevState) =>
                                                prevState.filter((veggie) => veggie.name !== e.target.value)
                                                );
                                            }
                                        }}
                                        className="create__pizza-form-radio" />
                                        <label htmlFor={`veggies_radio${i + 1}`} 
                                        className="create__pizza-form_field">
                                            {item.name}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="create__pizza-form_items flex active">
                        {pizzaTab === 2 && <button onClick={()=>setPizzaTab(1)}
                        className="create__pizza_btn prev btn">
                            Back
                        </button>}
                        {
                            pizzaTab === 1 ? (
                                <button onClick={()=>setPizzaTab(2)}
                                className="create__pizza_btn next btn">
                                    Next
                                </button>
                            ): isLoading ? <Loader/>
                            : (
                                <button 
                                onClick={handleSubmit}
                                className="create__pizza_submit-btn">
                                    <span lassName="create__pizza_submit-title">
                                        Add to Cart
                                    </span>
                                    <div className="create__pizza_submit-div">
                                        <span>${total}</span>
                                        <img src={pizza4} alt="" className="create__pizza_submit-img" />
                                    </div>
                                </button>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default CreatePizza