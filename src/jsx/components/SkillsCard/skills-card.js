import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import profile from '../../../images/customers/1.jpg'
import { MinusCircle } from 'phosphor-react';
import axios from 'axios'

// import { httpUpdateProfessionalProfile, getProProfile } from '../../../store/actions/MyPortfolio/my-portfolio.actions';
// import { updateConfirmedAction } from '../../../store/actions/auth/AuthActions';
import { updateConfirmedAction } from '../../../store/actions/auth/AuthActions';

import './skills-card.css';

function SkillsCard({
	auth, 
	skills, 
	props,
	endorsements, 
	httpUpdateProfessionalProfile, 
	myPortfolio,
	getProProfile,
	updateSkillsCallback
}) {

	const [showRemove, setShowRemove] = useState(false);
	const [loading, setLoading] = useState(false);

	async function removeSkills(value) {
		try{
			setLoading(true)
			const newArr = props.auth.user.skills.filter(item => item !== value);
			const data = {
				// middleName:
				//   middleName.length > 0 ? middleName : props.auth.user.middleName,
				
				gender: props.auth.user.gender,
				phone: props.auth.user.phone,
				profilePicture: props.auth.user.profilePicture,
				country: 'Nigeria',
				stateOfOrigin: props.auth.user.stateOfOrigin,
				stateOfResident: props.auth.user.stateOfResident,
				lgaOfOrigin: props.auth.user.lgaOfOrigin,
				lgaOfResident: props.auth.user.lgaOfResident,
				address: props.auth.user.address,
				DOB: props.auth.user.DOB,
				skills: [...newArr]
			}	
			await updateSkillsCallback(data)
		}
		catch(err){
			return;
		}
	}
	
	return (
			<div className="card skill-card"  
				onMouseEnter={() => setShowRemove(true)} 
				onMouseLeave={() => setShowRemove(false)}
				style={{ 
				border: '1px solid #eee',  
				borderRadius: '2px',
				width: '15rem',
				position: 'relative',
				margin: '10px',
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'column'
			}}> 
			<MinusCircle 
				onClick={()=> removeSkills(skills)}
				size={18} 
				className="minus" 
				style={{ display: `${showRemove ? "block" : "none"}`}}/>
				<h4 style={{marginLeft: '2rem'}}>{skills}</h4>
				<h4 style={{
					position: 'absolute',
					top: '15px',
					right: '20px',
					color: '#00b500'
				}}>{endorsements}</h4>
				{!endorsements && <div style={{textAlign: 'center', color: '#7f7f7f'}}>no endorsement(s)</div>}
				{
					endorsements > 0 &&
					<div style={{
						position: 'relative', 
						height: `${endorsements > 0 ? "40px" : "auto"}`}}>
							<>
								<img 
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '50%',
										position: 'absolute',
										bottom: '15px', 
										left: '45px', 
										border: '4px solid white',
										top: '0.1rem'
									}}
									src={profile} 
									alt='...' 
									
								/>
								<img 
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '50%',
										position: 'absolute',
										bottom: '15px', 
										left: '65px', 
										border: '4px solid white',
										top: '0.1rem'
									}}
									src={profile} 
									alt='...' 
								/>
								<img 
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '50%',
										position: 'absolute',
										bottom: '15px', 
										left: '85px', 
										border: '4px solid white',
										top: '0.1rem'
									}}
									src={profile} 
									alt='...' 
								/>
								<img 
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '50%',
										position: 'absolute',
										bottom: '15px', 
										left: '105px', 
										border: '4px solid white',
										top: '0.1rem'
									}}
									src={profile} 
									alt='...' 
								/>
								<div
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '50%',
										position: 'absolute',
										bottom: '15px', 
										left: '125px', 
										border: '4px solid white',
										background: '#00b500',
										textAlign: 'center',
										paddingTop: '8px',
										color: 'white',
										top: '0.1rem'
									}}
								>+1</div>
							</>
					</div>
				}
			</div>
	);
}

const mapStateToProps = state => ({
	user: state.auth.auth.user,
	token: state.auth.auth.token,
	auth: state.auth.auth,
	myPortfolio: state.myPortfolio,
	jobPosting: state.jobPosting
  })
  
  const mapDispatchToProps = dispatch => ({
	getProProfile: (id, token) => dispatch(getProProfile(id, token)),
	getAllJobs: token => dispatch(getAllJobs(token)),
	updateConfirmedAction: data => dispatch(updateConfirmedAction(data))
  })
  

export default connect(mapStateToProps, mapDispatchToProps)(SkillsCard)