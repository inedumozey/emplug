import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import CreatableSelect from 'react-select/creatable';
import { Row, Col } from 'reactstrap'
import axios from 'axios'

// import { addNewSkill, httpUpdateProfessionalProfile, getProProfile } from "../../../store/actions/MyPortfolio/my-portfolio.actions";

import { updateConfirmedAction } from "../../../store/actions/auth/AuthActions"

function AddSkills(props) {

	const [skills, setSkills] = useState([]);
	const [showInput, setShowInput] = useState(false);
	const [userSkills, setUserSkills] = useState([])

	// function newSkill(e) {
	// 	if (!e.target.value && e.which === 13) {
	// 		return setShowInput(false);
	// 	}
	// 	if (e.which === 13) {
	// 		// console.log(e.target.value)
	// 		const data = [...skills]
	// 		data.push(e.target.value);
	// 		setSkills(data);
	// 		setShowInput(false)
	// 	}
	// }

	// function removeSkill(value) {
	// 	const data = [...skills]
	// 	const filterData = data.filter(item => item !== value)
	// 	setSkills(filterData);
	// }

	// const data = {
	// 	skills:userSkills.length>0?userSkills:props.auth.user.skills
	// }

	const fetchSkills = async () => {
		const arr = []
		const response = await axios.get(
		  `${
			process.env.NODE_ENV === 'development'
			  ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
			  : process.env.REACT_APP_EMPLOYER_CENTER_API
		  }/skill/list`,
		  {
			headers: {
			  authorization: `Bearer ${props.auth.token}`,
			  'Content-Type': 'application/json'
			}
		  }
		)
		// console.log('------------------------------------>>>>>>>>>>',response)
	
		response.data.data.map(el => {
		  arr.push({ label: el.name, value: el.name })
		})
		// console.log('------------------------------------',arr)
	
		setSkills(arr)
	  }
	
	  useEffect(() => {
		fetchSkills()
	}, [])


	//update skills in personal profile
	async function updateProProfile() {
		
		try{

			const data = {
				// middleName:
				//   middleName.length > 0 ? middleName : props.auth.user.middleName,
				gender: props.auth.user.gender,
				phone: props.auth.user.phone,
				profilePicture: props.auth.user.profilePicture,
				country: 'Nigeria',
				stateOfOrigin: props.auth.user.stateOfOrigin,
				stateOfResident: props.auth.user.stateOfResident,
				lgaOfOrigin: props.auth.user.lgaOfOrigin,
				lgaOfResident: props.auth.user.lgaOfResident,
				address: props.auth.user.address,
				DOB: props.auth.user.DOB,
				skills: [...userSkills]
			  }		
	
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
			// console.log(err)
		}
		
		// props.httpUpdateProfessionalProfile(data, props.auth.user._id, props.auth.token);
		// props.getProProfile(props.auth.user._id, props.auth.token);
	}

	function updateSkills(e) {
		e.preventDefault();
		if (skills.length > 0) {
			updateProProfile();
		}
		updateProProfile();
		props.setShow(false);
	}

	useEffect(() => {
		setSkills(props.auth.user.skills)
	}, [])

	return (
		<>
			<form style={{padding: '2rem', paddingLeft: 0, paddingRight: 0}} onSubmit={updateSkills}>
				<div style={{ width: '100%', marginBottom: '0.5rem', borderBottom: '1px solid #eee', padding: '1rem'}}>
					<h3 style={{color: '#7f7f7f'}}>Add Skills</h3>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem', padding: '1rem',paddingTop: 0}}>
					<p>Suggested skills based on your profile</p>

					<Col sm='12' md='6'>
						<label
							className='fw-bold'
							style={{
							opacity: '0.6'
							}}
						>
							Skills
						</label>
						<CreatableSelect
							isMulti
							onChange={(e, opt) => {
							const arr = []
							const selectedSkill = e.map(el => {
								arr.push(el.value)
							})
							// console.log(arr);
							setUserSkills(arr)
							}}
							placeholder='select skills...'
							options={skills}                
						/>
					</Col>

					<CustomButton 
						onClick={() => props.setShow(false)} 
						style={{
							width: '20%', 
							background: 'white', 
							border: '1px solid #00b500', 
							color: '#00b500'}}>Skip</CustomButton>
					<CustomButton
						type="submit"
					>Save</CustomButton>
				</div>
			</form>
		</>
	)
}

const mapStateToProps = state => ({
	user: state.auth.auth.user,
	token: state.auth.auth.token,
	auth: state.auth.auth,
	myPortfolio: state.myPortfolio,
	jobPosting: state.jobPosting
  })
  
  const mapDispatchToProps = dispatch => ({
	getProProfile: (id, token) => dispatch(getProProfile(id, token)),
	getAllJobs: token => dispatch(getAllJobs(token)),
	updateConfirmedAction: data => dispatch(updateConfirmedAction(data))
  })
  

export default connect(mapStateToProps, mapDispatchToProps)(AddSkills);