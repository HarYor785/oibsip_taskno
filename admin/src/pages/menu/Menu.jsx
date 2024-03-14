import React, { useEffect, useState } from 'react'
import './menu.css'
import { Link } from 'react-router-dom'
import MenuBox from '../../components/menuBox/MenuBox'
import { addItem, createItems, getItems, updateStock } from '../../api'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Loader from '../../components/loader/Loader'


const UpdateStock = ({user, openMenu, setOpenMenu, fetchItems}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        status: null,
        message: null
    })
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm({
        mode: 'onChange'
    })

    const handleAddItem = async (data) =>{
        setIsLoading(true)
        setState({status: null, message: null})
        try {
            const newData = {id: openMenu.id, type: openMenu.type, ...data}
            const res = await updateStock(user?.token, newData)
            setState({status: res?.success, message: res?.message})
            fetchItems()
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            setState({status: false, message: "Couldn't connect to server"})
        }
    }

    return(
        <div className="menu__stock">
            <div className="menu__stock-overlay" 
            onClick={()=>setOpenMenu({name: null, type: null})}></div>
            <div className="menu__stock-container">
                <form className="menu__stock-form" onSubmit={handleSubmit(handleAddItem)}>
                    <h4 className="menu__stock-title">
                        {openMenu.name}
                    </h4>

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

                    <div className="menu__stock-item">
                        <label htmlFor="stock" className="menu__stock-label">
                            {openMenu.type}
                        </label>
                        <input type="number" name='stock' className="menu__stock-input" 
                        {...register('stock',{required: 'This field is required'})}/>
                        <span className="menu__stock-error">
                            {errors.stock && errors.stock.message}
                        </span>
                    </div>

                    <div className="menu__stock-item">
                        {isLoading ? <Loader/> : <button type='submit'
                        className="menu__stock-btn button">
                            Add Stock
                        </button>}
                    </div>
                </form>
            </div>
        </div>
    )
}

const AddItem = ({user, openItem, setOpenItem, fetchItems}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        status: null,
        message: null
    })
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm({
        mode: 'onChange'
    })

    const handleAddItem = async (data) =>{
        setIsLoading(true)
        setState({status: null, message: null})
        try {
            const newData = {name: openItem, ...data}
            const res = await addItem(user?.token, newData)
            setState({status: res?.success, message: res?.message})
            fetchItems()
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            setState({status: false, message: "Couldn't connect to server"})
        }
    }

    return(
        <div className="menu__stock">
            <div className="menu__stock-overlay" 
            onClick={()=>setOpenItem(null)}></div>
            <div className="menu__stock-container">
                <form onSubmit={handleSubmit(handleAddItem)}
                className="menu__stock-form">
                    <h4 className="menu__stock-title">
                        {openItem}
                    </h4>

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

                    <div className="menu__stock-item">
                        <label htmlFor="name" className="menu__stock-label">
                            Type
                        </label>
                        <input type="text" className="menu__stock-input" 
                        {...register('type',{required: 'This field is required'})}/>
                        <span className="menu__stock-error">
                            {errors.type && errors.type.message}
                        </span>
                    </div>

                    <div className="menu__stock-item">
                        <label htmlFor="name" className="menu__stock-label">
                            Stock
                        </label>
                        <input type="number" className="menu__stock-input" 
                        {...register('stock',{required: 'This field is required'})}/>
                        <span className="menu__stock-error">
                            {errors.stock && errors.stock.message}
                        </span>
                    </div>

                    <div className="menu__stock-item">
                        {isLoading ? <Loader/> : <button type='submit'
                        className="menu__stock-btn button">
                            Add Item
                        </button>}
                    </div>
                </form>
            </div>
        </div>
    )
}

