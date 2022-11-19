import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import AddProfession from '../../AddProfession/add-profession'

import Nav from '../../../layouts/nav/CustomNav'

// Actions
import { getProProfile } from '../../../../store/actions/MyPortfolio/my-portfolio.actions'
import { updateConfirmedAction } from '../../../../store/actions/auth/AuthActions'

//** Import Image */
import ProfileDetals from '../../../../images/svg/details.svg';
import { 
  DotsThreeVertical, 
  PencilSimple, 
  UploadSimple, 
  Trash, 
  DotsThreeCircleVertical,
  User,
  Users,
  EnvelopeSimple,
  UserCircle,
  DeviceMobile,
  Briefcase,
  GenderIntersex
} from 'phosphor-react'
import ProfileImage from '../../../../images/svg/user.svg';

import pageRoutes from '../../../../routes'
import { getAllJobs } from '../../../../store/actions/JobPosting/job-posting.actions'
import CustomButton from '../../CustomButton/custom-button'
import SkillsCard from '../../SkillsCard/skills-card'
import AddProject from '../../AddProject/add-project'
import AddExperience from '../../AddExperience/AddExperience'
import AddSkills from '../../AddSkills/add-skills'
import AddEducation from '../../AddEducation/add-education'
import { Modal } from 'react-bootstrap'
import AddAbout from '../../AddAbout/add-about'
import AddPersonalProfile from '../../AddPersonalProfile/add-personal-profile'
import AddCertification from '../../AddCertification/add-certification'
import ViewProject from '../../AddProject/view-project'
import ViewEducation from '../../AddEducation/view-education'
import ViewExperience from '../../AddExperience/view-experience'

