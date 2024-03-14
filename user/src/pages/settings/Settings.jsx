import React from 'react'
import './settings.css'
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.png'
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import { BiTransfer } from "react-icons/bi";
import { useForm } from 'react-hook-form';
import {useSelector} from 'react-redux'


const Settings = () => {
  const {user} = useSelector(state=> state.user)
  const {
    register,
    handleSubmit,
    formState:{errors},
    getValues
  } = useForm({
    mode: 'onChange'
  })

  const handleUpdate = (data)=>{
    console.log(data)
  }
  return (
    <section className='settings'>
      <div className="heading">
        <h2 className="heading__title">
          Settings |
        </h2>
        <Link to={'/'} className='heading__link'>Home {'>'}</Link>
        <span className='heading__text'>Settings</span>
      </div>

      <div className="settings__container">

        {/* LEFT ITEM */}
        <div className="settings__left">
          <div className="settings__profile">
            <div className="cart__balance-box">
                <h4 className="cart__balance-name">Balance</h4>
                <span className="cart__balance-value">${parseFloat(user?.balance).toFixed(2)}</span>
                <div className="cart__balance-buttons">
                    <button className="cart__balance-button">
                        <CgLogOut size={15} className='cart__balance-icon'/>
                        Top up
                    </button>
                    <button className="cart__balance-button">
                        <BiTransfer size={15} className='cart__balance-icon'/>
                        Transfer
                    </button>
                </div>
            </div>
            <img src={avatar} alt="" className="settings__profile-img" />
            <h4 className="settings__profile-name">
              {user?.firstName + ' ' + user?.lastName}
            </h4>
            <div className="settings__profile-list">
              <div className="settings__profile-item">
                <MdEmail size={20} className="settings__profile-icon"/>
                <span className="settings__profile-span">
                  {user?.email}
                </span>
              </div>
              <div className="settings__profile-item">
                <FaPhone size={20} className="settings__profile-icon"/>
                <span className="settings__profile-span">
                  {user?.phone}
                </span>
              </div>
              <div className="settings__profile-item">
                <FaLocationDot size={20} className="settings__profile-icon"/>
                <span className="settings__profile-span">
                  178 New York City, New York, USA.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT ITEM */}
        <div className="settings__right">
          <h4 className="settings__right-title">
            Update Profile
          </h4>
          <form className="settings__right-form" onSubmit={handleSubmit(handleUpdate)}>
            <div className="settings__right-form_items">
              <div className="settings__right-form_field">
                <label htmlFor="firstName" className="settings__right-form_label">
                  First Name
                </label>
                <input type="text" name='firstName' className="settings__right-form_input" 
                {...register('firstName',{required: 'This field is required'})}/>
                <span className="settings__right-form_span">
                  {errors.firstName && errors.firstName.message}
                </span>
              </div>
              <div className="settings__right-form_field">
                <label htmlFor="lastName" className="settings__right-form_label">
                  Last Name
                </label>
                <input type="text" name='lastName' className="settings__right-form_input" 
                {...register('lastName',{required: 'This field is required'})}/>
                <span className="settings__right-form_span">
                  {errors.lastName && errors.lastName.message}
                </span>
              </div>
              <div className="settings__right-form_field">
                <label htmlFor="phone" className="settings__right-form_label">
                  Phone
                </label>
                <input type="tel" name='phone' className="settings__right-form_input" 
                {...register('phone',{required: 'This field is required'})}/>
                <span className="settings__right-form_span">
                  {errors.phone && errors.phone.message}
                </span>
              </div>
              <div className="settings__right-form_field">
                <label htmlFor="email" className="settings__right-form_label">
                  Email
                </label>
                <input type="text" name='email' className="settings__right-form_input" 
                {...register('email',{required: 'This field is required'})}/>
                <span className="settings__right-form_span">
                  {errors.email && errors.email.message}
                </span>
              </div>
              <div className="settings__right-form_field">
                <label htmlFor="password" className="settings__right-form_label">
                  Password
                </label>
                <input type="password" name='password' className="settings__right-form_input" 
                {...register('password',{required: 'This field is required'})}/>
                <span className="settings__right-form_span">
                  {errors.password && errors.password.message}
                </span>
              </div>
              <div className="settings__right-form_field">
                <label htmlFor="cpassword" className="settings__right-form_label">
                  Confirm password
                </label>
                <input type="password" name='cpassword' className="settings__right-form_input" 
                {...register('cpassword',{
                  validate: (value)=>{
                    const {password} = getValues()
                    if(value !== password){
                      return 'Password not match'
                    }
                  }
                })}/>
                <span className="settings__right-form_span">
                  {errors.cpassword && errors.cpassword.message}
                </span>
              </div>
              <div className="settings__right-form_field">
                <label htmlFor="address" className="settings__right-form_label">
                  Address
                </label>
                <input type="address" name='address' className="settings__right-form_input" 
                {...register('address',{required: 'This field is required'})}/>
                <span className="settings__right-form_span">
                  {errors.address && errors.address.message}
                </span>
              </div>
              <div className="settings__right-form_field">
                <label htmlFor="state" className="settings__right-form_label">
                  State
                </label>
                <input type="text" name='state' className="settings__right-form_input" 
                {...register('state',{required: 'This field is required'})}/>
                <span className="settings__right-form_span">
                  {errors.state && errors.state.message}
                </span>
              </div>
              <div className="settings__right-form_field">
                <label htmlFor="country" className="settings__right-form_label">
                  Country
                </label>
                <input type="text" name='country' className="settings__right-form_input" 
                {...register('country',{required: 'This field is required'})}/>
                <span className="settings__right-form_span">
                  {errors.country && errors.country.message}
                </span>
              </div>
              
              <div className="settings__right-form_field">
                <label htmlFor="postalCode" className="settings__right-form_label">
                  Postal Code
                </label>
                <input type="text" name='postalCode' className="settings__right-form_input" 
                {...register('postalCode',{required: 'This field is required'})}/>
                <span className="settings__right-form_span">
                  {errors.postalCode && errors.postalCode.message}
                </span>
              </div>
              <div className="settings__right-form_field">
                <label htmlFor="gender" className="settings__right-form_label">
                  Gender
                </label>
                <select name='gender' className="settings__right-form_input"
                {...register('gender',{required: 'This field is required'})}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <span className="settings__right-form_span">
                  {errors.gender && errors.gender.message}
                </span>
              </div>
              <div className="settings__right-form_field">
                <label htmlFor="image" className="settings__right-form_label">
                  Profile image
                </label>
                <input type="file" name='image' className="settings__right-form_input" 
                {...register('file')}/>
              </div>
            </div>
            <button type='submit' className="settings__right-form_button btn">Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Settings