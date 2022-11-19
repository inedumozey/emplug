import ConstantTypes from './application-form.constants';


export const updateApplicationData = (data) => ({
    type: ConstantTypes.GET_APPLICATION_FORM_DATA,
    payload: data
})


export const resetForm = () => ({
    type: ConstantTypes.RESET_FORM_DATA
})