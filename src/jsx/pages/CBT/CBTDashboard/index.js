import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'
import { X, Gear, Calculator, GitBranch, PencilSimple, Exam, Wrench } from 'phosphor-react'
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
import CreateExamQuestion from './create-exams-question'
import CreateExam from './create-exams'

function CBTDashboard (props) {
  const [analyticSection, setAnalyticSection] = useState('all applicants')
  const [users, setUsers] = useState([])
  const [show, setShow] = useState(false)
  const [pipeline, setPipeline] = useState({})
  const [exams, setExams] = useState({})

  const params = useParams()

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



  async function httpGetSinglePipeline() {
    try {
        const response = await axios.get(`https://employer-center-api.herokuapp.com/api/v1/pipeline/fetch-one/${params.id}`, {
          headers: {
            'authorization': `Bearer ${auth.token}`,
            'Content-type': 'application/json',
          }
        })
        setPipeline(response.data.data)
    } catch (error) {
        console.log(error)
    }
  }

  async function httpGetSchedule() {
    try {
        const response = await axios.get(`https://employer-center-api.herokuapp.com/api/v1/schedule/${params.id}`, {
          headers: {
            'authorization': `Bearer ${auth.token}`,
            'Content-type': 'application/json',
          }
        })
        setShedule(response.data.data)
    } catch (error) {
        console.log(error.response)
    }
  }

  async function httpGetExam() {
    try {
        const response = await axios.get(`https://employer-center-api.herokuapp.com/api/v1/examination/${params.id}`, {
          headers: {
            'authorization': `Bearer ${auth.token}`,
            'Content-type': 'application/json',
          }
        })
        setExams(response.data.data)
    } catch (error) {
        console.log(error)
    }
  }
 



  
  async function getAllApplicants() {
    try {
      const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/application/fetch-by-job-id/${params.jobId}`, {
        headers: {
					'authorization': `Bearer ${props.auth.auth.token}`,
					'Content-type': 'application/json',
				}
      })
      setUsers(response.data.data);
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    // getUsers()
    getAllApplicants()
  }, [users.length])
  
  useEffect(() => {
    httpGetSinglePipeline()
    httpGetExam()
  }, [pipeline._id])

  useEffect(() => {
    httpGetExam()
  }, [exams._id])



  return (
    <>
      <CustomNav />
      <div className='mt-5' style={{textAlign: 'start', marginLeft: '7rem', }}>
        <h1 style={{color: '#7f7f7f'}}>{pipeline.title} Pipeline <span style={{padding: '0.6rem', fontSize: '0.6rem', color: 'white', background: `${pipeline.active ? 'green' : 'red'}`, borderRadius: '5px'}}>{pipeline.active ? "Activated" : "Deactivated"}</span></h1>
        <hr></hr>
      </div>
      <div className='' style={{marginLeft: '7rem'}}>
        <p className='mb-0'>Coordinator: <strong>{pipeline._id && pipeline.coordinator.fullName}</strong></p>
        <p className='mb-0'>Sub-Coordinators: </p>
        <ul>
          {
            pipeline._id && pipeline.sub_coordinators.map(item => (
              <li key={item._id}>- <strong>{item.fullName}</strong></li>
            ))
          }
        </ul>
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
            <NavLink to={`${routes.pipeline.split(':')[0]}${params.organization_id}/${params.jobId}`}>
              <CustomButton>
                <GitBranch size={18} style={{marginRight: '0.5rem'}}/>
                Back to Pipeline
              </CustomButton>
            </NavLink>
            <NavLink to={`${routes.cbtSettings.split(':')[0]}${params.organization_id}/${params.jobId}/${params.id}`}>
              <CustomButton>
                <Gear size={18}  style={{marginRight: '0.5rem'}}/>
                Settings
              </CustomButton>
            </NavLink>
            <CustomButton>
              <Calculator size={18} style={{ marginRight: '0.5rem'}} />
              Audit Trails
            </CustomButton>
            <CustomButton onClick={toggle}>
              <PencilSimple size={18} style={{marginRight: '0.5rem'}}/>  
              Edit Pipeline
            </CustomButton>
          </div>
          <div className='d-flex '>
            <NavLink to={"#"} onClick={() => setShow(true)}>
                <CustomButton>
                  <Exam size={18} style={{marginRight: '0.5rem'}}/>
                  Create Examination
                </CustomButton>
            </NavLink>
            <NavLink to={routes.test.split(':')[0] + exams._id} >
                <CustomButton>
                  <Wrench size={18} style={{marginRight: '0.5rem'}}/>
                  Setup Questions
                </CustomButton>
            </NavLink>
          </div>
        </div>

        <div>
          <input
            className=' px-3  py-2 form-control border-success '
            placeholder='Search participants '
            style={{
              border: '1x solid',
              width: '35%',
              borderRadius: '6px'
            }}
          />
        </div>

        <div className='d-flex my-4 w-100 '>
          <div
            className='card border-none shadow-none'
            style={{
              width: '250px',
              marginRight: '20px'
            }}
          >
            <div className='d-flex p-3 justify-content-between align-items-center'>
              <div>
                <p className='mb-1'>{users.length}</p>
                <h5 className='text-success'>Total Candidates</h5>
              </div>
              <div>
                <img src={c1} />
              </div>
            </div>
          </div>
          <div
            className='card border-none shadow-none'
            style={{
              width: '250px',
              marginRight: '20px'
            }}
          >
            <div className='d-flex p-3 justify-content-between align-items-center'>
              <div>
                <p className='mb-1'>0</p>
                <h5 className='text-success'>Accepted Candidates</h5>
              </div>
              <div>
                <img src={c2} />
              </div>
            </div>
          </div>

          <div
            className='card border-none shadow-none'
            style={{
              width: '250px',
              marginRight: '20px'
            }}
          >
            <div className='d-flex p-3 justify-content-between align-items-center'>
              <div>
                <p className='mb-1'>0</p>
                <h5 className='text-success'>Rejected Candidates</h5>
              </div>
              <div>
                <img src={c3} />
              </div>
            </div>
          </div>
          <div
            className='card border-none shadow-none'
            style={{
              width: '250px',
              marginRight: '20px'
            }}
          >
            <div className='d-flex p-3 justify-content-between align-items-center'>
              <div>
                <p className='mb-1'>10</p>
                <h5 className='text-success'>Examination Questions</h5>
              </div>
              <div>
                <img src={c3} />
              </div>
            </div>
          </div>
        </div>
        <div className='card p-4' style={{ borderRadius: '0.44rem' }}>
          {/* <CandidateStatus /> */}
          <AllStatus users={users} />
        </div>

        <Modal
          show={showPipelineSetup}
          onHide={() => {
            toggle()
          }}
          style={{ paddingTop: '9rem' }}
        >
          <PipelineEditForm
            title={'Medical'}
            cordinator={'Mbpilang'}
            subcordinator={'Femi'}
            toggle={toggle}
          />
        </Modal>
        <Modal
            show={show}
            onHide={() => setShow(false)}
            style={{ paddingTop: '10rem' }}
        >
          <CreateExam setShow={setShow}/>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(CBTDashboard)