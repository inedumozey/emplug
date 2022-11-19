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

import 'react-toggle/style.css'
import routes from '../../../../routes'

function CreatePipeline (props) {
  const [analyticSection, setAnalyticSection] = useState('all applicants')
  const [batchSetup, setBatchSetup] = useState(false)
  const [users, setUsers] = useState([])
  const [arrayLength, setArrayLength] = useState(1)
  const params = useParams()
  const history = useHistory()

  const [signatureType, setSignatureType] = useState('Text')
  const [signatureFile, setSignatureFile] = useState(null)
  const [attachmentFile, setAttachmentFile] = useState(null)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [signatureText, setSignatureText] = useState('')

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
    if (
      subject.length > 0 &&
      body.length > 0 &&
      (signatureFile || signatureText.length > 0) &&
      attachmentFile
    ) {
      const details = {
        subject,
        body,
        pipleline: params.id,
        signatureImage: signatureFile ? await handleUpload(signatureFile) : '',
        signatureText,
        attachment: [await handleUpload(attachmentFile)]
      }
      createOfficialLetter(details, auth.token)
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
          <h3>Job Offer</h3>
          <form className='mt-3'>
            <label>
              Offer Subject
              <span className='text-primary' style={{ marginLeft: '12px' }}>
                *
              </span>
            </label>
            <CustomInput
              placeholder='Enter subject'
              className=' w-100 py-2 px-3 mb-3'
              onChange={e => setSubject(e.target.value)}
            />
            <label>
              Offer Body
              <span className='text-primary' style={{ marginLeft: '12px' }}>
                *
              </span>
            </label>
            <textarea
              style={{
                borderRadius: '5px'
              }}
              onChange={e => setBody(e.target.value)}
              className='w-100 px-3 mb-2 py-2 '
              placeholder='Enter body'
              rows='9'
            />

            <label>
              Signature
              <span className='text-primary' style={{ marginLeft: '12px' }}>
                *
              </span>
            </label>
            <Select
              placeholder={'Select signature type'}
              className='w-100 mb-3'
              options={[
                {
                  label: 'Text',
                  value: 'Text'
                },
                {
                  label: 'Image',
                  value: 'Image'
                }
              ]}
              onChange={e => {
                setSignatureType(e.value)
              }}
            />

            {signatureType === 'Text' ? (
              <CustomInput
                placeholder='Enter signature'
                className='w-100 py-2 px-3 mb-3'
                onChange={e => setSignatureText(e.target.value)}
              />
            ) : (
              <input
                type='file'
                className='mb-3 w-100'
                onChange={e => {
                  setSignatureFile(e.target.files[0])
                }}
              />
            )}
            <div className='mt-2'>
              <label>Attachment</label>

              <input
                type='file'
                className='mb-3'
                style={{
                  marginLeft: '12px'
                }}
                onChange={e => setAttachmentFile(e.target.files[0])}
              />
            </div>
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
