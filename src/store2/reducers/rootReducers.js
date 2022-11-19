import { combineReducers } from 'redux'
import todoReducers from './Reducers'
import myPortfolioReducer from './MyPortfolio'
import { AuthReducer } from './AuthReducer'
import jobPostReducer from './JobPosting'
import organisationReducer from './Organisation'
import pipelineReducer from './PipelineManager'
import notificationsReducer from './Notifications'

const rootReducers = combineReducers({
  auth: AuthReducer,
  myPortfolio: myPortfolioReducer,
  jobPosting: jobPostReducer,
  organisation: organisationReducer,
  pipeline: pipelineReducer,
  notifications: notificationsReducer,
})

export default rootReducers
