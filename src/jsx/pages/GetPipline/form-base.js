import { useState } from 'react'
import CustomButton from '../../components/CustomButton/custom-button'
import FormFactory from '../../components/FormFactory/form-factory'
import { tools } from '../../../utils/utils'
import { FloppyDiskBack, ArrowRight } from 'phosphor-react'

const FormBase = (props) => {
  const [data, setData] = useState({})

  const handleData = ({ target }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }
  // console.log(data)

  return (
    <div className='col-8 card p-5 shadow'>
      <div className='row'>
        <p className='h4'>{props.title}</p>
      </div>
      <form
        className=''
        onSubmit={(e) => {
          e.preventDefault()
          console.log('Application Details', data)
        }}
      >
        {tools.map((item, i) => (
          <div className='my-3' key={i}>
            <FormFactory
              title={item.title}
              placeholder={item.placeholder || item.label}
              type={item.inputType}
              required={item.required}
              data={item.selectable}
              name={item.name}
              event={handleData}
            />
          </div>
        ))}
        <div className='row justify-content-end'>
          <div className='col-auto'>
            <CustomButton type='submit'>Submit</CustomButton>
          </div>
          <div className='col-auto'>
            <CustomButton>
              Next
              <ArrowRight size={15} />
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FormBase
