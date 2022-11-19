import { connect} from 'react-redux';
import CustomNav from '../../layouts/nav/CustomNav';
import { EnvelopeSimple, Heart, NotePencil, MapPin, Phone, Globe } from 'phosphor-react';
import CustomButton from '../../components/CustomButton/custom-button';
import card11 from '../../../images/card/card11.jpg';
import card33 from '../../../images/card/card33.jpg';
import card44 from '../../../images/card/card44.jpg';
import moscow from '../../../images/moscow.jpeg';

import ViewEducation from '../../components/AddEducation/view-education';
import ViewExperience from '../../components/AddExperience/view-experience';
import ViewProject from '../../components/AddProject/view-project';
import SkillsDetails from '../../components/SkillsDetails/skills-details';


import ProfilePicture from '../../../images/svg/user.svg';

import './view-user.css';


function ViewUser(props) {
	const { auth: { user }, myPortfolio } = props;
	console.log("Props============>", props)
	return (
		<>
			<CustomNav />
			<div className='mt-5' style={{padding: '0 10rem', width: '100%', height: 'auto'}}>
				<div className='card p-4' style={{borderRadius: '0.4rem'}}>
					<div className='d-flex justify-content-between'>
						<div className='d-flex ' >
							<div className='' style={{marginRight: '1rem', width: '8rem', height: '8rem', border: '10px solid rgba(0,181,0, 0.2)', borderRadius: '50%', overflow: 'hidden'}}>
								<img src={user.profilePicture} alt='image' className='w-100' />
							</div>
							<div className='px-4' style={{ borderLeft: '1px solid #eee'}}>
								<h4>{user.fullName}</h4>
								<p><MapPin size={18} style={{color: 'black', marginRight: '0.5rem'}}/> Abuja, Nigeria</p>
								<p><EnvelopeSimple size={18} style={{color: 'black', marginRight: '0.5rem'}}/>{user.email}</p>
								<p><Phone size={18} style={{color: 'black', marginRight: '0.5rem'}}/>{user.phone}</p>
							</div>
						</div>
						<div className='d-flex'>
							<div className='d-flex justify-content-center align-items-center' style={{width: '50px', height: '50px', border: '1px solid #7f7f7f', borderRadius: '100%', cursor: 'pointer'}}>
								<Heart size={32} style={{color: '#7f7f7f'}}/>
							</div>
							<div>
								<CustomButton style={{margin: '0 1rem', background: 'white', border: '1px solid #00b500', color: '#00b500'}}>Message</CustomButton>
								<CustomButton style={{paddingLeft: '2rem', paddingRight: '2rem'}}>Invite</CustomButton>
							</div>
						</div>
					</div>
					<hr></hr>
					<div className='d-flex mt-5' style={{ width: '100%', height: 'auto', }}>
						<div className=''>
							<h4>Availability</h4>
							<p>Available as needed - Open to offers</p>
							<h6>Languages</h6>
							<p>English: Fluent</p>
							<p>Igbo: Native</p>
						</div>
						<div style={{ width: '100%', height: 'auto', paddingLeft: '1.5rem', flexWrap: 'wrap' }} className=''>
							<div>
								{/* <h4 className='mb-4'>Video editing, Post-production</h4> */}
								<p>{myPortfolio.briefDescriptionOfSelf}</p>
								{/* <p>I possess excellent communication skills and aim to always deliver a job well done.</p>
								<p>I look forword to working with you and helping you streamline your projects to improve your business productivity</p> */}
							</div>
							<div className=' mt-5'>
								<div className=''>
									<h4>Education</h4>
									<div className='mt-4 '>
										{
											myPortfolio.educationalQualifications.map(item => (
												<ViewEducation 
													key={item._id}
													{...item}
												/>
											))
										}
									</div>
								</div>
							</div>
								<div style={{ width: '100%', height: 'auto', flexWrap: 'wrap'}}>
									<div className='mt-5'>
										<h4>Experience</h4>
											<div className='mt-5'>
												{
													myPortfolio.workHistory.map(item => (
														<ViewExperience 
															key={item._id}
															{...item}
														/>
													))
												}
											</div>
									</div>
								</div>
									<div className='d-flex mt-5 justify-content-between flex-wrap'>
										<h3 style={{ paddingRight: '45rem', color: '#7f7f7f'}}>Projects {myPortfolio.projects.length} of {myPortfolio.projects.length}</h3>
										<p><NotePencil size={30} style={{color: 'black', marginRight: '0.5rem'}}/></p>
									</div>
										<div className='card mt-4'>                       
                          <div className='row p-4 d-flex justify-content-start flex-wrap'>
                              {
                                myPortfolio.projects.length > 0 &&
                                myPortfolio.projects.map(item => (
                                  <ViewProject 
                                    key={item._id} 
                                    {...item}
                                  />
                                ))
                              }
                          </div>
                          <span style={{ color: '#00b500', cursor: 'pointer'}} >Show all</span>
                        </div>
									<div style={{ width: '100%', height: 'auto' }} className=''>
									<h4 className='mt-5 mb-5'>Skills</h4>
									<div className='mt-5'>
										{
											myPortfolio.skills.map(item => (
												<SkillsDetails
													key={item._id}
													{...item}
												/>
											))
										}
									</div>
								</div>
							<div className='mb-5'>
								<h4 className='mt-5 mb-5'>Employment History</h4>
								<hr></hr>
								<p>DOP/Master editor/colorist | Swan Media Production<br></br>February 2016 - August 2018</p>
								<hr></hr>
								<p>Cinematographer / Video Editor | Julnar Media Production<br></br>January 2014 - January 2016</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</>
	)
}

const mapStateToProps = state => ({
	auth: state.auth.auth,
	myPortfolio: state.myPortfolio
})


export default connect(mapStateToProps)(ViewUser);