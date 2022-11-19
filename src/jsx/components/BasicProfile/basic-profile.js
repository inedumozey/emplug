import {useEffect, useState} from "react";
import {connect} from "react-redux";
// actions
import { updateAboutSection } from "../../../store/actions/MyPortfolio/my-portfolio.actions";


// components
import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import CustomSelect from "../CustomSelect/Custom-select";
import CustomTextArea from "../CustomTextArea/CustomText";



function BasicProfile({myPortfolio, setEditField, updateAboutSection}) {
	const [industry, setIndustry] = useState("");
	const [edu, setEdu ] = useState("");
	const [description, setDescription ] = useState("");

	function onHandleSubmit(e) {
		e.preventDefault();
		if (!industry || !edu || !description) return;
		updateAboutSection({
			industryOfInterest: industry,
			highestLevelOfEducation: edu,
			briefDescriptionOfSelf: description
		});
		setEditField({show: true, section: "projects"});
	}

	useEffect(() => {
		setIndustry(myPortfolio.industryOfInterest);
		setEdu(myPortfolio.highestLevelOfEducation);
		setDescription(myPortfolio.briefDescriptionOfSelf);
	}, []);

	return (
		<>
			<div style={{padding: '2rem'}}>
				<h4 style={{marginBottom: '2rem', borderBottom: '1px solid #eee'}}>Update details</h4>
				<form onSubmit={onHandleSubmit}>
					<div style={{marginBottom: '2rem'}}>
						<CustomSelect 
							title="Industry" 
							data={["Tech", "Agriculture", "Marketing", "Design"]}
							placeholder={`${!industry ? "Select industry" : industry}`}
							style={{width: '100%', height: '2.5rem'}}
							value={industry}
							onChange={e => setIndustry(e.target.value)}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomSelect 
							title="Highest Educational Level" 
							data={["Degree", "Diploma", "NCE", "MSC"]}
							placeholder={`${!edu ? "Select education level" : edu}`}
							style={{width: '100%', height: '2.5rem'}}
							value={edu}
							onChange={e => setEdu(e.target.value)}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomTextArea 
							title="About" 
							placeholder={`${!description ? "Description about yourself" : description}`}
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					</div>
					<div>
						<CustomButton type="submit" style={{width: '100%', fontSize: '1rem'}}>Next</CustomButton>
					</div>
				</form>
			</div>
		</>
	);
}

const mapStateToProps = state => ({
	myPortfolio: state.myPortfolio
});

const mapDispatchToProps = dispatch => ({
	updateAboutSection: data => dispatch(updateAboutSection(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicProfile);