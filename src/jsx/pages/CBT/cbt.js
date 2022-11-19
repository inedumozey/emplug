import { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import CustomButton from '../../components/CustomButton/custom-button'
import CustomNav from '../../layouts/nav/CustomNav'
import pagesRoutes from '../../../routes'
import CustomTextArea from '../../components/CustomTextArea/CustomText'
import Footer from '../../layouts/Footer'
import CustomInput from '../../components/CustomInput/custom-input'
import CustomSelect from '../../components/CustomSelect/Custom-select'
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox'
import { Modal } from 'react-bootstrap'
import { CaretLeft } from 'phosphor-react'
import axios from 'axios'
import swal from 'sweetalert2'

function CBT(props) {
  const [show, setShow] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [questions, setQuestions] = useState([])
  const [singleQuestion, setSingleQuestion] = useState({})

  const [text, setText] = useState('')
  const [type, setType] = useState('')
  const [score, setScore] = useState(0)
  const [options, setOptions] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [optionText, setOptionText] = useState('')
  const [exams, setExams] = useState([])

  const history = useHistory()

  const params = useParams()

  async function httpSendExamQuestions(event) {
    event.preventDefault()
    addNewQuestion()
    console.log(exams)
    try {
      const response = await axios.post(
        `https://employer-center-api.herokuapp.com/api/v1/examination/questions/create/${params.id}`,
        exams
      )
      console.log(response)
      // swal("Questions created!", 'response.data.message', 'success')
    } catch (error) {
      console.log(error)
    }
  }

  function addOptions() {
    if (!type) {
      swal('Info', 'Type is empty, set type for question', 'info')
      return
    }
    const data = [...options]
    data.forEach((item) => {
      if (isCorrect) {
        if (item.isCorrect === isCorrect) {
          setShow(true)
        }
      }
    })
    data.push({
      text: optionText,
      isCorrect,
    })
    setOptions(data)
    setOptionText('')
    setIsCorrect(false)
  }

  function addNewQuestion() {
    const data = [...exams]
    const question = {
      text,
      type,
      score,
      options,
    }

    data.push(question)

    setExams(data)
    setText('')
    setType('')
    setScore(0)
    setOptions([])
  }

  const {
    jobPosting: { job_view },
  } = props

  function addQuestion(e) {
    const data = { ...singleQuestion }

    if (e.target.name === 'question' || e.target.name === 'answer') {
      data[e.target.name] = e.target.value
      setShowInput(false)
      setSingleQuestion(data)
      return
    }

    if (e.which === 13 && !data.answers) {
      data.answers = []
      data.answers.push(e.target.value)
      setShowInput(false)
      setSingleQuestion(data)
      return
    }

    if (e.which === 13 && data.answers.length > 0) {
      data.answers.push(e.target.value)
      setShowInput(false)
      setSingleQuestion(data)
      return
    }
  }

  function updateQuestions(question) {
    const data = [...questions]
    if (
      !singleQuestion.question ||
      !singleQuestion.answer ||
      !singleQuestion.answers.length
    )
      return
    let isExist = data.find((item) => item.question === question.question)
    if (!isExist) {
      data.push(question)
      setQuestions(data)
    }
    setSingleQuestion({})
    setShow(false)
  }

  function editQuestion(item) {
    setSingleQuestion(item)
    setShow(true)
  }

  function removeOption(option) {
    const data = { ...singleQuestion }
    let answers = data.answers.filter((item) => item !== option)
    data.answers = [...answers]
    setSingleQuestion(data)
  }

  function deleteQuestion(details) {
    const data = [...questions]
    console.log(data)
    let result = data.filter((item) => item.question !== details.question)
    setQuestions(result)
  }

  console.log(params)

  return (
    <>
      <CustomNav />
      <div
        className=''
        style={{
          marginTop: '1rem',
          borderRadius: '0.4rem',
          paddingLeft: '15rem',
          paddingRight: '15rem',
        }}
      >
        <CustomButton onClick={() => history.goBack()}>
          <CaretLeft size={18} style={{ marginRight: '0.5rem' }} />
          Go Back
        </CustomButton>
        <hr></hr>
        <div className='card p-4' style={{ borderRadius: '0.4rem' }}>
          <div className='d-flex justify-content-between align-items-center'>
            <h4>Test Questions</h4>
            <CustomButton>View Questions</CustomButton>
          </div>
          <form className='p-3' onSubmit={httpSendExamQuestions}>
            <div className='my-3'>
              <CustomTextArea
                onChange={(e) => setText(e.target.value)}
                value={text}
                title='Question'
                placeholder='Type the Question'
                style={{ width: '40rem', height: '10rem' }}
              ></CustomTextArea>
            </div>
            <div className='mb-3 '>
              <label>Answer Type</label>
              <br></br>
              <input
                type='radio'
                onChange={(e) => setType('multichoice')}
                name='type'
                className='mx-2'
              />
              <span>Choices</span>
              <input
                type='radio'
                onChange={(e) => setType('text')}
                name='type'
                className='mx-2 ml-3'
              />
              <span>Text</span>
            </div>
            <div className='mb-3 '>
              <CustomInput
                title='Score'
                placeholder='score'
                type='number'
                value={score}
                onChange={(e) => setScore(e.target.value)}
                style={{ width: '15rem' }}
              />
            </div>

            <div className='mb-5'>
              <div>
                <div className='d-flex align-items-center'>
                  <CustomInput
                    type='text'
                    placeholder='Type the answers'
                    value={optionText}
                    onChange={(e) => setOptionText(e.target.value)}
                    style={{ width: '15rem' }}
                  />
                  <input
                    type='checkbox'
                    className='mx-3'
                    value={isCorrect}
                    onChange={(e) => setIsCorrect(e.target.checked)}
                  />
                  <span>Check if this is the right answer</span>
                </div>
              </div>
              <CustomButton style={{ width: '10rem' }} onClick={addOptions}>
                +Add Option
              </CustomButton>
            </div>
            <CustomButton onClick={addNewQuestion}>
              +Add Another Question
            </CustomButton>
            <div className='d-flex justify-content-center p-4'>
              <CustomButton
                style={{
                  marginRight: '8rem',
                  paddingLeft: '3rem',
                  paddingRight: '3rem',
                  background: '#E8E8E8',
                  color: 'black',
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton
                style={{
                  marginLeft: '8rem',
                  paddingLeft: '3rem',
                  paddingRight: '3rem',
                }}
                type='submit'
              >
                Save
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className=''
        style={{ paddingTop: '10rem' }}
      >
        <div className='card p-5'>
          <h4>You are trying to add more 1 option as the correct answer</h4>
          <hr></hr>
          <p>
            Click to change to false or close to accept more than 1 correct
            answer
          </p>
          <ul>
            {options.map((item, i) => (
              <li
                style={{
                  borderRadius: '0.44rem',
                  background: '#E9F8EA',
                  border: '1px dashed #7f7f7f',
                  boxShadow:
                    '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)',
                  margin: '2rem',
                  padding: '2rem',
                  cursor: 'pointer',
                }}
                key={`${item.text + i.toString()}`}
              >
                {item.text} - {item.isCorrect ? 'Correct' : 'False'}
              </li>
            ))}
          </ul>
          <CustomButton
            onClick={() => setShow(false)}
            style={{
              background: 'transparent',
              color: 'red',
              border: '1px solid red',
            }}
          >
            Close
          </CustomButton>
        </div>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => ({
  jobPosting: state.jobPosting,
})

export default connect(mapStateToProps)(CBT)