const Profile = (props) => {
  const history=useHistory()
  const [showSkills, setShowSkills] = useState(3);
  const [showProjects, setShowProjects] = useState(3);
  const [section, setSection] = useState("profile");
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState("personal");
  const [showDropdown, setShowDropdown] = useState(false);
  const [limit, setLimit] = useState(250);

  const { user, myPortfolio } = props;
 
  useEffect(() => {
    // if (!user.phone || !user.middleName || !user.gender || !user.profilePicture) {
    //   setShow(true);
    // }
  }, [])

  const updateSkillsCallback = async(data)=>{
    try{
			const response = await axios.put(
				`${
					process.env.NODE_ENV === 'development'
					? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
					: process.env.REACT_APP_EMPLOYER_CENTER_API
				}/user/update-user?userId=${props.auth.user._id}`,
				data,
				{
					headers: {
					authorization: `Bearer ${props.auth.token}`,
					'Content-Type': 'application/json'
					}
				}
			)
      
			props.updateConfirmedAction(response.data.data)
		}
		catch(err){
			return;
		}
  }
  
  return (
    <Fragment>
      <Nav />
      <Modal show={show} onHide={() => setShow(false)}>
        {profile === 'profession' && (
          <AddProfession setShow={setShow} setProfile={setProfile} />
        )}
        {/* {profile === 'personal' && <AddPersonalProfile setShow={setShow} />} */}
        {profile === 'about' && (
          <AddAbout setShow={setShow} setProfile={setProfile} />
        )}
        {profile === 'project' && (
          <AddProject setShow={setShow} setProfile={setProfile} />
        )}
        {profile === 'skills' && (
          <AddSkills setShow={setShow} setProfile={setProfile} />
        )}
        {profile === 'edu' && (
          <AddEducation setShow={setShow} setProfile={setProfile} />
        )}
        {profile === 'certificate' && (
          <AddCertification setShow={setShow} setProfile={setProfile} />
        )}
        {profile === 'experience' && (
          <AddExperience setShow={setShow} setProfile={setProfile} />
        )}
      </Modal>
      <div className='row' style={{ margin: '2rem', marginTop: '2rem' }}>
        <div className='col-lg-8'>
          <div className='profile card card-body px-0 pt-0 pb-0'>
            <div className='profile-head'>
              <div className='photo-content '>
                <div
                  className='cover-photo w-100'
                  style={{ position: 'relative' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      background: 'rgba(255, 255, 255, 0.9)',
                      top: '10px',
                      left: '15px',
                      borderRadius: '5px',
                      padding: '2px',
                    }}
                  >
                    <UploadSimple size={20} />
                  </div>
                  <div
                    onClick={() => {
                      
                      history.push(pageRoutes.editProfile)
                    }}
                    style={{
                      position: 'absolute',
                      background: 'rgba(255, 255, 255, 0.9)',
                      top: '10px',
                      right: '10px',
                      padding: '5px',
                      cursor: 'pointer',
                      borderRadius: '5px',
                    }}
                  >
                    <PencilSimple size={16} />
                    Edit Profile
                  </div>
                </div>
              </div>
              <div className='profile-info '>
                <div className='profile-photo'>
                  <img
                    src={
                      !props.user.profilePicture
                        ? ProfileImage
                        : props.user.profilePicture
                    }
                    className='img-fluid'
                    alt='profile'
                    style={{
                      width: '150px',
                      height: 'auto',
                      objectFit: 'cover',
                      border: '6px solid white',
                    }}
                  />
                </div>
                <div className='w-100'>
                  <div className='profile-name d-flex justify-content-center justify-content-sm-between w-100'>
                    <div className=''>
                      <h4 className='mb-1' style={{ color: '#d0ef3b' }}>
                        {props.user && props.user.fullName}
                      </h4>

                      <p className='m-0' style={{width: '100%', textAlign: 'center' }}>
                        {
                          props.myPortfolio.profession.length > limit ? props.myPortfolio.profession.slice(0, 250) + "..." : props.myPortfolio.profession.slice(0, 250)
                        }
                      </p>
                      {/* <p className='m-0' style={{width: '100%', lineHeight: '16px'}}>@{props.user.username}</p> */}
                    </div>
                  </div>
                  {/* <Link
                    className='ms-auto btn btn-primary m-0'
                    style={{ alignSelf: 'center' }}
                    to={'#'}
                    id='custom-button'
                    onClick={() => {
                      alert('Message feature in progress')
                    }}
                  >
                    Message {props.user.fullName}

                  </Link> */}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 '>
          <div className='row'>
            <div className='card'>
              <div className='card-body'>
                <div className='profile-statistics'>
                  <div className='text-center'>
                    <div className='row'>
                      <div className='row'>
                        <div className='d-flex justify-content-between pb-4'>
                          <span>Your Dashboard</span>
                        </div>
                        <hr></hr>
                      </div>
                      <div className='d-flex flex-column align-items-start m-3'>
                        <h3 className='m-b-0' style={{color: '#02024D'}}>0</h3> 
                        <span>views today</span>
                      </div>
                      <div className='d-flex flex-column align-items-start m-3'>
                        <h3 className='m-b-0' style={{color: '#02024D'}}>0</h3> 
                        <span>post views</span>
                      </div>
                      <div className='d-flex flex-column align-items-start m-3'>
                        <h3 className='m-b-0' style={{color: '#02024D'}}>0</h3> 
                        <span>search appearances</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row m-4'>
        <div className='col-xl-8'>
          <div className=''>
            <div
              className='card'
              style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            >
              <div>
                <div className='d-flex' style={{borderBottom: '2px solid #eee', paddingBottom: 0}}>
                    <CustomButton 
                      onClick={() => setSection("profile")}
                      style={{ 
                        width: '15rem', 
                        marginBottom: 0,
                        background: `${section === 'profile' ? '#02024D' : "white"}`, 
                        color: `${section === 'profile' ? 'white' : "#02024D"}`, 
                        border: '1px solid #02024D'
                      }}>Profile</CustomButton>
                    <CustomButton 
                      onClick={() => setSection("activity")}
                      style={{ 
                        width: '15rem', 
                        marginBottom: 0,
                        background: `${section === 'activity' ? '#02024D' : "white"}`, 
                        color: `${section === 'activity' ? 'white' : "#02024D"}`, 
                        border: '1px solid #02024D'
                      }}>Portfolio</CustomButton>
                    <CustomButton 
                      onClick={() => setSection("resume")}
                      style={{ 
                        width: '15rem', 
                        marginBottom: 0,
                        background: `${section === 'resume' ? '#02024D' : "white"}`, 
                        color: `${section === 'resume' ? 'white' : "#02024D"}`, 
                        border: '1px solid #02024D'
                        }}>Resume</CustomButton>
                </div>
              </div>
                    {
                      section === 'activity' && 
                      <div className='mt-4'>
                        <div className='card'>
                        <div className='d-flex w-100 justify-content-between align-items-center'>
                            <h4>Profession</h4>
                            <CustomButton onClick={() => {
                              setProfile("profession")
                              setShow(true)
                            }}>Update Profession</CustomButton>
                          </div>
                          <p className='w-50'>{props.myPortfolio.profession.length > limit ? props.myPortfolio.profession.slice(0, limit) : props.myPortfolio.profession }</p>
                            <span onClick={() => setLimit(props.myPortfolio.profession.length)} style={{ color: '#00b500', cursor: 'pointer'}}>{props.myPortfolio.profession.length > limit ? "see more..." : null}</span>
                        </div>

                        <div className='card mt-4'>
                          <div className='d-flex w-100 justify-content-between align-items-center'>
                            <h4>About</h4>
                            <CustomButton onClick={() => {
                              setProfile("about")
                              setShow(true)
                            }}>Update About</CustomButton>
                          </div>
                            <p className='w-50'>{props.myPortfolio.briefDescriptionOfSelf.length > limit ? props.myPortfolio.briefDescriptionOfSelf.slice(0, limit) : props.myPortfolio.briefDescriptionOfSelf }</p>
                            <span onClick={() => setLimit(props.myPortfolio.briefDescriptionOfSelf.length)} style={{ color: '#00b500', cursor: 'pointer'}}>{props.myPortfolio.briefDescriptionOfSelf.length > limit ? "see more..." : null}</span>
                        </div>
                        
                        <div className='card mt-4'>
                          <div className='d-flex align-items-center justify-content-between w-100'>
                            <div className='d-flex align-items-center'>
                              <h4 className='my-0 'style={{marginRight: '1rem'}}>Projects</h4> <span>{props.myPortfolio.projects.length} of {props.myPortfolio.projects.length}</span>
                            </div>
                            <CustomButton onClick={() => {
                              setProfile("project")
                              setShow(true)
                            }}>+ Add Project</CustomButton>
                          </div>
                          <div className='row p-4 d-flex justify-content-start flex-wrap'>

                              {
                                props.myPortfolio.projects.length > 0 &&
                                props.myPortfolio.projects.map(item => (
                                  <ViewProject 
                                    key={item._id} 
                                    {...item}
                                    setShow={setShow}
                                    setProfile={setProfile}
                                  />
                                )).splice(0, showProjects)
                              }
                          </div>
                          <span style={{ color: '#02024D', cursor: 'pointer'}} onClick={() => {
                              if (showProjects === 3){ 
                                return setShowProjects(props.myPortfolio.projects.length)
                              }
                              return setShowProjects(3)
                            }}
                          >{showProjects === 3 ? 'SHOW ALL' : 'COLLAPSE'}({props.myPortfolio.projects.length})</span>
                        </div>
                        <div className='card mt-4'>
                          <div className='d-flex justify-content-between align-items-center w-100'>
                            <h4>Skills & Endorsement</h4>
                            <CustomButton onClick={() => {
                              setProfile("skills")
                              setShow(true)
                            }}>+ Add Skill</CustomButton>
                          </div>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            // justifyContent:'center'
                          }}>
                            {
                              props.auth.user.skills.map((item, index) => (
                                <SkillsCard 
                                  key={index.toString()}
                                  skills={item}
                                  endorsements={0}
                                  props={props}
                                  updateSkillsCallback={updateSkillsCallback}
                                />
                              )).splice(0, showSkills)
                            }
                          
                          </div>
                          <span
                            style={{
                              color: '#02024D',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              if (showSkills === 3){ 
                                return setShowSkills(props.auth.user.skills.length)
                              }
                              else{
                                return setShowSkills(3)
                              }
                              
                            }}
                          >{showSkills === 3 ? 'SHOW ALL' : 'COLLAPSE'}({props.auth.user.skills.length})</span>
                        </div>
                        <div className='card mt-4'>
                          <div className='d-flex justify-content-between align-items-center'>
                            <h4>Education</h4>
                            <CustomButton onClick={() => {
                              setProfile("edu")
                              setShow(true)
                            }}>+ Add Education</CustomButton>
                          </div>
                          {
                            props.myPortfolio.educationalQualifications.map(item => (
                              <ViewEducation 
                                key={item._id} 
                                {...item}
                                setShow={setShow}
                                setProfile={setProfile}
                                type="edu"
                              />
                            ))
                          }
                        </div>
                        <div className='card mt-4'>
                          <div className='d-flex justify-content-between align-items-center'>
                            <h4>Certification</h4>
                            <CustomButton onClick={() => {
                              setProfile("certificate")
                              setShow(true)
                            }}>+ Add Certification</CustomButton>
                          </div>
                          {
                            props.myPortfolio.certifications.map(item => (
                              <ViewEducation 
                                key={item._id} 
                                {...item}
                                setShow={setShow}
                                setProfile={setProfile}
                                type="cert"
                              />
                            ))
                          }
                        </div>
                        <div className='card mt-4'>
                          <div className='d-flex justify-content-between align-items-center'>
                            <h4>Experience</h4>
                            <CustomButton onClick={() => {
                              setProfile("experience")
                              setShow(true)
                            }}>+ Add Experience</CustomButton>
                          </div>
                          {
                            props.myPortfolio.workHistory.map(item => (
                              <ViewExperience 
                                key={item._id} 
                                {...item}
                                setShow={setShow}
                                setProfile={setProfile}
                              />
                            ))
                          }
                        </div>
                      </div>
                    }
                    {
                      section === 'profile' &&
                      <div className=' mt-4 p-5 d-flex justify-content-around flex-wrap' style={{background: 'white', borderRadius: '0.75rem', boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)' }}>
                        <div className=''>

                          <p style={{ fontSize: '1rem'}}>
                            <User size={22} style={{color: '#02024D', marginRight: '1rem'}}/>
                            Full Name: {props.user.fullName}
                          </p>
                          <p style={{ fontSize: '1rem'}}>
                            <Users size={22} style={{color: '#02024D', marginRight: '1rem'}}/>
                            Middle Name: {!props.user.middleName ? "N/A" : props.user.middleName}
                          </p>
                          <p style={{ fontSize: '1rem'}}>
                            <EnvelopeSimple size={22} style={{color: '#02024D', marginRight: '1rem'}}/>
                            Email: {props.user.email}
                          </p>
                          <p style={{ fontSize: '1rem'}}>
                            <UserCircle size={22} style={{color: '#02024D', marginRight: '1rem'}}/>
                            Username: {props.user.username}
                          </p>
                          <p style={{ fontSize: '1rem'}}>
                            <DeviceMobile size={22} style={{color: '#02024D', marginRight: '1rem'}}/>
                            Phone No.: {!props.user.phone ? "N/A" : props.user.phone}
                          </p>
                          <p style={{ fontSize: '1rem'}}>
                            <Briefcase size={22} style={{color: '#02024D', marginRight: '1rem'}}/>
                            Role: {props.user.role}
                          </p>
                          <p style={{ fontSize: '1rem'}}>
                            <GenderIntersex size={22} style={{color: '#02024D', marginRight: '1rem'}}/>
                            Gender: {!props.user.gender ? "N/A" : props.user.gender}
                          </p>
                        <h4 
                          onClick={() => {
                            history.push(pageRoutes.editProfile)
                            setProfile('personal')
                          }}
                          style={{
                            color: '#02024D', 
                            cursor: 'pointer', 
                            textDecoration: 'underline'
                            }}>Edit personal profile</h4>
                        </div>
                        <div className=''>
                          <img style={{width: '20rem'}} src={ProfileDetals} alt="..."/>
                        </div>

                      </div>
                    }
                    {
                      section === 'resume' &&
                      <div className='card'>

                      </div>
                    }
            </div>
          </div>
        </div>
        <div className='col-xl-4'>
          <div className='row'>
            <div className='col-lg-12'></div>
            <div className='col-lg-12'>
              <div className='row'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='profile-statistics'>
                      <div className='text-center'>
                        <div className='row'>
                          <div className='row'>
                            <div className='d-flex justify-content-between pb-4'>
                              <span>Who viewed me?</span>
                              <Link to='#' style={{ color: '#00b500' }}>
                                VIEW ALL
                              </Link>
                            </div>
                            <hr></hr>
                          </div>
                          {[].length > 0 ? (
                            <div className='d-flex m-2'>
                              <div>
                                <img
                                  src={profile}
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                  }}
                                  alt='...'
                                />
                              </div>
                              <div
                                style={{ textAlign: 'start', padding: '10px' }}
                              >
                                <h4 className='m-0 p-0'>Audrey Alexander</h4>
                                <p className='m-0 p-0'>Team lead at Google</p>
                              </div>
                            </div>
                          ) : (
                            <div>No viewed profile</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='row mt-4'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='profile-statistics'>
                      <div className='text-center'>
                        <div className='row'>
                          <div className='row'>
                            <div className='d-flex justify-content-between pb-4'>
                              <span>YOU MAY LIKE THESE COURSES</span>
                            </div>
                            <hr></hr>
                          </div>
                          <Link to='#' style={{ color: '#00b500' }}>
                            SEE ALL RECOMMENDATIONS
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.auth.user,
  token: state.auth.auth.token,
  auth: state.auth.auth,
  myPortfolio: state.myPortfolio,
  jobPosting: state.jobPosting
})

const mapDispatchToProps = (dispatch) => ({
  getProProfile: (id, token) => dispatch(getProProfile(id, token)),
  getAllJobs: (token) => dispatch(getAllJobs(token)),
  updateConfirmedAction: data => dispatch(updateConfirmedAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
