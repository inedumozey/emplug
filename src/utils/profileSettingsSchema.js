import * as Yup from 'yup';

export const ProfileSettingsSchema = Yup.object().shape({
    firstName: Yup.string()
    .required('Required'),
    lastName: Yup.string()
    .required('Required'),
    email: Yup.string()
    .required('Required'),
    phone: Yup.string()
    .required('Required'),
    gender: Yup.string()
    .required('Required'),
    DOB: Yup.date()
    .required('Required'),
    nationality: Yup.string()
    .required('Required'),
    country: Yup.string()
    .required('Required'),
    stateOfOrigin: Yup.string()
    .required('Required'),
    logOfOrigin: Yup.string(),
    stateOfResidence: Yup.string()
    .required('Required'),
    lgaOfResidence: Yup.string()
    .required('Required')
})

export const ProfileSettingsInitialValues = Yup.object().shape({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    DOB: '',
    nationality: '',
    country: '',
    stateOfOrigin: '',
    logOfOrigin: '',
    stateOfResidence: '',
    lgaOfResidence: ''
})