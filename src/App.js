import { lazy, Suspense, useEffect } from 'react'

import 'react-phone-input-2/lib/style.css'

import pageRoutes from './routes'

/// Components
import Index from './jsx'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
// action
import { isAuthenticated } from './store/selectors/AuthSelectors'
/// Style
import './vendor/bootstrap-select/dist/css/bootstrap-select.min.css'
import './css/style.css'
import VerifyAccount from './jsx/pages/VerifyAccount'
import ResetPassword from './jsx/pages/ResetPassword/reset-password'

const SignUp = lazy(() => import('./jsx/pages/Registration'))
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'))
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 500)
  })
})

function App(props) {
  let routes = (
    <>
      <Route exact path={pageRoutes.login} component={Login} />
      <Route exact path={pageRoutes.pageRegister} component={SignUp} />
      <Route exact path={pageRoutes.verify} component={VerifyAccount} />
      <Route exact path={pageRoutes.forgotPassword}component={ForgotPassword}/>
      <Route exact path={pageRoutes.resetPassword} component={ResetPassword} />
    </>
  )

  return (
    <>
      <Switch>
        <Suspense
          fallback={
            <div id='preloader'>
              <div className='sk-three-bounce'>
                <div className='sk-child sk-bounce1'></div>
                <div className='sk-child sk-bounce2'></div>
                <div className='sk-child sk-bounce3'></div>
              </div>
            </div>
          }
        >

          {routes}
         <Index />

        </Suspense>
      </Switch>
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  isAuthenticated: isAuthenticated(state),
})

export default withRouter(connect(mapStateToProps)(App))
