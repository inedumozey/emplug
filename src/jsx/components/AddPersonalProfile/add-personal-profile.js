import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import CustomSelect from "../CustomSelect/Custom-select";

import { User, IdentificationCard, EnvelopeSimple, DeviceMobile, UserGear, GenderIntersex  } from 'phosphor-react';
import { updatePersonalProfile } from '../../../store/actions/auth/AuthActions';

import axios from 'axios';


function AddPersonalProfile(props) {
	const [middleName, setMiddleName] = useState("");
	const [phone, setPhone] = useState("");
	const [gender, setGender] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [loadValue, setLoadValue] = useState(0);


	async function updatepersonalPro() {
		const auth = {...props.fullAuth}
		

		const user = {
			middleName,
			gender,
			phone,
			profilePicture
		}
		// if (!middleName || !gender || !phone) return;
		
		const response =  await axios.put(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API : process.env.REACT_APP_EMPLOYER_CENTER_API}/user/update-user?userId=${auth.auth.user._id}`, user, {
			headers: {
				'authorization': `Bearer ${auth.auth.token}`,
				'Content-Type': 'application/json'
			}
		});
		auth.auth.user = response.data.data;
		props.updatePersonalProfile(auth.auth);
		setEditMode(false);
		props.setShow(false);
	}

	async function handleUpload(imageData, setFunc) {
		
		const data = new FormData();
		const cloudName = "daqj8bnrb";
	
		data.append("file", imageData);
		data.append("upload_preset", "my_default");
	
		return axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, data, {
			onUploadProgress: ProgressEvent => {
				setLoadValue(ProgressEvent.loaded / ProgressEvent.total*100)
			}
		}).then(async (res) => {
			 setFunc(res.data.secure_url);
			 setLoadValue(0);
		}).catch(console.log);
	}

	function uploadImage(data) {
		handleUpload(data, setProfilePicture)
	}
	return (
		<>
		{
			!editMode ?
			<div className='card p-5'>
				<div className='mb-4'>
					<User size={15} style={{marginRight: '1rem'}}/>
					<CustomInput 
						disabled
						title="Full Name"
						placeholder={props.auth.fullName}
						/>
				</div>
				<div className='mb-4'>
					<IdentificationCard  size={15} style={{marginRight: '1rem'}} />
					<CustomInput 
						title="Middle Name"
						disabled
						placeholder={!props.auth.middleName ? "N/A" : props.auth.middleName}
					/>
				</div>
				<div className='mb-4'>
					<EnvelopeSimple size={15} style={{marginRight: '1rem'}}/>
					<CustomInput 
						title="Email"
						disabled
						placeholder={!props.auth.email ? "N/A" : props.auth.email}
					/>
				</div>
				<div className='mb-4'>
					<DeviceMobile  size={15} style={{marginRight: '1rem'}}/>
					<CustomInput 
						title="Phone"
						disabled
						placeholder={!props.auth.phone ? "N/A" : props.auth.phone}
					/>
				</div>
				<div className='mb-4'>
					<UserGear   size={15} style={{marginRight: '1rem'}}/>
					<CustomInput 
						title="Role"
						disabled
						placeholder={!props.auth.role ? "N/A" : props.auth.role}
					/>
				</div>
				<div className='mb-4'>
					<GenderIntersex    size={15} style={{marginRight: '1rem'}}/>
					<CustomInput 
						title="Gender"
						disabled
						placeholder={!props.auth.gender ? "N/A" : props.auth.gender}
					/>
				</div>
				<div className='d-flex justify-content-end'>
					<CustomButton 
						onClick={() => props.setShow(false)}
						style={{
							width: '20%', 
							background: 'white', 
							border: '1px solid #00b500', 
							color: '#00b500'
						}}
					>Skip</CustomButton>
					<CustomButton 
						onClick={() => setEditMode(true)}
						style={{
							width: '20%'
						}}
					>Edit</CustomButton>
				</div>
			</div>
			:
			<form style={{padding: '2rem'}}>
				<div style={{ width: '100%', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>
					<h3 style={{color: '#7f7f7f'}}>Personal Profile</h3>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput
						title={`${loadValue ? "Uploading..." + Math.floor(loadValue) + "%" : "Update Profile Picture"}`} 
						type="file"
						onChange={e => uploadImage(e.target.files[0])}
					/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput
						title="Full Name" 
						type="text"
						value={props.auth && props.auth.fullName}
						placeholder={props.auth && props.auth.fullName}
						disabled
					/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput
						title="Middle Name" 
						type="text"
						placeholder={!props.auth.middleName ? "Enter Middle Name" : props.auth.middleName}
						onChange={(e) => setMiddleName(e.target.value)}
					/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput
						title="Email" 
						type="email"
						placeholder={props.auth && props.auth.email}
						value={props.auth && props.auth.email}
						disabled
					/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput
						title="Phone no." 
						type="text"
						placeholder={!props.auth.phone ? "Enter Phone no." : props.auth.phone}
						onChange={e => setPhone(e.target.value)}
					/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomSelect 
						title="Gender"
						data={["Female", "Male", "Others" ]}
						placeholder={!props.auth.gender ? "Select Gender" : props.auth.gender}
						onChange={e => setGender(e.target.value)}
					/>
				</div>
				<p onClick={() => setEditMode(false)} style={{
					cursor: 'pointer',
					color: '#00b500'
				}}>view mode</p>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #eee'}}>
					<CustomButton
						onClick={() => props.setShow(false)} 
						style={{
							width: '20%', 
							background: 'white', 
							border: '1px solid #00b500', 
							color: '#00b500'
							}}>Skip</CustomButton>
					<CustomButton onClick={updatepersonalPro} style={{width: '20%'}}>Save</CustomButton>
				</div>
			</form>
			}
		</>
	)
}

const mapStateToProps = state => ({
	auth: state.auth.auth.user,
	fullAuth: state.auth,
	myPortfolio: state.myPortfolio
});

const mapDispatchToProps = dispatch => ({
	updatePersonalProfile: data => dispatch(updatePersonalProfile(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddPersonalProfile);