import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import "../../../../css/print-profile.css"
import Preview from '../../ApplicationForms/preview';
import CustomButton from '../../CustomButton/custom-button';
import {updateApplicationData} from '../../../../store/actions/ApplicationForm/application-form.actions'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Printer, { print } from 'react-pdf-print'
import logo from '../../../../images/logo.jpg'



const PrintProfile = props => {  

    const { 
        applicationForm: {
            affirmation,
            attitudeTestState,
            birthCertificate,
            DOB,
            educationalQualification,
            email,
            firstName,
            gender,
            hobbies,
            languageSpoken,
            lga,
            maritalStatus,
            Nationality,
            nextOfKin,
            NIN,
            otherNames,
            passport,
            permanentHomeAddress,
            mainPhone,
            religion,
            secondarySchoolResult,
            stateOfOrigin,
            surname,
            village, 
            userJobId,
            userId
        }, 
        updateApplicationData,
        applicationForm,
        saveUrl,
        printMode,
        printDoc
    } = props 

    const { userId: candidateId, pipelineId } = useParams()

    async function httpGetApplicantData() {
  
        try {
            const response = await axios.get(`https://employer-center-api.herokuapp.com/api/v1/slip/print/${candidateId}/${pipelineId}`, {
              headers: {
                'Content-type': 'application/json',
              }
            })
            swal("Success!", response.data.message, "success")

            updateApplicationData(response.data.data)
            
        } catch (error) {
            console.log(error)
            swal("Something went wrong!", error.response.data.message, "error")
        }
    }

    useEffect(() => {
        if(!candidateId && !pipelineId) return;
        httpGetApplicantData()
    }, [])
    
    const ids = ['1']

 

    if(applicationForm && applicationForm.pipelineId) {
        return (
            <div >
                <div className='d-flex justify-content-center'>
                        <div id={ids[0]} style={{ width:'210mm', height: '297mm', border: '1px solid #eee', padding: '1rem' }}>
                        <main className='main-wrapper'>
                        <div className='rounded user-info-top'>
                            <section className='user-details-wrapper'>
                                <div className='user-name'>
                                    
                                    <div className='d-flex justify-content-between'>
                                        <img src={logo} alt={firstName + surname} style={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '50%'
                                        }}/>
                                        <img src={passport} alt={firstName + surname} style={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '50%'
                                        }}/>
                                    </div>
                                </div>
                                    <h2>{`${firstName} ${surname} ${otherNames ? otherNames : ''}`}</h2>
                                <main className='user-details'>
                                    <main className='user-details-inner'>
                                        {
                                            userJobId &&
                                            <div className='detail phone'>
                                                <p className='label'>Ref ID:</p>
                                                <p className='value'>{userJobId}</p>
                                            </div>
                                        }
                                        <div className='detail phone'>
                                            <p className='label'>Gender</p>
                                            <p className='value'>{gender}</p>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>Religion</p>
                                            <p className='value'>{religion}</p>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>NIN</p>
                                            <p className='value'>{NIN}</p>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>Phone</p>
                                            <p className='value'>{mainPhone}</p>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>Marital Status</p>
                                            <p className='value'>{maritalStatus}</p>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>Date of Birth</p>
                                            <p className='value'>{DOB}</p>
                                        </div>

                                        <div className='detail phone'>
                                            <p className='label'>Languages</p>
                                            <ul>
                                                {
                                                    languageSpoken.map(item => (
                                                        <li className='value' key={item}>{item}</li>
                                                    ))
                                                }
                                            
                                            </ul>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>Nationality</p>
                                            <p className='value'>{Nationality}</p>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>State of Origin</p>
                                            <p className='value'>{stateOfOrigin}</p>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>Local government</p>
                                          <p className='value'>{userId && userId.lgaOfOrigin}</p>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>Village</p>
                                            <p className='value'>{village}</p>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>Permanent Home Address</p>
                                            <p className='value'>{permanentHomeAddress}</p>
                                        </div>
                                        <div className='detail phone'>
                                            <p className='label'>Email</p>
                                            <p className='value'>{email}</p>
                                        </div>

                                        <div className='detail phone'>
                                            <p className='label'>Hobbies</p>
                                            <p className='value'>{hobbies}</p>
                                            
                                        </div>

                                        <div className='detail phone'>
                                            <p className='label'>Educational Qualification</p>
                                            <ul>
                                                <li>School attended: {educationalQualification[0].schoolAttended}</li>
                                                <li>Year of graduation: {educationalQualification[0].finishDate.split('T')[0]}</li>
                                                {
                                                    educationalQualification && educationalQualification.length && educationalQualification.map(item => (
                                                        <li className='value' key={item.subject}>{item && item.subject && item.subject.toUpperCase()}: {item.grade.toUpperCase()} {item.certificateObtained.toUpperCase()}</li>
                                                    ))
                                                }
                                            
                                            </ul>
                                        </div>

                                        <div className='detail phone'>
                                            <p className='label'>Next of kin details</p><br></br>
                                            <div>
                                                <p className='m-0'>Name: {nextOfKin.nextofKinName}</p><br></br>
                                                <p className='m-0'>Phone: {nextOfKin.nextOfKinPhone}</p><br></br>
                                                <p className='m-0'>Relationship: {nextOfKin.relationship}</p><br></br>
                                                <p className='m-0'>Address: {nextOfKin.nextOfkinaddress}</p>
                                            </div>
                                        </div>
                                    </main>
                            </main>
                            </section>
                            </div>
                    
                        </main>
                            <CustomButton onClick={() => window.print()} style={{width: '100%'}}>Print</CustomButton>
                        </div>
                </div>
            </div>
        )
    }

    return (
        <div className='' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '15rem'}}>
            <div style={{ textAlign: 'center'}}>
                <p>Sorry, please click the button below to try again</p>
                <CustomButton onClick={httpGetApplicantData}>Refresh</CustomButton>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    applicationForm: state.applicationForm,
})

const mapDispatchToProps = dispatch => ({
    updateApplicationData: data => dispatch(updateApplicationData(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrintProfile)
