import { useState, useEffect } from "react";
import { connect } from "react-redux";

// actions
import { addNewEducation } from "../../../store/actions/MyPortfolio/my-portfolio.actions";

// Components
import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import CustomSelect from "../CustomSelect/Custom-select";
import SkillsCard from "../SkillsCard/skills-card";

// axios
import axios from "axios";



function EducationalDetails({ addNewEducation, setEditField }) {
	const [institution, setInstitution] = useState("");
	const [edu, setEdu] = useState("");
	const [gradDate, setGradDate] = useState("");
	const [doc, setDoc] = useState();
	const [loadValue, setLoadValue] = useState(0);
	const [education, setEducation] = useState([]);
	const [next, setNext] = useState(false);

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

	function uploadDocument(e) {
		handleUpload(e.target.files[0], setDoc);
	}

	function updateEducationalDetails(e) {
		e.preventDefault();
		setLoadValue(0);
		addEducationDetails();
		setNext(true);
	}

	function addEducationDetails() {
		const data = [...education];
		data.push({
			institution,
			qualification: edu,
			graduation: gradDate, 
			document: doc
		});
		setEducation(data);
		setLoadValue(0);
		setInstitution("");
		setEdu("");
		setGradDate("");
	}

	useEffect(() => {
		if (next) {
			addNewEducation(education);
			setEditField({show: true, section: "work history"});
		}
		
	}, [next]);
	return (
		<>
			<div style={{padding: '2rem'}}>
				<h4 style={{marginBottom: '2rem', borderBottom: '1px solid #eee'}}>Educational Details</h4>
				<form onSubmit={updateEducationalDetails}>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Institution"
							style={{width: '100%', height: '2.5rem'}}
							placeholder="Title"
							value={institution}
							onChange={e => setInstitution(e.target.value)}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomSelect 
							title="Highest Educational Level" 
							data={["Degree", "Diploma", "NCE", "MSC"]}
							placeholder="Qualification"
							style={{width: '100%', height: '2.5rem'}}
							value={edu}
							onChange={e => setEdu(e.target.value)}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Graduation date"
							style={{width: '100%', height: '2.5rem'}}
							type="date"
							value={gradDate}
							onChange={e => setGradDate(e.target.value)}
						/>
					</div>
					{loadValue > 0 ? <SkillsCard skills="upload" endorsements={`${Math.round(loadValue)}%`}/> : null}
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Upload Document"
							style={{width: '100%', height: '2.5rem'}}
							placeholder="Title"
							type="file"
							onChange={uploadDocument}
						/>
					</div>
					<div style={{display: 'flex', justifyContent: "center"}}>
						<CustomButton onClick={addEducationDetails} style={{width: '40%', fontSize: '1rem'}}>Add</CustomButton>
						<CustomButton type="submit" style={{width: '40%', fontSize: '1rem'}}>Next</CustomButton>
					</div>
				</form>
			</div>
		</>
	);
}

const mapDispatchToProps = dispatch => ({
	addNewEducation: data => dispatch(addNewEducation(data))
});

export default connect(null, mapDispatchToProps)(EducationalDetails);