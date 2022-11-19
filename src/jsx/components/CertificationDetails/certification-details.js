import { useState, useEffect } from "react";
import { connect } from "react-redux";

// actions
import { addNewCertification } from "../../../store/actions/MyPortfolio/my-portfolio.actions";


// components
import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import CustomSelect from "../CustomSelect/Custom-select";
import SkillsCard from "../SkillsCard/skills-card";

// axios
import axios from "axios";



function CertificationDetails({ addNewCertification, setEditField }) {
	const [title, setTitle] = useState("");
	const [qualification, setQualification] = useState("");
	const [gradDate, setGradDate] = useState("");
	const [doc, setDoc] = useState();
	const [certificates, setCertificates]= useState([]);
	const [loadValue, setLoadValue] = useState(0);
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

	function updateCertificate(e) {
		e.preventDefault();
		addCertificate();
		setLoadValue(0);
		setNext(true);
	}

	function addCertificate() {
		const data = [...certificates];
		data.push({
			institution: title,
			qualification,
			graduation: gradDate,
			document: doc
		});
		setCertificates(data);
		setTitle("");
		setQualification("");
		setGradDate("");
		setLoadValue(0);
	}

	useEffect(() => {
		if(next) {
			addNewCertification(certificates);
			setEditField({show: true, section: "skills"});
		}
	}, [next]);


	return (
		<>
			<div style={{padding: '2rem'}}>
				<h4 style={{marginBottom: '2rem', borderBottom: '1px solid #eee'}}>Certification Details</h4>
				<form onSubmit={updateCertificate}>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Institution"
							style={{width: '100%', height: '2.5rem'}}
							placeholder="Title"
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomSelect 
							title="Qualification" 
							data={["Degree", "Diploma", "NCE", "MSC"]}
							placeholder="Qualification"
							style={{width: '100%', height: '2.5rem'}}
							value={qualification}
							onChange={e => setQualification(e.target.value)}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Graduation date"
							style={{width: '100%', height: '2.5rem'}}
							type="date"
							onChange={e => setGradDate(e.target.value)}
						/>
					</div>
					{loadValue > 0 ? <SkillsCard skills="upload" endorsements={`${Math.round(loadValue)}%`} /> : null}
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
						<CustomButton onClick={addCertificate} style={{width: '40%', fontSize: '1rem'}}>Add</CustomButton>
						<CustomButton type="submit" style={{width: '40%', fontSize: '1rem'}}>Next</CustomButton>
					</div>
				</form>
			</div>
		</>
	);
}

const mapDispatchToProps = dispatch => ({
	addNewCertification: data => dispatch(addNewCertification(data))
})

export default connect(null, mapDispatchToProps)(CertificationDetails);