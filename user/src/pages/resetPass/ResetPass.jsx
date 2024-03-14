import React from 'react'
import './resetPass.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const ResetPass = () => {
  const {
    register,
    handleSubmit,
    formState:{errors},
    getValues
} = useForm({
    mode: 'onChange'
})

const handleFormSubmit = (data)=>{
    console.log(data)
}
return (
<div className='resetpass'>
    <div className="resetpass__container">
        <div className="resetpass__container-heading">
            <h4 className="resetpass__container-title">
                Reset Password
            </h4>
            <span className="resetpass__container-subtitle">
              Enter your new password to reset your password
            </span>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}
        className="resetpass__form">

          <div className="resetpass__form-field">
              <label htmlFor="password" className="resetpass__form-label">
                  New Password
              </label>
              <input type="password" name='password' 
              {...register('password',{required: 'This field is required'})} 
              className="resetpass__form-input" />
              <span className="resetpass__form-error">
                  {errors.password && errors.password.message}
              </span>
          </div>
          <div className="resetpass__form-field">
              <label htmlFor="cpassword" className="resetpass__form-label">
                  Comfirm Password
              </label>
              <input type="password" name='cpassword' 
              {...register('cpassword',{
                  validate: (value)=>{
                      const {password} = getValues()
                      if(value !== password){
                          return 'Password not match'
                      }
                  }
              })} 
              className="resetpass__form-input" />
              <span className="resetpass__form-error">
                  {errors.cpassword && errors.cpassword.message}
              </span>
          </div>

            <div className="resetpass__form-field">
                <button type='submit' className='resetpass__form-btn btn'>
                    Submit
                </button>
            </div>
            <div className="resetpass__form-field">
                <span className='resetpass__form-acc'>
                    Remember password? <Link to={'/login'}>Login</Link>
                </span>
            </div>
        </form>
    </div>
</div>
)
}

export default ResetPass