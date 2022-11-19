import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, NavLink, useHistory } from 'react-router-dom'
import Select from 'react-select'
import { X } from 'phosphor-react'
import c1 from '../../../../images/c1.png'
import c2 from '../../../../images/c2.png'
import c3 from '../../../../images/c3.png'

import { Modal, Row, Col } from 'react-bootstrap'
import Toggle from 'react-toggle'
import axios from 'axios'

import { getAllUsers } from '../../../../services/Organisation'
import { createOfficialLetter } from '../../../../services/PipelineManager'

import CustomButton from '../../../components/CustomButton/custom-button'
import AllStatus from '../../../components/Jobick/Applications/AllStatus'
import CandidateStatus from '../../../components/Jobick/Applications/CandidateStatus'
import CustomNav from '../../../layouts/nav/CustomNav'
import CustomInput from '../../../components/CustomInput/custom-input'
import swal from 'sweetalert'
import 'react-toggle/style.css'
import routes from '../../../../routes'

function CreatePipeline (props) {
  // console.log(props);
  const [analyticSection, setAnalyticSection] = useState('all applicants')
  const [batchSetup, setBatchSetup] = useState(false)
  const [users, setUsers] = useState([])
  const [arrayLength, setArrayLength] = useState(1)
  const params = useParams()
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [locationType, setLocationType] = useState('')
  const [officialLetter, setOfficialLetter] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [question, setQuestion] = useState('')
  const [scoreWeight, setScoreWeight] = useState('')
  const [questions, setQuestions] = useState('')
  const [questionCount, setQuestionCount] = useState(1)

  const getInputValue = sel => document.getElementsByClassName(sel)

  const options = [
    { label: 'Mbiplang Ardel', value: 'Mbiplang Ardel' },
    { label: 'Femi Deniyi', value: 'Femi Deniyi' }
  ]

  const [showSchedule, setShowSchedule] = useState(false)

  async function handleUpload (imageData) {
    console.log(imageData)
    const data = new FormData()
    const cloudName = 'daqj8bnrb'

    data.append('file', imageData)
    data.append('upload_preset', 'my_default')
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        data
      )
      return response.data.secure_url
    } catch (err) {
      console.log(err)
      console.log(err.response)
      console.log(err.message)
    }
  }

  const createJobOffer = async () => {
    try {
      setUpdating(true)
      const questionInputs = [...getInputValue('questionInput')].map(
        el => el.value
      )
      const questionScoreWeights = [
        ...getInputValue('questionScoreWeight')
      ].map(el => el.value)

      console.log(questionInputs, questionScoreWeights)
      const questions = []

      for (var i = 0; i < questionInputs.length; i++) {
        questions.push({
          text: questionInputs[i],
          scoreWeight: questionScoreWeights[i]
        })
      }
      if (
        title.length > 0 &&
        locationType.length > 0
        // scoreWeight.length > 0
      ) {
        const details = {
          title,
          locationType,
          pipeline: params.pipelineId,
          scoreWeight,
          questions
        }
        console.log(
          '#######################################################',
          details
        )
        const response = await axios.post(
          `${
            process.env.NODE_ENV === 'development'
              ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
              : process.env.REACT_APP_EMPLOYER_CENTER_API
          }/interview/create`,
          details,
          {
            headers: {
              authorization: `Bearer ${auth.token}`,
              'Content-Type': 'application/json'
            }
          }
        )
      }
      setUpdating(false)
      swal(response.data.message)
    } catch (err) {
      setUpdating(false)
      console.log(err)
    }
  }

  const {
    auth: { auth }
  } = props

  const analyticsData = [
    {
      title: 'All Applicants',
      applicants: 100
    },
    {
      title: 'Passed Applicants',
      applicants: 50
    },
    {
      title: 'Failed Applicants',
      applicants: 50
    }
  ]

  async function getUsers () {
    try {
      const response = await getAllUsers(auth.token)
      console.log(response.data.data)
      setUsers(response.data.data)
    } catch (error) {
      console.log(error)
      console.log(error.response.message)
    }
  }

  useEffect(() => {
    getUsers()
  }, [users.length])

  const getInterview = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
            : process.env.REACT_APP_EMPLOYER_CENTER_API
        }/interview/${params.pipelineId}`,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('------------->>>>>>>>>', response)
      setOfficialLetter(response.data.data)
      if (response.data.data !== null) {
        setQuestionCount(0)
      }
      return
    } catch (err) {
      console.log(err)
    }
  }

  const updateOfficialLetter = async id => {
    // console.log(questions)

    try {
      const questionInputs = [...getInputValue('questionInput')].map(
        el => el.value
      )
      const questionScoreWeights = [
        ...getInputValue('questionScoreWeight')
      ].map(el => el.value)

      console.log(questionInputs, questionScoreWeights)
      const questions = []

      for (var i = 0; i < questionInputs.length; i++) {
        questions.push({
          text: questionInputs[i],
          scoreWeight: questionScoreWeights[i]
        })
      }
      setUpdating(true)
      const details = {
        title: title.length > 0 ? title : officialLetter.title,
        locationType:
          locationType.length > 0 ? locationType : officialLetter.locationType,
        questions
      }
      console.log(details)
      const response = await axios.put(
        `${
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
            : process.env.REACT_APP_EMPLOYER_CENTER_API
        }/interview/${id}`,
        details,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      setUpdating(false)

      console.log(response)
      swal(response.data.message)

      setOfficialLetter(response.data.data)
      //   return
    } catch (err) {
      setUpdating(false)

      console.log(err.response)
    }
  }

  const deleteOfficialLetter = async id => {
    try {
      setUpdating(true)
      const response = await axios.delete(
        `${
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
            : process.env.REACT_APP_EMPLOYER_CENTER_API
        }/interview/${id}`,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      swal(response.data.message)
      setUpdating(false)

      window.location.reload()
    } catch (err) {
      console.log(err)
      setUpdating(false)
    }
  }

  useEffect(() => {
    getInterview()
  }, [])

  const increment = () => {
    setQuestionCount(questionCount + 1)
  }

  const decrement = () => {
    setQuestionCount(questionCount - 1)
  }

  return (
    <>
      <CustomNav />
      <div
        className=''
        style={{
          margin: '2rem',
          marginTop: '1.5rem',
          width: '100%',
          paddingLeft: '5rem',
          paddingRight: '5rem'
        }}
      >
        <div className='d-flex justify-content-between mb-4'>
          <NavLink to={routes.officialLetter}>
            <CustomButton onClick={() => history.goBack()}>
              Go Back
            </CustomButton>
          </NavLink>
        </div>
        <hr />
        <div className='card py-4 px-5' style={{ borderRadius: '0.44rem' }}>
          <h3 className='mb-3'>{params.pipelineName}</h3>
          <form>
            <div className='mb-3'>
              <CustomInput
                placeholder='Enter title'
                title='Title'
                onChange={e => {
                  setTitle(e.target.value)
                }}
                defaultValue={officialLetter ? officialLetter.title : ''}
              />
            </div>
            <div className='mb-3'>
              <label
                className='fw-bold'
                style={{
                  opacity: '0.6'
                }}
              >
                Location Type
              </label>

              <select
                className='form-control'
                onChange={e => {
                  console.log(e.target.value)
                  setLocationType(e.target.value)
                }}
                defaultValue={[
                  {
                    value: officialLetter
                      ? officialLetter?.locationType
                      : officialLetter?.locationType,
                    label: officialLetter
                      ? officialLetter?.locationType
                      : officialLetter?.locationType
                  }
                ]}
              >
                // className='form-control'
                <option
                  selected={
                    officialLetter &&
                    officialLetter?.locationType === 'Physical'
                  }
                >
                  Physical
                </option>
                <option
                  selected={
                    officialLetter && officialLetter?.locationType === 'Virtual'
                  }
                >
                  Virtual
                </option>
                {/* option={[
                  {
                    value: 'Physical',
                    label: 'Physical'
                  },
                  {
                    value: 'Virtual',
                    label: 'Virtual'
                  }
                ]} */}
                {/* // ]} */}
              </select>
            </div>
            <h4
              className='border-bottom pb-2 my-4 text-center'
              style={{
                opacity: '0.8'
              }}
            >
              Set Interview Questions
            </h4>
            {officialLetter &&
              officialLetter.questions.map((el, i) => (
                <div className='mb-3'>
                  <h6
                    className='fw-bold'
                    style={{
                      opacity: '0.5'
                    }}
                  >{`Question ${i + 1}`}</h6>
                  <textarea
                    className='w-100 py-2 px-3 questionInput'
                    rows='6'
                    // onChange={e => {
                    //   setQuestion(e.target.value)
                    // }}
                    defaultValue={el.text}
                    placeholder='Enter interview question'
                  />
                  <CustomInput
                    title='Score Weight'
                    placeholder='Enter score weight'
                    className='questionScoreWeight w-100 py-2 px-3'
                    type='number'
                    defaultValue={el.scoreWeight}

                    // onChange={e => {
                    //   setScoreWeight(e.target.value)
                    //   setInterviewQuestions
                    // }}
                  />
                </div>
              ))}
            {[...Array(questionCount).keys()].map((el, i) => (
              <div className='mb-3'>
                <h6
                  className='fw-bold'
                  style={{
                    opacity: '0.5'
                  }}
                >{`Question ${
                  officialLetter
                    ? officialLetter.questions.length + 1 + i
                    : i + 1
                }`}</h6>
                <textarea
                  className='w-100 py-2 px-3 questionInput'
                  rows='6'
                  // onChange={e => {
                  //   setQuestion(e.target.value)
                  // }}
                  placeholder='Enter interview question'
                />
                <CustomInput
                  title='Score Weight'
                  placeholder='Enter score weight'
                  className='questionScoreWeight w-100 py-2 px-3'
                  type='number'
                  // onChange={e => {
                  //   setScoreWeight(e.target.value)
                  //   setInterviewQuestions
                  // }}
                  // defaultValue={
                  //   officialLetter ? officialLetter.scoreWeight : ''
                  // }
                />
              </div>
            ))}
            {/* {} */}
            <div>
              <CustomButton
                className='ml-4'
                onClick={e => {
                  e.preventDefault()
                  increment()
                }}
              >
                Add new question
              </CustomButton>
            </div>
            <div
              className='border-top'
              style={{
                marginTop: '50px'
              }}
            >
              {officialLetter ? (
                <div>
                  <CustomButton
                    className='ml-4'
                    onClick={e => {
                      e.preventDefault()
                      updateOfficialLetter(officialLetter._id)
                    }}
                    disabled={updating}
                  >
                    Save
                  </CustomButton>
                  <CustomButton
                    className='ml-4 btn-danger'
                    onClick={e => {
                      e.preventDefault()
                      // deleteOfficialLetter(officialLetter._id)
                    }}
                    style={{
                      background: 'red'
                    }}
                    disabled={updating}
                  >
                    Delete
                  </CustomButton>
                </div>
              ) : (
                <div>
                  <CustomButton
                    className='ml-4'
                    onClick={e => {
                      e.preventDefault()
                      createJobOffer()
                    }}
                  >
                    Save
                  </CustomButton>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  // getAllUsers: token => dispatch(getAllUsers(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePipeline)
