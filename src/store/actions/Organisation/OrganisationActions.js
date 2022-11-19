import {
  GET_ORGANISTION_LIST,
  GET_ORGANISTION_LIST_SUCCESS,
  GET_ORGANISTION_LIST_FAILED,
  ADD_ORGANISATION,
  ADD_ORGANISATION_SUCCESS,
  ADD_ORGANISATION_FAILED,
  GET_SINGLE_ORGANISATION,
  GET_SINGLE_ORGANISATION_SUCCESS,
  GET_SINGLE_ORGANISATION_FAILED,
  EDIT_ORGANISATION,
  EDIT_ORGANISATION_SUCCESS,
  EDIT_ORGANISATION_FAILED,
  DELETE_ORGANISATION,
  DELETE_ORGANISATION_SUCCESS,
  DELETE_ORGANISATION_FAILED,
  SELECTED_ORGANISATION,
  CLEAR_ORGANISATION
} from './OrganisationConstantTypes'
import { messageToDisplay } from '../../util'
import {
  getOrganisationList,
  addNewOrganisation,
  removeOrganisation,
  updateOrganisation,
  fetchSingleOrganisation,
} from '../../../services/Organisation'
import routes from '../../../routes'

export const getOrganisations = (token) => async (dispatch) => {
  dispatch({ type: GET_ORGANISTION_LIST })

  try {
    const response = await getOrganisationList(token)
    dispatch({
      type: GET_ORGANISTION_LIST_SUCCESS,
      payload: response.data.data,
    })
  } catch (error) {
    dispatch({
      type: GET_ORGANISTION_LIST_FAILED,
      payload: messageToDisplay(error),
    })
  }
}

export const getSingleOrganisation = (id, token, history) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_ORGANISATION })

  try {
    const response = await fetchSingleOrganisation(id, token)
    if(response.status === 200) {

      dispatch({
        type: GET_SINGLE_ORGANISATION_SUCCESS,
        payload: response.data.data,
      })
      // console.log(response.data.fliter(item => item.organizationName === "Police Service Comission"))
      const org = response.data.data.filter(item => item.organizationName === "Police Service Comission")
      console.log(routes.organisationPage.split(':')[0] + org[0]._id)
      // history.replace(routes.organisationPage.split(':')[0] + org[0]._id)
    }
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ORGANISATION_FAILED,
      payload: messageToDisplay(error),
    })
  }
}

export const addOrganisations = (payload, token) => async (dispatch) => {
  dispatch({ type: ADD_ORGANISATION })

  try {
    const response = await addNewOrganisation(payload, token)
    dispatch({
      type: ADD_ORGANISATION_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: ADD_ORGANISATION_FAILED,
      payload: messageToDisplay(error),
    })
  }
}

export const editOrganisations = (data, id, token) => async (dispatch) => {
  dispatch({ type: EDIT_ORGANISATION })

  try {
    const response = await updateOrganisation(data, id, token)
    dispatch({
      type: EDIT_ORGANISATION_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: EDIT_ORGANISATION_FAILED,
      payload: messageToDisplay(error),
    })
  }
}

export const deleteOrganisation = (id, token) => async (dispatch) => {
  dispatch({ type: DELETE_ORGANISATION })

  try {
    const response = await removeOrganisation(id, token)
    dispatch({
      type: DELETE_ORGANISATION_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_ORGANISATION_FAILED,
      payload: messageToDisplay(error),
    })
  }
}


export const selectedOrganisation = org => ({
  type: SELECTED_ORGANISATION,
  payload: org
})

export const clearOrganisation = () => ({
  type: CLEAR_ORGANISATION
})
