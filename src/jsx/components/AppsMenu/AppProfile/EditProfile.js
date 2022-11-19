import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import CustomButton from '../../CustomButton/custom-button'
import CustomInput from '../../CustomInput/custom-input'
import CustomSelect from '../../CustomSelect/Custom-select'
import Nav from '../../../layouts/nav/CustomNav'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'
import pageRoutes from '../../../../routes'
import CreatableSelect from 'react-select/creatable';

import { Formik } from 'formik'

import {
  User,
  IdentificationCard,
  EnvelopeSimple,
  DeviceMobile,
  UserGear,
  GenderIntersex
} from 'phosphor-react'
import NaijaStates from 'naija-state-local-government'

import {
  updateConfirmedAction
} from '../../../../store/actions/auth/AuthActions'
import axios from 'axios'
import Select from 'react-select'
import { ProfileSettingsInitialValues, ProfileSettingsSchema } from '../../../../utils/profileSettingsSchema'

const EditProfile = props => {
  const [middleName, setMiddleName] = useState('')
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [loadValue, setLoadValue] = useState(0)
  const [states, setState] = useState([])
  const [residentState, setResidentState] = useState([])
  const [localGovernment, setLocalGovernment] = useState('')
  const [residentLocalGovernment, setResidentLocalGovernment] = useState('')
  const [selectedState, setSelectedState] = useState(null)
  const [selectedResidentState, setSelectedResidentState] = useState(null)
  const [skills, setSkills] = useState([])
  const [userSkills, setUserSkills] = useState([])
  const [address, setAddress] = useState('')
  const [DOB, setDOB] = useState('')
  // console.log(props)

  const history = useHistory()

  useEffect(() => {
    const arr = []
    /* eslint array-callback-return:0 */
    NaijaStates.all().map(el => {
      arr.push({ label: el.state, value: el.state })
    })
    // console.log(arr)
    setState(arr)
    setResidentState(arr)
  }, [])

  useEffect(() => {
    const arr = []
    if (selectedState) {
      // console.log(selectedState)
      // console.log(NaijaStates.lgas(selectedState).lgas)
      /* eslint array-callback-return:0 */
      NaijaStates.lgas(selectedState).lgas.map(el => {
        arr.push({ label: el, value: el })
      })
    }
    setLocalGovernment(arr)
  }, [selectedState])

  useEffect(() => {
    const arr = []

    if (selectedResidentState) {
      // console.log(selectedResidentState)
      // console.log(NaijaStates.lgas(selectedResidentState).lgas)
      /* eslint array-callback-return:0 */
      NaijaStates.lgas(selectedResidentState).lgas.map(el => {
        arr.push({ label: el, value: el })
      })
    }
    // console.log(arr)
    setResidentLocalGovernment(arr)
  }, [selectedResidentState])

  
  const fetchSkills = async () => {
    const arr = []
    const response = await axios.get(
      `${
        process.env.NODE_ENV === 'development'
          ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
          : process.env.REACT_APP_EMPLOYER_CENTER_API
      }/skill/list`,
      {
        headers: {
          authorization: `Bearer ${props.auth.token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    // console.log('------------------------------------>>>>>>>>>>',response)

    response.data.data.map(el => {
      arr.push({ label: el.name, value: el.name })
    })
    // console.log('------------------------------------',arr)

    setSkills(arr)
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  async function updatepersonalPro (event) {
    event.preventDefault()

    try {
      // const auth = { ...props.auth.user }
      setLoading(true)

      const user = {
        // middleName:
        //   middleName.length > 0 ? middleName : props.auth.user.middleName,
        gender: gender.length > 0 ? gender : props.auth.user.gender,
        phone: phone.length > 0 ? phone : props.auth.user.phone,
        profilePicture:
          profilePicture.length > 0
            ? profilePicture
            : props.auth.user.profilePicture,
        country: 'Nigeria',
        stateOfOrigin: selectedState
          ? selectedState
          : props.auth.user.stateOfOrigin,
        stateOfResident: selectedResidentState
          ? selectedResidentState
          : props.auth.user.stateOfResident,
        lgaOfOrigin:
          localGovernment.length > 0
            ? localGovernment
            : props.auth.user.lgaOfOrigin,
        lgaOfResident:
          residentLocalGovernment.length > 0
            ? residentLocalGovernment
            : props.auth.user.lgaOfResident,
        address: address.length > 0 ? address : props.auth.user.address,
        DOB: DOB.length > 0 ? DOB : props.auth.user.DOB,
        skills:userSkills.length>0?userSkills:props.auth.user.skills
      }

      const response = await axios.put(
        `${
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
            : process.env.REACT_APP_EMPLOYER_CENTER_API
        }/user/update-user?userId=${props.auth.user._id}`,
        user,
        {
          headers: {
            authorization: `Bearer ${props.auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      // console.log('--------------------------->>>>>>>', response.data.data)
      props.updateConfirmedAction(response.data.data)
      setLoading(false)

      swal('Success', response.data.message, 'success')
      history.push(pageRoutes.profile)
    } catch (err) {
      // console.log(err)
      // console.log(err.response)
      // console.log(err.message)
      setLoading(false)
    }

    // props.updatePersonalProfile(auth.auth)
  }

  async function uploadToBB() {
    const response = await axios.get(
      'https://employer-center-api.herokuapp.com/api/v1/file/signed-url/?file_name=burby123.JPG&file_type=JPG',{
        headers: {
            authorization: `Bearer ${props.auth.token}`,
            'Content-type': 'application/json',
        },
    })
    const output = {
      ...response.data.data
    }

    return output;
    
  }

  async function handleUpload (imageData, setFunc) {
    const data = new FormData()
    const cloudName = 'daqj8bnrb'

    data.append('file', imageData)
    data.append('upload_preset', 'my_default')


    const value = await uploadToBB();
    

    return axios
      .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, data, {
        onUploadProgress: ProgressEvent => {
          setLoadValue((ProgressEvent.loaded / ProgressEvent.total) * 100)
        }
      })
      .then(async res => {
        setFunc(res.data.secure_url)
        setLoadValue(0)
      })
      .catch()
  }

  function uploadImage (data) {
    handleUpload(data, setProfilePicture)
  }

  return props.auth.user ? (
    <>
      <Nav />
      <div className='px-5'>
        <Formik 
          initialValues={ProfileSettingsInitialValues}
          validationSchema={ProfileSettingsSchema}
          onSubmit={updatepersonalPro}
        >
       {(({errors, touched, handleChange, values, handleSubmit}) => 
       <form style={{ padding: '2rem' }} onSubmit={updatepersonalPro}>
          <div
            style={{
              width: '100%',
              marginBottom: '2rem',
              borderBottom: '1px solid #eee',
              paddingBottom: '1rem'
            }}
          >
            <h3 style={{ color: '#7f7f7f' }}>Personal Profile</h3>
          </div>
          <Row>
            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <CustomInput
                  title='First Name'
                  
                  type='text'
                  defaultValue={
                    props.auth.user && props.auth.user.firstName
                      ? props.auth.user.firstName
                      : ''
                  }
                  placeholder={props.auth.user && props.auth.user.firstName}
                  disabled
                />
                 {/* <label className="mb-1" style={{ color: '#7f7f7f'}}><strong>First Name</strong></label>
                  <input
                    className="form-control"
                  /> */}
              </div>
            </Col>
            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <CustomInput
                  title='Last Name'
                  type='text'
                  defaultValue={
                    props.auth.user && props.auth.user.lastName
                      ? props.auth.user.lastName
                      : ''
                  }
                  placeholder={props.auth.user && props.auth.user.lastName}
                  disabled
                />
              </div>
            </Col>

            {/* <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <CustomInput
                  title='Middle Name'
                  type='text'
                  defaultValue={
                    props.auth.user && props.auth.user.middleName
                      ? props.auth.user.middleName
                      : ''
                  }
                  placeholder={
                    !props.auth.user.middleName
                      ? 'Enter Middle Name'
                      : props.auth.user.middleName
                  }
                  onChange={e => setMiddleName(e.target.value)}
                />
              </div>
            </Col> */}

            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <CustomInput
                  title='Email'
                  type='email'
                  placeholder={props.auth.user && props.auth.user.email}
                  defaultValue={
                    props.auth.user && props.auth.user.email
                      ? props.auth.user.email
                      : ''
                  }
                  disabled
                />
              </div>
            </Col>

            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <CustomInput
                  title='Phone no.'
                  type='text'
                  defaultValue={
                    props.auth.user && props.auth.user.phone ? props.auth.user.phone : ''
                  }
                  placeholder={
                    !props.auth.user.phone
                      ? 'Enter Phone no.'
                      : props.auth.user.phone
                  }
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </Col>

            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <CustomSelect
                  title='Gender'
                  data={['Female', 'Male', 'Others']}
                  placeholder={
                    !props.auth.user.gender
                      ? 'Select Gender'
                      : props.auth.user.gender
                  }
                  defaultValue={
                    props.auth.user && props.auth.user.gender ? props.auth.user.gender : ''
                  }
                  onChange={e => setGender(e.target.value)}
                />
              </div>
            </Col>

            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <label
                  className='fw-bold'
                  style={{
                    opacity: '0.6'
                  }}
                >
                  Date of Birth
                </label>
                <CustomInput
                  // title='Date of Birth'
                  type='date'
                  defaultValue={
                    props.auth.user && props.auth.user.DOB ? props.auth.user.DOB.split('T')[0] : ''
                  }
                  //   className='bg-white py-2 border-none'
                  //   value={props.auth.user && props.auth.user.fullName}
                  //   placeholder={props.auth.user && props.auth.user.fullName}
                  style={{ width: '100%' }}
                  onChange={e => setDOB(e.target.value)}
                />
              </div>
            </Col>
            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <CustomInput
                  title='Nationality'
                  type='text'
                  value={'Nigerian'}
                  placeholder={props.auth.user && props.auth.user.fullName}
                  disabled
                />
              </div>
            </Col>

            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <CustomInput
                  title='Country'
                  type='text'
                  value={'Nigeria'}
                  placeholder={props.auth.user && props.auth.user.fullName}
                  disabled
                />
              </div>
            </Col>

            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <label
                  className='fw-bold'
                  style={{
                    opacity: '0.6'
                  }}
                >
                  State of Origin
                </label>
                <Select
                  options={states}
                  onChange={(opt, e) => {
                    // values.category = ((opt.name))
                    setSelectedState(opt.value)
                  }}
                  //   title='State of origin'
                  //   type='text'
                  placeholder={'Select State'}
                  defaultValue={[
                    {
                      value:
                        props.auth.user && props.auth.user.stateOfOrigin
                          ? props.auth.user.stateOfOrigin
                          : null,
                      label:
                        props.auth.user && props.auth.user.stateOfOrigin
                          ? props.auth.user.stateOfOrigin
                          : null
                    }
                  ]}
                />
              </div>
            </Col>

            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <label
                  className='fw-bold'
                  style={{
                    opacity: '0.6'
                  }}
                >
                  Local Government of Origin
                </label>
                <Select
                  options={localGovernment}
                  //   title='State of origin'
                  //   type='text'
                  onChange={(opt, e) => {
                    // values.category = ((opt.name))
                    // console.log(opt)
                    setLocalGovernment(opt.value)
                  }}
                  defaultValue={[
                    {
                      value:
                        props.auth.user && props.auth.user.lgaOfOrigin
                          ? props.auth.user.lgaOfOrigin
                          : null,
                      label:
                        props.auth.user && props.auth.user.lgaOfOrigin
                          ? props.auth.user.lgaOfOrigin
                          : null
                    }
                  ]}
                  placeholder={'Local government'}
                />
              </div>
            </Col>

           

            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <label
                  className='fw-bold'
                  style={{
                    opacity: '0.6'
                  }}
                >
                  State of Residence
                </label>
                <Select
                  options={residentState}
                  //   title='State of origin'
                  //   type='text'
                  onChange={(opt, e) => {
                    // values.category = ((opt.name))
                    // console.log(opt)
                    setSelectedResidentState(opt.value)
                  }}
                  defaultValue={[
                    {
                      value:
                        props.auth.user && props.auth.user.stateOfResident
                          ? props.auth.user.stateOfResident
                          : null,
                      label:
                        props.auth.user && props.auth.user.stateOfResident
                          ? props.auth.user.stateOfResident
                          : null
                    }
                  ]}
                  placeholder={'Select State'}
                  disabled
                />
              </div>
            </Col>

            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <label
                  className='fw-bold'
                  style={{
                    opacity: '0.6'
                  }}
                >
                  Local Government of Residence
                </label>
                <Select
                  options={residentLocalGovernment}
                  onChange={(opt, e) => {
                    // values.category = ((opt.name))
                    // console.log(opt)
                    setResidentLocalGovernment(opt.value)
                  }}
                  //   title='State of origin'
                  //   type='text'
                  placeholder={'Local government'}
                  disabled
                  defaultValue={[
                    {
                      value:
                        props.auth.user && props.auth.user.lgaOfResident
                          ? props.auth.user.lgaOfResident
                          : null,
                      label:
                        props.auth.user && props.auth.user.lgaOfResident
                          ? props.auth.user.lgaOfResident
                          : null
                    }
                  ]}
                />
              </div>
            </Col>


             <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <CustomInput
                  title='Residential Address'
                  type='text'
                  //   value={props.auth.user && props.auth.user.fullName}
                  //   placeholder={props.auth.user && props.auth.user.fullName}
                  //   disabled
                  onChange={e => {
                    setAddress(e.target.value)
                  }}
                  defaultValue={
                    props.auth.user && props.auth.user.address
                      ? props.auth.user.address
                      : ''
                  }
                />
              </div>
            </Col>

            <Col sm='12' md='6'>
              <label
                className='fw-bold'
                style={{
                  opacity: '0.6'
                }}
              >
                Skills
              </label>
              <CreatableSelect
                isMulti
                onChange={(e, opt) => {
                  const arr = []
                  const selectedSkill = e.map(el => {
                    arr.push(el.value)
                  })
                  // console.log(arr);
                  setUserSkills(arr)
                }}
                placeholder='select skills...'
                options={skills}                
              />
            </Col>

            <Col sm='12' md='6'>
              <div style={{ width: '100%', marginBottom: '2rem' }}>
                <CustomInput
                  title={`${
                    loadValue
                      ? 'Uploading...' + Math.floor(loadValue) + '%'
                      : 'Update Profile Picture'
                  }`}
                  type='file'
                  onChange={e => uploadImage(e.target.files[0])}
                />
              </div>
            </Col>
          </Row>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingTop: '1rem',
              borderTop: '1px solid #eee'
            }}
          >
            <CustomButton
              disabled={loading}
              type='submit'
              // onClick={updatepersonalPro}
              // onSubmit={updatepersonalPro}
              style={{ width: '20%' }}
            >
              {loading ? ' Saving...' : 'Save'}
            </CustomButton>
          </div>
        </form>
        )}
        </Formik>
      </div>
    </>
  ) : null
}

const mapStateToProps = state => ({
  user: state.auth.auth.user,
  token: state.auth.auth.token,
  auth: state.auth.auth,
  myPortfolio: state.myPortfolio,
  jobPosting: state.jobPosting
})

const mapDispatchToProps = dispatch => ({
  getProProfile: (id, token) => dispatch(getProProfile(id, token)),
  getAllJobs: token => dispatch(getAllJobs(token)),
  updateConfirmedAction: data => dispatch(updateConfirmedAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
