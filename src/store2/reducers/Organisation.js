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
} from '../actions/Organisation/OrganisationConstantTypes'

const INITIAL_STATE = {
  get_organisation_list: null,
  get_organisation_list_loading: false,

  add_organisation: null,
  add_organisation_loading: false,

  get_single_organisation: [],
  get_single_organisation_loading: false,

  edit_organisation: null,
  edit_organisation_loading: false,

  delete_organisation: null,
  delete_organisation_loading: false,

  selected_organisation: null
}

const organisationReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_ORGANISTION_LIST:
      return { ...state, error: null, get_organisation_list_loading: true }
    case GET_ORGANISTION_LIST_SUCCESS:
      return {
        ...state,
        get_organisation_list_loading: false,
        get_organisation_list: payload,
      }
    case GET_ORGANISTION_LIST_FAILED:
      return { ...state, error: payload, get_organisation_list_loading: false }

    case GET_SINGLE_ORGANISATION:
      return { ...state, error: null, get_single_organisation_loading: true }
    
    case GET_SINGLE_ORGANISATION_SUCCESS:
      return {
        ...state,
        get_single_organisation_loading: false,
        get_single_organisation: payload,
      }
    case GET_SINGLE_ORGANISATION_FAILED:
      return {
        ...state,
        error: payload,
        get_single_organisation_loading: false,
      }

    case ADD_ORGANISATION:
      return { ...state, error: null, add_organisation_loading: true }
    case ADD_ORGANISATION_SUCCESS:
      return {
        ...state,
        add_organisation_loading: false,
        add_organisation: payload,
        get_single_organisation: payload
      }
    case ADD_ORGANISATION_FAILED:
      return { ...state, error: payload, add_organisation_loading: false }

    case EDIT_ORGANISATION:
      return { ...state, error: null, edit_organisation_loading: true }
    case EDIT_ORGANISATION_SUCCESS:
      return {
        ...state,
        edit_organisation_loading: false,
        edit_organisation: payload,
      }
    case EDIT_ORGANISATION_FAILED:
      return {
        ...state,
        error: payload,
        edit_organisation_loading: false,
      }

    case DELETE_ORGANISATION:
      return { ...state, error: null, delete_organisation_loading: true }
    case DELETE_ORGANISATION_SUCCESS:
      return {
        ...state,
        delete_organisation_loading: false,
        delete_organisation: payload,
      }
    case DELETE_ORGANISATION_FAILED:
      return {
        ...state,
        error: payload,
        delete_organisation_loading: false,
      }

    case SELECTED_ORGANISATION:
      return {
        ...state,
        selected_organisation: payload
      }

    case CLEAR_ORGANISATION:
      return {
        ...state,
        INITIAL_STATE
      }

    default:
      return { ...state }
  }
}

export default organisationReducer
