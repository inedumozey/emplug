import { useState, useEffect } from "react";
import { connect } from "react-redux";

// actions
import { addNewWorkHistory } from "../../../store/actions/MyPortfolio/my-portfolio.actions";


// components
import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import CustomSelect from "../CustomSelect/Custom-select";
import CustomTextArea from "../CustomTextArea/CustomText";



function WorkHistory({ addNewWorkHistory, setEditField }) {
	const [companyName, setCompanyName] = useState("");
	const [industry, setIndustry] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [position, setPosition] = useState("");
	const [duties, setDuties] = useState("");
	const [workHistory, setWorkHistory] = useState([]);
	const [next, setNext] = useState(false);

	function addWork() {
		const data = [...workHistory];
		data.push({
			companyName,
			industry,
			from: startDate,
			to: endDate,
			position,
			duties,
		});
		setWorkHistory(data);
		setCompanyName("");
		setIndustry("");
		setStartDate("");
		setEndDate("");
		setPosition("");
		setDuties("");
	}

	function updateWorkHistory(e) {
		e.preventDefault();
		addWork();
		setNext(true);
	}

	useEffect(() => {
		if(next) {
			addNewWorkHistory(workHistory);
			setEditField({show: true, section: "certification"});
		}
	}, [next]);

	return (
		<>
			<div style={{padding: '2rem'}}>
				<h4 style={{marginBottom: '2rem', borderBottom: '1px solid #eee'}}>Work History</h4>
				<form onSubmit={updateWorkHistory}>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Company Name"
							style={{width: '100%', height: '2.5rem'}}
							placeholder="Title"
							value={companyName}
							onChange={e => setCompanyName(e.target.value)}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomSelect 
							title="Industry" 
							data={["Tech", "Agriculture", "Marketing", "Design"]}
							placeholder="Select industry"
							style={{width: '100%', height: '2.5rem'}}
							value={industry}
							onChange={e => setIndustry(e.target.value)}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Start date"
							style={{width: '100%', height: '2.5rem'}}
							type="date"
							value={startDate}
							onChange={e => setStartDate(e.target.value)}
						/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="End date"
							style={{width: '100%', height: '2.5rem'}}
							type="date"
							value={endDate}
							onChange={e => setEndDate(e.target.value)}
							/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomInput 
							title="Position"
							style={{width: '100%', height: '2.5rem'}}
							placeholder="Position"
							value={position}
							onChange={e => setPosition(e.target.value)}
							/>
					</div>
					<div style={{marginBottom: '2rem'}}>
						<CustomTextArea 
							title="Duties" 
							placeholder="Duties"
							value={duties}
							onChange={e => setDuties(e.target.value)}
						/>
					</div>
					<div style={{display: 'flex', justifyContent: "center"}}>
						<CustomButton onClick={addWork} style={{width: '40%', fontSize: '1rem'}}>Add</CustomButton>
						<CustomButton type="submit" style={{width: '40%', fontSize: '1rem'}}>Next</CustomButton>
					</div>
				</form>
			</div>
		</>
	);
}

const mapDispatchToProps = dispatch => ({
	addNewWorkHistory: data => dispatch(addNewWorkHistory(data))
});

export default connect(null, mapDispatchToProps)(WorkHistory);