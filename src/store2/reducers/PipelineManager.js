import ConstantTypes from '../actions/PipelineManager/pipeline-manager.constants'

const INITIAL_STATE = {
  SELECTED_JOB: null,
  PIPELINE: [],
  FORM: null
}

function pipelineReducer (state = INITIAL_STATE, action = {}) {
  if (action.type === ConstantTypes.SELECT_PIPELINE) {
    return {
      ...state,
      SELECTED_JOB: action.payload
    }
  }

  if (action.type === ConstantTypes.ADD_PIPELINE) {
    return {
      ...state,
      // PIPELINE: [...state.PIPELINE, action.payload]
      PIPELINE: action.payload
    }
  }

  if (action.type === ConstantTypes.REMOVE_PIPELINE) {
    return {
      ...state,
      PIPELINE: state.PIPELINE.filter(item => item !== action.payload._id)
    }
  }

  if (action.type === ConstantTypes.UPDATE_PIPELINE_ORDER) {
    return {
      ...state,
      PIPELINE: action.payload
    }
  }

  if (
    action.type === ConstantTypes.GET_JOB_PIPELINE_START ||
    action.type === ConstantTypes.POST_JOB_PIPELINE_START ||
    action.type === ConstantTypes.GET_SINGLE_FORM_START ||
    action.type === ConstantTypes.FETCH_SINGLE_PIPELINE_START
  ) {
    return {
      ...state,
      loading: true
    }
  }

  if (
    action.type === ConstantTypes.POST_JOB_PIPELINE_SUCCESS ||
    action.type === ConstantTypes.GET_JOB_PIPELINE_SUCCESS
  ) {
    return {
      ...state,
      loading: false,
      PIPELINE: action.payload
    }
  }

  if (action.type === ConstantTypes.GET_SINGLE_FORM_SUCCESS) {
    return {
      ...state,
      loading: false,
      FORM: action.payload
    }
  }

  if (
    action.type === ConstantTypes.POST_JOB_PIPELINE_FAILED ||
    action.type === ConstantTypes.GET_JOB_PIPELINE_FAILED ||
    action.type === ConstantTypes.GET_SINGLE_FORM_FAILED ||
    action.type === ConstantTypes.FETCH_SINGLEPIPELINE_FAILED
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload
    }
  }

  if (action.type === ConstantTypes.FETCH_SINGLE_SUCCESS) {
    return {
      ...state,
      loading: false,
      pipelineDetails: action.payload.data
    }
  }

  if (action.type === ConstantTypes.REMOVE_FORM) {
    return {
      ...state,
      FORM: null
    }
  }

  return state
}

export default pipelineReducer
