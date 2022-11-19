import * as Yup from 'yup';

export const physicalScreeningSchema = Yup.object().shape({
    height: Yup.string()
    .required('Required'),
    chest: Yup.string()
    .required('Required'),
    flatFeet: Yup.string()
    .required('Required'),
    knockedKnees: Yup.string()
    .required('Required'),
    bowlegsKlegs: Yup.string()
    .required('Required'),
    bentArms: Yup.string()
    .required('Required'),
    bentKnees: Yup.string()
    .required('Required'),
    deformedHands: Yup.string()
    .required('Required'),
    tatoo: Yup.string()
    .required('Required'),
    defectiveEyeSight: Yup.string()
    .required('Required'),
    grossMalformationOfTeeth: Yup.string()
    .required('Required'),
    impedementInSpeech: Yup.string()
    .required('Required'),
    amputationOfAnyPartOfTheBody: Yup.string()
    .required("Required"),
    FSLC: Yup.string()
    .required('Required'),
    certificateType: Yup.string()
    .required('Required'),
    alterationOnCertificate: Yup.string()
    .required('Required'),
    indieneCertificate: Yup.string()
    .required('Required'),
    statementOfResult: Yup.string()
    .required('Required')
})


