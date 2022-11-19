import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MinusCircle } from 'phosphor-react';
import CustomButton from "../CustomButton/custom-button";
import ProfileImage from "../../../images/svg/user.svg";
import GetApplicantionId from "../GetApplicationId/get-application-id";

import pageRoute from "../../../routes";

import './applicant-card.css';
import { connect } from 'react-redux';

function ApplicantCard({_id, fullName, email, phone, profilePicture, token, ...otherProps}) {
	const [showRemove, setShowRemove] = useState(false);

	function removeApplicant(userId, jobId) {
		console.log(userId, jobId)
		otherProps.removeApplicants(userId, jobId);
	}
	return (
		<>
			 <div
				className='card m-2 p-0'
				onMouseEnter={() => setShowRemove(true)} 
				onMouseLeave={() => setShowRemove(false)}
				style={{
					position: 'relative',
					width: '15rem',
					border: '1px solid #eee',
					borderRadius: '5px',
					boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)',
				}}
			>
				<div style={{
					position: 'absolute',
					cursor: 'pointer',
					top: '1rem',
					right: '0.1rem',
					textAlign: 'center',
					width: '4rem'
				}}>
					<MinusCircle 
						onClick={() => removeApplicant( _id, otherProps.jobId)} 
						size={22} 
						style={{
							color: `${!showRemove ? '#eee' : 'red'}`,
						}}/>
					<p style={{
						display: `${!showRemove ? 'none' : 'block'}`,
						fontSize: '0.6rem'
					}}>Reject <br></br>{fullName.split(' ')[0]}</p>
				</div>

				<div style={{ width: '15rem', height: '15rem' }} className=" d-flex justify-content-center align-items-center">
					<img className=''
						style={{
							objectFit: 'cover',
							width: '50%',
							height: '50%',
							borderRadius: '100%',
							border: '1px solid #eee'
						}}
						// src={!item.profilePicture ? ProfileImage : item.profilePicture}
						src={!profilePicture ?  ProfileImage : profilePicture }
						alt={fullName}
					/>
				</div>
				<div style={{ textAlign: 'center', width: '100%' }}>
					<h4 style={{ color: '#7f7f7f' }}>{fullName}</h4>
					<GetApplicantionId id={_id} token={token} {...otherProps}/>
					<p className='m-0' style={{ color: '#7f7f7f' }}>{phone}</p>
					<p className='m-0' style={{ color: '#7f7f7f' }}>{email}</p>
				</div>
				<div className='w-100 d-flex justify-content-between px-2 pb-4'>
					<Link to={pageRoute.message}>
						<CustomButton className="px-4">Message</CustomButton>
					</Link>
					<Link to={`${pageRoute.viewUser.split(':')[0]}${_id}`}>
						<CustomButton className="px-4">View</CustomButton>
					</Link>
				</div>
			</div>
		</>
	)
}


const mapDispatchToProps = state => ({
})

export default connect(null, mapDispatchToProps)(ApplicantCard);