import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { DotsThreeCircleVertical, PencilSimple, Trash } from 'phosphor-react';
import { fieldToEdit, getProProfile, httpUpdateProfessionalProfile } from "../../../store/actions/MyPortfolio/my-portfolio.actions";




function ViewExperience({
	_id, 
	auth, 
	position, 
	industry, 
	companyName, 
	from, 
	to, 
	duties, 
	setProfile, 
	setShow, 
	fieldToEdit, 
	myPortfolio, 
	httpUpdateProfessionalProfile,
	getProProfile
}) {
	const [showDropdown, setShowDropdown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	function deleteProject() {
		const data = myPortfolio.workHistory.filter(item => item._id !== _id);
		const newPro = {
			...myPortfolio,
			workHistory: data
		}
		httpUpdateProfessionalProfile(newPro, auth.user._id, auth.token);
		getProProfile(newPro.user, auth.token);
	}
	return (
		<>
		<div className=''
				onClick={() => {
					if (showDropdown) {
						setShowDropdown(false);
					}
				}}
				style={{ 
					border: '1px solid #eee', 
					borderRadius: '5px',
					boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)',
					display: 'flex',
					margin: '10px',
					padding: '10px',
					alignItems: 'center',
					position: 'relative'
				}}>
					<div className='p-4' >
						<DotsThreeCircleVertical 
							onClick={() => setShowDropdown(!showDropdown)}
							size={22} 
							color="#7f7f7f" 
							style={{
								cursor: 'pointer',
								// alignSelf: 'end',
								position: 'absolute',
								right: "1rem",
							}}/>
					{
						showDropdown && 
							<div style={{ 
								border: '1px solid #eee', 
								padding: '5px', 
								width: '10rem',
								position: 'absolute',
								top: '2.5rem',
								right: '1rem',
								borderRadius: '5px',
								background: 'white'
							}}>
								<div 
									onClick={() => {
										setShowDropdown(false)
										fieldToEdit({
											companyName,
											position,
											duties,
											to,
											from,
											industry,
											_id
										})
										setShow(true)
										setProfile("experience")
									}}
									style={{
										color: '#7f7f7f', 
										cursor: 'pointer', 
										marginBottom: '0.5rem'
										}}
								> <PencilSimple 
										onClick={() => {
										}}
										size={15}/> Edit</div>
								<div 
									onClick={() => {
										deleteProject()
										setShowDropdown(false)
									}}
									style={{
										color: 'red', 
										cursor: 'pointer'
										}}
								> <Trash  size={15} color='red'/> Delete</div>
							</div>
					}
						<h4>{position}</h4>
						<p className='m-0 p-0'>{companyName}</p>
						<p className='m-0 p-0'>{(new Date(from).getFullYear() - new Date(to).getFullYear()) * - 1}years</p>
						<p className='m-0 p-0'>{duties}</p>
						{/* <p className='m-0 p-0'>Additional English classes and UX profile courses​.</p> */}
					</div>
			</div>
		</>
	);
}

const mapDispatchToProps = dispatch => ({
	fieldToEdit: data => dispatch(fieldToEdit(data)),
	httpUpdateProfessionalProfile: (data, userId, token) => dispatch(httpUpdateProfessionalProfile(data, userId, token)),
	getProProfile: (userId, token) => dispatch(getProProfile(userId, token))
});

const mapStateToProps = state => ({
	myPortfolio: state.myPortfolio,
	auth: state.auth.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewExperience);