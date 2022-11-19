import CustomButton from '../CustomButton/custom-button'
import CustomInput from '../CustomInput/custom-input'

import Select from 'react-select'
import { X } from 'phosphor-react'

function PipelinEditForm (props) {
  return (
    <>
      {
        <div className='card p-4 px-0'>
          <div className='d-flex px-4 justify-content-between align-item-center'>
            <h3 className='mb-0'> Edit Pipeline</h3>
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
          <form className='py-4 px-5'>
            <div className='mb-4'>
              <label>
                Title
                <span
                  className='text-primary'
                  style={{ marginLeft: '12px' }}
                >
                  *
                </span>
              </label>
                  
              <CustomInput placeholder='Add Pipeline Title' defaultValue={props.title}/>
            </div>
            <div className='mb-4'>
              <label>
                Add Coordinator{' '}
                <span className='text-primary' style={{ marginLeft: '12px' }}>
                  *
                </span>
              </label>
              <Select
                options={props.options}
                title='Coordinator'
                placeholder='Please select'
                defaultValue={[
                  {
                    label: props.cordinator,
                    name: props.cordinator
                  }
                ]}
              />
            </div>
            <div className='mb-4'>
              <label>Add sub-coordinator</label>
              <Select
                options={props.options}
                title='Sub-Coordinators'
                placeholder='Ex: Business'
                defaultValue={[
                  {
                    label: props.subcordinator,
                    name: props.subcordinator
                  }
                ]}
              />
            </div>
            {/* <CustomButton type='submit'>Submit</CustomButton> */}
          </form>
          <hr />
          <div className='d-flex align-items-center justify-content-between'>
            <div>{''}</div>
            <div className='px-4'>
              <CustomButton
                type='submit'
                onClick={props.toggle}
                style={{
                  background: '#ECECEC',
                  color: 'black'
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton type='submit'>Save</CustomButton>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default PipelinEditForm
