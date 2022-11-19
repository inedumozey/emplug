import ConstantTypes from '../actions/MyPortfolio/my-portfolio.ContantTypes';


const INITIAL_STATE = {
	briefDescriptionOfSelf: "",
	profession: "",
	industryOfInterest: "",
	highestLevelOfEducation: "",
	skills: [],
	workHistory: [],
	projects: [],
	educationalQualifications: [],
	certifications: []
}

const myPortfolioReducer = (state = INITIAL_STATE, action = {}) => {

	if (action.type === ConstantTypes.UPDATE_ABOUT_SECTION) {
		return {
			...state,
			briefDescriptionOfSelf: action.payload,
		}
	}


	if (action.type === ConstantTypes.UPDATE_PROFESSION_SECTION) {
		return {
			...state,
			profession: action.payload,
		}
	}

	if (
		action.type === ConstantTypes.GET_PROFESSIONAL_PROFILE_START ||
		action.type === ConstantTypes.UPDATE_PROFESSIONAL_PROFILE_START
		) {
		return {
			...state,
			loading: true
		}
	}

	if (
		action.type === ConstantTypes.GET_PROFESSIONAL_PROFILE_SUCCESS 
		// ||
		// action.type === ConstantTypes.UPDATE_PROFESSIONAL_PROFILE_SUCCESS 
		) {
		return {
			...state,
			loading: false,
			...action.payload
		}
	}

	if (
		action.type === ConstantTypes.GET_PROFESSIONAL_PROFILE_FAILED ||
		action.type === ConstantTypes.UPDATE_PROFESSIONAL_PROFILE_FAIL
		) {
		return {
			...state,
			loading: false,
			error: action.payload
		}
	}



	if (action.type === ConstantTypes.ADD_PROJECT) {
		return {
			...state,
			projects: [...state.projects, action.payload]
		}
	}

	if (action.type === ConstantTypes.ADD_EDUCATION) {
		return {
			...state,
			educationalQualifications: [...state.educationalQualifications, action.payload]
		}
	}

	if (action.type === ConstantTypes.ADD_WORK_HISTORY) {
		return {
			...state,
			workHistory: [...state.workHistory, action.payload]
		}
	}

	if (action.type === ConstantTypes.ADD_CERTIFICATION) {
		return {
			...state,
			certifications: [...state.certifications, action.payload]
		}
	}

	if (action.type === ConstantTypes.ADD_SKILL) {
		return {
			...state,
			skills: action.payload
		}
	}

	if (action.type === ConstantTypes.LOAD_PROFESSIONAL_PROFILE) {
		return {
			...state,
			...action.payload
		}
	}
	if (action.type === ConstantTypes.CLEAR_MY_PORTFOLIO) {
		return {
			...state,
			briefDescriptionOfSelf: "",
			profession: "",
			industryOfInterest: "",
			highestLevelOfEducation: "",
			skills: [],
			workHistory: [],
			projects: [],
			educationalQualifications: [],
			certifications: [],
			user: "",
			_id: ""
		}
	}
	if (action.type === ConstantTypes.UPDATE_PROFESSIONAL_PROFILE) {
		return {
			...state,
			...action.payload
		}
	}

	if (action.type === ConstantTypes.FIELD_UPDATE) {
		return {
			...state,
			edit: action.payload
		}
	}

	return state;
}


export default myPortfolioReducer;