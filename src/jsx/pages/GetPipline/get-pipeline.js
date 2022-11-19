import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { EnvelopeOpen } from 'phosphor-react'

import CustomButton from '../../components/CustomButton/custom-button'
import CustomInput from '../../components/CustomInput/custom-input'
import FormGenerator from '../../components/FormGenerator/form-generator'
import CustomNav from '../../layouts/nav/CustomNav'
import Form from './form'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import FormBase from './form-base'
import FormBaseExam from './form-base-exam'
import swal from 'sweetalert'
import { current } from '@reduxjs/toolkit'

function GetPipeline(props) {
  const {
    pipeline: { PIPELINE },
    auth: {
      auth: { token },
    },
  } = props
  let [index, setIndex] = useState(0)
  let [arr, setArr] = useState([])
  const [currentPipeline, setCurrentPipeline] = useState({
    // sectionType: 'applicationform',
  })
  const params = useParams()
  const history = useHistory()

  async function httpApply() {
    try {
      const response = await axios.post(
        `https://employer-center-api.herokuapp.com/api/v1/application/apply`,
        { jobId: params.id },
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      )
      setCurrentPipeline(response.data.data)
      console.log("response", response)
    } catch (error) {
      console.log(error)
      setCurrentPipeline({message: error.response.data.message})
    }
  }

  useEffect(() => {
    httpApply()
    if (currentPipeline.message) {
      swal("Pending", currentPipeline.message, "info")
      return;
    }
  }, [currentPipeline._id, currentPipeline.message])



  console.log("current pipe",currentPipeline)
  return (
    <>
      <CustomNav />
      <div className='mt-5 p-3 d-flex justify-content-center'>
        <div>
          <h1>{currentPipeline.title}</h1>
        </div>
      </div>

      {
        currentPipeline._id && currentPipeline.sectionType.toLowerCase() === 'exam' &&
        <FormBaseExam
          data={currentPipeline.examData && currentPipeline.examData[0].examQuestions}
        />
      }

      {

        currentPipeline._id && currentPipeline.sectionType.toLowerCase() === 'applicationform' &&
        <div className='container'>
          <div className='row justify-content-center'>
              <FormBase
                // eventHandler={() => console.log('Hello')}
                title='Application Form'
              />
          </div>
        </div>
      }

      {
        !currentPipeline._id && 
        <div className='d-flex justify-content-center align-items-center' style={{marginTop: '15rem'}}>
          <CustomButton onClick={() => history.goBack()}>Go to homepage</CustomButton>
        </div>
      }

    </>
  )
}

const mapStateToProps = (state) => ({
  pipeline: state.pipeline,
  jobPosting: state.jobPosting,
  auth: state.auth,
})

export default connect(mapStateToProps)(GetPipeline)
