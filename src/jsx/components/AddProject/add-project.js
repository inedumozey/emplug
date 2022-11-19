import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
// import B2 from 'backblaze-b2';

// actions
import { addNewProject, fieldToEdit, httpUpdateProfessionalProfile, getProProfile } from "../../../store/actions/MyPortfolio/my-portfolio.actions";

// components
import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import CustomSelect from "../CustomSelect/Custom-select";
import CustomTextArea from "../CustomTextArea/CustomText";

// axios
import axios from "axios";




function AddProject({ 
	auth, 
	addNewProject, 
	fieldToEdit,
	myPortfolio, 
	setEditField, 
	setProfile,
	setShow,
	getProProfile,
	httpUpdateProfessionalProfile,
}) {
	const [projectName, setProjectName] = useState("");
	const [industry, setIndustry] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [description, setDescription] = useState("");
	const [cover, setCover] = useState();
	const [video, setVideo] = useState();
	const [image, setImage] = useState();
	const [loadValue, setLoadValue] = useState(0);
	const [projects, setProjects] = useState([]);
	const [next, setNext] = useState(false);
	const [companyName, setCompanyName] = useState("")

	// const b2 = new B2({
	// 	applicationKeyId: '004162ec1399f1b0000000002', // or accountId: 'accountId'
  // 	applicationKey: 'applicationKey' 
	// });


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

	function uploadCoverImage(e) {
		handleUpload(e.target.files[0], setCover);
	}
	
	function uploadVideo(e) {
		handleUpload(e.target.files[0], setVideo);
	}
	
	function uploadImage(e) {
		handleUpload(e.target.files[0], setImage);
	}

	function addProject(e) {
		e.preventDefault();
		updateProject();
		setShow(false);
	}
	function addProject2() {
		updateProject();
	}

	function checkIfProjectExist() {
		const info = {
			...myPortfolio.edit
		}
		return myPortfolio.projects.map(item => item._id ).includes(info._id);
	}
	
	function updateProject() {
		if (
			!projectName || 
			!industry || 
			!start || 
			!end || 
			!description
		) return;

		// check if project exists
		if (checkIfProjectExist()) {
			const selectProject = myPortfolio.projects.find(item => item._id === myPortfolio.edit._id);
			selectProject.projectName = projectName;
			selectProject.industry = industry;
			selectProject.companyName = companyName;
			selectProject.description.text = description;
			selectProject.from = !start ? selectProject.from : start;
			selectProject.to = !end ? selectProject.to : end;
			selectProject.coverImage = !cover ? selectProject.coverImage : cover;
			const data = myPortfolio.projects.filter(item => item._id !== myPortfolio.edit._id);
			data.push(selectProject);
			const newData = {
				...myPortfolio,
				projects: data
			}
			delete newData.edit;
			fieldToEdit(null);
			httpUpdateProfessionalProfile(newData, newData.user, auth.token);
			getProProfile(newData.user, auth.token);
			if (!myPortfolio.loading) {
				resetFields();
			}
			return;
		}
		// copy the projects
		// copy the professional profile
		// make the request
		// get back the updated pro profile

		const newPro = {
			projectName,
			industry,
			from: start,
			to: end,
			description: {
				text: description,
				video: "",
				image: ""
			},
			coverImage: cover
		}
		const newData = {
			...myPortfolio,
			projects: [...myPortfolio.projects, newPro]
		}
		// console.log(newData);
		httpUpdateProfessionalProfile(newData, newData.user, auth.token);
		// console.log(newData.user);
		if (!myPortfolio.loading) {
			fieldToEdit(null);
			resetFields();
		}
		return
	}
	
	function resetFields() {
		setProjectName("");
		setIndustry("");
		setDescription("");
		setLoadValue("");
		setCompanyName("");
	}
	
	useEffect(() => {
		if (!myPortfolio.edit) {
			return;
		}
		setProjectName(myPortfolio.edit.projectName);
		setIndustry(myPortfolio.edit.industry);
		setDescription(myPortfolio.edit.description.text);
		setCompanyName(myPortfolio.edit.companyName);
		setStart(myPortfolio.edit.from);
		setEnd(myPortfolio.edit.to);
	}, [myPortfolio.edit])
	
	// useEffect(() => {
	// 	getProProfile(auth.user._id, auth.token);
	// }, [myPortfolio.projects.length])



	return (
		<>
			<div style={{padding: '2rem'}}>

				<h4 style={{marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>Add Project</h4>
				<form onSubmit={addProject}>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title={`${loadValue ? "Uploading " + Math.floor(loadValue) + "%" : 'Upload cover image'} `}
							type="file"
							onChange={uploadCoverImage}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Title *"
							style={{width: '100%', height: '2.5rem'}}
							placeholder="Ex: Sales Manager"
							onChange={e => setProjectName(e.target.value)}
							value={projectName}
							disabled = {loadValue > 0 && true}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomSelect 
							title="Category" 
							data={["Tech", "Agriculture", "Marketing", "Design"]}
							placeholder="Please select"
							style={{width: '100%', height: '2.5rem'}}
							onChange={e => setIndustry(e.target.value)}
							value={industry}
							disabled = {loadValue > 0 && true}
						/>
					</div>
				
					<div style={{marginBottom: '2rem', }}>
						<input type="checkbox" style={{marginRight: '1rem'}}/>
						<label>This is personal project</label>
					</div>

					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Company name"
							style={{width: '100%', height: '2.5rem'}}
							placeholder="Ex: Business"
							type="text"
							value={companyName}
							onChange={e => setCompanyName(e.target.value)}
						/>
					</div>
					<div style={{ width: '100%', display: 'flex'}}>

						<div style={{marginBottom: '2rem', width: '50%', marginRight: '1rem'}}>
							<CustomInput 
								title="From"
								style={{width: '100%', height: '2.5rem'}}
								type="date"
								// placeholder={start.split('T')[0]}
								// value={start}
								onChange={e => setStart(e.target.value)}
							/>
						</div>

						<div style={{marginBottom: '2rem', width: '50%', marginTop: '0'}}>
							<CustomInput 
								title="To"
								style={{width: '100%', height: '2.5rem'}}
								type="date"
								onChange={e => setEnd(e.target.value)}
							/>
						</div>
					</div>
					
				
					<div style={{marginBottom: '2rem'}}>
						<CustomTextArea 
							title="Description" 
							placeholder="Project description"
							onChange={e => setDescription(e.target.value)}
							value={description}
							disabled = {loadValue > 0 && true}
							style={{ width: '100%', height: '10rem'}}
						/>
					</div>
					<h5 
						onClick={addProject2}
						style={{ color: '#00b500', cursor: 'pointer'}}>+ Add project</h5>
					<div style={{display: 'flex', justifyContent: "flex-end", borderTop: '1px solid #eee', paddingTop: '1rem'}}>
						<CustomButton 
							onClick={() => setShow(false)}
							style={{
								width: '20%', 
								background: 'white', 
								border: '1px solid #00b500', 
								color: '#00b500'}}>Skip</CustomButton>
						<CustomButton 
							type="submit" 
							style={{
								width: '40%', 
								fontSize: '1rem'
								}}>Save</CustomButton>
					</div>
				</form>
			</div>
		</>
	);
}

const mapStateToProps = state => ({
	myPortfolio: state.myPortfolio,
	auth: state.auth.auth
});

const mapDispatchToProps = dispatch => ({
	addNewProject: data => dispatch(addNewProject(data)),
	httpUpdateProfessionalProfile: (data, userId, token) => dispatch(httpUpdateProfessionalProfile(data, userId, token)),
	fieldToEdit: data => dispatch(fieldToEdit(data)),
	getProProfile: (id, token) => dispatch(getProProfile(id, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);