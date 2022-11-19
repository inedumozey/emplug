
import { useState, useEffect } from 'react'

import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import swal from 'sweetalert'

import {  PlusCircle } from 'phosphor-react'
import Select from 'react-select'
import {  Row, Col } from 'react-bootstrap'
import Toggle from 'react-toggle'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"

import CustomInput from '../CustomInput/custom-input'
import CustomButton from '../CustomButton/custom-button'
import { connect } from 'react-redux'


function Scheduler(props) {
    const params = useParams()
    
    const [arrayLength, setArrayLength] = useState(1)
    const [batchSetup, setBatchSetup] = useState(false)
    const [weekDays, setWeekDays] = useState([]);
    const [startTimes, setTimes] = useState([])
    const [allocateBy, setAllocateBy] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [batchTime, setBatchTime] = useState('')
    const [batchDate, setBatchDate] = useState('')
    const [values, setValues] = useState([])
    const [duration, setDuration] = useState('')
    const [interval, updateInterval] = useState('')
    const [endTime, setEndTime] = useState('')
    

    const {
        auth: { auth }
       
    } = props;

    const options = [
        { label: 'By State of origin', value: 'state' },
        { label: 'By Local Government', value: 'localGovernment' },
        { label: 'By Residency', value: 'residency' },
        { label: 'By Location', value: 'location' },
        { label: 'Manual', value: 'manual' },
      ]


    async function httpSendSchedule(event) {
        event.preventDefault();
    
        let data;
        let response;
        data = {
            isBatch: batchSetup,
            allocateBy,
            startDate: date,
            startTime,
            endTime,
            batchInfo: {
                duration,
                interval,
                activeDays: [...values],
            }
        }
    
        try {
    
            response = await axios.post(`https://employer-center-api.herokuapp.com/api/v1/schedule/create/${params.id}`, data, {
                headers: {
                    'authorization': `Bearer ${auth.token}`,
                    'Content-type': 'application/json',
                  }
            })
            swal('success', response.data.message, 'success')
            httpGetSchedule()            
        } catch (error) {
            console.log(error.response)
            swal('Error', error.response.data.message, 'error')
        }
    
      }

    async function httpGetSchedule() {
    
        try {
    
            response = await axios.post(`https://employer-center-api.herokuapp.com/api/v1/schedule/${params.id}`, {
                headers: {
                    'authorization': `Bearer ${auth.token}`,
                    'Content-type': 'application/json',
                  }
            })
            swal('success', response.data.message, 'success')
            console.log(response)
            
        } catch (error) {
            console.log(error.response)
            swal('Error', error.response.data.message, 'error')
        }
    
      }


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
        // setShowSchedule(!showSchedule)
      }
      const toggleBatch = (event) => {
        console.log(event.target.checked)
        setBatchSetup(!batchSetup)
      }

      function covertToDays(days=[]) {
          const data = days.map(item => {
              if (item === 1) return "Sunday";
              if (item === 2) return "Monday";
              if (item === 3) return "Tuesday";
              if (item === 4) return "Wednesday";
              if (item === 5) return "Thursday";
              if (item === 6) return "Friday";
              if (item === 7) return "Saturday";
          })

          return data;
      }

      function removeDay(day) {

        const getIndex =  values.map(item => {
            if(day === "Sunday") return 1;
            if(day === "Monday") return 2;
            if(day === "Tuesday") return 3;
            if(day === "Wednesday") return 4;
            if(day === "Thursday") return 5;
            if(day === "Friday") return 6;
            if(day === "Saturday") return 7;
        })

        const data = values.filter(item => item !== getIndex[0])
        setValues(data);
      }


    //   useEffect(() => {
    //       httpGetSchedule()
    //   }, [])



    return (
    <>

        {
            <div className='card p-4 px-0'>
                <div className='d-flex px-4 justify-content-between align-item-center'>
                <h3
                    className='mb-0'
                    style={{
                        fontSize: '18px'
                    }}
                >
                    Schedule Management
                </h3>
                <div>
                    <Toggle defaultChecked={batchSetup} onChange={toggleBatch} />
                    {/* <div>
                    <label className='d-flex align-items-center'>
                        <h4
                        className='label-text fw-bold mb-0'
                        style={{
                            marginRight: '12px'
                        }}
                        >
                        Batch setup
                        </h4>
                    </label>
                    </div> */}
                </div>
                </div>
                <hr />
                
                    <div>
                        <form className='py-4 px-5' onSubmit={httpSendSchedule}>
                        <Row>
                            <Col sm='12' md='6'>
                            <div className='mb-4'>
                                <label>
                                Start date
                                <span
                                    className='text-primary'
                                    style={{ marginLeft: '12px' }}
                                >
                                    *
                                </span>
                                </label>
                                <CustomInput type='date' onChange={e => setDate(e.target.value)}/>
                            </div>
                            </Col>
                            <Col sm='12' md='6'>
                            <div className='mb-4'>
                                <label>
                                Start Time
                                <span
                                    className='text-primary'
                                    style={{ marginLeft: '12px' }}
                                >
                                    *
                                </span>
                                </label>
                                <CustomInput type='time' onChange={e => setStartTime(e.target.value)}/>
                            </div>
                            </Col>
                            <Col sm='12' md='6'>
                            <div className='mb-4'>
                                <label>
                                Duration per exam
                                <span
                                    className='text-primary'
                                    style={{ marginLeft: '12px' }}
                                >
                                    *
                                </span>
                                </label>
                                <CustomInput 
                                    type='number' 
                                    placeholder="Enter exam duration" 
                                    onChange={e => setDuration(e.target.value)}/>
                            </div>
                            </Col>
                            <Col sm='12' md='6'>
                            <div className='mb-4'>
                                <label>
                                End Time
                                <span
                                    className='text-primary'
                                    style={{ marginLeft: '12px' }}
                                >
                                    *
                                </span>
                                </label>
                                <CustomInput 
                                    type='time' 
                                    onChange={e => setEndTime(e.target.value)}/>
                            </div>
                            </Col>
                        </Row>
                            <Row>
                                <Col>
                                    <CustomInput 
                                        style={{
                                            width: '14rem', 
                                            marginBottom: '2rem'
                                            }} type='number' 
                                            title="Interval" 
                                            placeholder="interval duration" 
                                            onChange={e => updateInterval(e.target.value)}/>
                                </Col>
                            </Row>
                        <Row className='mb-4'>
                            <Col>
                                
                                <div className='mb-4'>
                                    <label>Active days</label>
                                    {
                                        values.length > 0 &&
                                        <div className='p-3'>
                                            {covertToDays(values).map((item, i) => <span onClick={() => removeDay(item)} key={i.toString()} style={{cursor: 'pointer', padding: '0.5rem', background: '#00b500', color: 'white', marginRight: '1rem', fontSize: '0.6rem'}}>{item}</span>)}
                                        </div>
                                    }
                                    <Select
                                        onChange={e => setValues([...values, e.value])}
                                        options={[{label: 'Sunday', value: 1}, {label: 'Monday', value: 2}, {label: 'Tuesday', value: 3}, {label: 'Wednesday', value: 4}, {label: 'Thursday', value: 5}, {label: 'Friday', value: 6}, {label: 'Saturday', value: 7}, ]}
                                        title='Sub-Coordinators'
                                        placeholder='Please select active days'
                                    />
                                </div>
                                {/* <DatePicker
                                    onChange={setValues}
                                    multiple
                                    value={values} 
                                    plugins={[
                                        <DatePanel />
                                    ]}
                                    placeholder="Select Days to exclude"
                                    style={{
                                        backgroundColor: "#fafffe",
                                        // height: "1rem",

                                        borderRadius: "0.44rem",
                                        border: '1px solid #eee',
                                        fontSize: "14px",
                                        padding: "1.3rem 10px"
                                    }}
                                 /> */}
                            </Col>
                        
                        </Row>

                        <div className='mb-4'>
                            <label>Sort Parameter(how to allocate applicants)</label>
                            <Select
                                onChange={e => setAllocateBy(e.value)}
                                options={options}
                                title='Sub-Coordinators'
                                placeholder='Please select'
                            />
                        </div>
                        <hr />
                            <div className='d-flex align-items-center justify-content-between'>
                                <div>{''}</div>
                                <div className='px-4'>
                                    <CustomButton
                                    type='submit'
                                    onClick={toggle}
                                    style={{
                                        background: '#ECECEC',
                                        color: 'black'
                                    }}
                                    >
                                    Cancel
                                    </CustomButton>
                                    <CustomButton type='submit'>Create</CustomButton>
                                </div>
                            </div>
                        </form>
                    </div>
              
                {/* <form className='py-4 px-5' onSubmit={httpSendSchedule}>
                    <Row>
                    <Col sm='12' md='6'>
                        <div className='mb-4'>
                        <label>
                            Start date
                            <span
                            className='text-primary'
                            style={{ marginLeft: '12px' }}
                            >
                            *
                            </span>
                        </label>
                        <CustomInput type='date' onChange={e => setDate(e.target.value)}/>
                        </div>
                    </Col>
                    <Col sm='12' md='6'>
                        <div className='mb-4'>
                        <label>
                            Start Time
                            <span
                            className='text-primary'
                            style={{ marginLeft: '12px' }}
                            >
                            *
                            </span>
                        </label>
                        <CustomInput type='time' onChange={e => setStartTime(e.target.value)} />
                        </div>
                    </Col>
                    </Row>

                    <div className='mb-4'>
                        <label>Sort Parameter(how to allocate applicants)</label>
                        <Select
                            onChange={e => setAllocateBy(e.value)}
                            options={options}
                            title='Candidate Allocation'
                            placeholder='Please select'
                        />
                    </div>
                    <CustomButton type='submit'>Submit</CustomButton>
                    <div className='d-flex align-items-center justify-content-between'>
                            <div>{''}</div>
                            <div className='px-4'>
                                <CustomButton
                                type='submit'
                                onClick={toggle}
                                style={{
                                    background: '#ECECEC',
                                    color: 'black'
                                }}
                                >
                                Cancel
                                </CustomButton>
                                <CustomButton type='submit'>Create</CustomButton>
                            </div>
                        </div>
                </form>
                
               */}

                
            </div>
        }

    </>)
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Scheduler);