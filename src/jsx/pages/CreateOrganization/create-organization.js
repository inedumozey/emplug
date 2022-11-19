import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CustomButton from '../../components/CustomButton/custom-button';
import CustomInput from '../../components/CustomInput/custom-input';
import CustomSelect from '../../components/CustomSelect/Custom-select';
import CustomNav from '../../layouts/nav/CustomNav';
import CustomTextArea from '../../components/CustomTextArea/CustomText';

import { ArrowLeft } from 'phosphor-react';

import axios from 'axios';
import { addNewOrganisation, getAllUsers, fetchOrganisation, updateOrganisation } from '../../../services/Organisation';
import { selectedOrganisation } from '../../../store/actions/Organisation/OrganisationActions'; 

import pageRoutes from '../../../routes';


function CreateOrganization({ auth, selectedOrganisation, organisation,  history }) {
	const [staffs, setStaff] = useState([]);
	const [subAdmins, setSubAdmin] = useState([]);
	const [organizationName, setOrganizationName] = useState("");
	const [organizationInitials, setOrganizationInitials] = useState("");
	const [logo, setLogo] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [website, setWebsite] = useState("");
	const [address, setAddress] = useState("");
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [industry, setIndustry] = useState("");
	const [loadValue, setLoadValue] = useState(0);
	const [loading, setLoading] = useState(false);

	const [jobLocationOptions, setJobLocationOptions] = useState([]);
	const [jobLocationStates, setJobLocationStates] = useState([]);

	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);

	const [openStaff, setOpenStaff] = useState(false);
	const [openSubAdmin, setOpenSubAdmin] = useState(false);


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


	function addStaff(staff, name) {

		let data;
		if (name === "subAdmin") {
			data = [...subAdmins]
			data.push(staff);
			setSubAdmin(data);
			setOpenSubAdmin(false);
		} else {
			data = [...staffs]
			data.push(staff);
			setStaff(data);
			setOpenStaff(false);
		}
	}

	function removeStaff(value, name) {
		let data;
		if (name.toLowerCase() === "staffs".toLowerCase()) {
			data = [...staffs];
			const filteredData = data.filter(item => item !== value);
			setStaff(filteredData);
			return;
		}
		if (name.toLowerCase() === "subAdmins".toLowerCase()) {
			data = [...subAdmins];
			const filteredData = data.filter(item => item !== value);
			setSubAdmin(filteredData);
			return;
		}
	}


	async function handleOrganizationCreation(e) {
		e.preventDefault();
		setLoading(true);
		if (
			!logo ||
			!organizationName ||
			!email ||
			!phone ||
			!website ||
			!address ||
			!country ||
			!state ||
			!industry
			// !staffs.length ||
			// !subAdmins.length
		) {
			setLoading(false);
			return;
		}
		const org = {
			logo,
			organizationName,
			initials: organizationInitials,
			email,
			phone,
			website,
			address,
			country,
			state,
			staffs: staffs.map(item => item._id),
			subAdmins: subAdmins.map(item => item._id),
			industry
		}

		if (organisation.selected_organisation) {
			try {
				console.log("Before Request ============>", org)
				const response = await updateOrganisation(org, organisation.selected_organisation._id, auth.token);
				if (response.status === 200) {
					const getResponse = await fetchOrganisation(response.data.data._id, auth.token);
					console.log(getResponse.data)
					selectedOrganisation(getResponse.data.data);
					history.push(`${pageRoutes.organisationPage.split(':')[0]}${response.data.data._id}`)
				}
				setLoading(false);
				return;
			} catch (error) {
				console.log(error.response);
				return;
			}
		}

		try {
			const response = await addNewOrganisation(org, auth.token);
			if (response.status === 200) {
				const getResponse = await fetchOrganisation(response.data.data._id, auth.token);
				selectedOrganisation(getResponse.data.data);
				history.push(`${pageRoutes.organisationPage.split(':')[0]}${response.data.data._id}`)
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error.response);
		}

	}

	
	async function getCountries() {
		const response = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json');
		setJobLocationOptions(response.data);
		const stateResponse = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json');
		setJobLocationStates(stateResponse.data);
	}
	
	async function getUsers() {
		
		try {
			const response = await getAllUsers(auth.token);
			setUsers(response.data.data);
		} catch (error) {
			console.log(error)
			console.log(error.response.message);			
		}
	}
	
	function searchForUser(e) {
	
		if (e.target.name.toLowerCase() === "staffs".toLowerCase()) {
			setOpenStaff(true);
		}
		if (e.target.name.toLowerCase() === "subAdmins".toLowerCase()) {
			setOpenSubAdmin(true);
		}
		const filteredData = users.filter(user => ((user.fullName && user?.fullName.toLowerCase().includes(e.target.value)) || (user.firstName && user?.firstName.toLowerCase().includes(e.target.value))));
		setFilteredUsers(filteredData);
	}



	useEffect(() => {
		getCountries();
		getUsers();
		if (organisation.selected_organisation) {
			const {selected_organisation: {
				address, admins, country, email,
				logo, organizationName, phone, staffs,
				state, subAdmins, website
			}} = organisation;
			
			// console.log({
			// 	address, admins, country, email, logo, organizationName, phone,
			// 	staffs, state, subAdmins, website
			// })
			
			setAddress(address);
			setSubAdmin(subAdmins);
			setCountry(country);
			setEmail(email);
			setLogo(logo);
			setOrganizationName(organizationName);
			setPhone(phone);
			setStaff(staffs);
			setState(state);
			setWebsite(website);
			console.log(organisation.selected_organisation)
		}
	}, []);

	useEffect(() => {
		// generate 3 letter initials from the organization name
		const initials = organizationName.split(' ');
		let orgInitials = [];

		if (initials.length > 1) {
			for (let i = 0; i < initials.length; i++){
				orgInitials.push(initials[i].split('')[0]);
			}
	
			setOrganizationInitials(orgInitials.slice(0, 3).join('').toUpperCase());
			return;
		}

		if (!initials[0]) {
			initials.pop();
		}

		if (!initials.length) return;
		
		if (initials[0].length >= 3){
			orgInitials = initials[0].split('');
			setOrganizationInitials((orgInitials[0] + orgInitials[1] + orgInitials[2]).toUpperCase())
			return;
		}


	}, [organizationName])

	return (
		<>
			<CustomNav />
			<div className=''  style={{ margin: '2rem', marginTop: '8rem', width: '100%', paddingLeft: '15rem', paddingRight: '18rem' }}>
				<div style={{cursor: 'pointer'}} className="d-flex justify-content-between">
					<h4 style={{color: '#00b500'}}>Create New Organization</h4>
					<Link to={pageRoutes.organisation}>
						<p> <ArrowLeft size={22} /> Back to Organisations</p>
					</Link>
				</div>
				<hr></hr>
			</div>
			<div className='d-flex justify-content-center w-100 px-5' >
				
				<div className='card' style={{width: '70%', borderRadius: '0.4rem'}}>
					<form className='w-100 p-4' onSubmit={handleOrganizationCreation}>

						<div className='d-flex align-items-center mb-4'>
							<div>
								<CustomInput 
									title={`${ !loadValue ? "Company Logo" : "uploading..." + Math.floor(loadValue) + "%"}`} 
									type="file"
									onChange={({ target: { files } }) => handleUpload(files[0], setLogo)}
								/>
							</div>
						
						</div>
						
						<div className='d-flex justify-content-between align-items-center mb-4'>
							<div className='' style={{width: '45%'}}>
								<CustomInput 
									title="Organization Name *" 
									placeholder="Enter name of organization"
									onChange={({ target: { value }}) => setOrganizationName(value)}
									value={organizationName}
								/>
							</div>
							<div className='' style={{width: '45%'}}>
								<CustomInput 
									title="Initials *" 
									placeholder="Company initials"
									onChange={({ target: { value }}) => setOrganizationInitials(value.toUpperCase().split('').splice(0, 3).join(''))}
									value={organizationInitials}
								/>
							</div>
						</div>

						<div className='d-flex justify-content-between align-items-center mb-4'>
							<div className='' style={{width: '60%'}}>
								<CustomInput 
									title="Email *" 
									type="email" 
									placeholder="Email Address"
									onChange={({ target: { value }}) => setEmail(value)}
									value={email}
								/>
							</div>
							<div className='' style={{width: '30%'}}>
								<CustomInput 
									title="Phone Number *" 
									placeholder="Eg +2348000998877" 
									onChange={({ target: { value }}) => setPhone(value)}
									value={phone}
								/>
							</div>
						</div>
						<div className='d-flex justify-content-between align-items-center mb-4'>
							<div className='' style={{width: '45%'}}>
								<CustomInput 
									title="Website *" 
									placeholder="Website"
									value={website}
									onChange={({ target: { value }}) => setWebsite(value)}
								/>
							</div>
							<div className='' style={{width: '45%'}}>
								<CustomSelect 
									title="Industry *" 
									placeholder={`${industry.length > 0 ? industry : "Select Industry" }`}
									data={["Tech", "Agriculture", "Design", "Marketing", "Others"]}
									onChange={({ target: { value }}) => setIndustry(value)}
								/>
							</div>
						</div>

						<div className='d-flex justify-content-between align-items-center mb-4'>
							<div className='' style={{width: '45%'}}>
								<CustomSelect 
									title="Country *" 
									placeholder={`${country.length > 0 ? country : "Country" }`} 
									data={jobLocationOptions}
									onChange={({ target: { value } }) => setCountry(value)}
									/>
							</div>
							<div className='' style={{width: '45%'}}>
								<CustomSelect 
									title="State *" 
									placeholder={`${state.length > 0 ? state : "State" }`} 
									data={jobLocationStates.filter(item => item.country_name.toLowerCase() === country.toLowerCase())}
									onChange={({ target: { value } }) => setState(value)}
								/>
							</div>
						</div>

						<div className='d-flex justify-content-between align-items-center mb-4'>
							<div className='' style={{width: '45%'}}>
								<div style={{margin: '0.5rem', marginLeft: 0, width: '100%', display: 'flex', flexWrap: 'wrap'}}>
									{
										staffs.length > 0 &&
										staffs.map((item, index) => (
											<span 
												key={index.toString()} 
												onClick={() => removeStaff(item, "staffs")}
												style={{ 
													border: '1px solid #eee', 
													color: '#00b500',
													padding: '5px',
													borderRadius: '3px',
													cursor: 'pointer',
													margin: '2px'
											}}>{item.fullName}</span>
										))
									}
								</div>
								<CustomInput 
									title="Staff *" 
									placeholder="Enter staffs email"
									name="staffs"
									onChange={searchForUser}
									autoComplete="off"
								/>
								{
									openStaff &&
									<div className='p-2' style={{width: '100%', height: '5rem', overflowY: 'scroll', background: '#fafffe'}}>
										{
											filteredUsers.length > 0 ?
											filteredUsers.map(user => (
												<p 
													className='m-0'
													style={{ cursor: 'pointer' }} 
													key={user._id}
													onClick={() => addStaff(user)}
													>{user.fullName}<span style={{color: '#7f7f7f'}}>{user.email}</span></p>
											)) : <p style={{textAlign: 'center', marginTop: '0.5rem', color: '#7f7f7f'}}>not found</p>
										}
									</div>
								}
							</div>
							<div className='' style={{width: '45%'}}>
								<div style={{margin: '0.5rem', marginLeft: 0, width: '100%', display: 'flex', flexWrap: 'wrap'}}>
									{
										subAdmins.length > 0 &&
										subAdmins.map((item, index) => (
											<span 
												key={index.toString()} 
												onClick={() => removeStaff(item, "subAdmins")}
												style={{ 
													border: '1px solid #eee', 
													color: '#00b500',
													padding: '5px',
													borderRadius: '3px',
													cursor: 'pointer',
													margin: '2px'
											}}>{item.fullName}</span>
										))
									}
								</div>
								<CustomInput 
									title="Sub-Admins *" 
									placeholder="Enter sub-admin email"
									name="subAdmins"
									onChange={searchForUser}
									autoComplete="off"
								/>
								{
									openSubAdmin &&
									<div className='p-2' style={{width: '100%', height: '5rem', overflowY: 'scroll', background: '#fafffe'}}>
										{
											filteredUsers.length > 0 ?
											filteredUsers.map(user => (
												<p 
													className='m-0'
													style={{ cursor: 'pointer' }} 
													key={user._id}
													onClick={() => addStaff(user, "subAdmin")}
													>{user.fullName} <span style={{color: '#7f7f7f'}}>{user.email}</span></p>
											)) : <p style={{textAlign: 'center', marginTop: '0.5rem', color: '#7f7f7f'}}>not found</p>
										}
									</div>
								}
							</div>
						</div>

						<div>
							<CustomTextArea 
								placeholder="No. 7 Rima street, maitama" 
								title="Address" 
								style={{width: '100%', height: '4rem'}}
								onChange = {({ target: { value } }) => setAddress(value)}
								value={address}
							/>
						</div>

						<div className='d-flex justify-content-end p-4 w-100'>
							<Link to={pageRoutes.organisation}>
								<CustomButton style={{ background: '#E8E8E8', color: '#000'}}>Cancel</CustomButton>
							</Link>
							{
								loading ? <CustomButton disabled >loading...</CustomButton> :
								<CustomButton type="submit" style={{}}>{organisation.selected_organisation ? "Update" : "Create"}</CustomButton>
							}
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = state => ({
	auth: state.auth.auth,
	organisation: state.organisation
});

const mapDispatchToProps = dispatch => ({
	selectedOrganisation: org => dispatch(selectedOrganisation(org))
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateOrganization);