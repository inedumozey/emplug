import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { DotsThreeCircleVertical, PencilSimple, Trash } from 'phosphor-react';
import { fieldToEdit, httpUpdateProfessionalProfile, getProProfile } from '../../../store/actions/MyPortfolio/my-portfolio.actions';


function ViewEducation({ 
	_id,
	auth,
	document, 
	institution, 
	qualification, 
	graduation, 
	setShow, 
	setProfile, 
	type,
	fieldToEdit,
	myPortfolio,
	httpUpdateProfessionalProfile,
	getProProfile
}) {
	const [showDropdown, setShowDropdown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	function deleteProject() {
		const data = type === 'edu' ? myPortfolio.educationalQualifications.filter(item => item._id !== _id) : myPortfolio.certifications.filter(item => item._id !== _id);
		let newPro = {}
		if (type === 'edu') {
			newPro = {
				...myPortfolio,
				educationalQualifications: data
			}
		}
		if (type === 'cert') {
			newPro = {
				...myPortfolio,
				certifications: data
			}
		}
		console.log({
			type,
			newPro
		})
		httpUpdateProfessionalProfile(newPro, auth.user._id, auth.token);
		getProProfile(newPro.user, auth.token);
	}
	
	return (
		<>
			<div className=''
				onClick={() => {
					if (showDropdown) {
						setShowDropdown(false)
					}
				}} 
				style={{ 
					border: '1px solid #eee', 
					borderRadius: '5px',
					boxShadow: "0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)",
					display: 'flex',
					margin: '10px',
					padding: '10px',
					alignItems: 'center',
					position: 'relative'
					}}>
					<div >
						<img 
							src={document} 
							alt='...'
							style={{
								width: '80px',
								height: '80px',
								objectFit: 'cover',
								borderRadius: '50%'
							}}
						/>
					</div>
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
										fieldToEdit({
											document,
											institution,
											qualification,
											graduation,
											_id
										})
										setShowDropdown(false)
										setShow(true)
										setProfile(`${type === 'cert' ? 'certificate' : 'edu'}`)
									}}
									style={{
										color: '#7f7f7f', 
										cursor: 'pointer', 
										marginBottom: '0.5rem'
										}}
								> <PencilSimple size={15}/> Edit</div>
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
						<h4>{institution}</h4>
						<p className='m-0 p-0'>{qualification}</p>
						<p className='m-0 p-0'>{new Date(graduation).getFullYear()}</p>
						{/* <p className='m-0 p-0'>Additional English classes and UX profile courses​.</p> */}
					</div>
			</div>
		</>
	);
}

const mapStateToProps = state => ({
	auth: state.auth.auth,
	myPortfolio: state.myPortfolio
});

const mapDispatchToProps = dispatch => ({
	fieldToEdit: data => dispatch(fieldToEdit(data)),
	httpUpdateProfessionalProfile: (data, userId, token) => dispatch(httpUpdateProfessionalProfile(data, userId, token)),
	getProProfile: (userId, token) => dispatch(getProProfile(userId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewEducation);