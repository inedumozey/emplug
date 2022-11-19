import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {
  loadingToggleAction,
  loginAction,
} from '../../store/actions/auth/AuthActions'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

// image
import logo from '../../images/logo/logo.svg'
import loginbg from '../../images/pic1.png'
import CustomButton from '../components/CustomButton/custom-button'
import CustomInput from '../components/CustomInput/custom-input'
import { isAuthenticated } from '../../store/selectors/AuthSelectors'
import pageRoutes from '../../routes';
import { Modal } from 'react-bootstrap'

function Login(props) {
  const history = useHistory()
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState('')
  let errorsObj = { email: '', password: '' }
  const [errors, setErrors] = useState(errorsObj)
  const [password, setPassword] = useState('')

  function onLogin(e) {
    e.preventDefault()
    let error = false
    const errorObj = { ...errorsObj }
    if (email === '') {
      errorObj.email = 'Email is Required'
      error = true
    }
    if (password === '') {
      errorObj.password = 'Password is Required'
      error = true
    }
    setErrors(errorObj)
    if (error) {
      return
    }
    props.loadingToggleAction(true)
    props.loginAction(email, password, history)

    // history.push(pageRoutes.home)
  }

  if(props.isAuthenticated) {
    return <Redirect to={pageRoutes.home}/>
  }


  return (
    <Fragment>
      <Modal show={show} onHide={() => setShow(false)}>
        <ResendActivationLink setShow={setShow}/>
      </Modal>
      <div className='authincation d-flex flex-column flex-lg-row flex-column-fluid'>
        <div className='login-aside text-center  d-flex flex-column flex-row-auto'>
          <div className='d-flex flex-column-auto flex-column pt-lg-40 pt-15'>
            <div className='text-center mb-4 pt-5'>
              <Link to={pageRoutes.home}>
                <img src={logo} alt='emplug' />
              </Link>
            </div>
            <h3 className='mb-2'>Welcome back!</h3>
            {/* <p>User Experience & Interface Design <br />Strategy SaaS Solutions</p> */}
          </div>
          <div
            className='aside-image'
            style={{ backgroundImage: 'url(' + loginbg + ')' }}
          ></div>
        </div>

        <div className='container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto'>
          <div className='d-flex justify-content-center h-100 align-items-center'>
            <div className='authincation-content style-2'>
              <div className='row no-gutters'>
                <div className='col-xl-12 tab-content'>
                  <div id='sign-in' className='auth-form   form-validation'>
                    {props.errorMessage && (
                      <div
                        className='bg-red-300 text-red-900 text-center border border-red-900 p-1 my-2'
                        style={{ color: 'red' }}
                      >
                        {props.errorMessage}
                      </div>
                    )}
                    {props.successMessage && (
                      <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                        {props.successMessage}
                      </div>
                    )}
                    <form onSubmit={onLogin} className='form-validate'>
                      <h3 className='text-center mb-4 text-black'>
                        Sign in your account
                      </h3>
                      <div className='form-group mb-3'>
                        <CustomInput
                          title='Email/Username'
                          type='text'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='Type Your Email Address'
                        />
                        {errors.email && (
                          <div className='text-danger fs-12'>{errors.email}</div>
                        )}
                      </div>


                      <div className='form-group mb-3'>
                        <CustomInput
                          title='Password'
                          type='password'
                          className='form-control'
                          value={password}
                          placeholder='Type Your Password'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <div className='text-danger fs-12'>
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className='form-row d-flex justify-content-between mt-4 mb-2'>
                        <div className='form-group mb-3'>
                          <p onClick={()=>setShow(true)} style={{cursor: 'pointer', marginTop: '-10px', color: 'var(--primary)', userSelect: 'none'}}>
                              Resend Activation Link?
                          </p>
                          <div className='custom-control custom-checkbox ml-1'>
                            <Link
                              className='text-primary'
                              to={pageRoutes.forgotPassword}
                            >
                              forgot password?
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className='text-center form-group mb-3'>
                        {props.showLoading ? (
                          <CustomButton
                            style={{ width: '100%' }}
                            type='submit'
                            disabled
                          >
                            Loading...
                          </CustomButton>
                        ) : (
                          <CustomButton style={{ width: '100%' }} type='submit'>
                            Sign In
                          </CustomButton>
                        )}
                      </div>
                    </form>
                    <div className='new-account mt-3'>
                      <p>
                        Don't have an account?{' '}
                        <Link className='text-primary' to='./page-register'>
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  successMessage: state.auth.successMessage,
  showLoading: state.auth.showLoading,
  isAuthenticated: isAuthenticated(state),
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  loginAction: (email, password) => dispatch(loginAction(email, password)),
  loadingToggleAction: (bool) => dispatch(loadingToggleAction(bool)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)



function ResendActivationLink({setShow}){

  const [inp, setInp] = useState('')
  const [msg, setMsg] = useState({text: '', success: ''})
  const [pending, setPending] = useState(false)

  const sendLink = async(e)=>{
    e.preventDefault();
    setPending(true);

    if(!inp){
      setMsg({
        text: 'The email field is required!',
        success: false
      })
      setPending(false);
    }
    else{

      try{
        const url = process.env.REACT_APP_EMPLOYER_CENTER_API;
        const res = await axios.post(`${url}/account/resend-token`, {email: inp})
        setMsg({
          text: res.data.message,
          success: true
        })

        setInp('')
        setPending(false)
      }
      catch(err){
        if(err.response){
          setMsg({
            text: err.response.data.message,
            success: false
          })
        }
        else{
          setMsg({
            text: err.message,
            success: false
          })
        }
  
        setPending(false)
      }
    }

    
  }

  return (
    <div style={styles.wrapper}>

      <h3 className='text-center mb-4 text-black'>
        Resend Activation Link
      </h3>

      <form
        style={{
          width: '96%', 
          maxWidth: '300px', 
          margin: 'auto'
          }}
          onSubmit={sendLink}
        >
          {/* output msg from api call */}
        <div
          style={{
            color: msg.text && msg.success ? 'var(--bs-success)' : 'var(--bs-danger)',
            textAlign: 'center',
            fontStyle: 'italic',
            padding: '2px'
          }}>
          {msg.text}
        </div>

        <input
          autoFocus
          className='resendLinkInput'
          placeholder='Enter Your Email'
          value={inp || ''}
          onChange={(e)=>setInp(e.target.value)}
        />

        <input
          className='resendLinkInput'
          type="submit"
          style={{
            background: 'var(--primary)',
            color: '#fff',
            fontWeight: '500'
          }}
          value={pending ? 'Loading...' : 'Send'}
        />

      </form>
    </div>
  )
}

const styles = {
  wrapper: {
    width: '100%',
    background: '#fff',
    borderRadius: '20px',
    padding: '30px 10px'
  }
}