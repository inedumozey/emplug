import ConstantTypes from '../actions/JobPosting/job-posting.constants';


const INITIAL_STATE = {
	job_id: "",
	jobPosting: [],
	allJobs: [],
	job_view: null
}


const jobPostReducer = (state = INITIAL_STATE, action = {}) => {
	if (action.type === ConstantTypes.UPDATE_JOB_POSTING_ID) {
		return {
			...state,
			job_view: action.payload
		}
	}

	if (
		action.type === ConstantTypes.GET_ORGANISATION_JOB_POSTING_START ||
		action.type === ConstantTypes.GET_ALL_JOBS_START ||
		action.type === ConstantTypes.DELETE_JOB_POSTING_START ||
		action.type === ConstantTypes.CREATE_JOB_POSTING_START
		) {
		return {
			...state,
			loading: true
		}
	}

	if (action.type === ConstantTypes.GET_ORGANISATION_JOB_POSTING_SUCCESS) {
		return {
			...state,
			loading: false,
			jobPosting: action.payload,
			error: null
		}
	}

	if (
		action.type === ConstantTypes.GET_ORGANISATION_JOB_POSTING_FAILED ||
		action.type === ConstantTypes.GET_ALL_JOBS_FAILED ||
		action.type === ConstantTypes.CREATE_JOB_POSTING_FAILED
		) {
		return {
			...state,
			loading: false,
			error: action.payload,
			jobPosting: [],
			allJobs: []
		}
	}

	if (action.type === ConstantTypes.GET_ALL_JOBS_SUCCESS) {
		return {
			...state,
			allJobs: action.payload,
			loading: false,
			error: null
		}
	}
	if (action.type === ConstantTypes.CLEAR_JOB_POSTING) {
		return {
			...state,
			job_id: "",
			jobPosting: [],
			allJobs: []
		}
	}
	if (action.type === ConstantTypes.JOB_VIEW) {
		console.log(action.payload)
		return {
			...state,
			job_view: action.payload
		}
	}

	if (
		action.type === ConstantTypes.DELETE_JOB_POSTING_SUCCESS ||
		action.type === ConstantTypes.DELETE_JOB_POSTING_FAILED
		) {
		return {
			...state,
			message: action.payload
		}
	}
	

	return state;
}


export default jobPostReducer;