const CreateItem = ({user, setOpenAdd, fetchItems}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        status: null,
        message: null
    })
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm({
        mode: 'onChange'
    })

    const handleAddItem = async (data) =>{
        setIsLoading(true)
        setState({status: null, message: null})
        try {
            const res = await createItems(user?.token, data)
            setState({status: res?.success, message: res?.message})
            fetchItems()
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            setState({status: false, message: "Couldn't connect to server"})
        }
    }

    return(
        <div className="menu__stock">
            <div className="menu__stock-overlay" 
            onClick={()=>setOpenAdd(null)}></div>
            <div className="menu__stock-container">
                <form onSubmit={handleSubmit(handleAddItem)}
                className="menu__stock-form">
                    <h4 className="menu__stock-title">
                        Add Custom Pizza Items
                    </h4>

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

                    <div className="menu__stock-item">
                        <label htmlFor="name" className="menu__stock-label">
                            Name
                        </label>
                        <input type="text" name='name' className="menu__stock-input" 
                        {...register('name',{required: 'This field is required'})}/>
                        <span className="menu__stock-error">
                            {errors.name && errors.name.message}
                        </span>
                    </div>

                    <div className="menu__stock-item">
                        <label htmlFor="name" className="menu__stock-label">
                            Type
                        </label>
                        <input type="text" name='type' className="menu__stock-input" 
                        {...register('type',{required: 'This field is required'})}/>
                        <span className="menu__stock-error">
                            {errors.type && errors.type.message}
                        </span>
                    </div>

                    <div className="menu__stock-item">
                        <label htmlFor="stock" className="menu__stock-label">
                            Stock
                        </label>
                        <input type="number" name='stock' className="menu__stock-input" 
                        {...register('stock',{required: 'This field is required'})}/>
                        <span className="menu__stock-error">
                            {errors.stock && errors.stock.message}
                        </span>
                    </div>

                    <div className="menu__stock-item">
                        {isLoading ? <Loader/> : <button type='submit'
                        className="menu__stock-btn button">
                            Submit
                        </button>}
                    </div>
                </form>
            </div>
        </div>
    )
}


const Menu = () => {
    const {user} = useSelector((state)=>state.user)
    const [menuData, setMenuData] = useState([])
    const [openItem, setOpenItem] = useState()
    const [openAdd, setOpenAdd] = useState(false)
    const [openMenu, setOpenMenu] = useState({
        id: null,
        name: null,
        type: null
    })

    const handleOpenMenu = (id, name, type) =>{
        setOpenMenu({id: id, name: name, type: type})
    }

    const handleOpenItem = (val)=>{
        if(openItem === val){
            setOpenItem(null)
        }else{
            setOpenItem(val)
        }
    }

    const fetchItems = async ()=>{
        const res = await getItems(user?.token)
        setMenuData(res?.item)
    }
    useEffect(()=>{
        fetchItems()
    },[])
  return (
    <section>
        {/* HEADING */}
        <div className="heading">
            <div className="header">
                <h3 className="heading__title">Menu</h3>
                <div className="heading__item">
                    <span className="heading__text">Menu</span>
                    <span className="heading__text">{'>'}</span>
                    <Link to={'/'} className='heading__link'>Home</Link>
                </div>
            </div>
            <button className="heading__btn button"
            onClick={()=>setOpenAdd(!openAdd)}>Add Item</button>
        </div>

        <div className="menu__container">
            {/* PIZZA BASE CATEGORY */}
            {
                menuData?.map((item, i)=>(
                    <MenuBox key={i} item={item} 
                    handleOpenMenu={handleOpenMenu}
                    handleOpenItem={handleOpenItem}
                    />
                ))
            }

            {/* ITEM FORM */}
            {openItem && <AddItem user={user} openItem={openItem} 
            setOpenItem={setOpenItem} fetchItems={fetchItems}/>}

            {/* PIZZA FORM */}
            {openMenu.name !== null 
            && <UpdateStock user={user} 
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            fetchItems={fetchItems}/>}

            {/* ADD PIZZA ITEMS FORM */}
            {openAdd && <CreateItem user={user} 
            setOpenAdd={setOpenAdd} 
            fetchItems={fetchItems}/>}
            
        </div>
    </section>
  )
}

export default Menu