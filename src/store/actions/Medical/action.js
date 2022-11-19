import constant from './constant'

export const saveApplicantDetails = data => ({
  type: constant.SAVE_APPLICANT_DETAILS_START,
  payload: data
})
