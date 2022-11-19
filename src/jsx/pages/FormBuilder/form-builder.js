import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { Info } from 'phosphor-react'
import { useHistory, useParams } from 'react-router-dom'

// Components
import BaseContainer from '../../components/BaseContainer/base-container'
import CustomButton from '../../components/CustomButton/custom-button'
import CustomInput from '../../components/CustomInput/custom-input'
import CustomNav from '../../layouts/nav/CustomNav'
import FormBuilderCard from '../../components/FormBuilderCard/form-builder-card'
import FormFactory from '../../components/FormFactory/form-factory'

import { tools } from '../../../utils/utils'

import { httpPostNewForm } from '../../../services/JobPosting'
import {
  addPipeline,
  updateOneForm,
  createJobPipeline,
  removeForm,
  updatePipeline
} from '../../../store/actions/PipelineManager/pipeline-manager.actions'
import Footer from '../../layouts/Footer'

function FormBuilder (props) {
  const [displayEl, setDisplayEl] = useState([])
  const [selected, setSelected] = useState('')
  const [entered, setEntered] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const history = useHistory()
  const { jobId, pipelineId, pipelineTitle } = useParams()
  console.log(jobId, pipelineId, pipelineTitle)

  function addToDisplayEl (value) {
    const data = [...displayEl]
    data.push(value)
    setDisplayEl(data)
  }

  function removeFromDisplayEl (value) {
    const data = [...displayEl]
    const newData = data.filter(item => item.title !== value)
    setDisplayEl(newData)
  }

  function reorder (e) {
    const findSelectedIndex = displayEl.findIndex(
      item => item.name === selected
    )
    const findEnteredIndex = displayEl.findIndex(item => item.name === entered)

    const data = [...displayEl]
    const selectedItem = data.splice(findSelectedIndex, 1)
    const enteredItem = data.splice(findEnteredIndex, 1)
    if (!selectedItem[0] || !enteredItem[0]) return
    data.splice(findSelectedIndex, 0, enteredItem[0])
    data.splice(findEnteredIndex, 0, selectedItem[0])
    setDisplayEl(data)
    return
  }

  function createNewForm () {
    props.removeForm()
    setDisplayEl([])
    setTitle('')
  }

  async function postForm () {
    if (!jobId || !props.user._id) {
      return
    }
    try {
      const newArray = [...displayEl]
      const fields = newArray.map(item => {
        delete item.icon
        delete item.id
        return item
      })
      setLoading(true)
      const data = {
        author: props.user._id,
        fields,
        job: jobId,
        pipeline: pipelineId,
        title:pipelineTitle
      }
      if (props.pipeline.FORM) {
      	props.updateOneForm(data, props.pipeline.FORM._id, props.token);
      	setShowModal(true);
      	setLoading(false);
      	history.goBack();
      	return;
      }
      const response = await httpPostNewForm(data, props.token);
      if (response.status === 201) {
      	props.addPipeline(response.data.data);
      	setShowModal(true);
      	setLoading(false);
      	let data = [];
      	data.push(response.data.data);
      	if(props.pipeline.PIPELINE.length > 0 && !props.pipeline.loading) {
      		props.updatePipeline({
      			pipelineSections: [...props.pipeline.PIPELINE, response.data.data]
      		}, props.job_view._id, props.token);
      	}
      	if (!props.pipeline.loading) {
      		props.createJobPipeline({
      			job: props.job_view._id,
      			pipelineSections: data
      		}, props.token)
      	}
      	history.goBack();
      	return;
      }

      console.log(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selected && entered) {
      reorder()
    }
  }, [selected, entered])

  useEffect(() => {
    if (props.pipeline.FORM) {
      setDisplayEl(props.pipeline.FORM.fields)
      setTitle(props.pipeline.FORM.title)
    }
  }, [props.pipeline.FORM])

  return (
    <>
      <CustomNav />
      <Modal show={showModal} style={{paddingTop: '10rem'}}>
        <div className='card' >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Info size={22} className='text-muted' />
            <h4 className='text-muted mt-2'>Info</h4>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p>Form Published.</p>
          </div>
          <CustomButton onClick={e => setShowModal(false)}>ok</CustomButton>
        </div>
      </Modal>
      <div className='' style={{padding: '1rem 10rem'}}>
        <CustomButton onClick={() => history.goBack()}>Go back</CustomButton>
      </div>
      <div
        style={{
          marginTop: '9rem',
          width: '100%',
          textAlign: 'center',
          color: '#7f7f7f'
        }}
        >
        <h4 style={{ fontSize: '2rem', color: '#7f7f7f' }}>Form Builder</h4>
        
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10rem',
          alignItems: 'center'
        }}
      >
        <div style={{ paddingLeft: '1rem', paddingBottom: '1rem' }}>
          <CustomInput
            title='Title'
            value={title}
            placeholder='Form Title'
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <CustomButton onClick={createNewForm}>Create New Form</CustomButton>
          {loading ? (
            <CustomButton disabled>publishing...</CustomButton>
          ) : (
            <CustomButton onClick={postForm}>
              {props.pipeline.FORM ? 'Update Form' : 'Publish'}
            </CustomButton>
          )}
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div
          className='card'
          style={{ width: '80%', display: 'flex', flexDirection: 'row' }}
        >
          <div
            style={{ width: '20%', height: 'auto', border: '1px solid #eee' }}
          >
            {tools.map((item, index) => (
              <FormBuilderCard
                key={index.toString()}
                icon={item.icon}
                title={item.title}
                addToDisplayEl={addToDisplayEl}
                item={item}
              />
            ))}
          </div>
          <div
            style={{
              padding: '1rem',
              width: '80%',
              height: 'auto',
              border: '1px solid #eee'
            }}
          >
            {displayEl.length > 0 &&
              displayEl.map((item, index) => (
                <BaseContainer
                  key={index.toString()}
                  removeFromDisplayEl={removeFromDisplayEl}
                  setSelected={setSelected}
                  setEntered={setEntered}
                  title={item.title}
                >
                  <FormFactory
                    title={item.title}
                    placeholder={item.placeholder || item.label}
                    type={item.inputType}
                    required={item.required}
                    data={item.selectable}
                    name={item.name}
                  />
                </BaseContainer>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

const mapStateToProps = state => ({
  job_view: state.jobPosting.job_view,
  user: state.auth.auth.user,
  token: state.auth.auth.token,
  pipeline: state.pipeline
})

const mapDispatchToProps = dispatch => ({
  addPipeline: data => dispatch(addPipeline(data)),
  updateOneForm: (data, id, token) => dispatch(updateOneForm(data, id, token)),
  createJobPipeline: (data, token) => dispatch(createJobPipeline(data, token)),
  removeForm: () => dispatch(removeForm()),
  updatePipeline: (data, id, token) => dispatch(updatePipeline(data, id, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilder)
