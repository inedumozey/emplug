import { useEffect, useState } from 'react'

const QuestionNavigator = ({ totalNumber, lastItem = {}, setCount }) => {
  const [answered, setAnswered] = useState({})

  useEffect(() => {
    if (!lastItem) return
    if (!lastItem.index && lastItem.index !== 0) return
    let data
    data = { ...answered }
    if (data[lastItem.index]) {
      data[lastItem.index] = lastItem.text
    } else {
      data[lastItem.index] = lastItem.text
    }
    setAnswered((prev) => data)
  }, [lastItem.text])

  //   console.log('Answered===========>', answered)

  return (
    <>
      <div>
        <ol className='list-inline'>
          {totalNumber.map((num, i) => (
            <span key={i}>
              <li
                className='list-inline-item py-2 px-3 mx-1 rounded-circle text-white'
                style={{
                  background: `${
                    !answered[i] ? 'lightsteelblue' : 'darkslateblue'
                  }`,
                  cursor: 'pointer',
                }}
                onClick={() => (answered[i] ? console.log(i) : setCount(i))}
              >
                {i + 1}
              </li>
              {i < totalNumber.length - 1 && (
                <li className='list-inline-item border-top border-light col-1'></li>
              )}
            </span>
          ))}
        </ol>
      </div>
    </>
  )
}

export default QuestionNavigator
