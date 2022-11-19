import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { DotsThreeCircleVertical, PencilSimple, Trash } from 'phosphor-react';
import { fieldToEdit, httpUpdateProfessionalProfile, getProProfile } from '../../../store/actions/MyPortfolio/my-portfolio.actions';
import { deleteJob } from "../../../store/actions/JobPosting/job-posting.actions";


function ViewProject({
	_id,
	auth,
	projectName, 
	coverImage, 
	industry, 
	from, 
	to,
	companyName,
	description,
	setShow, 
	setProfile, 
	fieldToEdit,
	httpUpdateProfessionalProfile,
	myPortfolio,
	getProProfile,
	jobId,
	deleteJob
}) {
	const [showDropdown, setShowDropdown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	function deleteProject() {

		if (jobId) {
			deleteJob(jobId, auth.token);
			return;
		}

		const data = myPortfolio.projects.filter(item => item._id !== _id);
		const newPro = {
			...myPortfolio,
			projects: data
		}
		httpUpdateProfessionalProfile(newPro, newPro.user, auth.token);
		getProProfile(newPro.user, auth.token);
	}

	
	return (
		<>
			<div  className='card m-2' onClick={() => {
				if (showDropdown) {
					setShowDropdown(false)
				}
			}} style={{
				width: '15rem', 
				border: '1px solid #eee',
				borderRadius: '5px',
				boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)', 
				position: 'relative'}}>
				<DotsThreeCircleVertical 
					onClick={() => setShowDropdown(true)}
					size={22} 
					color="#7f7f7f" 
					style={{
						cursor: 'pointer',
						alignSelf: 'end',
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
											projectName,
											coverImage,
											industry,
											from,
											to,
											companyName,
											description,
											_id
										})
										setShow(true)
										setProfile('project')
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
				<div style={{ width: '150px', height: '150px'}} className="mb-2">
					<img className='w-100' style={{ objectFit: 'cover', width: '100%'}} src={coverImage && coverImage} alt="..."/>
				</div>
				<h4>{projectName && projectName}</h4>
				<p>{industry && industry}, {from && from.split("T")[0].split('-').map(item => item + ".")}</p>
			</div>
		</>
	);
}

const mapStateToProps = state => ({
	myPortfolio: state.myPortfolio,
	auth: state.auth.auth
})

const mapDispatchToProps = dispatch => ({
	fieldToEdit: data => dispatch(fieldToEdit(data)),
	httpUpdateProfessionalProfile: (data, userId, token) => dispatch(httpUpdateProfessionalProfile(data, userId, token)),
	getProProfile: (userId, token) => dispatch(getProProfile(userId, token)),
	deleteJob: (id, token) => dispatch(deleteJob(id, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProject);