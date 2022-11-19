import * as Yup from 'yup';


export const PersonalDetailsValidationSchema = Yup.object().shape({
    nationality: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    stateOfOrigin: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    nin: Yup.number('Must be a number')
    .test('len', 'Must be exactly 11 characters', val => val && val.toString().length === 11 )
    .required('Required'),
    lga: Yup.string()
    .required("Required"),
    village: Yup.string()
    .required('Required'),
    gender: Yup.string()
    .required('Required'),
    maritalStatus: Yup.string()
    .required("Required"),
    surname: Yup.string()
    .required("Required"),
    firstName: Yup.string()
    .required("Required"),
    dob: Yup.date()
    .test("yearOfBirth", "Valid year required", value => {
      const currentYear = new Date().getFullYear();
      const inputValue = new Date(value).getFullYear()
      const isAdult = currentYear - 16;
      if (isAdult > inputValue) {
        return true;
      }
      return false;
    })
    .required("Required"),
    phone: Yup.number()
    .required("Required"),
    email: Yup.string().email()
    .required('Required'),
    religion: Yup.string()
    .required('Required'),
    hobbies: Yup.string()
    .required('Required'),
    permanentHomeAddress: Yup.string()
    .required('Required'),
    languages: Yup.string()
    .required('Required'),
  });


var regEx = /^\d+$/

export const NextOfKinValidationSchema = Yup.object().shape({
    nextofKinName: Yup.string()
    .test('full-name', 'Must be a full name', val => val && (val.split(" ").length >= 2) && (val.split(" ")[1].length >= 2) )
    .required('Required'),
    nextOfKinPhone: Yup.string('Must be a number')
    .test('len', 'Must be a number', val => val && val.match(regEx))
    .test('len', 'Must be exactly 11 characters', val => val && val.toString().length === 11 )
    .required('Required'),
    relationship: Yup.string().required('Required'),
    nextOfkinaddress: Yup.string().required('Required')
})

export const TestLocatoinValidationSchema = Yup.object().shape({
  attitudeTestState: Yup.string().required('Required'),
})

