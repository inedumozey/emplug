import React,{useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import {
    loadingToggleAction,
    signupAction,
    logout
} from '../../store/actions/auth/AuthActions';
// image
import logo from "../../images/logo/logo.svg";
import CustomButton from "../components/CustomButton/custom-button";
import CustomInput from "../components/CustomInput/custom-input";
import { verify } from "../../services/AuthService";

function VerifyAccount(props) {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
		const history = useHistory();
    const [loading, setLoading] = useState(false);

    

    async function onVerify(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (token === '') {
          errorObj.token = 'Token is required';
          error = true;
        }
        setErrors(errorObj);
        
        if (error) return;
        
        setLoading(true)
        if (token) {
          try {
            const response = await verify({token});
            props.logout();
            setLoading(false);
            if (response.status === 200) {
            	history.push('/login');
            }
          } catch (error) {
            setErrors({message: error.response.data.message})
            setLoading(false);
          }
        }
    }

    useEffect(() => {

    }, [])
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
                      <Link to="/page-register">
                        <img src={logo} alt="..." />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Account Verification</h4>
										{errors.message && <div style={{color: 'red'}}>{errors.message}</div>}
										<p>Check your email and enter token.</p>
              <form onSubmit={onVerify}>
                
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
                <p style={{cursor: 'pointer', color: '#56b609'}}>Resend token</p>
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
  );
};

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  successMessage: state.auth.successMessage,
  showLoading: state.auth.showLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadingToggleAction: value => dispatch(loadingToggleAction(value)),
  signupAction: (data, history) => dispatch(signupAction(data, history)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);

