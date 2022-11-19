import { connect } from 'react-redux';
import CustomInput from '../../components/CustomInput/custom-input';
import CustomNav from '../../layouts/nav/CustomNav';
import CustomButton from '../../components/CustomButton/custom-button';
import CustomSelect from '../../components/CustomSelect/Custom-select';

import OrgPic from '../../../images/comapny/1.png';
import CustomTextArea from '../../components/CustomTextArea/CustomText';
import GetCompanyName from '../../components/GetCompanyName/get-company-name';
import { useState } from 'react';
import GetAuthor from '../../components/GetAuthor/get-author';


function ApplyJob({ jobPosting: { job_view }, auth}) {
	const [orgDetails, setOrgDetails] = useState();
	return (
		<>
			<CustomNav />
			<div className='mx-5' style={{ marginTop: '10rem'}}>
				<div className='d-flex justify-content-evenly flex-wrap'>
					<div className='card mx-2 p-5' style={{ width: '65%', borderRadius: '0.4rem'}}>
						<h2 style={{color: '#7f7f7f'}}>
							<GetAuthor 
							setOrgDetails={setOrgDetails}
							token={auth.token}
							userId={job_view.author}
							/>
						</h2>
						{/* <h2 style={{color: '#7f7f7f', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>
							<GetAuthor 
								token={props.auth.token}
								userId={props.jobPosting.job_view.author}
							/>
							</h2> */}
						<p className="mb-0" style={{color: '#7f7f7f'}}>Date posted: {job_view.createdAt.split("T")[0]}</p>
						<p className="mb-0" style={{color: '#7f7f7f'}}>Monthly Salary: NGN{job_view.salary}</p>
						<p className="mb-0" style={{color: '#00b500'}}>0 Applicants</p>
					</div>
					<div className='card mx-2 p-4' style={{ width: '30%', borderRadius: '0.4rem'}}>
							<div className="d-flex justify-content-center mb-4">
							<img src={!orgDetails ? OrgPic : orgDetails.logo} alt="..." style={{ width: '80px', height: "80px", borderRadius: '50%'}}/>
						</div>
						<div style={{ textAlign: 'center'}}>
							<h5 style={{ color: '#7f7f7f', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>
								{orgDetails && orgDetails.organizationName}
								{/* <GetAuthor 
									token={props.auth.token}
									userId={props.jobPosting.job_view.author}
								/> */}
							</h5>
							<p className="mb-0" style={{color: '#7f7f7f'}}>{orgDetails && `${orgDetails.address} ${orgDetails.state}, ${orgDetails.country}` }</p>
							<p className="mb-0" style={{color: '#7f7f7f'}}>0 Current Jobs Openings</p>
						</div>
						<div className="d-flex justify-content-around mt-4">
							<CustomButton>FOLLOW</CustomButton>
							<CustomButton>CONTACT</CustomButton>
						</div>
					</div>
				</div>
				<div className='d-flex justify-content-center'>
					<div className='card m-4 p-4' style={{  width: '100%', borderRadius: '0.4rem'}}>
						<h4 style={{borderBottom: '1px solid #eee', paddingBottom: '1rem', color: '#7f7f7f'}}>Application Details</h4>
								<div className='d-flex flex-wrap'>
									<div className='m-4' style={{ width: '40%'}}>
										<h4 style={{color: '#7f7f7f'}}>Employment type</h4>
										<CustomSelect 
											title="Which type of employment are you available for?"
											data={["Contract", "Part-time", "Full time", "Hybrid"]}
											placeholder="Please select"
										/>
									</div>
									<div className='m-4' style={{ width: '40%'}}>
										<h4 style={{color: '#7f7f7f'}}>Work type</h4>
										<CustomSelect 
											title="Which working schedule are you available for?"
											data={[]}
											placeholder="Please select"
										/>
									</div>
									<div className='m-4' style={{ width: '40%'}}>
										<h4 style={{color: '#7f7f7f'}}>Location</h4>
										<CustomInput 
											title="What is your current location?"
											placeholder="Ex: Abuja, Nigeria"
										/>
									</div>
									<div className='m-4' style={{ width: '40%'}}>
										<h4 style={{color: '#7f7f7f'}}>Years of experience</h4>
										<CustomSelect 
											title="What is your year of experience in this industry?"
											data={["0-1year", "2-4years", "> 5years"]}
											placeholder="Please select"
										/>
									</div>
								</div>
					</div>
				</div>
				<div className='d-flex justify-content-center'>
					<div className='card m-4 p-4' style={{ width: '100%', borderRadius: '0.4rem'}}>
					<h4 style={{borderBottom: '1px solid #eee', paddingBottom: '1rem', color: '#7f7f7f'}}>Educational Qualification</h4>
					<p style={{ paddingBottom: '1rem', color: '#7f7f7f'}}>What is your highest level of education?</p>
						
						<div className='d-flex justify-content-around flex-wrap'>
								<div style={{ 
										borderRadius: '4px', 
										boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)', 
										background: '#FAFFFE', 
										position: 'relative', 
										width: '15rem', 
										height: '10rem', 
										border: '1px solid #eee',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										margin: '2rem'
									}}>
									<input style={{position: 'absolute', right: '1rem', top: '1rem'}} name='edu' type="radio"/>
									<div style={{ textAlign: 'center'}}>
										<svg xmlns="http://www.w3.org/2000/svg" width="31.948" height="31.942" viewBox="0 0 31.948 31.942">
											<path id="icons8-contract" d="M8.34,1a3.289,3.289,0,0,0-3.3,3.3V7.084a.761.761,0,1,0,1.521,0V4.3A1.764,1.764,0,0,1,8.34,2.521H26.847A3.231,3.231,0,0,0,26.34,4.3V27.112a1.775,1.775,0,1,1-3.549,0V24.577a.747.747,0,0,0-.761-.761h-3.8a.761.761,0,0,0,0,1.521h3.042v1.775a3.457,3.457,0,0,0,.507,1.775h-4.31a.761.761,0,1,0,0,1.521h7.1a3.289,3.289,0,0,0,3.3-3.3V4.3a1.775,1.775,0,0,1,3.549,0V6.07H29.635a.761.761,0,1,0,0,1.521h2.535a.747.747,0,0,0,.761-.761V4.3a3.289,3.289,0,0,0-3.3-3.3ZM9.2,9.624q-.227,0-.457.021a8.365,8.365,0,0,0,.583,16.707.761.761,0,1,1,.025,1.521,9.84,9.84,0,0,1-4.487-1.065.757.757,0,0,0-1.09.684v4.69a.751.751,0,0,0,1.166.634l4.411-2.789,4.411,2.789a.758.758,0,0,0,1.166-.634V24.222A8.365,8.365,0,0,0,9.2,9.624Zm.152,1.517a6.845,6.845,0,1,1-6.845,6.845A6.849,6.849,0,0,1,9.354,11.141Z" transform="translate(-0.984 -1)"/>
										</svg>

										<p className='m-0'>Masters degree</p>
										<p className='m-0'>MSC</p>
									</div>
								</div>
								<div style={{ 
										borderRadius: '4px', 
										boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)', 
										background: '#FAFFFE', 
										position: 'relative', 
										width: '15rem', 
										height: '10rem', 
										border: '1px solid #eee',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center', 
										margin: '2rem'
									}}>
									<input style={{position: 'absolute', right: '1rem', top: '1rem'}} name='edu' type="radio"/>
									<div style={{ textAlign: 'center'}}>
										<svg xmlns="http://www.w3.org/2000/svg" width="35.625" height="35.625" viewBox="0 0 35.625 35.625">
											<path id="icons8-education" d="M19.812,2A17.813,17.813,0,1,0,37.625,19.812,17.824,17.824,0,0,0,19.812,2Zm0,1.549A16.264,16.264,0,1,1,3.549,19.812,16.252,16.252,0,0,1,19.812,3.549Zm.014,7.745a.775.775,0,0,0-.328.067l-13.94,6.2a.775.775,0,0,0-.136,1.339l2,1.428v4.353a1.545,1.545,0,0,0-.774,1.333c0,.852,1.549,3.1,1.549,3.1s1.549-2.246,1.549-3.1a1.545,1.545,0,0,0-.774-1.333V21.429l1.549,1.106v1.15a1.213,1.213,0,0,0,.433.891,2.505,2.505,0,0,0,.7.424,9.431,9.431,0,0,0,1.994.543,36.06,36.06,0,0,0,6.162.466,36.06,36.06,0,0,0,6.162-.466A9.431,9.431,0,0,0,27.968,25a2.506,2.506,0,0,0,.7-.424,1.213,1.213,0,0,0,.433-.891v-1.15l5.1-3.641a.775.775,0,0,0-.136-1.339l-13.94-6.2A.775.775,0,0,0,19.826,11.293Zm-.014,1.622L32.2,18.421l-3.093,2.21v-.818a1.266,1.266,0,0,0-.351-.841,2.16,2.16,0,0,0-.641-.454,7.277,7.277,0,0,0-1.844-.56,35.617,35.617,0,0,0-6.457-.469,35.617,35.617,0,0,0-6.457.469,7.277,7.277,0,0,0-1.844.56,2.16,2.16,0,0,0-.641.454,1.266,1.266,0,0,0-.351.841v.818l-3.093-2.21Zm0,6.123a34.567,34.567,0,0,1,6.162.44,6.25,6.25,0,0,1,1.449.427.59.59,0,0,1,.133.083v2.243a10.724,10.724,0,0,0-1.582-.4,36.06,36.06,0,0,0-6.162-.466,36.06,36.06,0,0,0-6.162.466,10.724,10.724,0,0,0-1.582.4V19.988A.59.59,0,0,1,12.2,19.9a6.25,6.25,0,0,1,1.449-.427A34.567,34.567,0,0,1,19.812,19.038Zm0,3.872a34.861,34.861,0,0,1,5.886.442,8.169,8.169,0,0,1,1.249.333,8.169,8.169,0,0,1-1.249.333,34.861,34.861,0,0,1-5.886.442,34.861,34.861,0,0,1-5.886-.442,8.169,8.169,0,0,1-1.249-.333,8.169,8.169,0,0,1,1.249-.333A34.861,34.861,0,0,1,19.812,22.91Z" transform="translate(-2 -2)"/>
										</svg>
										<p className='m-0'>Bachelors degree</p>
										<p className='m-0'>BSC</p>
									</div>
								</div>
								<div style={{ 
										borderRadius: '4px', 
										boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)', 
										background: '#FAFFFE', 
										position: 'relative', 
										width: '15rem', 
										height: '10rem', 
										border: '1px solid #eee',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										margin: '2rem'
									}}>
									<input style={{position: 'absolute', right: '1rem', top: '1rem'}} name='edu' type="radio"/>
									<div style={{ textAlign: 'center'}}>
										<svg xmlns="http://www.w3.org/2000/svg" width="40.564" height="36.504" viewBox="0 0 40.564 36.504">
											<path id="icons8-school" d="M20.174,3a.869.869,0,0,0-.253.076L.455,12.807a.816.816,0,0,0,.71,1.47L20.275,4.722l19.111,9.555a.816.816,0,0,0,.71-1.47L20.63,3.075A.813.813,0,0,0,20.174,3Zm-8.82,10.569A18.8,18.8,0,0,0,4.409,14.81,11.262,11.262,0,0,0,1.95,16.1a.8.8,0,0,0-.3.608V33.819H1.621v3.244a.813.813,0,0,0,.811.811H16.676a2.033,2.033,0,0,0,.558.634,4.814,4.814,0,0,0,3.041.988,4.814,4.814,0,0,0,3.041-.988,2.033,2.033,0,0,0,.558-.634H38.119a.813.813,0,0,0,.811-.811V33.819H38.9V16.711a.8.8,0,0,0-.3-.608,11.262,11.262,0,0,0-2.459-1.293A18.8,18.8,0,0,0,29.2,13.568a18.8,18.8,0,0,0-6.945,1.242,11.53,11.53,0,0,0-1.977.988A11.53,11.53,0,0,0,18.3,14.81,18.8,18.8,0,0,0,11.354,13.568Zm0,1.571a17.116,17.116,0,0,1,6.362,1.141,7.012,7.012,0,0,1,1.774.912v16.12a4.883,4.883,0,0,0-1.141-.634,18.458,18.458,0,0,0-7-1.267,18.458,18.458,0,0,0-7,1.267,4.883,4.883,0,0,0-1.141.634V17.192a7.012,7.012,0,0,1,1.774-.912A17.116,17.116,0,0,1,11.354,15.139Zm17.843,0a17.116,17.116,0,0,1,6.362,1.141,7.012,7.012,0,0,1,1.774.912v16.12a4.883,4.883,0,0,0-1.141-.634,18.458,18.458,0,0,0-7-1.267,18.458,18.458,0,0,0-7,1.267,4.883,4.883,0,0,0-1.141.634V17.192a7.012,7.012,0,0,1,1.774-.912A17.116,17.116,0,0,1,29.2,15.139ZM11.354,32.982a16.736,16.736,0,0,1,6.387,1.166,8.547,8.547,0,0,1,2.028,1.09h.025a.383.383,0,0,0,.051.051h.025l.025.025.025.025a.378.378,0,0,0,.051.025H20a.379.379,0,0,0,.051.025h.076l.025.025h.177a.783.783,0,0,0,.253-.076h.051l.025-.025h.025a.77.77,0,0,0,.1-.076,8.547,8.547,0,0,1,2.028-1.09A16.736,16.736,0,0,1,29.2,32.982a16.736,16.736,0,0,1,6.387,1.166,8.76,8.76,0,0,1,1.724.887v1.217H23.519a.806.806,0,0,0-.735.456,1.659,1.659,0,0,1-.482.532,3.072,3.072,0,0,1-2.028.634,3.072,3.072,0,0,1-2.028-.634,1.659,1.659,0,0,1-.482-.532.806.806,0,0,0-.735-.456H3.243V35.035a8.759,8.759,0,0,1,1.724-.887A16.736,16.736,0,0,1,11.354,32.982Z" transform="translate(0.007 -2.992)"/>
										</svg>
										<p className='m-0'>High School</p>
										<p className='m-0'>SSCE</p>
									</div>
								</div>
						</div>
					</div>
				</div>
				<div className='d-flex justify-content-center'>
					<div className='card m-4 p-4' style={{ width: '100%', borderRadius: '0.4rem'}}>
					<h4 style={{borderBottom: '1px solid #eee', paddingBottom: '1rem', color: '#7f7f7f'}}>Skills</h4>
					<p style={{ color: '#7f7f7f'}}>Choose all the skills you’re good at for this application</p>
					<div className='d-flex flex-wrap'>
						{
							["3D Animation", "Brand identity", "After Effects", "Illustration", "Graphic Design", "Image Editing","3D Animation", "Brand identity", "After Effects", "Illustration", "Graphic Design", "Image Editing", ].map((item, index) => (
								<div key={item + index.toString()} style={{
									margin: '1rem', 
									background: '#EFEFEF', 
									borderRadius: '10px', 
									display:'flex', 
									justifyContent: 'center', 
									alignItems: 'center', 
									width: '10rem', 
									height: '2rem', 
									border: '1px solid #eee', 
									cursor: 'pointer'
								}}>
									{item}
								</div>
							))
						}
					</div>
					</div>
				</div>
				<div className='d-flex justify-content-center'>
					<div className='card m-4 p-4' style={{ width: '100%', borderRadius: '0.4rem'}}>
					<h4 style={{borderBottom: '1px solid #eee', paddingBottom: '1rem', color: '#7f7f7f'}}>Select Resume</h4>

					</div>
				</div>
				<div className='d-flex justify-content-center'>
					<div className='card m-4 p-4' style={{ width: '100%', borderRadius: '0.4rem'}}>
					<h4 style={{borderBottom: '1px solid #eee', paddingBottom: '1rem', color: '#7f7f7f'}}>Say something about yourself</h4>
						<CustomTextArea 
							placeholder="Be as clear and concise as possible"
							style={{
								width: '100%',
								height: '10rem'
							}}
						/>
					</div>
				</div>
				<div className='d-flex justify-content-center'>
					<div className='card m-4 p-4' style={{ width: '100%', borderRadius: '0.4rem'}}>
						<div className='d-flex '>
							<input type="checkbox" style={{marginRight: '1rem'}}/>
							<p style={{borderBottom: '1px solid #eee', paddingBottom: '1rem', color: '#7f7f7f'}}>Yes, I understand and agree to the <span style={{color: '#00b500'}}>Emplug Terms of Service</span>, including the <span style={{color: '#00b500'}}>User Agreement </span>and <span style={{color: '#00b500'}}>Privacy Policy. </span></p>
						</div>
						<div className='d-flex'>
							<CustomButton style={{
								color: '#00b500',
								background: 'white',
								// width: '15%',
								boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)', 
								border: '1px solid #eee'
							}}>Cancel</CustomButton>
							<CustomButton style={{
								background: '#EFEFEF',
								color: '#000',
								// width: '15%',
								boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)', 
							}}>Submit</CustomButton>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = state => ({
	jobPosting: state.jobPosting,
	auth: state.auth.auth
});

export default connect(mapStateToProps)(ApplyJob);