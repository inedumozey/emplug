const INITIAL_STATE = {
  medicalApplicantDetails: null
}

const medicalReducer = (state = INITIAL_STATE, action = {}) => {
  console.log(action)
  if (action.type === "SAVE_APPLICANT_DETAILS_START") {
    return {
      ...state,
      medicalApplicantDetails: action.payload
    }
  }
  return state
}

export default medicalReducer
