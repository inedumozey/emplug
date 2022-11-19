import { 
	getOrganisationJobPosting, 
	getAllJobPosting, 
	createJobPosting,
	deleteJobPosting,
	updateJob
} from '../../../services/JobPosting';
import ConstantTypes from './job-posting.constants';


export const updateJobPosting = job => ({
	type: ConstantTypes.UPDATE_JOB_POSTING_ID,
	payload: job
});


export const getOrganisationPosting = (id, token) => async (dispatch) => {
	dispatch({ type: ConstantTypes.GET_ORGANISATION_JOB_POSTING_START });

	try {
		const response = await getOrganisationJobPosting(id, token);
		dispatch({
			type: ConstantTypes.GET_ORGANISATION_JOB_POSTING_SUCCESS,
			payload: response.data.data
		})
	} catch (error) {
		dispatch({
			type: ConstantTypes.GET_ORGANISATION_JOB_POSTING_FAILED,
			payload: error
		})
	}

}


export const createAJob = ({ data, userId, token, setCode}) => async dispatch => {
	dispatch({ type: ConstantTypes.CREATE_JOB_POSTING_START });

	try {
		const response = await createJobPosting(data, userId, token);
		if (response.status === 201) {
			setCode(response.status);
			dispatch(getAllJobs(token))
			dispatch(updateJobPosting(response.data.data))
		}
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: ConstantTypes.CREATE_JOB_POSTING_FAILED,
			payload: error.response.data
		})
	}
}

export const updateAJob = ({ data, jobId, token, setCode}) => async dispatch => {
	dispatch({ type: ConstantTypes.CREATE_JOB_POSTING_START });
	try {
		const response = await updateJob(data, jobId, token);
		if (response.status === 200) {
			setCode(response.status);
			dispatch(getAllJobs(token))
			dispatch(updateJobPosting(response.data.data))
		}
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: ConstantTypes.CREATE_JOB_POSTING_FAILED,
			payload: error.response.data
		})
	}
}


export const deleteJob = (id, token) => async dispatch => {
	dispatch({ type: ConstantTypes.DELETE_JOB_POSTING_START });

	try {
		const response = await deleteJobPosting(id, token);
		if (response.status === 200) {
			dispatch(getAllJobs(token))
			dispatch({
				type: ConstantTypes.DELETE_JOB_POSTING_SUCCESS,
				payload: response.data.data
			})
		}
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: ConstantTypes.DELETE_JOB_POSTING_FAILED,
			payload: error.response
		})
	}
}


export const getAllJobs = token => async dispatch => {
	dispatch({ type: ConstantTypes.GET_ALL_JOBS_START });

	try {
		const response = await getAllJobPosting(token);
		dispatch({
			type: ConstantTypes.GET_ALL_JOBS_SUCCESS,
			payload: response.data.data
		})
	} catch (error) {
		dispatch({
			type: ConstantTypes.GET_ALL_JOBS_FAILED,
			payload: error
		})
	}
}

export const clearJobPosting = () => ({
	type: ConstantTypes.CLEAR_JOB_POSTING
})

export const jobView = data => ({
	type: ConstantTypes.JOB_VIEW,
	payload: data
})