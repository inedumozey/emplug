import { useState, useEffect } from 'react'
import Footer from '../../layouts/Footer'
import FormBase from './form-base'
import FormBaseExam from './form-base-exam'

const Form = (props) => {
  return (
    <>
      <section className='container'>
        <div className='row justify-content-center'>
          <FormBaseExam data={props.data} />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Form
