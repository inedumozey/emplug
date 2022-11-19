import BaseContainer from '../BaseContainer/base-container'
import CustomInput from '../CustomInput/custom-input'
import CustomSelect from '../CustomSelect/Custom-select'

function FormFactory(props) {
  if (
    props.name.toLowerCase() === 'fullname'.toLowerCase() ||
    props.name.toLowerCase() === 'Email'.toLowerCase() ||
    props.name.toLowerCase() === 'Address'.toLowerCase() ||
    props.name.toLowerCase() === 'Phone'.toLowerCase() ||
    props.name.toLowerCase() === 'File'.toLowerCase() ||
    props.name.toLowerCase() === 'DOB'.toLowerCase() ||
    props.name.toLowerCase() === 'BVN'.toLowerCase() ||
    props.name.toLowerCase() === 'DATE PICKER'.toLowerCase() ||
    props.name.toLowerCase() === 'NIN'.toLowerCase() ||
    props.name.toLowerCase() === 'Passport'.toLowerCase() ||
    props.name.toLowerCase() === 'Date picker'.toLowerCase() ||
    props.name.toLowerCase() === 'NIN'.toLowerCase() ||
    props.name.toLowerCase() === 'Passport'.toLowerCase() ||
    props.name.toLowerCase() === 'Nationality'.toLowerCase() ||
    props.name.toLowerCase() === 'State of origin'.toLowerCase() ||
    props.name.toLowerCase() === 'Document upload'.toLowerCase() ||
    props.name.toLowerCase() === 'Next of kin'.toLowerCase() ||
    props.name.toLowerCase() === 'Current location'.toLowerCase() ||
    props.name.toLowerCase() === 'Text field'.toLowerCase() ||
    props.name.toLowerCase() === 'Number field'.toLowerCase() ||
    props.name.toLowerCase() === 'Text input field'.toLowerCase() ||
    props.name.toLowerCase() === 'Local Government'.toLowerCase()
  ) {
    return (
      <CustomInput
        title={props.title}
        placeholder={props.placeholder}
        type={props.type}
        required={props.required}
        onChange={props.event}
        name={props.title.replace(/ /g, '_').toLowerCase()}
      />
    )
  }

  if (
    props.name.toLowerCase() === 'Gender'.toLowerCase() ||
    props.name.toLowerCase() === 'Marital status'.toLowerCase()
  ) {
    return (
      <CustomSelect
        title={props.title}
        placeholder={props.placeholder}
        data={props.data.map((item) => item.value)}
      />
    )
  }

  return <></>
}

export default FormFactory
