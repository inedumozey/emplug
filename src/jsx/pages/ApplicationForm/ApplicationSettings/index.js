import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, NavLink, useHistory } from 'react-router-dom'
import Select from 'react-select'
import { X } from 'phosphor-react'
import c1 from '../../../../images/c1.png'
import c2 from '../../../../images/c2.png'
import c3 from '../../../../images/c3.png'


import axios from 'axios'

import { Modal, Row, Col } from 'react-bootstrap'
import Toggle from 'react-toggle'

import { getAllUsers } from '../../../../services/Organisation'
import CustomButton from '../../../components/CustomButton/custom-button'
import AllStatus from '../../../components/Jobick/Applications/AllStatus'
import CandidateStatus from '../../../components/Jobick/Applications/CandidateStatus'
import CustomNav from '../../../layouts/nav/CustomNav'
import CustomInput from '../../../components/CustomInput/custom-input'
import 'react-toggle/style.css'
import Scheduler from '../../../components/Scheduler/scheduler'
import Venue from '../../CBT/CBTDashboard/venue'
import DisplayDashboard from '../ApplicationDashboard/display-settings'
import venue from '../../CBT/CBTDashboard/venue'

function CreatePipeline (props) {
  const [analyticSection, setAnalyticSection] = useState('all applicants')
  const [batchSetup, setBatchSetup] = useState(false)
  const [users, setUsers] = useState([])
  const [arrayLength, setArrayLength] = useState(1)
  const [show, setShow] = useState(false)
  const [page, setPage] = useState('allocation')
  

  const params = useParams()
  const history = useHistory()

  const [showVenues, setShowVenues] = useState(false)
  const [schedule, setShedule] = useState({})
  const [venues, setVenues] = useState([]);
  const [ selectedId, setSelectedId ] = useState({})


  const options = [
    { label: 'Mbiplang Ardel', value: 'Mbiplang Ardel' },
    { label: 'Femi Deniyi', value: 'Femi Deniyi' }
  ]

  const [showSchedule, setShowSchedule] = useState(false)
  
  const increment = e => {
    e.preventDefault()
    setArrayLength(arrayLength + 1)
  }

  const decrement = e => {
    e.preventDefault()
    setArrayLength(arrayLength - 1)
  }

  const toggle = () => {
    setShowSchedule(!showSchedule)
  }
  const toggleBatch = () => {
    setBatchSetup(!batchSetup)
  }

  const {
    auth: { auth }
  } = props


  async function httpGetSchedule() {
    try {
        const response = await axios.get(`https://employer-center-api.herokuapp.com/api/v1/schedule/${params.id}`, {
          headers: {
              'authorization': `Bearer ${auth.token}`,
              'Content-type': 'application/json',
            }
      })
        // swal('success', response.data.message, 'success')
        // console.log("Schedule========>", response.data.data)
        setShedule(response.data.data)
    } catch (error) {
        console.log(error.response)
    }
  }


  async function fetchAllVenues(id) {
    try {
        const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/venue/all/${id || params.id}`, {
          headers: {
              'authorization': `Bearer ${auth.token}`,
              'Content-type': 'application/json',
            }
      })
        setVenues(response.data.data)
        httpGetSchedule()
    } catch (error) {
        console.log(error)
    }

}



async function getAllApplicants() {
    
  try {
    // const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/pipeline/fetch-pipeline-candidate/${id}`, {
    const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/form/form-data/${params.id}`, {
      headers: {
        'authorization': `Bearer ${props.auth.auth.token}`,
        'Content-type': 'application/json',
      }
    })
    // console.log("Applicants to first pipeline", response.data.data)
    setUsers(response.data.data);
  } catch (error) {
    console.log(error)

  }
}

async function getAllApplicantsByAllocation() {
  
  try {
    
    const response = await axios.get(`https://employer-center-api.herokuapp.com/api/v1/schedule/allocation/list/${params.id}?allocated=true&venue=${venues[0]._id || ''}`, {
      headers: {
        'authorization': `Bearer ${props.auth.auth.token}`,
        'Content-type': 'application/json',
      }
    })
    console.log("Allocated applicants", response)
  } catch (error) {
    console.log(error)

  }
}


  useEffect(() => {
    if (venue.length > 0) {
    }
    getAllApplicantsByAllocation()
    fetchAllVenues()
    httpGetSchedule()
  }, [venues.length])


  useEffect(() => {
    // getAllApplicants();
  }, [])


  // console.log(params)
  // console.log(venues)


  return (
    <>
      <CustomNav />
      <div
        className='mt-5'
        // style={{
        //   margin: '2rem',
        //   marginTop: '1.5rem',
        //   width: '100%',
        //   paddingLeft: '5rem',
        //   paddingRight: '5rem'
        // }}
      >
        <div
            style={{
              marginTop: '1.5rem',
              width: '100%',
            }}
        >

          <div className='d-flex justify-content-between mb-4'>
            <NavLink to='/medical-settings'>
              <CustomButton onClick={() => history.goBack()}>Go Back</CustomButton>
            </NavLink>
            <div className='d-flex'>
                <CustomButton onClick={() => setShow(true)}>Add Venue</CustomButton>
              <CustomButton onClick={toggle}>Set Schedule</CustomButton>
            </div>
          </div>


          <div className='d-flex my-4 w-100 '>
            
            <div
              onClick={() => setPage('allocation')}
              className='card border-none shadow-none'
              style={{
                width: '250px',
                marginRight: '20px',
                cursor: 'pointer'
              }}
            >
              <div className='d-flex p-3 justify-content-between align-items-center'>
                <div>
                  <p className='mb-1'>0</p>
                  <h5 className='text-success'>Allocations</h5>
                </div>
                <div>
                  <img src={c1} />
                </div>
              </div>
            </div>

            <div
              onClick={() => setPage('venue')}
              className='card border-none shadow-none'
              style={{
                width: '250px',
                marginRight: '20px',
                cursor: 'pointer'
              }}
            >
              <div className='d-flex p-3 justify-content-between align-items-center'>
                <div>
                  <p className='mb-1'>0</p>
                  <h5 className='text-success'>Venue</h5>
                </div>
                <div>
                  <img src={c1} />
                </div>
              </div>
            </div>

            <div
              onClick={() => setPage('schedule')}
              className='card border-none shadow-none'
              style={{
                width: '250px',
                marginRight: '20px',
                cursor: 'pointer'
              }}
            >
              <div className='d-flex p-3 justify-content-between align-items-center'>
                <div>
                  <p className='mb-1'>0</p>
                  <h5 className='text-success'>Schedule</h5>
                </div>
                <div>
                  <img src={c2} />
                </div>
              </div>
            </div>

            
          </div>
          <div className='card' style={{ borderRadius: '0.44rem' }}>
            {
              page === 'allocation' &&
              <>
                <DisplayDashboard 
                  users={users}
                />
              </>
            }
          {
                    page === 'venue' &&
                  <div  className="table-responsive dataTables_wrapper" id="applications-data">
                  <div className='card p-4'>
                          <h4>Venues</h4>
                          <hr></hr>
                          {
                              venues.map((item, index) => (

                                  <div  key={item._id} style={{
                                      borderRadius: '0.44rem',
                                      background: '#E9F8EA',
                                      border: '1px dashed #7f7f7f',
                                      // boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)',
                                      margin: '2rem',
                                      padding: '2rem',
                                      cursor: 'move',
                                  }}>
                                      <h4>{item.name} | Capacity: {item.capacity}</h4>
                                      {`${item.address}, ${item.localGovernment} ${item.state} ${item.country}`}
                                      <hr></hr>
                                      <div>
                                            <div className='d-flex justify-content-start'>
                                              <CustomButton style={{padding: '0.6rem 4rem'}} onClick={() => {setSelectedId(index); setShow(true)}}>Edit</CustomButton>
                                              <CustomButton 
                                                  style={{
                                                      padding: '0.6rem 4rem', 
                                                      background: 'transparent', 
                                                      color: 'red', 
                                                      border: '1px solid red'
                                                  }}
                                                  onClick={() => deleteVenue(item._id)}
                                              >Delete</CustomButton>
                                          </div>
                                      </div>

                                  </div>
                              ))
                          }
                      </div>
                  </div>
                }
                {
                    page === 'schedule' &&
                  <div  className="table-responsive dataTables_wrapper" id="applications-data">
                  <div className='card p-4'>
                          <h4>Schedule</h4>
                          <hr></hr>
                          <div  style={{
                              borderRadius: '0.44rem',
                              background: '#E9F8EA',
                              border: '1px dashed #7f7f7f',
                              // boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)',
                              margin: '2rem',
                              padding: '2rem',
                              cursor: 'move',
                          }}>
                              <h4>Allocate by: {schedule.allocateBy} | {schedule.isBatch ? "Batched" : "Not Batched"}</h4>
                              <p className='m-0 mt-2'>Active days: {schedule.batchInfo && schedule.batchInfo.activeDays.map(item => {
                                if (item === 1) return "Sunday | ";
                                if (item === 2) return "Monday | ";
                                if (item === 3) return "Tuesday | ";
                                if (item === 4) return "Wednesday | ";
                                if (item === 5) return "Thursday | ";
                                if (item === 6) return "Friday | ";
                                if (item === 7) return "Saturday | "; 
                              })}</p>
                              <p className='m-0'>Interval: {`${schedule._id && schedule.batchInfo.interval}`}</p>
                              <hr className='m-0 mb-1'></hr>
                              <p className='m-0'>Start Date: {`${schedule._id && new Date(schedule.startDate)}`}</p>
                              <p className='m-0'>Start Time: {schedule.startTime}</p>
                              <p className='m-0'>End Time: {schedule.endTime}</p>
                              <p className='m-0'>Duration per exam: {schedule && schedule.batchInfo && schedule.batchInfo.duration}</p>
                            
                              <hr></hr>
                              <div>
                                  <div className='d-flex justify-content-start'>
                                      <CustomButton style={{padding: '0.6rem 4rem'}} onClick={toggle}>Edit</CustomButton>
                                  </div>
                              </div>

                          </div>
                      </div>
                  </div>
                }
         </div>
        </div>

        <Modal
          show={showSchedule}
          onHide={() => {
            toggle()
          }}
          style={{ paddingTop: '9rem' }}
        >
          <Scheduler />
        </Modal>
      </div>

      <Modal
            show={show}
            onHide={() => {
               setShow(false)
            }}
            style={{ paddingTop: '9rem' }}
        >
          <Venue 
              id={params.id} 
              setShowVenues={setShowVenues} 
              setShow={setShow}
              fetchAllVenues={fetchAllVenues}
              selectedId={selectedId}
              venues={venues}
          />


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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePipeline)
