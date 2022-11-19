import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, NavLink } from 'react-router-dom'
import Select from 'react-select'
import { GitBranch, Gear, Calculator, PencilSimple} from 'phosphor-react'
import c1 from '../../../../images/c1.png'
import c2 from '../../../../images/c2.png'
import c3 from '../../../../images/c3.png'

import { Modal } from 'react-bootstrap'

import axios from 'axios'

import { getAllUsers } from '../../../../services/Organisation'
import CustomButton from '../../../components/CustomButton/custom-button'
import AllStatus from '../../../components/Jobick/Applications/AllStatus'
import CandidateStatus from '../../../components/Jobick/Applications/CandidateStatus'
import CustomNav from '../../../layouts/nav/CustomNav'
import CustomInput from '../../../components/CustomInput/custom-input'
import PipelineEditForm from '../../../components/PipelineEditForm'
import routes from '../../../../routes'

function CreatePipeline (props) {
  const [analyticSection, setAnalyticSection] = useState('all applicants')
  const [users, setUsers] = useState([])
  const [pipeline, setPipeline] = useState({})

  const { id, organization_id, jobId } = useParams()

  const options = [
    { label: 'Mbiplang Ardel', value: 'Mbiplang Ardel' },
    { label: 'Femi Deniyi', value: 'Femi Deniyi' }
  ]

  const [showPipelineSetup, setShowPipelineSetup] = useState(false)

  const toggle = () => {
    setShowPipelineSetup(!showPipelineSetup)
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

  
  async function getAllApplicants() {
    try {
      const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/application/fetch-by-job-id/${id}`, {
        headers: {
					'authorization': `Bearer ${props.auth.auth.token}`,
					'Content-type': 'application/json',
				}
      })
      setUsers(response.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  async function httpGetSinglePipeline() {
    try {
        const response = await axios.get(`https://employer-center-api.herokuapp.com/api/v1/pipeline/fetch-one/${id}`)
        setPipeline(response.data.data)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    getAllApplicants()
  }, [users.length])

  useEffect(() => {
    httpGetSinglePipeline()
  }, [pipeline._id])



  return (
    <>
      <CustomNav />
      <div className='mt-5' style={{textAlign: 'start', marginLeft: '7rem', }}>
        <h1 style={{color: '#7f7f7f'}}>{pipeline._id && pipeline.title} Pipeline <span style={{padding: '0.6rem', fontSize: '0.6rem', color: 'white', background: `${pipeline.active ? 'green' : 'red'}`, borderRadius: '5px'}}>{pipeline.active ? "Activated" : "Deactivated"}</span></h1>
        <hr></hr>
      </div>
      <div
        className=''
        style={{
          margin: '2rem',
          marginTop: '1.5rem',
          width: '100%',
          paddingLeft: '5rem',
          paddingRight: '5rem',
        }}
      >
        <div className='d-flex justify-content-between mb-4'>
          <div className='d-flex'>
            <NavLink to={`${routes.pipeline.split(':')[0]}${organization_id}/${jobId}`}>
              <CustomButton>
                <GitBranch size={18} style={{marginRight: '0.5rem'}}/>
                Back to Pipeline
              </CustomButton>
            </NavLink>
            <NavLink to={`/application-settings/${organization_id}/${jobId}/${id}`}>
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
          <NavLink to={`${routes.formBuilder.split(':')[0]}${organization_id}/${id}/${pipeline._id && pipeline.sectionType.toLowerCase()}`}>
            <CustomButton>Manage Application Form</CustomButton>
          </NavLink>
        </div>

        <div>
          <input
            className=' px-3  py-2 form-control border-success '
            placeholder='Search participants '
            style={{
              border: '1x solid',
              width: '35%',
              borderRadius: '6px',
            }}
          />
        </div>

        <div className='d-flex my-4 w-100 '>
          <div
            className='card border-none shadow-none'
            style={{
              width: '250px',
              marginRight: '20px',
            }}
          >
            <div className='d-flex p-3 justify-content-between align-items-center'>
              <div>
                <p className='mb-1'>0</p>
                <h5 className='text-success'>All Applicants</h5>
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
              marginRight: '20px',
            }}
          >
            <div className='d-flex p-3 justify-content-between align-items-center'>
              <div>
                <p className='mb-1'>0</p>
                <h5 className='text-success'>Accepted Applicants</h5>
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
              marginRight: '20px',
            }}
          >
            <div className='d-flex p-3 justify-content-between align-items-center'>
              <div>
                <p className='mb-1'>0</p>
                <h5 className='text-success'>Rejected Applicants</h5>
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
            title={'Application Form'}
            cordinator={'Mbpilang'}
            subcordinator={'Femi'}
            toggle={toggle}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePipeline)
