import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import swal from 'sweetalert'

import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"

import { Link, useParams, NavLink, useHistory } from 'react-router-dom'
import Select from 'react-select'
import { X, MapTrifold, CalendarCheck, CaretLeft, PlusCircle } from 'phosphor-react'
import c3 from '../../../../images/c3.png'

import { Modal, Row, Col } from 'react-bootstrap'
import Toggle from 'react-toggle'

import { getAllUsers } from '../../../../services/Organisation'
import CustomButton from '../../../components/CustomButton/custom-button'
import CustomNav from '../../../layouts/nav/CustomNav'
import CustomInput from '../../../components/CustomInput/custom-input'
import 'react-toggle/style.css'
import Venue from '../CBTDashboard/venue'
import Scheduler from '../../../components/Scheduler/scheduler'

function CBTSettings (props) {
  const [analyticSection, setAnalyticSection] = useState('all applicants')
  const [users, setUsers] = useState([])
  const [showSchedule, setShowSchedule] = useState(false)
  const [show, setShow] = useState(false)
  const [showVenues, setShowVenues] = useState(false)
  const [page, setPage] = useState("venue")


  const today = new Date()
  const tomorrow = new Date()

  tomorrow.setDate(tomorrow.getDate() + 1)

  const [values, setValues] = useState([])

  
  const params = useParams()
  const history = useHistory()
  
  const [schedule, setShedule] = useState({})
  const [arrayLength, setArrayLength] = useState(1)
  const [batchSetup, setBatchSetup] = useState(false)
  const [batch, setBatch] = useState([]);
  const [venues, setVenues] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const [startTimes, setTimes] = useState([])
  const [allocateBy, setAllocateBy] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [limitPerBatch, setLimitPerBatch] = useState('');
  const [batchTime, setBatchTime] = useState('')
  const [batchDate, setBatchDate] = useState('')

  const [ selectedId, setSelectedId ] = useState({})


  const options = [
    { label: 'By State of origin', value: 'state' },
    { label: 'By Local Government', value: 'localGovernment' },
    { label: 'By Residency', value: 'residency' },
    { label: 'By Location', value: 'location' },
    { label: 'Manual', value: 'manual' },
  ]


  const week_days = [
    { label: 'Monday', value: 'monday' },
    { label: 'Tuesday', value: 'tuesday' },
    { label: 'Wednesday', value: 'wednesday' },
    { label: 'Thursday', value: 'thursday' },
    { label: 'Friday', value: 'friday' },
  ]


  function addBatch(event) {
      const data = [...startTimes ]
      data.push({name: `Batch ${arrayLength}`, time: batchTime, date: batchDate})
      setTimes(data)
  }

  function removeWeekday(day) {
      const data = [...weekDays]
      const filteredDays = data.filter(item => item.toLowerCase() !== day.toLowerCase())
      setWeekDays(filteredDays);
  }

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

  async function httpSendSchedule(event) {
    event.preventDefault();

    let data;
    let response;
    data = {
        isBatch: batchSetup,
        allocateBy,
        startDate: date,
        startTime,
        batchInfo: {
            batches: [...startTimes],
            activeDates: batchSetup ? [...values] : [],
        }
    }


    try {

        response = await axios.post(`https://employer-center-api.herokuapp.com/api/v1/schedule/create/${params.id}`, data)
        swal('success', response.data.message, 'success')
        console.log(response)
        httpGetSchedule()
        fetchAllVenues()
    } catch (error) {
        console.log(error.response)
        swal('Error', error.response.data.message, 'error')
    }

  }
  
  const increment = e => {
    e.preventDefault()
    addBatch()
    setArrayLength(arrayLength + 1)
  }

  const decrement = e => {
    e.preventDefault()
    setArrayLength(arrayLength - 1)
  }

  const toggle = () => {
    setShowSchedule(!showSchedule)
  }
  const toggleBatch = (event) => {
    console.log(event.target.checked)
    setBatchSetup(!batchSetup)
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
      setUsers(response.data.data)
    } catch (error) {
      console.log(error)
      console.log(error.response.message)
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
    
    
    async function deleteVenue(venueId) {
      try {
          const response = await axios.delete(`https://employer-center-api.herokuapp.com/api/v1/venue/${venueId}`)
          swal('success', response.data.message, 'success')
      } catch (error) {
          console.log(error)
      }

      fetchAllVenues()
      httpGetSchedule()
  }

  useEffect(() => {
    fetchAllVenues()
  }, [venues.length])

  useEffect(() => {
    getUsers()
  }, [users.length])

  useEffect(() => {
    httpGetSchedule()
  }, [schedule.isBatch])

  useEffect(() => {
      const initialDate = new Date()
      setValues([...values, initialDate])
  }, [])


  return (
    <>
        <CustomNav />
        {
            
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
            <div className='d-flex justify-content-between mb-4' >
                <NavLink to='#'>
                <CustomButton onClick={() => history.goBack()}>
                    <CaretLeft size={18} style={{marginRight: '0.5rem'}}/>
                    Go Back
                </CustomButton>
                </NavLink>
                <div className='d-flex'>
                <NavLink to='#' onClick={() => {setShow(true); setSelectedId(null)}}>
                    <CustomButton>
                        <MapTrifold size={18} style={{marginRight: '0.5rem'}}/>    
                        Add Venue
                    </CustomButton>
                </NavLink>
                <CustomButton onClick={toggle}>
                    <CalendarCheck size={18} style={{marginRight: '0.5rem'}} />
                    Set Schedule
                </CustomButton>
                </div>
            </div>


            <div className='d-flex my-4 w-100 '>
                

                
                <div
                className='card border-none shadow-none'
                style={{
                    width: '250px',
                    marginRight: '20px'
                }}
                >
                <div onClick={() => setPage("venue")} style={{ cursor: 'pointer'}} className='d-flex p-3 justify-content-between align-items-center'>
                    <div>
                    <p className='mb-1'>{venues.length}</p>
                    <h5 className='text-success'>Venue</h5>
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
                <div onClick={() => setPage("schedule")} style={{ cursor: 'pointer'}} className='d-flex p-3 justify-content-between align-items-center'>
                    <div>
                    <p className='mb-1'>{schedule.batchInfo && schedule.batchInfo.batches.length}</p>
                    <h5 className='text-success'>Schedule</h5>
                    </div>
                    <div>
                    <img src={c3} />
                    </div>
                </div>
                </div>
                
            </div>
            <div className='card p-4' style={{ borderRadius: '0.44rem' }}>
                {/* <CandidateStatus /> */}
               {/* { page === '' && <AllStatus users={users} />} */}
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
        }
        
        

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

export default connect(mapStateToProps, mapDispatchToProps)(CBTSettings)
