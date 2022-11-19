import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import "../../../../css/print-profile.css"



import EducationalDetails from '../../ApplicationForms/educationalDetails';
import FileUpload from '../../ApplicationForms/fileUpload';
import NextOfKinDetails from '../../ApplicationForms/nextOfKinDetails';
import PersonalDetails from '../../ApplicationForms/personalDetails';
import TestLocation from '../../ApplicationForms/testLocation';
import CustomButton from '../../CustomButton/custom-button';

import CustomNav from '../../../layouts/nav/CustomNav';
import pageRoutes from '../../../../routes';

const ViewApplicantProfile = (props) => {

  const params = useParams()
  const history = useHistory()
  const routes = pageRoutes

  return (
    <>
      <CustomNav />
        
      <main className='d-flex justify-content-center w-100 mt-5'>
        <div className='d-flex align-items-center justify-content-center px-5' style={{ flexDirection: 'column'}}>
          <div className='w-100 d-flex' style={{ borderBottom: '1px solid #eee'}}>
            <CustomButton onClick={history.goBack}>Go back</CustomButton>
          </div>
            <PersonalDetails viewMode={true}/>
            <EducationalDetails viewMode={true}/>
            <NextOfKinDetails viewMode={true}/>
            {/* <TestLocation viewMode={true}/> */}
            <FileUpload viewMode={true}/>

            <div className='d-flex justify-content-end' style={{ margin: '5rem 15rem' }}>
              <CustomButton onClick={history.goBack}>Go back</CustomButton>
              <Link to={routes.physicalScreening.split(':')[0]+params.jobId+'/'+params.id}>
                {/* <CustomButton style={{ background: 'rgba(2, 2, 77, 0.6)'}}>Screen Candidate</CustomButton> */}
                <CustomButton style={{ background: 'rgba(0, 50, 0, 0.6)'}}>Screen Candidate</CustomButton>
              </Link>

            </div>
        </div>
      </main>
    </>
  )
}

const mapStateToProps = state => ({
    APPLICANT: state.pipeline.APPLICANT
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps)(ViewApplicantProfile);