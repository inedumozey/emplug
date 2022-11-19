import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// image
import logo from "../../images/logo/logo.svg";
import CustomInput from "../components/CustomInput/custom-input";
import axios from "axios";

import pageRoutes from '../../routes';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")

  // clear email from local storage (if exist) when the components renders, same thing will be implemented in reset-password route when password is successfully reseted
  useEffect(()=>{
    if(localStorage.getItem('email')){
      localStorage.removeItem('email')
    }
  }, [])
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API : process.env.REACT_APP_EMPLOYER_CENTER_API}/account/forget-password`;

      const response = await axios.post(url, {email});

      setMessage(response.message);
      if (response.status === 200) {
        //save the email in localstorage incase he/she wants to resend token
        localStorage.setItem('email', email)

        history.push(pageRoutes.resetPassword);
      }
      return;
    } catch (error) {
      // console.log(error.response); 
      setMessage(error.response.data.message);
      setEmail("");
    }

  }; 
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100" style={{marginTop: '10rem'}}>
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
                    <h4 className="text-center mb-4 ">Forgot Password</h4>
                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className="form-group mb-4">
                        <label className="">
                          {message && <p style={{color: 'red'}}>{message}</p>}
                          <strong style={{ color: '#7f7f7f'}}>Email</strong>
                        </label>
                        <CustomInput 
                          type="email"
                          className="form-control"
                          required
                          placeholder="Enter your email"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          RESET
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
  );
};

export default ForgotPassword;
