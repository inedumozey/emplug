import { useState, useEffect } from 'react'
import axios from 'axios'
import CustomButton from '../CustomButton/custom-button'
import CustomInput from '../CustomInput/custom-input'

import CreateExamForm from '../../components/CreateExamForm'

import Select from 'react-select'
import { X } from 'phosphor-react'
import CustomSelect from '../CustomSelect/Custom-select'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import routes from '../../../routes'
import swal from 'sweetalert'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import CoordinatorsSelect from '../CoordinatorsSelect/coordinators-select'

function PipelineBasicForm(props) {
  const {auth:{auth}} = props
  const [title, setTitle] = useState('')
  const [coordinator, setCoordinator] = useState('')
  const [subCoords, setSubCoords] = useState([])
  const [staffs, setStaffs] = useState([])
  const [addByEmail, setAddByEmail] = useState(false);
  const [staffEmails, setStaffEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const history = useHistory()
  const params = useParams()

  // console.log(params)

  const [showExamForm, setShowExamForm] = useState(false)

  // props.section.sectionId === 'Exam'  && setShow


// console.log(auth)

  async function getOrganisationStaff() {
    try {
      const url = process.env.REACT_APP_EMPLOYER_CENTER_API
      const response = await axios.get(
        `${url}/organization/organization-staffs?organizationId=${params.organization_id}`, {
          headers: {
          'Authorization': `Bearer ${auth.token}`
        }}
      )

      setStaffs(response.data.data)
    } catch (error) {
      return;
      // console.log(error.response)
    }
  }
  // let pipelineBasicData
  const pipelineBasicData = {
    title,
    coordinator: coordinator,
    sub_coordinators: subCoords,
    jobId: params.id,
    sectionType: !props.isEditing ? props.section.sectionId : props.selectedPipeline.sectionType,
    sectionId: !props.isEditing ? props.section._id : props.selectedPipeline.sectionId,
  }

  

  async function createPipeline(event) {
    event.preventDefault()
    setLoading(true)

    if(event.which === 13) return;

    // validate 
    if(!pipelineBasicData.title || !pipelineBasicData.title || !pipelineBasicData.sub_coordinators.length){
      setErrorMsg('All fileds are required');
      setLoading(false)
    }
    else{
      
      try {

        const url = process.env.REACT_APP_EMPLOYER_CENTER_API
        // if not editing, create new
        if(!props.isEditing){
          const response = await axios.post(
            `${url}/pipeline/new`,
            pipelineBasicData,
            {
              headers: {
                "Authorization": `Bearer ${auth.token}`,
                'Content-type': 'application/json',
              },
            }
          )
    
          if (
            props.section.sectionId.toLowerCase() ===
            'ApplicationForm'.toLowerCase()
          ) {
            return history.push(
              routes.applicationDashboard.split(':')[0] +
                params.organization_id +
                '/' +
                params.id +
                '/' +
                response.data.data._id
            )
          }
    
          if (
            props.section.sectionId.toLowerCase() ===
            'CustomizedForm'.toLowerCase()
          ) {
            return history.push(
              routes.customizedFormDashboard.split(':')[0] +
                params.organization_id +
                '/' +
                params.id +
                '/' +
                response.data.data._id
            )
          }
    
          if (props.section.sectionId.toLowerCase() === 'Medical'.toLowerCase()) {
            return history.push(
              routes.medicalDashboard.split(':')[0] +
                params.organization_id +
                '/' +
                params.id +
                '/' +
                response.data.data._id
            )
          }
    
          if (props.section.sectionId.toLowerCase() === 'Exam'.toLowerCase()) {
            return history.push(
              routes.cbtDashboard.split(':')[0] +
                params.organization_id +
                '/' +
                params.id +
                '/' +
                response.data.data._id
            )
          }
    
          if (props.section.sectionId.toLowerCase() === 'Interview'.toLowerCase()) {
            return history.push(
              routes.interviewDashboard.split(':')[0] +
                params.organization_id +
                '/' +
                params.id +
                '/' +
                response.data.data._id
            )
          }
    
          if (props.section.sectionId.toLowerCase() === 'Job'.toLowerCase()) {
            return history.push(
              routes.medicalDashboard.split(':')[0] +
                params.organization_id +
                '/' +
                params.id +
                '/' +
                response.data.data._id
            )
          }
    
          if (
            props.section.sectionId.toLowerCase() ===
            'TermsAndContract'.toLowerCase()
          ) {
            return history.push(
              routes.medicalDashboard.split(':')[0] +
                params.organization_id +
                '/' +
                params.id +
                '/' +
                response.data.data._id
            )
          }
    
          if (
            props.section.sectionId.toLowerCase() === 'officialLetter'.toLowerCase()
          ) {
            return history.push(
              routes.officialLetter.split(':')[0] +
                params.organization_id +
                '/' +
                params.id +
                '/' +
                response.data.data._id
            )
          }


        }
        else{
          // update
          const response = await axios.put(
            `${url}/pipeline/update/${props.selectedPipeline._id}`,
            pipelineBasicData,
            {
              headers: {
                "Authorization": `Bearer ${auth.token}`,
                'Content-type': 'application/json',
              },
            }
          )
          // console.log({pipelineBasicData})          
        }
  
         // get all pipelines after successfully created one
         props.getPipelines()
  
         // remove the create pipeline modal
         props.toggle()

         setLoading(false)
         setErrorMsg('')
      }
      catch (error) {
        setErrorMsg('Something went wrong!', error.response.data.message)
        setLoading(false)
      }
    }
   
  }

  async function httpInviteUserByEmail() {
    const  data = {
      organizationId: params.organization_id,
      email: [...staffEmails]
    }

    try {
      const response = await axios.post(
        `https://employer-center-api.herokuapp.com/api/v1/admin/invite_user`,
        data,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
        }
        )
        
        swal('Successful!', response.data.message, 'success')
      } catch (error) {
        console.log(error.response)
        swal('Something went wrong!', error.response.data.message, 'error')
      }

  }

  function transformStaffIds(arr) {
    const data = [...arr]
    const cache = {}
    for(let i = 0; i < data.length; i++) {
      if(!cache[data[i]]) {
        cache[data[i]] = true
      }
    }
    const selected_staff = [...staffs]
    const filteredStaff = []
    for (let j = 0; j < selected_staff.length; j++) {
      if(cache[selected_staff[j]._id]) {
        filteredStaff.push(selected_staff[j])
      }
    }
    return filteredStaff;
  }

  function removeStaff(id) {
    const newArr = subCoords.filter(item => item !== id)
    setSubCoords(newArr);
  }

  useEffect(() => {
  }, [subCoords.length])

  useEffect(() => {
    getOrganisationStaff()
  }, [staffs.length])

  // console.log(transformStaffIds(subCoords))

  return (
    <>
      {
        <div className='card p-4 px-0'>
          <div className='d-flex px-4 justify-content-between align-item-center'>
            <h3 className='mb-0'> {props.isEditing ? `Editing ${props.selectedPipeline.title}` : `Set ${props.title} Pipleline`}</h3>
            <div
              role='button'
              className='mb-0'
              onClick={() => {
                props.toggle('')
              }}
            >
              <X size='25px' />
            </div>
          </div>
          <hr />
          <form className='py-4 px-5' onSubmit={loading ? ()=>{return} : (e)=>createPipeline(e)}>
            {
              errorMsg ? <div style={{color: 'var(--bs-danger)', marginBottom: '4px', fontStyle:' italic', textAlign: 'center'}} >{errorMsg}</div> : ''
            }
            <div className='mb-4'>
              <label>
                Title
                <span className='text-primary' style={{ marginLeft: '12px' }}>
                  *
                </span>
              </label>
              <CustomInput
                placeholder='Add Pipeline Title'
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </div>
            <div className='mb-4'>
              <label>
                Add Coordinator{' '}
                <span className='text-primary' style={{ marginLeft: '12px' }}>
                  *
                </span>
              </label>
              <CustomSelect
                data={staffs.map((item) => ({
                  name: item.fullName,
                  id: item._id,
                  email: item.email,
                }))}
                title='Coordinator'
                placeholder='Please select'
                onChange={(e) => setCoordinator(e.currentTarget.value)}
              />

              {/* <CoordinatorsSelect orgId={params.organization_id} token={auth.token} /> */}
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <p className='mb-0'>
                Add {Object.keys(subCoords).filter((item) => staffs[item]).length} subcoordinator
                {Object.keys(subCoords).filter((item) => staffs[item]).length > 1
                  ? 's'
                  : null}{' '}
                {/* as staff
                {Object.keys(subCoords).filter((item) => staffs[item]).length > 1
                  ? 's'
                  : null}{' '} */}
                to pipeline
              </p>
              <div className='d-flex align-items-center'>
                <input type="checkbox" className='mx-1' onChange={e => setAddByEmail(e.target.checked)}/>
                <label className='mt-2'><strong>Add by email</strong></label>
              </div>
            </div>
          
            {subCoords.length > 0 && <ul className='d-flex flex-wrap'>
              {
                [...transformStaffIds(subCoords)].map(staff => (
                  <li className='mx-2 p-1' onClick={() => removeStaff(staff._id) } style={{
                    background: '#02024D',
                    color: 'white',
                    borderRadius: '0.44rem',
                    cursor: 'pointer'
                  }} key={staff._id}>{staff.fullName.split(' ')[0]}</li>
                ))
              }
            </ul>}
            <hr></hr>
            {
              addByEmail ?

              <>
                <div className='d-flex align-items-center' style={{background: '#fafffe', flexWrap: 'wrap'}}>
                  {
                    staffEmails.map(item => (
                      <div key={item} onClick={() => setStaffEmails([...staffEmails.filter(email => email !== item)])} style={{cursor: 'pointer', border: '1px solid #eee', padding: '0.5rem', borderRadius: '0.44rem', marginRight: '1rem', marginBottom: '1rem'}}>{item.toLowerCase()}</div>
                    ))
                  }
                  <CustomInput type="text" placeholder="Enter email" onKeyPress={e => {
                    if(e.which === 13) {
                      setStaffEmails([...staffEmails, e.target.value])
                      e.target.value = ""
                    }
                  }} style={{width: '15rem', border: 'none', background: '#fafffe'}}/>
                </div>
                <CustomButton style={{width: '100%'}} onClick={() => httpInviteUserByEmail}>Add staff</CustomButton>
              </> 
              :
              <div className='mb-4'>
                <label>Add subcordinator</label>
                <CustomSelect
                  data={staffs.map((item) => ({
                    name: item.fullName,
                    id: item._id,
                    email: item.email,
                  }))}
                  title='Sub-Coordinators'
                  placeholder='Ex: Business'
                  onChange={(e) =>{
                    setSubCoords(prev => ([...prev, e.target.value]));
                  }}
                />
              </div> 
            }

            {/* <CustomButton type='submit'>Submit</CustomButton> */}
            <hr />
            <div className='d-flex align-items-center justify-content-between'>
              <div>{''}</div>
              <div className='px-4'>
                <CustomButton
                  type='submit'
                  onClick={props.toggle}
                  style={{
                    background: '#ECECEC',
                    color: 'black',
                  }}
                >
                  Cancel
                </CustomButton>
                <CustomButton disable={true} type='submit'>{ loading ? 'Loading...' : props.isEditing ? 'Update' : 'Create'}</CustomButton>
              </div>
            </div>
          </form>
        </div>
      }
      {/* <Modal 
        show={showExamForm}
        onHide={() => setShowExamForm(false)}
        style={{ paddingTop: '9rem' }}
         >
           <CreateExamForm auth={auth} pipelineBasicData={pipelineBasicData}/>
      </Modal> */}
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PipelineBasicForm)
