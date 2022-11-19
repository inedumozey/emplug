import ConstantTypes from '../actions/ApplicationForm/application-form.constants'

const INITIAL_STATE = {
    step: "personal",
    attitudeTestState: 'Federal Capital Territory'
}

const applicationFormReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case ConstantTypes.GET_APPLICATION_FORM_DATA:
            return{
                ...state,
                ...action.payload
            }
        
        case ConstantTypes.RESET_FORM_DATA: 
            return {
                ...state,
                step: {}
            }
        default:
           return state
    }
}

export default applicationFormReducer