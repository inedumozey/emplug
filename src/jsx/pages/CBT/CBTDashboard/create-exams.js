
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import CustomButton from '../../../components/CustomButton/custom-button';
import CustomInput from '../../../components/CustomInput/custom-input'
import CustomSelect from '../../../components/CustomSelect/Custom-select';
import CustomTextArea from '../../../components/CustomTextArea/CustomText';


function CreateExam(props) {
    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState('')
    const [locationType, setLocationType] = useState('')
    const [scoreType, setScoreType] = useState('')
    const [passScore, setPassScore] = useState('')
    const [schedule, setShedule] = useState({})
    const [exam, setExam] = useState({})

    const params = useParams();


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

    async function httpDeleteExams() {
        try {
            const response = await axios.delete(`https://employer-center-api.herokuapp.com/api/v1/examination/${exam._id}`)
            swal("Deleted!", response.data.message, 'info')
        } catch (error) {
            console.log(error)
        }
      }
    
    
    async function httpCreateExams(event) {
        event.preventDefault();
        const data = {
            title,
            instructions,
            locationType,
            scoreType,
            passScore,
            schedule: schedule._id,
            pipeline: params.id
        }

        console.log(data)
        let response;

        try {

            const newData = {
                title,
                instructions,
                locationType,
                scoreType,
                passScore,
            }

            if(exam._id) {
                response = await axios.put(`https://employer-center-api.herokuapp.com/api/v1/examination/${exam._id}`, newData)
            } else {
                response = await axios.post(`https://employer-center-api.herokuapp.com/api/v1/examination/create`, data)
            }
            setExam(response.data.data)
            swal('success', response.data.message, 'success')
        } catch (error) {
            console.log(error.response)
            swal('Something went wrong', error.response.data.message, 'error')
        }
    }
    async function httpGetExams(event) {

        try {
            const response = await axios.get(`https://employer-center-api.herokuapp.com/api/v1/examination/${params.id}`)
            setExam(response.data.data)
            // swal('success', response.data.message, 'success')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        httpGetSchedule()
        httpGetExams()
    }, [])
    
    useEffect(() => {
        if(!exam._id) return;
        setTitle(exam.title)
        setInstructions(exam.instructions)
        setLocationType(exam.locationType)
        setScoreType(exam.scoreType)
        setPassScore(exam.passScore)
    }, [exam._id])

    return(
        <>
            <div className='card p-4 px-0'>
                <div className=' px-4 '>
                <h4>Create Exams</h4>
                <hr></hr>
                    <form className='w-100' onSubmit={httpCreateExams}>
                        <div className='mb-3'>
                            <CustomInput 
                                title='Exam Title' 
                                placeholder="Enter exam title"
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>
                        <div className='mb-3'>
                            <CustomTextArea 
                                title="Exam Instruction" 
                                placeholder="Enter exams instructions"
                                onChange={e => setInstructions(e.target.value)}
                                value={instructions}
                            />
                        </div>
                        <div className='mb-3'>
                            <CustomSelect 
                                title="Location Type *"
                                data={[{name: "Physical"}, {name: "Virtual"}]}
                                placeholder="Select exam location type"
                                onChange={e => setLocationType(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <CustomSelect 
                                title="Score Type *"
                                data={[{name: "Automated"}, {name: "Semi-automated"}, {name: "Manual"}]}
                                placeholder="Select how to score exam"
                                onChange={e => setScoreType(e.target.value.toLowerCase())}
                            />
                        </div>
                        <div className='mb-3'>
                            <CustomInput 
                                title='Pass Score' 
                                placeholder="60" 
                                type="number"
                                onChange={e => setPassScore(e.target.value)}
                                value={passScore}
                            />
                        </div>
                        <div className='d-flex justify-content-between'>
                            <CustomButton style={{background: 'red'}} onClick={httpDeleteExams}>Delete Exam</CustomButton>
                            <div>
                                <CustomButton style={{padding: '0.7rem 2rem'}} type="submit">{exam._id ? "Update" : "Submit"}</CustomButton>
                                <CustomButton style={{background: 'transparent', color: 'red', border: '1px solid red'}} onClick={() => props.setShow(false)}>Close</CustomButton>
                            </div>
                        
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateExam;