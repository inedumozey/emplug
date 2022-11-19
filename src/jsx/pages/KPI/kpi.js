import CustomNav from "../../layouts/nav/CustomNav";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomInput from "../../components/CustomInput/custom-input";




function Kpi(props) {
	return(
		<>
			<CustomNav />

			<div style={{marginTop: '0.5rem', padding: '1rem 10rem'}}>
				<CustomButton style={{width: '15%'}}>Go Back</CustomButton>
				<hr style={{marginBottom: '4rem'}}></hr>

				<div className="card p-5 mb-5 mx-2 flex-wrap" style={{ borderRadius: '0.4rem', height:'60rem'}}>
					<h4>Job Offer</h4>
					<form className="" style={{marginTop: '2rem'}}>
						<div className="d-flex">
							<div style={{ width: '50%', marginRight: '2rem'}}>
								<CustomInput 
									title="KPI" 
									style={{width: '100%'}} 
									placeholder="Eg Experience"
								/>
							</div>
							<div style={{ width: '10%', marginRight: '2rem'}}>
								<CustomInput 
									title="Score" 
									style={{width: '100%'}} 
									placeholder="Eg 10"
								/>
							</div>
							<div className="d-flex align-items-center" style={{marginRight: '2rem'}}>
								<CustomButton>Add Another KPI</CustomButton>
							</div>

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

export default Kpi;