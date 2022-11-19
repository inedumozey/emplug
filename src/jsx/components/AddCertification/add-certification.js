import { useState, useEffect } from "react";
import { connect } from "react-redux";

import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import CustomSelect from "../CustomSelect/Custom-select";

import axios from 'axios';

import { addNewCertification, httpUpdateProfessionalProfile, fieldToEdit, getProProfile } from '../../../store/actions/MyPortfolio/my-portfolio.actions';





function AddCertification({
	// _id, 
	auth, 
	myPortfolio, 
	httpUpdateProfessionalProfile, 
	fieldToEdit, 
	setShow,
	getProProfile
}) {
	const [institution, setInstitution] = useState("");
	const [qualification, setQualification] = useState("");
	const [graduation, setGraduation] = useState("");
	const [document, setDocument] = useState("");
	const [loadValue, setLoadValue] = useState(0);

	async function handleUpload(imageData, setFunc) {
		
		const data = new FormData();
		const cloudName = "daqj8bnrb";
	
		data.append("file", imageData);
		data.append("upload_preset", "my_default");
	
		return axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, data, {
			onUploadProgress: ProgressEvent => {
				setLoadValue(ProgressEvent.loaded / ProgressEvent.total*100)
			}
		}).then(async (res) => {
			 setFunc(res.data.secure_url);
			 setLoadValue(0);
		}).catch(console.log);
	}

	function uploadImage(data) {
		handleUpload(data, setDocument)
	}

	function updateEducation(e) {
		e.preventDefault();
		if (checkIfValid()) {
			setShow(false);
			return
		};
		updateInstitution();
		setShow(false);
	}
	
	function checkIfValid() {
		return !institution || !qualification || !graduation;
	}

	function checkIfCertificateExist() {
		const info = {
			...myPortfolio.edit
		}
		return myPortfolio.certifications.map(item => item._id ).includes(info._id);
	}

	function updateInstitution() {
		if (checkIfValid()) return;

		// check if project exists
		if (checkIfCertificateExist()) {
			const selectInstitution = myPortfolio.certifications.find(item => item._id === myPortfolio.edit._id);
			selectInstitution.institution = institution;
			selectInstitution.qualification = qualification;
			selectInstitution.graduation = graduation;
			selectInstitution.document = document;

			const data = myPortfolio.certifications.filter(item => item._id !== myPortfolio.edit._id);
			data.push(selectInstitution);
			const newData = {
				...myPortfolio,
				certifications: data
			}
			delete newData.edit;
			fieldToEdit(null);
			httpUpdateProfessionalProfile(newData, auth.user._id, auth.token);
			getProProfile(newData.user, auth.token);
			resetFields();
			return;
		}
		// copy the projects
		// copy the professional profile
		// make the request
		// get back the updated pro profile

		const newPro = {
			institution,
			qualification,
			graduation,
			document,
		}
		const newData = {
			...myPortfolio,
			certifications: [...myPortfolio.certifications, newPro]
		}
		httpUpdateProfessionalProfile(newData, auth.user._id, auth.token);
		getProProfile(newData.user, auth.token);
		fieldToEdit(null);
		resetFields();
		return
	}

	function resetFields() {
		setInstitution("");
		setQualification("");
		setGraduation("");
		setDocument("");
	}

	function addEdu() {
		if (checkIfValid()) return;
		updateInstitution();
		resetFields();
		
	}

	useEffect(() => {
		if (!myPortfolio.edit) return;
		setInstitution(myPortfolio.edit.institution);
		setQualification(myPortfolio.edit.qualification);
		setGraduation(myPortfolio.edit.graduation);
		setDocument(myPortfolio.edit.document);
	}, [myPortfolio.edit]);
	console.log(graduation)
	return (
		<>
		<form style={{padding: '2rem'}} onSubmit={updateEducation}>
				<div style={{ width: '100%', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>
					<h3 style={{color: '#7f7f7f'}}>Add Certificate</h3>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput 
						title="School *" 
						placeholder="Institution" 
						value={institution}
						onChange={e => setInstitution(e.target.value)}
						style={{width: '100%', height: '2.5rem'}}/>
				</div>
				<div style={{ width: '100', marginBottom: '2rem'}}>
					<CustomInput 
						title="Degree *" 
						placeholder="Ex: Bachelor's" 
						value={qualification}
						onChange={e => setQualification(e.target.value)}
						style={{width: '100%', height: '2.5rem'}}/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput 
						title="Field of study" 
						placeholder="Ex: Business" 
						style={{width: '100%', height: '2.5rem'}}/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput 
						title="Date of Graduation"
						type="date" 
						value={graduation}
						onChange={e => setGraduation(e.target.value)}
						style={{width: '100%', height: '2.5rem'}}/>
				</div>
				
				
					<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput 
						title={`${loadValue ? "uploading..." + Math.floor(loadValue) + "%" : "Document (*jpg | *png)"}`} 
						placeholder="Ex:" 
						onChange={e => uploadImage(e.target.files[0])}
						type="file"
						style={{width: '100%', height: '2.5rem'}}/>
				</div>
				<h5 
					onClick={addEdu}
					style={{ color: '#00b500', cursor: 'pointer'}}>+ Add Education</h5>
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
	)
}

const mapStateToProps = state => ({
	myPortfolio: state.myPortfolio,
	auth: state.auth.auth
});

const mapDispatchToProps = dispatch => ({
	addNewCertification: data => dispatch(addNewCertification(data)),
	fieldToEdit: data => dispatch(fieldToEdit(data)),
	httpUpdateProfessionalProfile: (data, userId, token) => dispatch(httpUpdateProfessionalProfile(data, userId, token)),
	getProProfile: (id, token) => dispatch(getProProfile(id, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCertification);