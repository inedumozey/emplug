import { X } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import CustomInput from '../../components/CustomInput/custom-input'
import CustomButton from '../../components/CustomButton/custom-button'
import Select from 'react-select'
import axios from 'axios'
import { useParams, Link, useHistory } from 'react-router-dom'
import routes from '../../../routes'

const index = ({auth, pipelineBasicData}) => {
    // const [examTitle, setExamTitle] = useState('')
    const [instruction, setInstruction] = useState('')
    const [location, setLocation] = useState('')
    const [passScore, setPassScore] = useState('')
    const [duration, setDuration] = useState('')
    const [pipelineId, setPipelineId] = useState('')
    const history = useHistory()
    const [examId, setExamId] = useState('')
    const [typeOfScore, setTypeOfScore] = useState();

    const { organization_id, id } = useParams()

    const params = useParams()
    // console.log(params)
    // console.log(organization_id, id)

    useEffect(() => {
        // httpGetSinglePipeline()
        createPipeline()
       
        // console.log("Pipeline Data ====>", pipelineBasicData)
        
    }, [])
    
    const examData = {
        pipeline: pipelineId,
        title: 'pipelineBasicData.title',
        instructions: instruction,
        locationType: location,
        passScore: passScore,
        duration: duration,
        scoreType: typeOfScore,   ///automated, semi-automated, 
        schedule: pipelineId
    }
   
    // Change to exam type
    const locations = [
        {
            label: 'Physical',
            name: 'Physical'
        },
        {
            label: 'Virtual',
            name: 'Virtual'
        }
    ]

    const scoreTypes = [
      {
        label: 'Automated',
        name: 'automated'
      },
      {
        label: 'Semi-automated',
        name: 'semiAutomated'
      },
      {
        label: 'Manual',
        name: 'manual' 
      }
    ]

    const createPipeline = async () => {

      try{
        const res = await axios.post(
          'https://employer-center-api.herokuapp.com/api/v1/pipeline/new',
          pipelineBasicData,
          {
            headers: {
              "Authorization": `Bearer ${auth.token}`,
              'Content-type': 'application/json',
            },
          }
        )
        // console.log(res.data.data.id)
        setPipelineId(res.data.data.id)

        // httpGetExam(res.data.data.id)
      }catch(err){
        console.log(err)
        return;
        // console.log(err)
      }


      // history.push(
      //   routes.examManager.split(':')[0]+organization_id/id
      // )
    }

    async function httpGetSinglePipeline() {
      const url = process.env.REACT_APP_EMPLOYER_CENTER_API
        try {
          const res = await axios.get(`${url}/pipeline/fetch-one/${params.id}`, {
            headers: {
              'authorization': `Bearer ${auth.token}`,
              'Content-type': 'application/json',
            }
          })
          // console.log(res.data.data)
          
        } catch (error) {
          return;
          // console.log(error)
        }
      }

    async function httpCreateExam(e) {
        e.preventDefault();

        const data = {...examData}

        try {
            setGetExam(true)
            const res = await axios.post("https://employer-center-api.herokuapp.com/api/v1/examination/create/", data, {
                headers: {
                    'authorization': `Bearer ${auth.token}`,
                    'Content-type': 'application/json',
                  }
            })
            swal("Created!", res.data.message, "success")
            // ${routes.examManager.split(':')[0]}${id}
            httpGetExam()            
        }
        catch (err) {
            swal("Something went wrong!",err.res.data.message, "error")
        }
    }

    async function httpGetExam() {
      // console.log("Here!!!")
      try{
        const res = await axios.get(
          `https://employer-center-api.herokuapp.com/api/v1/examination/${pipelineId}`,
          {
            headers: {
              'authorization': `Bearer ${auth.token}`,
                'Content-type': 'application/json',
            }
          }
        )
        setExamId(res.data.data.id)
        // console.log("RES EXAM ID =====>",res.data.data)
        // httpGetAllQuestions(res.data.data.id)

        history.push(routes.examManager.split(':')[0]+res.data.data.id+'/'+pipelineId)
        
      }catch(err){
        return;
        // console.log("ERR =====>",err)
      }
    }



  return (
    <>
        <div className='card p-4 px-0'>
          <div className='d-flex px-4 justify-content-between align-item-center'>
            <h3 className='mb-0'>Basic Setup</h3>
            <div
              role='button'
              className='mb-0'
            //   onClick={props.toggle}
            >
              <X size='25px' />
            </div>
          </div>
          <hr />
          <form className='py-4 px-5' 
          onSubmit={httpCreateExam}
          >
            {/* <div className='mb-4'>
              <label>
                Exam Title
                <span
                  className='text-primary'
                  style={{ marginLeft: '12px' }}
                >
                  *
                </span>
              </label>
                  
              <CustomInput 
              placeholder='Add Exam Title' 
              onChange={e => setExamTitle(e.target.value)} 
            //   defaultValue={title}
              />
            </div> */}
            <div className='mb-4'>
              <label>
                Instruction
                <span
                  className='text-primary'
                  style={{ marginLeft: '12px' }}
                >
                  *
                </span>
              </label>
                  
              <CustomInput 
              placeholder='Instruction' 
              onChange={e => setInstruction(e.target.value)} 
            //   defaultValue={title}
              />
            </div>
            <div className='mb-4'>
              <label>
                Exam type
                <span
                  className='text-primary'
                  style={{ marginLeft: '12px' }}
                >
                  *
                </span>
              </label>
              <Select
                options={locations.map(item => ({
                    label: item.label,
                    name: item.name
                }))}
                title='Location'
                placeholder='Please select'
                onChange={e => (
                  console.log(e.name, location),
                  setLocation(e.name)
                )}
                />
            </div>
            <div className='mb-4'>
              <label>
                Score type
                <span
                  className='text-primary'
                  style={{ marginLeft: '12px' }}
                >
                  *
                </span>
              </label>
              {/* <input
                type="text"
                value={scoreTypes[1]}
                disabled
                onChange={e => (
                  console.log(e.name, typeOfScore),
                  setTypeOfScore(e.name)
                )}
              /> */}
              <CustomInput 
                disabled
                placeholder='Score Types' 
                onChange={e =>  setTypeOfScore(e.name)} 
                defaultValue={scoreTypes[1].name}
              />
              {/* <Select
                options={scoreTypes.map(item => ({
                    label: item.label,
                    name: item.name
                }))}
                title='Score Type'
                placeholder='Please select'
                onChange={e => (
                  console.log(e.name, typeOfScore),
                  setTypeOfScore(e.name)
                )}
                /> */}
            </div>
            <div className='mb-4'>
              <label>
                Pass Score (%)
                <span
                  className='text-primary'
                  style={{ marginLeft: '12px' }}
                >
                  *
                </span>
              </label>
                  
              <CustomInput 
              placeholder='20' 
              onChange={e => setPassScore(e.target.value)} 
            //   defaultValue={title}
              />
            </div>
            <div className='mb-4'>
              <label>
                Duration (min)
                <span
                  className='text-primary'
                  style={{ marginLeft: '12px' }}
                >
                  *
                </span>
              </label>
                  
              <CustomInput 
              placeholder='60' 
              onChange={e => setDuration(e.target.value)} 
            //   defaultValue={title}
              />
            </div>
            {/* <CustomButton type='submit'>Submit</CustomButton> */}
            <hr />
            <div className='d-flex align-items-center justify-content-between'>
              <div>{''}</div>
              <div className='px-4'>
                {/* <CustomButton
                  type='submit'
                //   onClick={props.toggle}
                  style={{
                    background: '#ECECEC',
                    color: 'black'
                  }}
                >
                  Cancel
                </CustomButton> */}
                {/* <Link  to={`${routes.examManager.split(':')[0]}${id}`}> */}
                    <CustomButton type='submit'>Start Now</CustomButton>
                {/* </Link> */}
              </div>
            </div>
          </form>
        </div>
    </>
  )
}

export default index