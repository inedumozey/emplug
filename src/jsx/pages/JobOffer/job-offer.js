import CustomButton from "../../components/CustomButton/custom-button";
import CustomInput from "../../components/CustomInput/custom-input";
import CustomTextArea from "../../components/CustomTextArea/CustomText";
import CustomNav from "../../layouts/nav/CustomNav";


function JobOffer(props) {
	return (
		<>
			<CustomNav />
			<div  style={{width: '15%'}}>
				<CustomButton style={{paddingLeft: '2rem', paddingRight: '2rem'}}>Go back</CustomButton>
				<hr style={{marginBottom: '2rem'}}></hr>

				<div className="card p-5 mb-3" style={{ borderRadius: '0.4rem'}}>
					<h4>Job Offer</h4>
					<form className="" style={{marginTop: '2rem'}}>
						<div>
							<CustomInput 
								title="Offer Subject" 
								style={{width: '50%'}} 
								placeholder="Enter Email Subject"
							/>
						</div>
						<div style={{marginTop: '2rem'}}>
							<CustomTextArea 
								title="Offer Body"
								placeholder="Start typing"
								style={{ width: '50%', height: '20rem'}}
							/>
						</div>
						<div style={{marginTop: '2rem'}}>
							<CustomTextArea 
								title="Offer Body"
								placeholder="Your name Designation"
								style={{ width: '50%', height: '2rem'}}
							/>
						</div>
					</form>
				</div>
				<div className="d-flex justify-content-around p-5">
					<CustomButton style={{background: '#E8E8E8', color: '#000', paddingLeft: '2rem', paddingRight: '2rem'}}>Cancel</CustomButton>
					<CustomButton style={{paddingLeft: '2rem', paddingRight: '2rem'}}>Save</CustomButton>
				</div>
			</div>
		</>
	);
}

export default JobOffer;