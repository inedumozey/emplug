import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Eye, EyeSlash } from 'phosphor-react'
import { connect } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
  logout,
} from "../../store/actions/auth/AuthActions";
// image
import logo from "../../images/logo/logo.svg";
import CustomButton from "../components/CustomButton/custom-button";
import CustomInput from "../components/CustomInput/custom-input";
import pathRoute from "../../routes";

function Register(props) {
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  

  function onSignUp(e) {
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    if (password !== confirmPassword) {
      errorObj.password = "Password Mismatch";
      error = true;
    }
    setErrors(errorObj);
    if (error) return;

    if (password === confirmPassword) {
      const data = {
        //fullName,
        firstName,
        lastName,
        username,
        email,
        password,
      };
      props.loadingToggleAction(true);
      props.signupAction(data, props.history);
    }
  }

  const history = useHistory();
  useEffect(() => {
    if (props.auth.success) {
      swal("Verify", "Check your email to complete registration", "success");
      history.push(pathRoute.login);
    }
  }, [props.auth.success]);
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
                    {props.errorMessage && (
                      <div className="text-center" style={{ color: "red" }}>
                        {props.errorMessage}
                      </div>
                    )}
                    {props.successMessage && (
                      <div className="">{props.successMessage}</div>
                    )}
                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <CustomInput
                          title="First Name"
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                          onChange={(e) => setFirstName(e.target.value)}
                          // value={fullName}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CustomInput
                          title="Last Name"
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                          onChange={(e) => setLastName(e.target.value)}
                          // value={fullName}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CustomInput
                          title="Username"
                          type="text"
                          className="form-control"
                          placeholder="username"
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CustomInput
                          type="email"
                          title="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="hello@example.com"
                        />
                        {errors.email && (
                          <div style={{ color: "red" }}>{errors.email}</div>
                        )}
                      </div>
                      <div style={{position: 'relative'}} className="form-group mb-3">
                        <CustomInput
                          title="Password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <div style={{ color: "red" }}>{errors.password}</div>
                        )}
                        <div
                          role='button'
                          className='position-absolute'
                          style={{
                            position: 'absolute',
                            top: '33px',
                            right: '16px',
                          }}
                          onClick={() => {
                            setShowPassword(!showPassword)
                          }}
                        >
                          {showPassword ? (
                            <Eye size='16px' />
                          ) : (
                            <EyeSlash size='16px' />
                          )}
                        </div>
                      </div>
                      <div style={{position: 'relative'}}  className="form-group mb-3">
                        <CustomInput
                          title="Confirm Password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.password && (
                          <div style={{ color: "red" }}>{errors.password}</div>
                        )}
                          <div
                          role='button'
                          className='position-absolute'
                          style={{
                            top: '33px',
                            right: '16px',
                            position: 'absolute'
                          }}
                          onClick={() => {
                            setShowConfirmPassword(!showConfirmPassword)
                          }}
                        >
                          {showConfirmPassword ? (
                            <Eye size='16px' />
                          ) : (
                            <EyeSlash size='16px' />
                          )}
                          </div>
                      </div>
                      <div className="text-center mt-4">
                        {props.showLoading ? (
                          <CustomButton
                            type="submit"
                            disabled
                            style={{ width: "100%" }}
                          >
                            Loading...
                          </CustomButton>
                        ) : (
                          <CustomButton type="submit" style={{ width: "100%" }}>
                            Sign me up
                          </CustomButton>
                        )}
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  successMessage: state.auth.successMessage,
  showLoading: state.auth.showLoading,
  auth: state.auth.auth,
});

const mapDispatchToProps = (dispatch) => ({
  loadingToggleAction: (value) => dispatch(loadingToggleAction(value)),
  signupAction: (data, history) => dispatch(signupAction(data, history)),
  logout: (history) => dispatch(logout(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
