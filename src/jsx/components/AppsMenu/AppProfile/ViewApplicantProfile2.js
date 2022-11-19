import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import "../../../../css/print-profile.css"
import CustomButton from '../../CustomButton/custom-button';

const ViewApplicantProfile = (props) => {
    const history = useHistory()
    const { APPLICANT } = props;

    if (!APPLICANT) {
        history.goBack();
        return;
    }
  return (
      <main className='print-wrapper'>
     <div
        className='d-flex justify-content-between align-items-center'
        style={{
            width: '100%',
            marginBottom: '2rem',
            borderBottom: '1px solid #eee',
            paddingBottom: '1rem',
            paddingTop: '2rem'
        }}
        >
        <h3 style={{ color: '#7f7f7f' }}>Personal Profile Slip</h3>
        <Link to="#" onClick={() => history.goBack()}>
            <CustomButton>
                Go back
            </CustomButton>
        </Link>
    </div>
    <main className='main-wrapper'>
        <div className='rounded user-info-top'>
            <div className='user-info-left'>
                <div>
                    <img className='user-dp' src={APPLICANT.userId.profilePicture || 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxhY2slMjB1c2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'} alt='user' />
                    <h4>JOB-123456-CX</h4>
                    <p>Status: {APPLICANT.status}</p>
                </div>
                <CustomButton
                disabled={false}
                onClick={() => {}}
                style={{ width: '100%' }}
                >
                Print
            </CustomButton>
            </div>
            <section className='user-details-wrapper'>
                <div className='user-name'>
                    <h2>{APPLICANT.surname} {APPLICANT.otherName}</h2>
                    <p>JOB-123456-CX</p>
                </div>
                <main className='user-details'>
                    <main className='user-details-inner'>
                        <div className='detail phone'>
                            <p className='label'>Phone</p>
                            <p className='value'>{APPLICANT.userId.phone || 'N/A'}</p>
                        </div>
                        <div className='detail phone'>
                            <p className='label'>Email</p>
                            <p className='value'>{APPLICANT.email || 'N/A'}</p>
                        </div>

                        <div className='detail phone'>
                            <p className='label'>Gender</p>
                            <p className='value'>{APPLICANT.gender || 'N/A'}</p>
                        </div>

                        <div className='detail phone'>
                            <p className='label'>Date of Birth</p>
                            <p className='value'>{Date(APPLICANT.DOB).split('G')[0] || 'N/A'}</p>
                        </div>
                        <div className='detail phone'>
                            <p className='label'>Nationality</p>
                            <p className='value'>{APPLICANT.Nationality || 'N?A'}</p>
                        </div>
                        <div className='detail phone'>
                            <p className='label'>Country</p>
                            <p className='value'>{APPLICANT.Nationality || 'N/A'}</p>
                        </div>
                        <div className='detail phone'>
                            <p className='label'>State of Origin</p>
                            <p className='value'>{APPLICANT.stateOfOrigin || 'N/A'}</p>
                        </div>
                        <div className='detail phone'>
                            <p className='label'>Local government</p>
                            <p className='value'>{APPLICANT.lgaOfOrigin || 'N/A'}</p>
                        </div>
                        <div className='detail phone'>
                            <p className='label'>Resident Address</p>
                            <p className='value'>{APPLICANT.permanentHomeAddress || 'N/A'}</p>
                        </div>
                        <div className='detail phone'>
                            <p className='label'>State</p>
                            <p className='value'>{APPLICANT.stateOfResident || 'N/A'}</p>
                        </div>
                        <div className='detail phone'>
                            <p className='label'>Local government</p>
                            <p className='value'>{APPLICANT.lgaOfResident || 'N/A'}</p>
                        </div>
                        <div className='detail phone'>
                            <p className='label'>Skills</p>
                            <ul>
                                {
                                    APPLICANT.userId.skills && 
                                    APPLICANT.userId.skills.map(item => (
                                        <li className='value' key={item}>{item}</li>
                                    ))

                                }
                            </ul>
                        </div>
                    </main>
            </main>
            </section>
        </div>
       
    </main>
    </main>
  )
}

const mapStateToProps = state => ({
    APPLICANT: state.pipeline.APPLICANT
})

export default connect(mapStateToProps)(ViewApplicantProfile);