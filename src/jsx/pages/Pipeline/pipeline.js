import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory, NavLink, useParams } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import {
  Buildings,
  EnvelopeSimple,
  Exam,
  FileText,
  FirstAidKit,
  Handshake,
  UserSquare,
  Pencil,
  PencilSimple,
  X,
  Power,
  Eye,
  Trash,
} from 'phosphor-react'


import {
  getSinglePipeline,
  createJobPipeline,
  updatePipeline,
  getOneForm,
  removeForm,
} from '../../../store/actions/PipelineManager/pipeline-manager.actions'

import CustomButton from '../../components/CustomButton/custom-button'
import CustomInput from '../../components/CustomInput/custom-input'
import CustomSelect from '../../components/CustomSelect/Custom-select'

import Footer from '../../layouts/Footer'
import CustomNav from '../../layouts/nav/CustomNav'

import pagesRoutes from '../../../routes'
import PipelineForm from '../../components/PipelineBasicForm/pipeline-basic-form'

import './pipeline.styles.css'
import routes from '../../../routes'

// pipeline dnd
// import { Container, Draggable } from 'react-smooth-dnd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import swal from 'sweetalert'


import { getRelatedRoute } from './pipeline-utils'

function Pipeline({
  auth,
  token,
  createJobPipeline,
  getOneForm,
  job_view,
  pipeline: { PIPELINE },
  getSinglePipeline,
  togglePipeline,
  removeForm,
}) {
  const options = [
    {
      label: 'Mbiplang Ardel',
      name: 'Mbiplang Ardel',
      value: '6241b038a2e5695e68279e1d',
    },
    {
      label: 'Femi Deniyi',
      name: 'Femi Deniyi',
      value: '62432d8401b7a38f47fca423',
    },
  ]
  const [show, setShow] = useState(false)
  const [showPipelineForm, setShowPipelineForm] = useState(false)
  const [showPipelineSetup, setShowPipelineSetup] = useState(false)
  const [pipelineTitle, setPipelineTitle] = useState('')
  const [section, setSection] = useState('')
  const [pipeOptions, setPipeOptions] = useState([])
  const [pipelines, setPipelines] = useState([])
  const [draggedItem, setDraggedItem] = useState()
  const [draggedOver, setDraggedOver] = useState()
  const [pipelineRes, setPipelineRes] = useState()
  const [showbottomLine, setShowBottomLine] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedPipeline, setSelectedPipeline] = useState("")
  const [updatingActive, setUpdatingActive] = useState({status: false, id: null})
  const [deletingPipeline, setDeletingPipeline] = useState({status: false, id: null})
  

  const toggle = (title) => {
    setShow(!show)
    setShowPipelineSetup(!showPipelineSetup)
    setPipelineTitle(title)
  }

  const history = useHistory()

  const params = useParams()
  

  const jobId = history.location.pathname.split('/')[2]

  function httpCreateJobPipeline() {
    if (PIPELINE[0]._id) {
      togglePipeline({ pipelineSections: PIPELINE }, job_view._id, auth.token)
      setShow(false)
      return
    }
    createJobPipeline(
      {
        job: job_view._id,
        pipelineSections: PIPELINE,
      },
      auth.token
    )
    setShow(false)
  }
  function reorderPipelines(event) {
    let data = [...pipelines]
    const drag = data[draggedItem]
    const over = data[draggedOver]

    data.splice(draggedOver, 1, drag)
    data.splice(draggedItem, 1, over)
    setPipelines(data)
    setShowBottomLine(false)
  }


  async function getPipelineSections() {
    try {
      const response = await axios.get(
        'https://employer-center-api.herokuapp.com/api/v1/pipeline_section/fetch',
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
            'Content-type': 'application/json',
          },
        }
      )
      // console.log(response.data.data)
      setPipeOptions(response.data.data)
      // console.log(response.data.data)
    } catch (error) {
      // console.log(error.response)
    }
  }

  async function getPipelines() {
    try {
      const response = await axios.get(
        `https://employer-center-api.herokuapp.com/api/v1/pipeline/single/${params.id}`,
        {
          headers: {
            'authorization': `Bearer ${auth.token}`,
            'Content-type': 'application/json',
          },
        }
      )
      
      setPipelineRes(response.data.data)
      setPipelines(response.data.data[0].pipelines)
    } catch (error) {
      // console.log(error.response)
    }
  }

  // async function toggleAndDeletePipeline(data, action = 'update') {

  //   const result = data.index - 1;

  //   if((result >= 0) && !pipelines[result].active) {
  //     console.log("inside: ",result)
  //     swal("Info", "activate previous pipeline first", 'info')
  //     return 
  //   }

  //   delete data.index;
    
  //   try {
  //     let response

      
  //     if (action === 'update') {
  //       response = await axios.put(
  //         `https://employer-center-api.herokuapp.com/api/v1/pipeline/update/${data._id}`,
  //         data,
  //         {
  //           headers: {
  //             'Content-type': 'application/json',
  //             'authorization': `Bearer ${auth.token}`,
  //           },
  //         })

  //       // console.log(response)
  //     } else {
  //       response = await axios.delete(`https://employer-center-api.herokuapp.com/api/v1/pipeline/delete/${data._id}`, {
  //         headers: {
  //           'Content-type': 'application/json',
  //           'authorization': `Bearer ${auth.token}`,
  //         },
  //       })
  //     }
  //     swal("Successful!", response.data.message, "info")
  //     getPipelines()
  //   } catch (error) {
  //     // console.log(error.response)
  //   }
  // }

  function resetForm(params) {
    setShow(true)
  }
  
  useEffect(() => {
    getSinglePipeline(job_view._id, auth.token)
  }, [])

  useEffect(() => {
    getPipelineSections()
    getPipelines()
  }, [])

  function routeTo(type = '') {
    switch (type) {
      case 'Medical'.toLowerCase():
        return routes.medicalDashboard

      case 'Exams'.toLowerCase():
        return routes.cbtDashboard

      default:
        return history.location.pathname
    }
  }


  // useEffect(() => {
  //   getOrganisationStaff()
  // }, [])

  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(pipelines)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setPipelines(items)
  }
  
  const openPipelineCategory =(title)=>{
    setShowPipelineSetup(true);
    setIsEditing(false)

    // as soon as Pipeline Setup is opened, close pipeline Form
    setShowPipelineForm(false);
    setPipelineTitle(title)
  }
  const handleEdit =(item)=>{
    setSelectedPipeline(item);
    setShowPipelineSetup(true)
    // setPipelineTitle(`Edit ${item.title} Pipeline`)
    setIsEditing(true)
  }


