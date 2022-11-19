import CustomButton from '../../components/CustomButton/custom-button'
import { FloppyDiskBack, ArrowRight, ArrowLeft } from 'phosphor-react'
import QuestionNavigator from './question-navigator'

import mockExams from './mock-exams'
import { useEffect, useState } from 'react'
import './answers.css'
import CustomTextArea from '../../components/CustomTextArea/CustomText'
import swal from 'sweetalert'

const FormBaseExam = (props) => {
  const [data, setData] = useState({})
  const [answer, setAnswer] = useState([])
  const [question, setQuestion] = useState([])
  let [count, setCount] = useState(0)


  // useEffect(() => {
  //   setData(props.data)
  //   if(data._id) {
  //     setQuestion(data.examData[0].examQuestions)
  //   }
  // }, [data._id])

  function updateAnswer(option, { target }) {
    const data = [...answer]

    if (!data[count]) {
      data.push(option)
      setAnswer(data)

      document
        .querySelectorAll('.answer-item')
        .forEach((el) => el.classList.remove('selected'))
      target.classList.add('selected')
      return
    }

    if (data[count].index === option.index) {
      data[count] = { ...option }
      setAnswer(data)
      return
    }

    data.push(option)
    setAnswer(data)

    document
      .querySelectorAll('.answer-item')
      .forEach((el) => el.classList.remove('selected'))
    target.classList.add('selected')
  }

  const trackSelectClass = (option) => {
    if (!answer.length) return
    if (!answer[count]) return
    if (answer[count].text === option.text) {
      return 'selected'
    }
    return ''
  }

  function trackExamQuestion() {
    
    if (count === question.length - 1) {
      swal('Congratulations!', 'Test completed!', 'info')
      return;
    }
    
    setCount((prev) =>{ 
      console.log(prev)
      return prev + 1;
    })
  }

  
  useEffect(() => {
    if (question.length > 0) return
    setQuestion(props.data)
    // setData(props.data)
  }, [])

  useEffect(() => {}, [count])

  console.log(props)

  return (
    <section className='container'>
      <QuestionNavigator
        totalNumber={question}
        lastItem={answer[count]}
        setCount={setCount}
      />
      <form
        className='row fs-4 bg-white shadow p-5'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='row justify-content-between mb-3'>
          <div className='col-auto'>
            <p className='h4 text-muted'>Test</p>
          </div>
          <div className='col-auto'>
            <p className='h3 text-muted'>00:00</p>
          </div>
        </div>
        <div className='col'>
          <article>
            <p>Question.</p>
            <pre className='mt-5 fs-4'>
              {question.length > 0 && question[count].text}
            </pre>
          </article>
        </div>
        <div className='col border-start'>
          <p>Answer.</p>
          {question.length > 0 && question[count].type === 'multichoice' ? (
            question[count].options.map((option, i) => (
              <li
                key={i.toString()}
                onClick={(ev) => updateAnswer({ ...option, index: count }, ev)}
                className={`p-3 my-1 bg-opacity-10 answer-item ${trackSelectClass(
                  option
                )}`}
              >
                {console.log(option)}
                {option.text}
              </li>
            ))
          ) : (
            <div className='mb-4'>
              <CustomTextArea
                style={{ height: 100 }}
                value={answer[count] && answer[count].text}
                onChange={(e) => {
                  const data = { text: e.target.value, index: count }
                  if (answer[count]) {
                    const newValue = answer[count].text + e.target.value

                    const newArr = answer.filter(
                      (item) => item.index !== answer[count].index
                    )
                    newArr.push({ text: newValue, index: count })

                    setAnswer(newArr)
                    return
                  }
                  setAnswer([...answer, data])
                }}
              />
            </div>
          )}
        </div>
        <div className='row justify-content-end'>
          <div className='col-auto'>
            <CustomButton
              onClick={() => setCount((prev) => prev - 1)}
              disabled={count > 0 ? false : true}
            >
              <ArrowLeft size={15} />
              Previous
            </CustomButton>
          </div>
          <div className='col-auto'>
            <CustomButton
              onClick={trackExamQuestion}
              // disabled={count > 0 ? false : true}
            >
              Next
              <ArrowRight size={15} />
            </CustomButton>
          </div>
        </div>
      </form>
    </section>
  )
}

export default FormBaseExam
