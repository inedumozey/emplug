import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { createProfessionalProfile } from '../../../services/MyPortfolio';

// actions
import { addNewSkill, updateProProfile, getProProfile } from "../../../store/actions/MyPortfolio/my-portfolio.actions";

// components
import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import SkillsCard from "../SkillsCard/skills-card";



function SkillsDetails({ addNewSkill, myPortfolio, setEditField, auth: {token, user}, getProProfile, updateProProfile}) {
	const [skill, setSkill] = useState("");
	const [skills, setSkills] = useState([]);
	const [done, setDone] = useState(false);

	function onHandleSubmit(e) {
		e.preventDefault();
		addSkill();
		setDone(true);
	}

	function addSkill() {
		const data = [...skills];
		data.push(skill);
		setSkills(data);
		setSkill("");
	}

	async function sendDetails() {
		myPortfolio.skills = [...myPortfolio.skills, ...skills];
		const response = await createProfessionalProfile(myPortfolio, user._id, token);
		// console.log(response.data.data);
		// updateProProfile(response.data.data); 
		getProProfile(user._id, token);
	}

	useEffect(() => {
		if (done) {
			addNewSkill(skills);
			// console.log(myPortfolio);
			sendDetails();
			setEditField({ show: false, section: "" });
		}
	}, [done]);


	return (
		<>
			<div style={{padding: '2rem'}}>
				<h4 style={{marginBottom: '2rem', borderBottom: '1px solid #eee'}}>Certification Details</h4>
				{
					skills.map((item, index) => (
						<SkillsCard 
							key={index}
							skills={item}
							endorsements={index}
						/>
					))
				}
				<form onSubmit={onHandleSubmit}>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Skills"
							style={{width: '100%', height: '2.5rem'}}
							placeholder="skills"
							value={skill}
							onChange={e => setSkill(e.target.value)}
						/>
					</div>
					<div style={{display: 'flex', justifyContent: "center"}}>
						<CustomButton onClick={addSkill} style={{width: '40%', fontSize: '1rem'}}>Add</CustomButton>
						<CustomButton type="submit" style={{width: '40%', fontSize: '1rem'}}>Save</CustomButton>
					</div>
				</form>
			</div>
		</>
	);
}

const mapStateToProps = state => ({
	myPortfolio: state.myPortfolio,
	auth: state.auth.auth
})

const mapDispatchToProps = dispatch => ({
	addNewSkill: data => dispatch(addNewSkill(data)),
	updateProProfile: data => dispatch(updateProProfile(data)),
	getProProfile: (id, token) => dispatch(getProProfile(id, token))
});


export default connect(mapStateToProps, mapDispatchToProps)(SkillsDetails);