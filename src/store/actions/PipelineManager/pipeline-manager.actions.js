import {
  getJobPipeline,
  postJobPipeline,
  updateJobPipeline,
  getSingleForm,
  updateSingleForm,
  singlePipelineGet
} from '../../../services/PipelineManager'
import ConstantTypes from './pipeline-manager.constants'

export const removeForm = () => ({
  type: ConstantTypes.REMOVE_FORM
})

export const addPipeline = data => ({
  type: ConstantTypes.ADD_PIPELINE,
  payload: data
})

export const removePipeline = data => ({
  type: ConstantTypes.REMOVE_PIPELINE,
  payload: data
})

export const pipelineOrder = pipelines => ({
  type: ConstantTypes.UPDATE_PIPELINE_ORDER,
  payload: pipelines
})

export const getSinglePipeline = (id, token) => async dispatch => {
  dispatch({ type: ConstantTypes.GET_JOB_PIPELINE_START })

  try {
    const response = await getJobPipeline(id, token)
    if (response.status === 200 && response.data.data.length > 0) {
      dispatch({
        type: ConstantTypes.GET_JOB_PIPELINE_SUCCESS,
        payload: response.data.data[0].pipelineSections
      })
    }
    if (response.status === 200 && !response.data.data.length) {
      dispatch({
        type: ConstantTypes.GET_JOB_PIPELINE_SUCCESS,
        payload: response.data.data
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: ConstantTypes.GET_JOB_PIPELINE_FAILED,
      payload: error.response
    })
  }
}

export const createJobPipeline = (data, token) => async dispatch => {
  dispatch({ type: ConstantTypes.POST_JOB_PIPELINE_START })

  try {
    const response = await postJobPipeline(data, token)
    if (
      response.status === 201 &&
      response.data.data.pipelineSections.length > 0
    ) {
      dispatch({
        type: ConstantTypes.POST_JOB_PIPELINE_SUCCESS,
        payload: response.data.data.pipelineSections
      })
    }
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: ConstantTypes.POST_JOB_PIPELINE_FAILED,
      payload: error.response
    })
  }
}

export const updatePipeline = (data, id, token) => async dispatch => {
  dispatch({ type: ConstantTypes.POST_JOB_PIPELINE_START })

  console.log(data)

  try {
    const response = await updateJobPipeline(data, id, token)
    if (
      response.status === 200 &&
      response.data.data.pipelineSections.length > 0
    ) {
      dispatch(getSinglePipeline(id, token))
    }
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: ConstantTypes.POST_JOB_PIPELINE_FAILED,
      payload: error.response
    })
  }
}

export const getOneForm = (id, token) => async dispatch => {
  dispatch({ type: ConstantTypes.GET_SINGLE_FORM_START })

  try {
    const response = await getSingleForm(id, token)
    if (response.status === 200 && response.data.data._id) {
      dispatch({
        type: ConstantTypes.GET_SINGLE_FORM_SUCCESS,
        payload: response.data.data
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: ConstantTypes.GET_SINGLE_FORM_FAILED,
      payload: error.response
    })
  }
}

export const updateOneForm = (data, id, token) => async dispatch => {
  dispatch({ type: ConstantTypes.GET_SINGLE_FORM_START })

  try {
    const response = await updateSingleForm(data, id, token)
    if (response.status === 200) {
      dispatch({
        type: ConstantTypes.GET_SINGLE_FORM_SUCCESS,
        payload: null
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: ConstantTypes.GET_SINGLE_FORM_FAILED,
      payload: error.response
    })
  }
}

export const fetchSinglePipeline = async () => {
  dispatch({ type: ConstantTypes.FETCH_SINGLE_PIPELINE_START })

  try {
    const response = await singlePipelineGet(id, token)
    console.log(response)
    if (response.status === 200) {
      dispatch({
        type: ConstantTypes.FETCH_SINGLE_PIPELINE_SUCCESS,
        payload: response.data.data
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: ConstantTypes.FETCH_SINGLE_PIPELINE_FAILED,
      payload: error.response
    })
  }
}


export const displayApplicantInfo = data => ({
  type: ConstantTypes.DISPLAY_APPLICANT_DETAILS,
  payload: data
})
