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

function CreatePipeline (props) {
  const [analyticSection, setAnalyticSection] = useState('all applicants')
  const [batchSetup, setBatchSetup] = useState(false)
  const [users, setUsers] = useState([])
  const [arrayLength, setArrayLength] = useState(1)
  const [show, setShow] = useState(false)
  const [page, setPage] = useState('venue')

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
        const response = await axios.get(`https://employer-center-api.herokuapp.com/api/v1/schedule/${params.id}`)
        // swal('success', response.data.message, 'success')
        // console.log("Schedule========>", response.data.data)
        setShedule(response.data.data)
    } catch (error) {
        console.log(error.response)
    }
  }


  async function fetchAllVenues(id) {
    try {
        const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/venue/all/${id || params.id}`)
        setVenues(response.data.data)
        httpGetSchedule()
    } catch (error) {
        console.log(error)
    }

}


  useEffect(() => {
    fetchAllVenues()
    httpGetSchedule()
  }, [venues.length])

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
          <NavLink to='/medical-settings'>
            <CustomButton onClick={() => history.goBack()}>Go Back</CustomButton>
          </NavLink>
          <div className='d-flex'>
              <CustomButton onClick={() => setShow(true)}>Add Venue</CustomButton>
            <CustomButton onClick={toggle}>Set Schedule</CustomButton>
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
        <div className='card p-4' style={{ borderRadius: '0.44rem' }}>
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
                            <p className='m-0'>Number of batches: {schedule.batchInfo && schedule.batchInfo.batches.length}</p>
                            <p className='m-0'>Limit per batch: {schedule.batchInfo && schedule.batchInfo.limitPerBatch}</p>
                            <p className='m-0 mt-2'>Batches: </p>
                            <hr className='m-0 mb-1'></hr>
                            {
                                (schedule.batchInfo && schedule.batchInfo.batches.length > 0) ? schedule.batchInfo.batches.map((item, i) => (
                                    <p className='m-0 mb-1' key={item._id}> {item.name}: {item.time}</p>
                                )) : <p style={{ color: 'red'}}>No batch available</p>
                            }
                            <p className='m-0 mt-2'>Active Days: </p>
                            <hr className='m-0 mb-1'></hr>
                            {
                                (schedule.batchInfo && schedule.batchInfo.activeDates.length > 0) ? schedule.batchInfo.activeDates.map((item, i) => (
                                    <p className='m-0' key={item}> {i + 1}. {`${new Date(item.split('T')[0])}`}</p>
                                )) : <p style={{ color: 'red'}}>No Active dates available</p>
                            }
                            <hr></hr>
                            <p className='m-0'>Start Date: {`${schedule._id && new Date(schedule.startDate)}`}</p>
                            <p className='m-0'>Start Time: {schedule.startTime}</p>
                            <p className='m-0'>Status: {schedule.status}</p>
                           
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
