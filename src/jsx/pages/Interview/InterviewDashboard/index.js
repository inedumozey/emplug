import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import Select from 'react-select'
import {
  GitBranch,
  Gear,
  Envelope,
  PencilSimple,
  GenderMale,
  GenderFemale,
  GlobeHemisphereEast,
  Flag,
  HouseSimple,
  Users,
  FileCsv,
  UsersFour
} from 'phosphor-react'
import c1 from '../../../../images/c1.png'
import c2 from '../../../../images/c2.png'
import c3 from '../../../../images/c3.png'

import { Modal } from 'react-bootstrap'

import { getAllUsers } from '../../../../services/Organisation'
import CustomButton from '../../../components/CustomButton/custom-button'
import AllStatus from '../../../components/Jobick/Applications/AllStatus'
import CandidateStatus from '../../../components/Jobick/Applications/CandidateStatus'
import CustomNav from '../../../layouts/nav/CustomNav'
import CustomInput from '../../../components/CustomInput/custom-input'
import PipelineEditForm from '../../../components/PipelineEditForm'
import Venue from './venue'
import routes from '../../../../routes'
import DisplayDashboard from './display'
import { lgas } from '../../Talents/lgas'

function OfficialDashboard (props) {
  const [users, setUsers] = useState([])
  const [pipeline, setPipeline] = useState({})

  const [applicantStatus, setApplicantStatus] = useState('all')

  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('Nigeria')
  const [states, setStates] = useState([])

  const [stateOfOrigin, setStateOfOrigin] = useState('')
  const [stateOfResidence, setStateOfResidence] = useState('')
  const [lgaOfOrigin, setLgaOfOrigin] = useState('')
  const [lgaOfResidence, setLgaOfResidence] = useState('')
  const [selectedSkills, setSelectedSkills] = useState('')
  const [skills, setSkills] = useState([])
  const [showIndicator, setShowIndicator] = useState(true)

  const { id, organization_id, jobId } = useParams()

  const [showPipelineSetup, setShowPipelineSetup] = useState(false)

  const toggle = () => {
    setShowPipelineSetup(!showPipelineSetup)
  }

  const {
    auth: { auth }
  } = props

  async function getUsers () {
    try {
      const response = await getAllUsers(auth.token)
      setUsers(response.data.data)
    } catch (error) {
      console.log(error.response.message)
    }
  }

  async function httpGetSinglePipeline () {
    try {
      const response = await axios.get(
        `https://employer-center-api.herokuapp.com/api/v1/pipeline/fetch-one/${id}`,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
            'Content-type': 'application/json'
          }
        }
      )
      setPipeline(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function httpGetSchedule () {
    try {
      const response = await axios.get(
        `https://employer-center-api.herokuapp.com/api/v1/schedule/${id}`
      )
      setShedule(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  async function getAllApplicants () {
    try {
      const response = await axios(
        `https://employer-center-api.herokuapp.com/api/v1/application/fetch-by-job-id/${id}`,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
            'Content-type': 'application/json'
          }
        }
      )
      console.log('Applicants =========>', response.data.data)
      setUsers(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  async function httpGetUserPipeline() {
    try {
        const response = await axios.get(`https://employer-center-api.herokuapp.com/api/v1/pipeline/fetch-pipeline-candidate/${id}`, {
          headers: {
            'authorization': `Bearer ${props.auth.auth.token}`,
            'Content-type': 'application/json',
          }
        })
        console.log("Get single data:::::::::::::::> ", response.data.data);
        setUsers(response.data.data)
        // setPipeline(response.data.data)
    } catch (error) {
        console.log(error)
    }
  }

  async function httpMoveApplicant (candidateId) {
    let data

    data = {
      candidateId: candidateId.id,
      status: candidateId.status === 'passed' ? '' : 'passed',
      sectionType: pipeline.sectionType
    }
    console.log(data)
    try {
      const response = await axios.post(
        `https://employer-center-api.herokuapp.com/api/v1/pipeline/status`,
        data,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
            'Content-type': 'application/json'
          }
        }
      )
      console.log(response.data.data)
      swal('Verified', response.data.message, 'success')
      httpGetUserPipeline()
    } catch (error) {
      swal('Something went wrong!', error.response.data.message, 'error')
      console.log(error)
    }
  }

  useEffect(() => {
    httpGetUserPipeline()
  }, [users.length])

  useEffect(() => {
    httpGetSinglePipeline()
  }, [pipeline._id])

  function filterAll () {
    // state of origin
    // state of residence
    // lga of origin
    // lga of residence
    const data = [...users]

    if (
      stateOfOrigin.length > 0 &&
      lgaOfOrigin.length > 0 &&
      stateOfResidence.length > 0 &&
      lgaOfResidence.length > 0
    ) {
      // console.log(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfOrigin = data.filter(
        item =>
          item.userId &&
          item.userId.stateOfOrigin &&
          item.userId.stateOfOrigin
            .toLowerCase()
            .includes(stateOfOrigin.toLowerCase())
      )
      const forLgaOfOrigin = forStateOfOrigin.filter(
        item =>
          item.userId &&
          item.userId.lgaOfOrigin &&
          item.userId.lgaOfOrigin
            .toLowerCase()
            .includes(lgaOfOrigin.toLowerCase())
      )
      const forStateOfResidence = forLgaOfOrigin.filter(
        item =>
          item.userId &&
          item.userId.stateOfResident &&
          item.userId.stateOfResident
            .toLowerCase()
            .includes(stateOfResidence.toLowerCase())
      )
      const filteredResult = forStateOfResidence.filter(
        item =>
          item.userId &&
          item.userId.lgaOfResident &&
          item.userId.lgaOfResident
            .toLowerCase()
            .includes(lgaOfResidence.toLowerCase())
      )
      // console.log(filteredResult)
      return filteredResult
    }

    if (
      stateOfOrigin.length > 0 &&
      !lgaOfOrigin.length &&
      !stateOfResidence.length &&
      !lgaOfResidence.length
    ) {
      // console.log(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const filteredResult = data.filter(
        item =>
          item.userId &&
          item.userId.stateOfOrigin &&
          item.userId.stateOfOrigin
            .toLowerCase()
            .includes(stateOfOrigin.toLowerCase())
      )
      // console.log(filteredResult)
      return filteredResult
    }

    if (
      stateOfOrigin.length > 0 &&
      !lgaOfOrigin.length &&
      stateOfResidence.length > 0 &&
      !lgaOfResidence.length
    ) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfOrigin = data.filter(
        item =>
          item.userId &&
          item.userId.stateOfOrigin &&
          item.userId.stateOfOrigin
            .toLowerCase()
            .includes(stateOfOrigin.toLowerCase())
      )
      const filteredResult = forStateOfOrigin.filter(
        item =>
          item.userId &&
          item.userId.stateOfResident &&
          item.userId.stateOfResident
            .toLowerCase()
            .includes(stateOfResidence.toLowerCase())
      )
      // console.log(filteredResult)
      return filteredResult
    }

    if (
      !stateOfOrigin.length &&
      !lgaOfOrigin.length &&
      stateOfResidence.length > 0 &&
      !lgaOfResidence.length
    ) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const filteredResult = data.filter(
        item =>
          item.userId &&
          item.userId.stateOfResident &&
          item.userId.stateOfResident
            .toLowerCase()
            .includes(stateOfResidence.toLowerCase())
      )
      // console.log(filteredResult)
      return filteredResult
    }

    if (
      stateOfOrigin.length > 0 &&
      lgaOfOrigin.length > 0 &&
      !stateOfResidence.length &&
      !lgaOfResidence.length
    ) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfOrigin = data.filter(
        item =>
          item.userId &&
          item.userId.stateOfResident &&
          item.userId.stateOfResident
            .toLowerCase()
            .includes(stateOfOrigin.toLowerCase())
      )
      const filteredResult = forStateOfOrigin.filter(
        item =>
          item.userId &&
          item.userId.lgaOfOrigin &&
          item.userId.lgaOfOrigin
            .toLowerCase()
            .includes(lgaOfOrigin.toLowerCase())
      )
      // console.log(filteredResult)
      return filteredResult
    }

    if (
      !stateOfOrigin.length &&
      !lgaOfOrigin.length &&
      stateOfResidence.length > 0 &&
      lgaOfResidence.length > 0
    ) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfResidence = data.filter(
        item =>
          item.userId &&
          item.userId.stateOfResident &&
          item.userId.stateOfResident
            .toLowerCase()
            .includes(stateOfResidence.toLowerCase())
      )
      const filteredResult = forStateOfResidence.filter(
        item =>
          item.userId &&
          item.userId.lgaOfOrigin &&
          item.userId.lgaOfResident
            .toLowerCase()
            .includes(lgaOfResidence.toLowerCase())
      )
      // console.log(filteredResult)
      return filteredResult
    }

    if (
      stateOfOrigin.length > 0 &&
      !lgaOfOrigin.length &&
      stateOfResidence.length > 0 &&
      lgaOfResidence.length > 0
    ) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfOrigin = data.filter(
        item =>
          item.userId &&
          item.userId.stateOfOrigin &&
          item.userId.stateOfOrigin
            .toLowerCase()
            .includes(stateOfOrigin.toLowerCase())
      )
      // const forLgaOfOrigin = forStateOfOrigin.filter(item => item.userId && item.userId.lgaOfOrigin && item.userId.lgaOfOrigin.toLowerCase().includes(lgaOfOrigin.toLowerCase()))
      const forStateOfResidence = forStateOfOrigin.filter(
        item =>
          item.userId &&
          item.userId.stateOfResident &&
          item.userId.stateOfResident
            .toLowerCase()
            .includes(stateOfResidence.toLowerCase())
      )
      const filteredResult = forStateOfResidence.filter(
        item =>
          item.userId &&
          item.userId.lgaOfResident &&
          item.userId.lgaOfResident
            .toLowerCase()
            .includes(lgaOfResidence.toLowerCase())
      )
      // console.log(filteredResult)
      return filteredResult
    }
    if (
      stateOfOrigin.length > 0 &&
      lgaOfOrigin.length > 0 &&
      stateOfResidence.length > 0 &&
      !lgaOfResidence.length
    ) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfOrigin = data.filter(
        item =>
          item.userId &&
          item.userId.stateOfOrigin &&
          item.userId.stateOfOrigin
            .toLowerCase()
            .includes(stateOfOrigin.toLowerCase())
      )
      const forLgaOfOrigin = forStateOfOrigin.filter(
        item =>
          item.userId &&
          item.userId.lgaOfOrigin &&
          item.userId.lgaOfOrigin
            .toLowerCase()
            .includes(lgaOfOrigin.toLowerCase())
      )
      const filteredResult = forStateOfOrigin.filter(
        item =>
          item.userId &&
          item.userId.stateOfResident &&
          item.userId.stateOfResident
            .toLowerCase()
            .includes(stateOfResidence.toLowerCase())
      )
      // const filteredResult = forStateOfResidence.filter(item => item.userId && item.userId.lgaOfResident && item.userId.lgaOfResident.toLowerCase().includes(lgaOfResidence.toLowerCase()))
      // console.log(filteredResult)
      return filteredResult
    }
    // console.log(data)
    return data
  }

  function filterSkills (arr) {
    const data = [...arr]

    if (selectedSkills.length > 0) {
      const filteredResult = data.filter(
        item =>
          item.userId &&
          item.userId.skills &&
          item.userId.skills
            .join()
            .toLowerCase()
            .includes(selectedSkills.toLowerCase())
      )
      return filteredResult
    }

    return data
  }

  function sortApplicantByStatus (arr) {
    const data = [...arr]

    if (applicantStatus === 'qualified') {
      const filteredResult = data.filter(
        item => item.status && item.status.toLowerCase() === 'passed'
      )
      return filteredResult
    }

    if (applicantStatus === 'unqualified') {
      const filteredResult = data.filter(
        item => item.status && !item.status && item.status.toLowerCase() === ''
      )
      return filteredResult
    }

    return data
  }

  function filterLGAs (state) {
    const data = [...lgas]
    const filteredResult = data.filter(item => {
      if (item.state.toLowerCase() === state.toLowerCase()) {
        return item.lgas
      }
    })

    if (filteredResult.length > 0) {
      return filteredResult[0].lgas
    }

    return []
  }

  function searchByNameOrEmail () {
    const filteredResult = filterAll().filter(item => {
      if (item.userId) {
        return (
          item.userId.fullName.toLowerCase().includes(search.toLowerCase()) ||
          item.userId.email.toLowerCase().includes(search.toLowerCase())
        )
      }
    })
    return filteredResult
  }

  function getNumberOfGender (gender, arr = []) {
    const data = [...arr]
    const filteredResult = data.filter(item => {
      if (item.userId && item.userId.gender) {
        return item.userId.gender.toLowerCase() === gender.toLowerCase()
      }
    })
    return filteredResult.length
  }

  // Fetch all countries and all states
  async function getCountries () {
    const response = await axios.get(
      'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json'
    )
    // console.log(response.data)
    setCountries(response.data)
    const stateResponse = await axios.get(
      'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json'
    )
    // console.log(stateResponse.data)
    setStates(stateResponse.data)
  }

  // Get state from selected country

  function getStates (arr) {
    const data = [...arr]
    const filteredResult = data.filter(
      item => item.country_name.toLowerCase() === selectedCountry.toLowerCase()
    )
    return filteredResult
  }

  const headers = [
    { label: 'Full Name', key: 'fullName' },
    { label: 'Ref Id', key: 'id' },
    { label: 'Gender', key: 'gender' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'State of origin', key: 'stateOfOrigin' },
    { label: 'State of residence', key: 'stateOfResident' },
    { label: 'LGA of origin', key: 'lgaOfOrigin' },
    { label: 'LGA of residence', key: 'lgaOfResident' }
  ]

  function resetFilters () {
    setStateOfOrigin('')
    setStateOfResidence('')
    setLgaOfOrigin('')
    setLgaOfResidence('')
    setSelectedSkills('')
  }

  async function httpGetSkills () {
    try {
      const response = await axios(
        `https://employer-center-api.herokuapp.com/api/v1/admin/fetch_skills`,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
            'Content-type': 'application/json'
          }
        }
      )
      // console.log("Skills------------>>>>>>>>>>>>>>>>", response.data.data)
      setSkills(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCountries()
    httpGetSkills()
  }, [])

  return (
    <>
      <CustomNav />
      <div className='mt-5' style={{ textAlign: 'start', marginLeft: '7rem' }}>
        <h1 style={{ color: '#7f7f7f' }}>
          {pipeline._id && pipeline.title.toUpperCase()} PIPELINE{' '}
          <span
            style={{
              padding: '0.6rem',
              fontSize: '0.6rem',
              color: 'white',
              background: `${pipeline.active ? 'green' : 'red'}`,
              borderRadius: '5px'
            }}
          >
            {pipeline.active ? 'Activated' : 'Deactivated'}
          </span>
        </h1>
        <hr></hr>
      </div>
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
          <div className='d-flex'>
            <NavLink
              to={`${routes.pipeline.split(':')[0]}${organization_id}/${jobId}`}
            >
              <CustomButton>
                <GitBranch size={18} style={{ marginRight: '0.5rem' }} />
                Back to Pipelines
              </CustomButton>
            </NavLink>
            <Link
              to={`${
                routes.cbtSettings.split(':')[0]
              }${organization_id}/${jobId}/${id}`}
            >
              <CustomButton onClick={() => console.log(true)}>
                <Gear size={18} style={{ marginRight: '0.5rem' }} />
                Settings
              </CustomButton>
            </Link>
            <CustomButton onClick={() => setShowPipelineSetup(true)}>
              <PencilSimple size={18} style={{ marginRight: '0.5rem' }} />
              Edit Pipeline
            </CustomButton>
            {showIndicator ? (
              <CustomButton
                onClick={() => setShowIndicator(false)}
                style={{
                  background: `${
                    applicantStatus === 'all'
                      ? 'transparent'
                      : applicantStatus === 'qualified'
                      ? 'green'
                      : 'red'
                  }`,
                  color: `${applicantStatus === 'all' ? 'black' : 'white'}`,
                  border: `${
                    applicantStatus === 'all' ? '1px solid black' : 'none'
                  }`
                }}
              >
                <UsersFour size={18} style={{ marginRight: '0.5rem' }} />
                {applicantStatus === 'all'
                  ? 'All Applicants'
                  : applicantStatus === 'qualified'
                  ? 'Qualified Applicants'
                  : 'Unqualified Applicants'}
              </CustomButton>
            ) : (
              <div className='d-flex align-items-center'>
                <select
                  className='form-control'
                  onChange={e => {
                    setApplicantStatus(e.target.value)
                    setShowIndicator(true)
                  }}
                >
                  <option>Select to filter qualified applicants</option>
                  <option value='all'>All applicants</option>
                  <option value='qualified'>Qualified applicants</option>
                  <option value='unqualified'>Unqualified applicants</option>
                </select>
                {/* <CustomButton>Apply</CustomButton> */}
              </div>
            )}
          </div>
          <div className='d-flex'>
            <NavLink
              // to={`/form-builder/${jobId}/${id}/${pipeline?.title}`}
              to={`${routes.interviewSettings.split(':')[0]}${organization_id}/${jobId}/${id}`}
              // to={`${routes.interviewSettings.split(':')[0]}${
              //   pipeline.title
              // }/${id}`}
            >
              <CustomButton onClick={() => setShow(true)}>
                <Gear size={18} style={{ marginRight: '0.5rem' }} />
                Interview Setup
              </CustomButton>
            </NavLink>
            <CSVLink
              data={searchByNameOrEmail().map(item => ({
                fullName: item.userId.fullName,
                email: item.userId.email,
                phone: item.userId.phone,
                gender: item.userId.gender,
                stateOfOrigin: item.userId.stateOfOrigin,
                stateOfResident: item.userId.stateOfResident,
                lgaOfOrigin: item.userId.lgaOfOrigin,
                lgaOfResident: item.userId.lgaOfResident,
                id: item.id
              }))}
              headers={headers}
            >
              <CustomButton>
                {' '}
                <FileCsv size={22} /> Download CSV
              </CustomButton>
            </CSVLink>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <CustomInput
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='search...'
              style={{ marginBottom: '1rem', width: '20rem' }}
            />
            <Link
              to='#'
              style={{ textDecoration: 'underline' }}
              onClick={() => setSearch('')}
              className='mx-3'
            >
              Clear Search
            </Link>
            <Link
              to='#'
              style={{ textDecoration: 'underline' }}
              onClick={resetFilters}
              className='mx-3'
            >
              Reset Filter
            </Link>
            <Link
              to='#'
              style={{ textDecoration: 'underline' }}
              onClick={() => setShow(true)}
              className='mx-3'
            >
              Advanced Search
            </Link>
          </div>
          <div className='d-flex align-items-center'>
            <select className='form-control'>
              <option>Select action</option>
              <option>Accept</option>
              <option>Reject</option>
              <option>Move to next pipeline</option>
            </select>
            <CustomButton>submit</CustomButton>
          </div>
        </div>

        {/* <div>
          <input
            className=' px-3  py-2 form-control border-success '
            placeholder='Search participants '
            style={{
              border: '1x solid',
              width: '35%',
              borderRadius: '6px',
            }}
          />
        </div> */}

        <div
          className='d-flex align-items-center p-4'
          style={{
            position: 'sticky',
            top: '6rem',
            zIndex: '5',
            background: 'white'
          }}
        >
          <div
            title='All candidates'
            style={{
              cursor: 'pointer',
              borderRadius: '0.44rem',
              textAlign: 'center',
              width: '18rem',
              background: '#00b500',
              color: 'white'
            }}
            className='card d-flex mx-2'
          >
            <div className=''>
              <div>
                <Users size={30} />
              </div>
              {/* <hr className='m-1'></hr> */}
              <p className='mb-0 mt-2' style={{ color: 'white' }}>
                All Applicants
              </p>
              <hr className='m-1'></hr>
              <h4 className='mt-2' style={{ color: '#fff' }}>
                {users.length}
              </h4>
            </div>
          </div>

          <div
            title='Male'
            style={{
              cursor: 'pointer',
              borderRadius: '0.44rem',
              textAlign: 'center',
              width: '18rem',
              background: '#00b500',
              color: 'white'
            }}
            className='card d-flex mx-2'
          >
            <div className=''>
              <div>
                <GenderMale size={30} />
              </div>
              {/* <hr className='m-1'></hr> */}
              <p className='mb-0 mt-2' style={{ color: 'white' }}>
                Male
              </p>
              <hr className='m-1'></hr>
              <h4 className='mt-2' style={{ color: '#fff' }}>
                {getNumberOfGender('male', [
                  ...searchByNameOrEmail().filter(item => item.userId !== null)
                ])}
              </h4>
            </div>
          </div>

          <div
            title='Female'
            style={{
              cursor: 'pointer',
              borderRadius: '0.44rem',
              textAlign: 'center',
              width: '18rem',
              background: '#00b500',
              color: 'white'
            }}
            className='card d-flex mx-2'
          >
            <div className=''>
              <div>
                <GenderFemale size={30} />
              </div>
              {/* <hr className='m-1'></hr> */}
              <p className='mb-0 mt-2' style={{ color: 'white' }}>
                Female
              </p>
              <hr className='m-1'></hr>
              <h4 className='mt-2' style={{ color: '#fff' }}>
                {getNumberOfGender('female', [
                  ...searchByNameOrEmail().filter(item => item.userId !== null)
                ])}
              </h4>
            </div>
          </div>

          <div
            title='State of origin'
            style={{
              cursor: 'pointer',
              borderRadius: '0.44rem',
              textAlign: 'center',
              width: '18rem',
              background: '#00b500',
              color: 'white'
            }}
            className='card d-flex mx-2'
          >
            <div className=''>
              <div>
                <GlobeHemisphereEast size={30} />
              </div>
              {/* <hr className='m-1'></hr> */}
              <p className='mb-0 mt-2' style={{ color: 'white' }}>
                State of origin
              </p>
              <hr className='m-1'></hr>
              <h4 className='mt-2' style={{ color: '#fff' }}>
                {(stateOfOrigin && filterAll().length) || 0}
              </h4>
            </div>
          </div>

          <div
            title='State of residence'
            style={{
              cursor: 'pointer',
              borderRadius: '0.44rem',
              textAlign: 'center',
              width: '18rem',
              background: '#00b500',
              color: 'white'
            }}
            className='card d-flex mx-2'
          >
            <div className=''>
              <div>
                <Flag size={30} />
              </div>
              {/* <hr className='m-1'></hr> */}
              <p
                className='mb-0 mt-2'
                style={{ color: 'white' }}
              >{`${'State of residence'.slice(0, 15)}...`}</p>
              <hr className='m-1'></hr>
              <h4 className='mt-2' style={{ color: '#fff' }}>
                {(stateOfResidence && filterAll().length) || 0}
              </h4>
            </div>
          </div>

          <div
            title='LGA of origin'
            style={{
              cursor: 'pointer',
              borderRadius: '0.44rem',
              textAlign: 'center',
              width: '18rem',
              background: '#00b500',
              color: 'white'
            }}
            className='card d-flex mx-2'
          >
            <div className=''>
              <div>
                <HouseSimple size={30} />
              </div>
              {/* <hr className='m-1'></hr> */}
              <p className='mb-0 mt-2' style={{ color: 'white' }}>
                LGA of origin
              </p>
              <hr className='m-1'></hr>
              <h4 className='mt-2' style={{ color: '#fff' }}>
                {(lgaOfOrigin && filterAll().length) || 0}
              </h4>
            </div>
          </div>

          <div
            title='LGA of residence'
            style={{
              cursor: 'pointer',
              borderRadius: '0.44rem',
              textAlign: 'center',
              width: '18rem',
              background: '#00b500',
              color: 'white'
            }}
            className='card d-flex mx-2'
          >
            <div className=''>
              <div>
                <Flag size={30} />
              </div>
              {/* <hr className='m-1'></hr> */}
              <p
                className='mb-0 mt-2'
                style={{ color: 'white' }}
              >{`${'LGA of residence'.slice(0, 10)}...`}</p>
              <hr className='m-1'></hr>
              <h4 className='mt-2' style={{ color: '#fff' }}>
                {(lgaOfResidence && filterAll().length) || 0}
              </h4>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className='card p-4' style={{ borderRadius: '0.44rem' }}>
          <DisplayDashboard
            users={sortApplicantByStatus([
              ...filterSkills([
                ...searchByNameOrEmail().filter(item => item.userId !== null)
              ])
            ])}
            httpMoveApplicant={httpMoveApplicant}
          />
        </div>

        <Modal
          show={show}
          onHide={() => {
            setShow(false)
          }}
          style={{ paddingTop: '9rem' }}
        >
          <div className='card p-5' style={{ borderRadius: '0.44rem' }}>
            <div className='d-flex justify-content-between align-items-center'>
              <h4>Add filters</h4>
              <Link
                to='#'
                style={{ textDecoration: 'underline' }}
                onClick={resetFilters}
              >
                Reset fields
              </Link>
            </div>
            <hr></hr>
            <p>Filter applicants:</p>
            <form>
              <div className='mb-3'>
                <select
                  className='form-control'
                  defaultValue={selectedCountry}
                  onChange={e => setSelectedCountry(e.target.value)}
                  value={selectedCountry}
                >
                  <option>{selectedCountry || 'Select country'}</option>
                  {countries?.map(item => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-3'>
                <select
                  className='form-control'
                  onChange={e => setStateOfOrigin(e.target.value)}
                  value={stateOfOrigin}
                >
                  <option>{stateOfOrigin || 'Who are from this state'}</option>
                  {getStates(states).map(item => (
                    <option
                      key={item.id}
                      value={
                        item.name
                          .toLowerCase()
                          .includes('federal'.toLowerCase())
                          ? 'Federal Capital Territory'
                          : item.name
                      }
                    >
                      {item.name.toLowerCase().includes('abuja'.toLowerCase())
                        ? 'Federal Capital Territory'
                        : item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-3'>
                <select
                  className='form-control'
                  onChange={e => setLgaOfOrigin(e.target.value)}
                  value={lgaOfOrigin}
                >
                  <option>{lgaOfOrigin || 'From this LGA'}</option>
                  {filterLGAs(stateOfOrigin).map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-3'>
                <select
                  className='form-control'
                  onChange={e => setStateOfResidence(e.target.value)}
                  value={stateOfResidence}
                >
                  <option>
                    {stateOfResidence || 'Who reside in this state'}
                  </option>
                  {getStates(states).map(item => (
                    <option
                      key={item.id}
                      value={
                        item.name.toLowerCase().includes('abuja'.toLowerCase())
                          ? 'Federal Capital Territory'
                          : item.name
                      }
                    >
                      {item.name.toLowerCase().includes('abuja'.toLowerCase())
                        ? 'Federal Capital Territory'
                        : item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-3'>
                <select
                  className='form-control'
                  onChange={e => setLgaOfResidence(e.target.value)}
                  value={lgaOfResidence}
                >
                  <option>{lgaOfResidence || 'Living in this LGA'}</option>
                  {filterLGAs(stateOfResidence).map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-3'>
                <select
                  className='form-control'
                  onChange={e =>
                    setSelectedSkills(selectedSkills + e.target.value)
                  }
                  value={selectedSkills}
                >
                  <option>Select skills</option>
                  {skills.map(item => (
                    <option key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-3'>
                <CustomButton
                  style={{ width: '100%' }}
                  onClick={() => {
                    filterAll()
                    setShow()
                  }}
                >
                  Apply
                </CustomButton>
              </div>
            </form>
          </div>
        </Modal>
      </div>

      <Modal
        show={showPipelineSetup}
        onHide={() => {
          setShowPipelineSetup(false)
        }}
        style={{ paddingTop: '9rem' }}
      >
        <PipelineEditForm toggle={() => setShowPipelineSetup(false)} />
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  // getAllUsers: token => dispatch(getAllUsers(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(OfficialDashboard)
