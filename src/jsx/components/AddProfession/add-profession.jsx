import { useState } from 'react';
import { connect } from 'react-redux';
import CustomTextArea from "../CustomTextArea/CustomText";
import CustomButton from "../CustomButton/custom-button";
import axios from 'axios'

// import { updateAboutSection } from '../../../store/actions/MyPortfolio/my-portfolio.actions';
import { updateProfessionSection } from '../../../store/actions/MyPortfolio/my-portfolio.actions';

function AddProfession(props) {
	const [profession, setProfession] = useState(props.myPortfolio.profession || '');
	const [loading, setLoading] = useState(false)

	async function updateProfession() {
		setLoading(true)
		const data = {
			profession: profession,
			briefDescriptionOfSelf: props.myPortfolio.briefDescriptionOfSelf,
			certifications: props.myPortfolio.certifications,
			educationalQualifications:  props.myPortfolio.educationalQualifications,
			highestLevelOfEducation:  props.myPortfolio.highestLevelOfEducation,
			industryOfInterest:  props.myPortfolio.industryOfInterest,
			projects: props.myPortfolio.projects,
			skills: props.myPortfolio.skills,
			workHistory: props.myPortfolio.workHistory
		}

		const url = process.env.REACT_APP_EMPLOYER_CENTER_API
		try{
			if (profession.length > 0) {
				props.setShow(false);
				const resp = await axios.post(`${url}/user/create-profile?userId=${props.auth.user._id}`, data, {
					headers: {
						authorization: `Bearer ${props.auth.token}`,
					'Content-Type': 'application/json'
					}
				})
				
				props.updateProfessionSection(resp.data.data.profession);
				setLoading(true)
			}
		}
		catch(err){
			console.log(err)
			setLoading(true)
		}
		
	}

	return (
		<>
			<form style={{padding: '2rem'}}>
				<div style={{ width: '100%', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>
					<h3 style={{color: '#7f7f7f'}}>Your Profession</h3>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomTextArea 
						placeholder="Say something about your profession."
						style={{ width: '100%', height: '10rem'}}
						onChange={e => setProfession(e.target.value)}
						value={profession}
					/>
				</div>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #eee'}}>
					<CustomButton
						onClick={() => props.setShow(false)} 
						style={{
							width: '20%', 
							background: 'white', 
							border: '1px solid #00b500', 
							color: '#00b500'
							}}>Skip</CustomButton>
					<CustomButton
						onClick={updateProfession}
						style={{width: '20%'}}
						disable={true}
					>
						{loading ? 'Loading...' : 'Save'}
					</CustomButton>
				</div>
			</form>
		</>
	)
}
const mapStateToProps = state => ({
	user: state.auth.auth.user,
	token: state.auth.auth.token,
	auth: state.auth.auth,
	myPortfolio: state.myPortfolio,
	jobPosting: state.jobPosting
});

const mapDispatchToProps = dispatch => ({
	updateProfessionSection: data => dispatch(updateProfessionSection(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProfession);