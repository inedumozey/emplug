import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOrganisation } from '../../../services/Organisation';
import { useState } from 'react';


function NewsFeedCard(props) {
	const [org, setOrg] = useState("");
	const [logo, setLogo] = useState("");
	async function getOrganizationDetails() {
		if (!props.logo || !props.organizationName) {
			const response = await fetchOrganisation(props.author, props.token);
			setOrg(response.data.data.organizationName);
			setLogo(response.data.data.logo)
		}
	}
	useEffect(() => {
		getOrganizationDetails();
	}, [])


	return (
		<div className="profile-uoloaded-post border-bottom-1 pb-5">
					<div className="w-100 p-2">
						<Link to={"#"} className="" role="button" data-bs-toggle="dropdown" style={{
							display: 'flex',
						}}>
							<img src={!props.logo ? logo : props.logo} width="50" alt="" />
							<div style={{
								marginLeft: '1rem'
							}}>
								<h4 style={{marginBottom: 0}}>{!props.organizationName ? org : props.organizationName}</h4>
								<p>{props.industry}</p>
							</div>
						</Link>
						<Link className="post-title" to="/post-details">
							<h3 className="text-black">{props.title}</h3>
						</Link>
						<p >
							{
								props.jobDescription.length > 0 && 
								props.jobDescription.length > 230 ?
								props.jobDescription.slice(0, 230) + "...":
								props.jobDescription
							}
						</p>
					</div>
					{/* <img src={profile09} alt="" className="img-fluid w-100 rounded" /> */}
					<div className="w-100 p-2" style={{display: 'flex', justifyContent: 'flex-end'}}>
						{/* <div>
								<span className=""> <ThumbsUp size={18} /> 12 </span>
								<span className=""> <ChatCircle size={18} /> 0 </span>
						</div> */}
						<div >
							<button className="btn btn-primary" id='custom-button' style={{
								paddingRight: '2rem',
								paddingLeft: '2rem',
								marginRight: '1rem'
							}}>Apply</button>
							<span
								style={{fontSize: '1rem', cursor: 'pointer'}}
							> 
							<i style={{
								color: '#56b609',
								fontSize: '1rem',
								marginRight: '0.5rem'
							}} className="fa fa-share-alt" aria-hidden="true" />share</span>
						</div>
					</div>
				</div>
	)
}


const mapStateToProps = state => ({
	token: state.auth.auth.token
})

export default connect(mapStateToProps)(NewsFeedCard);