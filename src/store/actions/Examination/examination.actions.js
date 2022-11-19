import ConstantTypes from './examination.constants';

export const updateExaminationQuestions = data => ({
    type: ConstantTypes.GET_EXAMINATION_QUESTIONS,
    payload: data
})

export const editSingleQuestion = question => ({
    type: ConstantTypes.EDIT_SINGLE_QUESTION,
    payload: question
})