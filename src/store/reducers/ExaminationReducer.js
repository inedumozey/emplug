import ConstantTypes from '../actions/Examination/examination.constants'

const INITIAL_STATE = {
    examId: '',
    questions: [],
}

const { GET_EXAMINATION_QUESTIONS, EDIT_SINGLE_QUESTION } = ConstantTypes

const examinationReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_EXAMINATION_QUESTIONS:
            return {...state, questions: payload}
        case EDIT_SINGLE_QUESTION:
            return {...state, qeustions: payload }
            // Update questions array in the form and send to state
        default: 
        return { ...state }
    }
}

export default examinationReducer