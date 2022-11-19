import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// image
import logo from "../../../images/logo/logo.svg";
import CustomInput from "../../components/CustomInput/custom-input";
import CustomButton from "../../components/CustomButton/custom-button";

import axios from "axios";

import { resetPasswordToken, updateUserPassword } from '../../../services/AuthService';

import pageRoutes from '../../../routes';

const ResetPassword = ({ history }) => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendTokenLoading, setResendTokenLoading] = useState(false);
  const [page, setPage] = useState("token");
  const [data, setData] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendTokenErrorMsg, setResendTokenErrorMsg] = useState('')


  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await resetPasswordToken(token);
      setMessage(response.message);
      setPage("password");
      setData(response.data);
      setLoading(false);

      // clear email from localstorage
      localStorage.removeItem('email')

    } catch (error) {
      setErrors({token: error.response.data.message})
      setLoading(false);
    }
    setToken("");
  };
  

  const updatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      return setErrors({
        message: "Password mismatch!"
      })
    }
    setErrors({});
    if (!password || !confirmPassword) {
      return setErrors({
        message: "Password field(s) cannot be empty."
      })
    }
    try {
      const response = await updateUserPassword(data.data._id, password);
      setMessage(response.data.message);
      setLoading(false);
      
      history.push(pageRoutes.login);

    } catch (error) {
      // console.log(error.response);
      setErrors({message: error.response.message})
      setLoading(false);
    }

  }

  const resendToken = async()=>{
    setResendTokenLoading(true)
    
    // get the email from localstorage
    const email = localStorage.getItem('email');
    if(!email){
      // redirect to page-forgot-password to enter the email again
      history.push(pageRoutes.forgotPassword);
    }
    else{
      // resend email
      try {
        const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API : process.env.REACT_APP_EMPLOYER_CENTER_API}/account/forget-password`;
  
        const response = await axios.post(url, {email});
  
        //save the email(if not saved already) in localstorage incase he/she wants to resend token
        if(localStorage.getItem('email')){
          localStorage.setItem('email', email)
        }

        setResendTokenErrorMsg('')
        setResendTokenLoading(false)

      } catch (error) { 
        setResendTokenLoading(false)
        if(error.response){
          setResendTokenErrorMsg(error.response.data.message);
        }else{
          setResendTokenErrorMsg(error.message);
        }
        
      }
    }
  }

  return (
    <>
    {
      page === "token" &&
      <div className="authincation h-100 p-meddle">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                        <Link to="/page-register">
                          <img src={logo} alt="..." />
                        </Link>
                      </div>
                      <h4 className="text-center mb-4 ">Password Reset</h4>
                      <p>{resendTokenLoading ? '': 
                      (
                        resendTokenErrorMsg ? <span style={{color: 'red'}}>{resendTokenErrorMsg}</span> : 'Check your email and enter token.'
                      )}</p>
                <form onSubmit={resetPassword}>
                  
                  <div className="form-group mb-3">
                    <CustomInput 
                      title="Code"
                      type="text"
                      className="form-control"
                      placeholder="token"
                      onChange={e => setToken(e.target.value)}
                      value={token}
                    />
                    {errors.token && <div style={{color: 'red'}}>{errors.token}</div>}
                  </div>
                  {
                    resendTokenLoading ? 
                    (
                      <p style={{cursor: resendTokenLoading ? 'default': 'pointer', color: '#56b609'}}>
                        Loading...
                      </p>
                    ):
                    (
                      <p onClick={resendToken} style={{cursor: 'pointer', color: '#56b609'}}>
                        Resend token
                      </p>
                    )
                  }
                  <div className="text-center mt-4">
                    {
                      loading ? 
                        <CustomButton disabled style={{width: '100%'}}>
                          Loading...
                        </CustomButton> :
                        <CustomButton type="submit" style={{width: '100%'}}>
                          Verify
                        </CustomButton>
                    }
                  </div>
                </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    {
      page === "password" &&
      <div className="authincation h-100 p-meddle">
        <div className="container h-100">
          {" "}
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                        <Link to="/login">
                          <img src={logo} alt="" />
                        </Link>
                      </div>
                      <h4 className="text-center mb-4 ">Change Password</h4>
                      <form onSubmit={updatePassword}>
                        <div className="form-group mb-4">
                          <label className="">
                            {errors.message && <p style={{color: 'red'}}>{errors.message}</p>}
                            {message && <p style={{color: 'green'}}>{message}</p>}
                            {/* <strong style={{ color: '#7f7f7f'}}>Change password</strong> */}
                          </label>
                          <CustomInput 
                            type="password"
                            className="form-control"
                            required
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>
                        <div className="form-group mb-4">
                          <CustomInput 
                            type="password"
                            className="form-control"
                            required
                            placeholder="Confirm Password"
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                          />

                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Change Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  );
};

export default ResetPassword;
