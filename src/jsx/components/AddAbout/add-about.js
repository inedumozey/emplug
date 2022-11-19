import { useState } from 'react';
import { connect } from 'react-redux';
import CustomTextArea from "../CustomTextArea/CustomText";
import CustomButton from "../CustomButton/custom-button";

import { updateAboutSection } from '../../../store/actions/MyPortfolio/my-portfolio.actions';

function AddAbout(props) {
	const [about, setAbout] = useState(props.myPortfolio.briefDescriptionOfSelf);

	function updateAbout() {
		if (about.length > 0) {
			props.updateAboutSection(about);
		}
		props.setShow(false);
	}

	return (
		<>
			<form style={{padding: '2rem'}}>
				<div style={{ width: '100%', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>
					<h3 style={{color: '#7f7f7f'}}>About yourself</h3>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomTextArea 
						placeholder="Say something about yourself."
						style={{ width: '100%', height: '10rem'}}
						onChange={e => setAbout(e.target.value)}
						value={about}
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
					<CustomButton onClick={updateAbout} style={{width: '20%'}}>Save</CustomButton>
				</div>
			</form>
		</>
	)
}
const mapStateToProps = state => ({
	myPortfolio: state.myPortfolio
});

const mapDispatchToProps = dispatch => ({
	updateAboutSection: data => dispatch(updateAboutSection(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAbout);