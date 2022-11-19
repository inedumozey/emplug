import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import { loadUserDetails } from "../../../store/actions/auth/AuthActions";

// components
import CustomButton from "../CustomButton/custom-button";
import CustomInput from "../CustomInput/custom-input";
import CustomSelect from "../CustomSelect/Custom-select";

import { updateProfile } from '../../../services/UserService';
// axios
import axios from 'axios';


function UpdateProfile({  loadUserDetails, token, user, setProfile }) {
	const [fullName, setFullName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [gender, setGender] = useState("");
	const [role, setRole] = useState("");
	const [phone, setPhone] = useState("");
	const [photo, setPhoto] = useState();
	const [loadValue, setLoadValue] = useState(0);
	const [message, setMessage] = useState("");


	async function onUpdateProfile(e) {
		e.preventDefault();

		if (!photo) {
			await uploadWithoutPhoto(user.profilePicture);
			return;
		}


		const data = new FormData();
		const cloudName = "daqj8bnrb";
	
	
		data.append("file", photo);
		data.append("upload_preset", "my_default");
	
		return axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, data, {
			onUploadProgress: ProgressEvent => {
				setLoadValue(ProgressEvent.loaded / ProgressEvent.total*100)
			}
			 
		}).then(async (res) => {
			await uploadWithoutPhoto(res.data.secure_url)
		}).catch(console.log);
		
	}

	async function uploadWithoutPhoto(photo) {
		const data = {
			fullName,
			middleName,
			gender,
			role,
			phone,
			profilePicture: photo
		}
		const response = await updateProfile(data, user._id, token);
		setMessage(response.message);
		loadUserDetails(response.data.data);
		setMiddleName("");
		setGender("");
		setPhone("");
		setLoadValue(0);
		setProfile(false);

	}

	useEffect(() => {
		// console.log(user);
		setMiddleName(user.middleName);
		setGender(user.gender);
		setPhone(user.phone);
	}, []);

	return (
		<>
			<form style={{padding: '2rem'}} onSubmit={onUpdateProfile}>
				<div style={{ width: '100%', marginBottom: '2rem', borderBottom: '1px solid #7F7F7F'}}>
					<h3 style={{color: '#7f7f7f'}}>Update Profile</h3>
				</div>
					{
						loadValue > 0 &&
						<Link 
								to="/" 
								className="btn btn-primary light btn-xs mb-1 me-1" 
								style={{borderRadius: '5px'}}> 
								upload
								<span 
									style={{ 
										color: '#56b609', 
										background: 'white', 
										padding: ' 0 4px', 
										margin: '0 4px', 
										border: '1px solid #56b609', 
										borderRadius: '5px'
									}}>{Math.round(loadValue)}%</span>
							</Link>
					}
					{message && <div>{message}</div>}

				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput 
						type="file" 
						title="Photo" 
						placeholder="photo" 
						style={{width: '100%', height: '2.5rem'}}
						onChange={e => setPhoto(e.target.files[0])}
					/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput 
						title="Full Name" 
						placeholder={`${user.fullName ? user.fullName : "Full Name"}`} 
						style={{width: '100%', height: '2.5rem'}}
						onChange={e => setFullName(e.target.value)}
					/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomInput 
						title="Middle Name" 
						placeholder={`${user.middleName ? user.middleName : "middlename"}`} 
						style={{width: '100%', height: '2.5rem'}}
						onChange={e => setMiddleName(e.target.value)}
					/>
				</div>
				<div style={{ width: '100%', marginBottom: '2rem'}}>
					<CustomSelect 
						title="Gender"
						data={["Female", "Male", "Others"]}
						placeholder="Please select gender"
						style={{width: '100%', height: '2.5rem'}}
						onChange={e => setGender(e.target.value)}
						/>
				</div>
				<div style={{ width: '100', marginBottom: '2rem'}}>
					<CustomInput 
						title="Phone" 
						placeholder={`${user.phone ? user.phone : "phone" }`}
						style={{width: '100%', height: '2.5rem'}}
						onChange={e => setPhone(e.target.value)}
					/>
				</div>
				<div style={{ width: '100', marginBottom: '2rem'}}>
					<CustomInput 
						title="Role" 
						placeholder={`${user.role ? user.role : "Role" }`}
						style={{width: '100%', height: '2.5rem'}}
						onChange={e => setRole(e.target.value)}
					/>
				</div>
				
				<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
					<CustomButton style={{width: '20%'}} type="submit">Save</CustomButton>
				</div>
			</form>
		</>
	);
}

const mapStateToProps = state => ({
	user: state.auth.auth.user
});

const mapDispatchToProps = dispatch => ({
	loadUserDetails: data => dispatch(loadUserDetails(data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);