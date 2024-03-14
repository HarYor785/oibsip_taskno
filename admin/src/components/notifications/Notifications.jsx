import React from 'react'
import './notifications.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNotification } from '../../state/settingsSlice'

const Notifications = () => {
    const {notification} = useSelector((state)=>state.settings)
    const dispatch = useDispatch()

    const handleCloseNot = () =>{
        dispatch(toggleNotification(!notification))
    }
  return (
    <div className={`notifications ${notification ? 'active' : ''}`}>
        <div className="notifications__overlay" onClick={handleCloseNot}></div>

        <div className="notifications__container">
            <div className="notifications__heading">
                <h4 className="notifications__title">Notifications</h4>
                <button className="notifications__btn">Clear all</button>
            </div>
            <div className="notifications__content">
                {[1,2,3,4,5].map((item)=>(
                    <span className="notification__item">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                    </span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Notifications