// activate and inactivate pipeline
const toggleActiveAndInactive = async(data)=>{
  setUpdatingActive({status: true, id: data._id})
  try{
    const response = await axios.put(
      `https://employer-center-api.herokuapp.com/api/v1/pipeline/update/${data._id}`,
      data,
      {
        headers: {
          'Content-type': 'application/json',
          'authorization': `Bearer ${auth.token}`,
        },
      })

    swal("Successful!", response.data.message, "info")
    getPipelines();
    setUpdatingActive({status: false, id: null})
  }
  catch(err){
    setUpdatingActive({status: false, id: null})
  }
}

// delete pipeline
const deletePipeline = async(id)=>{
  setDeletingPipeline({status: true, id})
  try{
    const response = await axios.delete(
      `https://employer-center-api.herokuapp.com/api/v1/pipeline/delete/${id}`,
      {
        headers: {
          'Content-type': 'application/json',
          'authorization': `Bearer ${auth.token}`,
        },
      })

    swal("Successful!", response.data.message, "info")
    getPipelines();
    setDeletingPipeline({status: false, id: null})
  }
  catch(err){
    setDeletingPipeline({status: false, id: null})
  }
}


  return (
    <>
      <CustomNav />
      <div className='mt-5 px-5'>
        <div className='card mb-5 p-5' style={{ borderRadius: '0.4rem' }}>
          <div
            className='d-flex justify-content-between align-items-center'
            style={{ borderBottom: '1px solid #eee' }}
          >
            <h4 style={{ color: '#7f7f7f' }}>
              Sections for {job_view.title} at {job_view.location}
            </h4>
            <div className='d-flex'>
              <Link to={`${pagesRoutes.job.split(':')[0]}${job_view._id}`}>
                <CustomButton>View Job Details</CustomButton>
              </Link>
              <CustomButton onClick={()=>setShowPipelineForm(true)}>+ Add Pipeline</CustomButton>
            </div>
          </div>
          <div className='mt-3'>
            <p>
              Select new sections for your pipeline and arrange them in the
              order you want
            </p>
          </div>

          <div style={{ minHeight: '30rem' }} className='d-flex flex-wrap'>
            {pipelines.length === 0 ? (
              <div
                className='w-100 d-flex justify-content-center align-items-center'
                style={{ minHeight: '100%' }}
              >
                <CustomButton onClick={()=>setShowPipelineForm(true)}>+ Add Pipeline</CustomButton>
              </div>
            ) : (
              <div className='px-5 d-flex justify-content-center w-100'>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId='pipelines'>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {pipelines.length > 0 &&
                          pipelines.map((item, index) => {
                            
                            if (item.active) {
                              return (

                              <div key={item._id}>
                                    <div
                                      title='Click and drag to reorder the pipelines'
                                      className='d-flex justify-content-between align-items-center'
                                      style={{
                                        borderRadius: '0.44rem',
                                        background: '#2E2E62',
                                        border: '1px dashed #7f7f7f',
                                        width: '80rem',
                                        // width: '60rem',
                                        margin: '2rem',
                                        padding: '2rem',
                                        cursor: 'move',
                                        // borderBottom: `${
                                        //   showbottomLine && draggedOver === i
                                        //     ? '5px solid #02024D'
                                        //     : '1px dashed #7f7f7f'
                                        // }`,
                                      }}
                                    >
                                      <div>
                                        <h4 style={{color: 'white'}} className="text-capitalize"> 
                                          {item.sectionType.toLowerCase() ===
                                            'exam' && ( 
                                            <Exam
                                              size={62}
                                              color='white'
                                              style={{
                                                background: '#02024D',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {(item.sectionType.toLowerCase() ===
                                            'applicationform' || item.sectionType.toLowerCase() ===
                                            'customizedform') && (
                                            <FileText
                                              size={62}
                                              color='white'
                                              style={{
                                                background: '#02024D',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.icon === 'UserSquare' && (
                                            <UserSquare
                                              size={62}
                                              color='white'
                                              style={{
                                                background: '#02024D',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.sectionType.toLowerCase() ===
                                            'medical' && (
                                            <FirstAidKit
                                              size={62}
                                              color='white'
                                              style={{
                                                background: '#02024D',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.sectionType.toLowerCase() ===
                                            'job' && (
                                            <EnvelopeSimple
                                              size={62}
                                              color='white'
                                              style={{
                                                background: '#02024D',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.sectionType.toLowerCase() ===
                                            'officialletter' && (
                                            <Handshake
                                              size={62}
                                              color='white'
                                              style={{
                                                background: '#02024D',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.sectionType.toLowerCase() ===
                                            'institution' && (
                                            <Buildings
                                              size={62}
                                              color='white'
                                              style={{
                                                background: '#02024D',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          
                                          {item.sectionType.toLowerCase() ===
                                            'interview' && (
                                            <UserSquare
                                              size={62}
                                              color='white'
                                              style={{
                                                background: '#02024D',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                           {item.sectionType.toLowerCase() ===
                                            'termsandcontract' && (
                                            <Handshake
                                              size={62}
                                              color='white'
                                              style={{
                                                background: '#02024D',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.title}
                                        </h4>
                                      </div>
                                      <div>
                                        <CustomButton
                                          onClick={() =>
                                            toggleActiveAndInactive({
                                              ...item,
                                              active: !item.active,
                                              url: `${getRelatedRoute(item.sectionType.toLowerCase()).split(':')[0]}/${item._id}`
                                            })
                                          }
                                          style={{
                                            background: `${
                                              item.active ? '#046E3E' : '#990000'
                                            }`,
                                            padding: '1.4rem, 2rem',
                                          }}
                                        >
                                          <Power
                                            size={18}
                                            style={{ marginRight: '0.5rem' }}
                                          />
                                          {updatingActive.status && updatingActive.id===item._id ? "Loading..." : (item.active ? 'Active' : 'Inactive')}
                                        </CustomButton>
                                        <Link
                                          className='btn'
                                          to={`/${item.sectionType.toLowerCase()}-dashboard/${
                                            params.organization_id
                                          }/${params.id}/${item._id}`}
                                          style={{
                                            background: '#02024D',
                                            color: '#fff',
                                            border: '1px solid #02024D',
                                          }}
                                        >
                                          <Eye
                                            size={18}
                                            style={{ marginRight: '0.5rem' }}
                                          />
                                          View
                                        </Link>
                                        
                                        <CustomButton
                                          onClick={() => {handleEdit(item)} }
                                          style={{
                                            background: 'transparent',
                                            color: '#fff',
                                            border: '1px solid white',
                                          }}
                                        >
                                          <PencilSimple
                                            size={18}
                                          />
                                          Edit
                                        </CustomButton>

                                        <CustomButton
                                          onClick={() =>
                                            deletePipeline(item._id)
                                          }
                                          style={{
                                            background: 'white',
                                            color: '#990000',
                                            // border: '1px solid red',
                                          }}
                                        >
                                          <Trash
                                            size={18}
                                            style={{ marginRight: '0.5rem' }}
                                          />
                                          {deletingPipeline.status && deletingPipeline.id===item._id ? "Loading..." : "Delete"}
                                        </CustomButton>
                                      </div>
                                    </div>
                                  </div>
                              )
                            }
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                              
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div
                                      title='Click and drag to reorder the pipelines'
                                      className='d-flex justify-content-between align-items-center'
                                      style={{
                                        borderRadius: '0.44rem',
                                        background: '#00b500',
                                        border: '1px dashed #7f7f7f',
                                        width: '80rem',
                                        // width: '60rem',
                                        margin: '2rem',
                                        padding: '2rem',
                                        cursor: 'move',
                                        borderBottom: `${
                                          showbottomLine && draggedOver === i
                                            ? '5px solid #00b500'
                                            : '1px dashed #7f7f7f'
                                        }`,
                                      }}
                                    >
                                      <div>
                                        <h4 style={{color: 'white'}} className="text-capitalize">
                                          {item.sectionType.toLowerCase() ===
                                            'exam' && ( 
                                            <Exam
                                              size={62}
                                              color='white'
                                              style={{
                                                background: 'transparent',
                                                border: '1px solid white',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {(item.sectionType.toLowerCase() ===
                                            'applicationform' || item.sectionType.toLowerCase() ===
                                            'customizedform') && (
                                            <FileText
                                              size={62}
                                              color='white'
                                              style={{
                                                background: 'transparent',
                                                border: '1px solid white',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.icon === 'UserSquare' && (
                                            <UserSquare
                                              size={62}
                                              color='white'
                                              style={{
                                                background: 'transparent',
                                                border: '1px solid white',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.sectionType.toLowerCase() ===
                                            'medical' && (
                                            <FirstAidKit
                                              size={62}
                                              color='white'
                                              style={{
                                                background: 'transparent',
                                                border: '1px solid white',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.sectionType.toLowerCase() ===
                                            'job' && (
                                            <EnvelopeSimple
                                              size={62}
                                              color='white'
                                              style={{
                                                background: 'transparent',
                                                border: '1px solid white',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.sectionType.toLowerCase() ===
                                            'officialletter' && (
                                            <Handshake
                                              size={62}
                                              color='white'
                                              style={{
                                                background: 'transparent',
                                                border: '1px solid white',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.sectionType.toLowerCase() ===
                                            'institution' && (
                                            <Buildings
                                              size={62}
                                              color='white'
                                              style={{
                                                background: 'transparent',
                                                border: '1px solid white',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          
                                          {item.sectionType.toLowerCase() ===
                                            'interview' && (
                                            <UserSquare
                                              size={62}
                                              color='white'
                                              style={{
                                                background: 'transparent',
                                                border: '1px solid white',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                           {item.sectionType.toLowerCase() ===
                                            'termsandcontract' && (
                                            <Handshake
                                              size={62}
                                              color='white'
                                              style={{
                                                background: 'transparent',
                                                border: '1px solid white',
                                                borderRadius: '50%',
                                                padding: '1rem',
                                                marginRight: '2rem',
                                              }}
                                            />
                                          )}
                                          {item.title}
                                        </h4>
                                      </div>
                                      <div>
                                        <CustomButton
                                          onClick={() =>
                                            toggleActiveAndInactive({
                                              ...item,
                                              active: !item.active,
                                              url: `${getRelatedRoute(item.sectionType.toLowerCase()).split(':')[0]}/${item._id}`
                                            })
                                          }
                                          style={{
                                            background: `${
                                              item.active ? '#046E3E' : '#990000'
                                            }`,
                                            padding: '1.4rem, 2rem',
                                          }}
                                        >
                                          <Power
                                            size={18}
                                            style={{ marginRight: '0.5rem' }}
                                          />
                                          {updatingActive.status && updatingActive.id===item._id ? "Loading..." : (item.active ? 'Active' : 'Inactive')}
                                        </CustomButton>
                                        <Link
                                          className='btn'
                                          to={`/${item.sectionType.toLowerCase()}-dashboard/${
                                            params.organization_id
                                          }/${params.id}/${item._id}`}
                                          style={{
                                            background: 'transparent',
                                            color: '#fff',
                                            border: '1px solid white',
                                          }}
                                        >
                                          <Eye
                                            size={18}
                                            style={{ marginRight: '0.5rem' }}
                                          />
                                          View
                                        </Link>
                                        <CustomButton
                                          onClick={() => {handleEdit(item)} }
                                          style={{
                                            background: 'transparent',
                                            color: '#fff',
                                            border: '1px solid white',
                                          }}
                                        >
                                          <PencilSimple
                                            size={18}
                                          />
                                          Edit
                                        </CustomButton>

                                        <CustomButton
                                          onClick={() =>
                                            deletePipeline(item._id)
                                          }
                                          style={{
                                            background: 'white',
                                            color: '#990000',
                                            // border: '1px solid red',
                                          }}
                                        >
                                          <Trash
                                            size={18}
                                            style={{ marginRight: '0.5rem' }}
                                          />
                                           {deletingPipeline.status && deletingPipeline.id===item._id ? "Loading..." : "Delete"}
                                        </CustomButton>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            )
                          })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}
          </div>
        </div>
      
      </div>
      <Footer />
      <Modal
        show={showPipelineForm}
        onHide={() => setShowPipelineForm(false)}
        style={{ paddingTop: '15rem' }}
      >
        {
          <div className='card p-5'>
            <h4
              style={{
                color: '#7f7f7f',
                borderBottom: '1px solid #eee',
                paddingBottom: '1rem',
              }}
            >
              Select Pipeline
            </h4>
            <ul>
              {pipeOptions.map((item, i) => (
                <Link
                  key={i.toString()}
                  to={'#'}
                  onClick={() => openPipelineCategory(item.title)}
                >
                  {/* {console.log(item)} */}
                  <li
                    className='mb-2 p-2 pipelineOptions'
                    onClick={() => 
                     { console.log(item)
                      setSection(item)}
                    }
                  >
                    {item.icon === 'FileText' && (
                      <FileText
                        size={42}
                        style={{
                          marginRight: '2rem',
                        }}
                      />
                    )}
                    {item.icon === 'Exam' && (
                      <Exam
                        size={42}
                        style={{
                          marginRight: '2rem',
                        }}
                      />
                    )}
                    {item.icon === 'UserSquare' && (
                      <UserSquare
                        size={42}
                        style={{
                          marginRight: '2rem',
                        }}
                      />
                    )}
                    {item.icon === 'FirstAidKit' && (
                      <FirstAidKit
                        size={42}
                        style={{
                          marginRight: '2rem',
                        }}
                      />
                    )}
                    {item.icon === 'EnvelopeSimple' && (
                      <EnvelopeSimple
                        size={42}
                        style={{
                          marginRight: '2rem',
                        }}
                      />
                    )}
                    {item.icon === 'Handshake' && (
                      <Handshake
                        size={42}
                        style={{
                          marginRight: '2rem',
                        }}
                      />
                    )}
                    {item.icon === 'Buildings' && (
                      <Buildings
                        size={42}
                        style={{
                          marginRight: '2rem',
                        }}
                      />
                    )}
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        }
      </Modal>

      <Modal
        show={showPipelineSetup}
        onHide={toggle}
        style={{ paddingTop: '10rem' }}
      >
        <PipelineForm
          toggle={toggle}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          selectedPipeline={selectedPipeline}
          title={pipelineTitle}
          getPipelines={getPipelines}
          // options={options}
          section={section}
          jobId={jobId}
        />
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  token: state.auth.token,
  job_view: state.jobPosting.job_view,
  pipeline: state.pipeline,
})

const mapDispatchToProps = (dispatch) => ({
  getSinglePipeline: (id, token) => dispatch(getSinglePipeline(id, token)),
  createJobPipeline: (data, token) => dispatch(createJobPipeline(data, token)),
  togglePipeline: (data, id, token) =>
    dispatch(togglePipeline(data, id, token)),
  getOneForm: (id, token) => dispatch(getOneForm(id, token)),
  removeForm: () => dispatch(removeForm()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Pipeline)
