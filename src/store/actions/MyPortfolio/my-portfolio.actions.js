import ConstantTypes from './my-portfolio.ContantTypes'
import { 
  createProfessionalProfile, 
  getProfessionalProfile 
} from '../../../services/MyPortfolio'

export const getProProfile = (id, token) => async (dispatch) => {
  dispatch({
    type: ConstantTypes.GET_PROFESSIONAL_PROFILE_START,
  })

  try {
    // console.log(`Are we getting the correct ${id} and ${token}`);
    const response = await getProfessionalProfile(id, token)
    dispatch({
      type: ConstantTypes.GET_PROFESSIONAL_PROFILE_SUCCESS,
      payload: response.data.data,
    })
    return;
  } catch (error) {
    // console.log(error.message)
    dispatch({
      type: ConstantTypes.GET_PROFESSIONAL_PROFILE_FAILED,
      payload: error.message,
    })
    return
  }
}

export const updateAboutSection = (data) => ({
  type: ConstantTypes.UPDATE_ABOUT_SECTION,
  payload: data,
})

export const updateProfessionSection = (data) => ({
  type: ConstantTypes.UPDATE_PROFESSION_SECTION,
  payload: data,
})

export const addNewProject = (data) => ({
  type: ConstantTypes.ADD_PROJECT,
  payload: data,
})

export const addNewEducation = (data) => ({
  type: ConstantTypes.ADD_EDUCATION,
  payload: data,
})

export const addNewWorkHistory = (data) => ({
  type: ConstantTypes.ADD_WORK_HISTORY,
  payload: data,
})

export const addNewCertification = (data) => ({
  type: ConstantTypes.ADD_CERTIFICATION,
  payload: data,
})

export const addNewSkill = (data) => ({
  type: ConstantTypes.ADD_SKILL,
  payload: data,
})

export const updateProProfile = (data) => ({
  type: ConstantTypes.LOAD_PROFESSIONAL_PROFILE,
  payload: data,
})


export const clearMyPortfolio = () => ({
  type: ConstantTypes.CLEAR_MY_PORTFOLIO
})

export const updateProfessionalProfile = data => ({
  type: ConstantTypes.UPDATE_PROFESSIONAL_PROFILE,
  payload: data
});


export const httpUpdateProfessionalProfile = (data, userId, token) => async (dispatch) => {
  dispatch({ type: ConstantTypes.UPDATE_PROFESSIONAL_PROFILE_START });

  try {
    const response = await createProfessionalProfile(data, userId, token);
   
    dispatch({
      type: ConstantTypes.UPDATE_PROFESSIONAL_PROFILE_SUCCESS,
      payload: response.data.data
    });

    if (response.status === 200) {
      return dispatch(getProProfile(userId, token));
    }
  } catch (error) {
    dispatch({
      type: ConstantTypes.UPDATE_PROFESSIONAL_PROFILE_FAIL,
      payload: error.response.message
    })
  }
}

export const fieldToEdit = (data) => ({
  type: ConstantTypes.FIELD_UPDATE,
  payload: data
});
