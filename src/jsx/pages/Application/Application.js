import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

// API
import { createJobPosting } from "../../../services/JobPosting";

// components
import { Modal } from 'react-bootstrap';
import CustomNav from "../../layouts/nav/CustomNav";
import CustomInput from "../../components/CustomInput/custom-input";
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox';
import CustomSelect from '../../components/CustomSelect/Custom-select';
import CustomTextArea from '../../components/CustomTextArea/CustomText';
import CustomButton from '../../components/CustomButton/custom-button';
import Footer from "../../layouts/Footer";
import SkillsCard from '../../components/SkillsCard/skills-card';
import PipelineCard from '../../components/PipelineCard/pipeline-card';
import PipelineViewCard from '../../components/PipelineViewCard/pipeline-view-card';

// actions
import { updateJobPosting } from '../../../store/actions/JobPosting/job-posting.actions';
import pageRoutes from '../../../routes';

function Application({ updateJobPosting, user, token, get_single_organisation }) {
	const [activeToggle, setActiveToggle] = useState("application");
	const [title, setTitle] = useState("");
	const [salary, setSalary] = useState("");
	const [salaryType, setSalaryType] = useState("");
	const [employmentType, setEmploymentType] = useState("");
	const [workType, setWorkType] = useState("");
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [workExperience, setWorkExperience] = useState("");
	const [highiestEduction, setHighiestEduction] = useState("");
	const [location, setLocation] = useState("");
	const [pipelineModal, setPipelineModal] = useState(false);
	const [pipeline, setPipeline] = useState([]);
	const [selected, setSelected] = useState("");
	const [entered, setEntered] = useState("");


	const [certifications, setCertifications] = useState([]);
	const [certs, setCerts] = useState("");
	
	const [skills, setSkills] = useState([]);
	const [skill, setSkill] = useState("");


	const [industry, setIndustry] = useState("");
	const [startDate, setStartDate] = useState("");
	const [closingDate, setClosingDate] = useState("");

	const [jobLocationOptions, setJobLocationOptions] = useState([]);
	const [jobLocationStates, setJobLocationStates] = useState([]);


	const salaryOptions = ["Hourly", "Monthly", "Quarterly", "Per Milestone"]
	const employmentOptions = ["Full Time", "Part Time", "Contract"]
	const experienceOptions = ["< 1", "1-2", "2-4", "4-6", "5-10", "15+"]
	const workOptions = ["On-site", "Hybrid", "Remote"]
	const educationOptions = [
		{
			name: "SSCE",
		},
		{
			name: "BSC",
		},
		{
			name: "ND",
		},
		{
			name: "HND",
		},
	]
	const pipelineData = [
		{ 
			id: 1, 
			title: "Application Form",
			sectionType: "applicationForm",
			sectionId: "",
			active: true,
			route: pageRoutes.formBuilder
		}, 
		{
			id: 2, 
			title: "Interview",
			sectionType: "interview",
			sectionId: "",
			active: true,
			route: pageRoutes.interview
		}, 
		{
			id: 3, 
			title: "Official Letter",
			sectionType: "officialLetter",
			sectionId: "",
			active: true,
			route: pageRoutes.offer
		},
		{
			id: 4, 
			title: "CBT",
			sectionType: "cbt",
			sectionId: "",
			active: true,
			route: pageRoutes.test
		},
		{
			id: 5, 
			title: "Terms and conditions",
			sectionType: "termsAndCondition",
			sectionId: "",
			active: true,
			route: pageRoutes.termsAndConditions
		},
		{
			id: 6, 
			title: "Medicals",
			sectionType: "medicals",
			sectionId: "",
			active: true,
			route: pageRoutes.medicals
		},
		{
			id: 7, 
			title: "Institutions",
			sectionType: "institutions",
			sectionId: "",
			active: true,
			route: pageRoutes.institution
		},
	]
	
	function addCertification(e) {
		if (!certs) return;
		const data = [...certifications];
		data.push(certs);
		setCertifications(data);
		setCerts("");
	}

	function addSkill(e) {
		if (!skill) return;
		const data = [...skills];
		data.push(skill);
		setSkills(data);
		setSkill("");
	}

	function addPipeline(value) {
		const data = [...pipeline];
		data.push(value);
		setPipeline(data);
	}

	function activePipeline(data, index) {
		const newPipeline = [...pipeline];
		const newData = newPipeline[index];
		newData.active = data === 'on' ? true : false;
		newPipeline[index] = newData;
		console.log(newPipeline);
	}


	function reorder(e) {
		e.preventDefault();
		const findSelectedIndex = pipeline.findIndex(item => item.title === selected);
		const findEnteredIndex = pipeline.findIndex(item => item.title === entered);
		
	
		const data = [...pipeline];
		const selectedItem = data.splice(findSelectedIndex, 1);
		const enteredItem = data.splice(findEnteredIndex, 1);
		if (!selectedItem[0] || !enteredItem[0]) return;
		data.splice(findSelectedIndex, 0, enteredItem[0]);
		data.splice(findEnteredIndex, 0, selectedItem[0]);
		setPipeline(data);
		return;
	}

	function removePipeline(title) {
		const data = [...pipeline];

		const newData = data.filter(item => item.title !== title);
		setPipeline(newData);
	}



	async function postEmployment(e) {
		e.preventDefault();
		console.log("Starting API call...");
		const response = await createJobPosting({
			author: get_single_organisation.selected_organisation._id,
			initials: get_single_organisation.selected_organisation.initials,
			title,
			organizationId: get_single_organisation.selected_organisation._id,
			salary,
			salaryType: salaryType.toLowerCase(),
			employmentType: employmentType.toLowerCase(),
			workType: workType.toLowerCase(),
			country,
			state,
			jobDescription: jobDescription.toLowerCase(),
			workExperience,
			highiestEduction,
			location,
			certifications,
			skills,
			industry,
			startDate,
			closingDate
		}, null, token);

		updateJobPosting(response.data.data._id);
	}

	async function getCountries() {
		const response = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json');
		setJobLocationOptions(response.data);
		const stateResponse = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json');
		setJobLocationStates(stateResponse.data);
	}


	function getCountryState() {
		const getStates = jobLocationStates.filter(item => item.country_name === country)
		if (getStates.length > 0) {
			return getStates;
		} 

		return jobLocationStates;
	}


	useEffect(() => {
		getCountries();
	}, [jobLocationOptions.length]);

	const hashUrl = useHistory();

	return (
		<>
			<CustomNav />
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>

				<div className="card mt-10" style={{marginTop: '8rem', width: '80%', position: 'relative', height: `${activeToggle === 'aboutMe' ? '50rem' : ''}`}}>
					<ol className="nav nav-tabs" style={{ display: 'flex', listStyle: 'auto'}}>
							<li className="nav-item" style={{marginRight: '0'}} onClick={() => setActiveToggle("application")}>
								<Link to="#application" data-toggle="tab" style={{ borderRadius: '0' }} className={`nav-link ${ activeToggle === "application" ? "active show" : ""} `}>Employment information</Link>
							</li>
							{/* {
								activeToggle === 'aboutMe' && */}
								<li className="nav-item" style={{marginRight: '0'}} onClick={() => setActiveToggle("aboutMe")}>
									<Link to="#about-me"  data-toggle="tab" style={{ borderRadius: '0'}} className={`nav-link ${ activeToggle === "aboutMe" ? "active show" : ""}`}>Pipeline Setup</Link>
								</li>
							{/* } */}
					</ol>
					<div  id="application" className={`tab-pane fade ${ activeToggle === "application" ? "active show" : ""}`}>
						<form onSubmit={postEmployment}>
							<div style={{ width: '30%', marginLeft: '7rem', marginTop: '2rem'}}>
								<CustomInput 
									title="Add Image*" 
									// placeholder="Job Title" 
									style={{width: '100%'}}
									// value={title}
									// onChange={e => setTitle(e.target.value)}
									type="file"
								/>
							</div>
							<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', paddingTop: '2rem', width: '100%'}}>
								<div style={{ width: '30%', marginRight: '1rem'}}>
									<CustomInput 
										title="Job Title *" 
										placeholder="Job Title" 
										style={{width: '100%'}}
										value={title}
										onChange={e => setTitle(e.target.value)}
									/>
								</div>
								<div style={{ width: '30%', marginRight: '1rem'}}>
									<CustomInput 
										title="Salary *" 
										placeholder="Salary" 
										style={{width: '100%'}}
										value={salary}
										onChange={e => setSalary(e.target.value)}
									/>
								</div>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem'}}>
								<label style={{fontWeight: 'bold', color: '#7f7f7f'}}>Salary Method *</label>
								<div style={{display: 'flex', flexWrap: 'wrap'}}>
									{
										salaryOptions.map((item, index) => (
											<CustomCheckBox 
												key={index.toString()}
												setOption={setSalaryType}
												item={item}
												option={salaryType}
											/>
										))
									}
								</div>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem', display: 'flex', flexWrap: 'wrap'}}>
								<div>
									<label style={{fontWeight: 'bold', color: '#7f7f7f'}}>Employment type *</label>
									<div style={{display: 'flex', flexWrap: 'wrap'}}>
										{
											employmentOptions.map((item, index) => (
												<CustomCheckBox 
													key={index.toString()}
													setOption={setEmploymentType}
													item={item}
													option={employmentType}
												/>
											))
										}
										
									</div>
								</div>
								<div style={{paddingTop: '1rem'}}>
									<CustomInput 
										title="Positions Available *" 
										style={{ width: 'auto'}}
										placeholder="Eg 10 positions"
									/>
								</div>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem', display: 'flex', flexWrap: 'wrap'}}>
								<div>
									<label style={{fontWeight: 'bold', color: '#7f7f7f'}}>Work type *</label>
									<div style={{display: 'flex', flexWrap: 'wrap'}}>
										{
											workOptions.map((item, index) => (
												<CustomCheckBox 
													key={index.toString()}
													setOption={setWorkType}
													item={item}
													option={workType}
												/>
											))
										}
										
									</div>
								</div>
								<div style={{paddingTop: '1rem'}}>
									<CustomInput 
										title="Work Hours *" 
										style={{ width: 'auto'}}
										placeholder="Eg 9am - 5pm"
									/>
								</div>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem', display: 'flex',  flexWrap: 'wrap'}}>
								<div style={{width: '40%', marginRight: '2rem'}}>
									<CustomSelect 
										title="Job Location *"
										data={jobLocationOptions}
										placeholder="Country"
										value={country}
										onChange={e => setCountry(e.target.value)}
									/>
								</div>
								<div style={{width: '40%', marginRight: '1rem'}}>
									<CustomSelect 
										title="State *"
										data={getCountryState()}
										placeholder="State"
										value={state}
										onChange={e => setState(e.target.value)}
									/>
								</div>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem',}}>
								<CustomTextArea 
									title="Job Description" 
									placeholder="description" 
									style={{
										width: '83%', 
										height: '15rem',
										// background: '#FAFFFE'
									}}
									value={jobDescription}
									onChange={e => setJobDescription(e.target.value)}
								/>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem', display: 'flex',  flexWrap: 'wrap'}}>
								<h3>Qualification Requirements</h3>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem', }}>
								<label style={{ color: '#7f7f7f'}}>How many years of work experience do you need?</label>
								<div style={{display: 'flex', flexWrap: 'wrap'}}>
									{
										experienceOptions.map((item, index) => (
											<CustomCheckBox 
												key={index.toString()}
												setOption={setWorkExperience}
												item={item}
												option={workExperience}
											/>
										))
									}
									
								</div>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem', display: 'flex',  flexWrap: 'wrap'}}>
								<div style={{width: '40%', marginRight: '2rem'}}>
									<CustomSelect 
										title="Education *"
										data={educationOptions}
										placeholder="What should be the highest education"
										value={highiestEduction}
										onChange={e => setHighiestEduction(e.target.value)}
									/>
								</div>
								<div style={{width: '40%', marginRight: '1rem'}}>
									{
										jobLocationOptions.length > 0 &&
										<CustomSelect 
											title="Location"
											data={jobLocationOptions}
											placeholder="what location is required"
											value={location}
											onChange={e => setLocation(e.target.value)}
										/>
									}
								</div>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem', display: 'flex',  flexWrap: 'wrap'}}>
								{certifications.length > 0 && certifications.map((item, index) => <SkillsCard key={index.toString()} endorsements={index + 1} skills={item}/>)}
								<div style={{display: 'flex', width: '100%'}}>
									<div style={{width: '40%'}}>
										<CustomInput 
											title="Certifications"
											placeholder="Name of certification"
											value={certs}
											onChange={e => setCerts(e.target.value)}
										/>
									</div>
									<div style={{paddingTop: '1rem'}}>
										<CustomButton 
											style={{height: '3rem'}}
											onClick={addCertification}
										>Add Certificate</CustomButton>
									</div>
								</div>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem', display: 'flex',  flexWrap: 'wrap'}}>
							{skills.length > 0 && skills.map((item, index) => <SkillsCard endorsements={index + 1} skills={item}/>)}
								<div style={{display: 'flex', width: '100%'}}>
									<div style={{width: '40%'}}>
										<CustomInput 
											title="Required Skills"
											placeholder="Add Skills"
											value={skill}
											onChange={e => setSkill(e.target.value)}
										/>
									</div>
									<div style={{paddingTop: '1rem'}}>
										<CustomButton
											onClick={addSkill} 
											style={{
												height: '3rem', 
												paddingLeft: '2rem', 
												paddingRight: '2rem'
											}}>Add Skills</CustomButton>
									</div>
								</div>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem', display: 'flex',  flexWrap: 'wrap'}}>
								<div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
									<div style={{width: '40%'}}>
										<CustomInput 
											title="Start Date"
											// placeholder="Add Skills"
											type="date"
											onChange={e => setStartDate(e.target.value)}
										/>
									</div>
									<div style={{width: '40%'}}>
										<CustomInput 
											title="Closing Date"
											// placeholder="Add Skills"
											type="date"
											onChange={e => setClosingDate(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem',}}>
								<CustomSelect 
									title="Select Industry"
									data={["Tech", "Agriculture", "Catering"]}
									placeholder="what industry is required"
									value={industry}
									onChange={e => setIndustry(e.target.value)}
								/>
							</div>
							<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
									<div style={{display: 'flex', justifyContent: 'space-between', width: '70%'}}>
										<Link to="/">
											<CustomButton>Cancel</CustomButton>
										</Link>
										{/* <div style={{paddingTop: '1rem'}}>
											<p style={{cursor: 'pointer', color: '#56b609'}}>Save as Draft</p>
										</div> */}
									</div>
									<div style={{display: 'flex', justifyContent: 'flex-end', width: '20%'}}>
										{/* <CustomButton style={{marginRight: '2rem', paddingRight: '2rem', paddingLeft: '2rem', background: '#fff', color: '#56b609', border: '1px solid #56b609'}} type="submit">Save</CustomButton> */}
										<CustomButton style={{ paddingRight: '2rem', paddingLeft: '2rem'}} onClick={() => setActiveToggle("aboutMe")} type="submit">Publish</CustomButton>
									</div>
							</div>
							
						</form>
					</div>

					<div id="about-me"  className={`tab-pane fade ${ activeToggle === "aboutMe" ? "active show" : ""}`}>
						<div style={{ 
							position: (activeToggle === "aboutMe" && 'absolute'), top: '4rem', width: '90%', left: 0
							}}>
							<div style={{ 
								paddingLeft: '7rem', 
								display: 'flex',
								flexWrap: 'wrap'
							}} 
								onDragOver={(e) => {
									e.preventDefault();
								}}
								onDrop={reorder}
								>
									<Modal show={pipelineModal} onHide={() => setPipelineModal(false)} className="modal fade " id="pipelineModal" aria-hidden="true">
										<div className='' style={{ padding: '2rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
											{
												pipelineData.map(item => (
													<PipelineCard 
														addPipeline={addPipeline} 
														setPipelineModal={setPipelineModal} 
														{...item}
														// title={item.title} 
														// id={item.id} 
														key={item.id.toString()}
													/>
												))
											}
											
										</div>
									</Modal>
								<div className='shadow' onClick={() => setPipelineModal(true)} style={{ borderRadius: '4px', cursor: 'pointer', background: '#fafffe', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem',  height: '10rem', margin: '1rem'}}>
									<div style={{textAlign: 'center'}}>
										<h1 style={{color: '#7f7f7f', marginBottom: '0', paddingBottom: '0'}}>+</h1>
										<p style={{fontSize: '0.6rem', }}>Add Pipeline</p>
									</div>
								</div>

								{
									pipeline.length > 0 && 
									pipeline.map((item, index) => 
										<PipelineViewCard 
											key={index.toString()} 
											{...item} 
											index={index}
											setSelected={setSelected}
											setEntered={setEntered}
											removePipeline={removePipeline}
											activePipeline={activePipeline}
										/>)
								}
							</div>
						
								<div style={{width: '100%', padding: '1rem', paddingLeft: '7.5rem', marginTop: '12rem', display: 'flex', justifyContent: 'space-between'}}>
									<div style={{display: 'flex', justifyContent: 'space-between', width: '70%'}}>
										<Link to="/">
											<CustomButton>Cancel</CustomButton>
										</Link>
										{/* <div style={{paddingTop: '1rem'}}>
											<p style={{cursor: 'pointer', color: '#56b609'}}>Save as Draft</p>
										</div> */}
									</div>
									<div style={{display: 'flex', justifyContent: 'flex-end', width: '20%'}}>
										<CustomButton style={{marginRight: '2rem', paddingRight: '2rem', paddingLeft: '2rem', background: '#fff', color: '#56b609', border: '1px solid #56b609'}}>Save</CustomButton>
										{/* <CustomButton style={{ paddingRight: '2rem', paddingLeft: '2rem'}} onClick={() => setActiveToggle("application")}>Back</CustomButton> */}
									</div>
							</div>
						</div>
					</div>
				</div>

			</div>
			<Footer />
		</>
	);
}

const mapStateToProps = state => ({
	user: state.auth.auth.user,
	token: state.auth.auth.token,
	get_single_organisation: state.organisation
});

const mapDispatchToProps = dispatch => ({
	updateJobPosting: id => dispatch(updateJobPosting(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);