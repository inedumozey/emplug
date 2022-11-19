import { useState, useEffect } from "react";
import { connect } from 'react-redux';

import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import CustomSelect from "../CustomSelect/Custom-select";
import CustomTextArea from "../CustomTextArea/CustomText";

import { addNewWorkHistory, updateProfessionalProfile, httpUpdateProfessionalProfile, fieldToEdit, getProProfile } from "../../../store/actions/MyPortfolio/my-portfolio.actions";

import axios from "axios";

function AddExperience({ 
	auth, 
	fieldToEdit,
	myPortfolio, 
	setShow, 
	addNewWorkHistory, 
	updateProfessionalProfile, 
	httpUpdateProfessionalProfile,
	getProProfile
}) {
	const [companyName, setCompanyName] = useState("");
	const [industry, setIndustry] = useState("");
	const [position, setPosition] = useState("");
	const [duties, setDuties] = useState("");
	const [to, setTo] = useState("");
	const [from, setFrom] = useState("");

	function anyEmptyField() {
		return !companyName || !industry || ! position || !duties || !to || !from;
	}
	function checkIfWorkHistoryExist() {
		const info = {
			...myPortfolio.edit
		}
		return myPortfolio.workHistory.map(item => item._id ).includes(info._id);
	}

	function updateWorkHistory() {
		if (anyEmptyField()) return;

		// check if project exists
		if (checkIfWorkHistoryExist()) {
			const selectWorkHistory = myPortfolio.workHistory.find(item => item._id === myPortfolio.edit._id);
			selectWorkHistory.companyName = companyName;
			selectWorkHistory.position = position;
			selectWorkHistory.industry = industry;
			selectWorkHistory.duties = duties;
			selectWorkHistory.from = from;
			selectWorkHistory.to = to;

			const data = myPortfolio.workHistory.filter(item => item._id !== myPortfolio.edit._id);
			data.push(selectWorkHistory);
			const newData = {
				...myPortfolio,
				workHistory: data
			}
			delete newData.edit;
			fieldToEdit(null);
			httpUpdateProfessionalProfile(newData, auth.user._id, auth.token);
			getProProfile(newData.user, auth.token);
			setShow(false);
			resetFields();
			return;
		}
		// copy the projects
		// copy the professional profile
		// make the request
		// get back the updated pro profile

		const newPro = {
			companyName,
			position,
			duties,
			industry,
			from, 
			to
		}
		const newData = {
			...myPortfolio,
			workHistory: [...myPortfolio.workHistory, newPro]
		}
		httpUpdateProfessionalProfile(newData, auth.user._id, auth.token);
		getProProfile(newData.user, auth.token);
		fieldToEdit(null);
		resetFields();
		return
	}

	function resetFields() {
		setCompanyName("");
		setIndustry("");
		setPosition("");
		setDuties("");
		setTo("");
		setFrom("")
	}

	async function updateExperience(e) {
		e.preventDefault();
		if (anyEmptyField()) {
			setShow(false);
			return;
		}
		updateWorkHistory();
		setShow(false);
	}
	
	function addExp() {
		if (anyEmptyField()) return;
		updateWorkHistory();

		
	}

	useEffect(() => {
		if (!myPortfolio.edit) return;
		setCompanyName(myPortfolio.edit.companyName);
		setIndustry(myPortfolio.edit.industry);
		setPosition(myPortfolio.edit.position);
		setDuties(myPortfolio.edit.duties);
		setTo(myPortfolio.edit.to);
		setFrom(myPortfolio.edit.from);
	}, [myPortfolio.edit]);
	return (
		<>
			<form style={{padding: '2rem'}} onSubmit={updateExperience}>
				<div style={{ width: '100%', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>
					<h3 style={{color: '#7f7f7f'}}>Add Experience</h3>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput 
						title="Company Name *" 
						placeholder="Ex: Skillseed" 
						value={companyName}
						onChange={e => setCompanyName(e.target.value)}
						style={{width: '100%', height: '2.5rem'}}/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomSelect 
						title="Industry"
						data={["Tech", "Design", "Marketing", "Agriculture"]}
						placeholder="Please select"
						onChange={e => setIndustry(e.target.value)}
						value={industry}
						style={{width: '100%', height: '2.5rem'}}
					/>
				</div>
				<div style={{ width: '100', marginBottom: '2rem'}}>
					<CustomInput 
						title="Position *" 
						placeholder="Ex: Sales Manager" 
						onChange={e => setPosition(e.target.value)}
						value={position}
						style={{width: '100%', height: '2.5rem'}}/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput 
						title="From" 
						type="date"
						onChange={e => setFrom(e.target.value)}
						value={from}
						style={{width: '100%', height: '2.5rem'}}/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput 
						title="To" 
						type="date"
						onChange={e => setTo(e.target.value)}
						value={to}
						style={{width: '100%', height: '2.5rem'}}/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<input
						type="checkbox"
						style={{marginRight: '0.5rem'}}
					/>
					<label style={{ marginTop: '0.3rem'}}>I am currently working in this role</label>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomTextArea 
						title="Duties"
						onChange={e => setDuties(e.target.value)}
						value={duties}
						placeholder="Describe responsiblities"
						style={{ width: '100%', height: '10rem'}}
					/>
				</div>
				<h5 
					onClick={addExp}
					style={{ color: '#00b500', cursor: 'pointer'}}>+ Add Experience</h5>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #eee'}}>
					<CustomButton 
						onClick={() => setShow(false)}
						style={{
							width: '20%', 
							background: 'white', 
							border: '1px solid #00b500', 
							color: '#00b500'}}>Skip</CustomButton>
					<CustomButton type="submit" style={{width: '20%'}}>Save</CustomButton>
				</div>
			</form>
		</>
	);
}

const mapStateToProps = state => ({
	myPortfolio: state.myPortfolio,
	auth: state.auth.auth
});

const mapDispatchToProps = dispatch => ({
	addNewWorkHistory: data => dispatch(addNewWorkHistory(data)),
	updateProfessionalProfile: data => dispatch(updateProfessionalProfile(data)),
	fieldToEdit: data => dispatch(fieldToEdit(data)),
	httpUpdateProfessionalProfile: (data, userId, token) => dispatch(httpUpdateProfessionalProfile(data, userId, token)),
	getProProfile: (id, token) => dispatch(getProProfile(id, token))
});



export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);