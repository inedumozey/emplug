import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomInput from "../../components/CustomInput/custom-input";
import axios from "axios";
import CustomSelect from "../../components/CustomSelect/Custom-select";
import swal from "sweetalert";

function EditUser(props) {
    const [userData, setUserData] = useState({ country: 'Nigeria'})
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([]);
    const [nigeriaLgas, setNigeriaLgas] = useState([]);
    const [loadValue, setLoadValue] = useState(0)
    const params = useParams()
    const history = useHistory()
    const { auth: { auth: { token } }} = props;

    async function getUserDetails () {
        try {
          const response = await axios(
            `https://employer-center-api.herokuapp.com/api/v1/admin/fetch_single_user?userId=${params.id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
              }
            }
          )
    
        //   console.log(response.data.data)
          setUserData({...userData, ...response.data.data})
          swal("Successful!", response.data.message, 'info')
        } catch (error) {
            console.log(error)
            swal("Something went wrong!", error.response.data.message, 'error')
        }
    }
    async function updateUserDetails (event) {
        event.preventDefault();
        console.log("Token: ", token)
        if (params.id === '0') {
            addUserDetails()
            return;
        }
        try {

            let response;

            if (userData._id) {
                response = await axios.put(
                    `https://employer-center-api.herokuapp.com/api/v1/user/update-user?userId=${params.id}`, userData,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                            'Content-type': 'application/json'
                        }
                    }
                )
            }
            // response = await axios.post(
            //     `https://employer-center-api.herokuapp.com/api/v1/account/register`, userData,
            //     {
            //         headers: {
            //             authorization: `Bearer ${token}`,
            //             'Content-type': 'application/json'
            //         }
            //     }
            // )


                
                console.log(response)
                swal("Successful!", response.data.message, 'success')
                //   setUserData(response.data.data)
            } catch (error) {
                console.log(error.response)
                swal("Oops, something went wrong!", error.response.data.message, 'error')
        }
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
            setUserData({...userData, profilePicture: res.data.secure_url});
			 setLoadValue(0);
		}).catch(console.log);
	}

    async function addUserDetails (event) {
        // event.preventDefault();
        const data = {...userData}
        delete data.middleName
        delete data.role
        delete data.country
        delete data.state
        delete data.stateOfOrigin
        delete data.stateOfResident
        delete data.lgaOfOrigin
        delete data.lgaOfResident
        try {
            const response = await axios.post(
                `https://employer-center-api.herokuapp.com/api/v1/account/register`, data,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
                )
                
                console.log(response)
                swal("Successful!", response.data.message, 'success')
                //   setUserData(response.data.data)
            } catch (error) {
                console.log(error.response)
                swal("Oops, something went wrong!", error.response.data.message, 'error')
        }
      }

      function updateField(e) {
          const { name, value } = e.target;
          console.log({ name, value})
          const data = {...userData, [name]: value}
          setUserData(data)
      }

      async function getCountries() {
        const response = await axios.get(
          'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json'
        )
        setCountries(response.data)
        const stateResponse = await axios.get(
          'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json'
        )
        setStates(stateResponse.data)
      }

      function getCountryState() {

        const getStates = states.filter((item) => item.country_name === userData.country);
        if (getStates.length > 0) {
          return getStates
        }
        return []
      }

      async function getStates() {
        
        try {
            const response =  await axios.get('https://employer-center-api.herokuapp.com/api/v1/states/list', {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            });

            setNigeriaLgas(response.data.data);
        } catch (error) {
            console.log(error)
        }
      }


      function filterLgas(state='') {
        // console.log('Nigeria LGAs: ', nigeriaLgas)
        const transformStates = nigeriaLgas?.map(item => ({...item, name: item?.name?.split(' ')[0]}));
        // console.log('Transformed LGAs: ', transformStates)
        const data = transformStates?.filter(item => {
            if((item?.name?.toLowerCase() === 'FCT'.toLowerCase()) && (state?.toLowerCase() === 'Abuja Federal Capital Territory'.toLowerCase())) {
                return item;
            }
            return state?.toLowerCase().includes(item?.name?.toLowerCase());
        });

        // console.log("LGAS: ", data);

        if(data.length > 0) {
            return data[0]?.locals;
        }

        return [];

      }



      useEffect(() => {
        if (nigeriaLgas?.length === 0 ) {
            getStates();
        } 
        getCountries();
        if(params.id === '0') return;
        getUserDetails()
      }, [])


      console.log(userData)
   

    return (
        <>  
            <div className="" style={{marginTop: '7rem', padding: '2rem 15rem'}}>

                <div>
                    <CustomButton onClick={history.goBack}>Go back</CustomButton>
                </div>
                <hr></hr>
                <div className="d-flex">

                    {
                        userData?._id &&
                        <div className="" style={{marginRight: '2rem'}}>
                            <img src={userData.profilePicture}  alt={userData.fullName} style={{width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', border: '1px solid #eee'}}/>
                            <CustomInput type="file" style={{width: '7rem'}} onChange={e => handleUpload(e.target.files[0])}/>
                            {loadValue > 0 && <p>uploading...{Math.floor(loadValue)}%</p>}
                        </div>
                    }

                    <div>
                        <p className="mb-1">Created at: {`${userData.createdAt && Date(userData.createdAt)}`}</p>
                        <p className="mb-1">Updated at: {`${new Date(userData.updatedAt)}`}</p>
                        <p className="mb-1">Notifications: {userData.notificationCounter}</p>
                        <p className="mb-1">Device registered: {userData.deviceRegistered ? "True" : "False"}</p>
                        <p className="mb-1">Device token: {userData.deviceToken ? userData.deviceToken : "n/a"}</p>
                        <p className="mb-1">Secret token: {userData.secretToken ? userData.secretToken :"n/a"}</p>
                    </div>
                </div>
                <div className="card" style={{borderRadius: '0.44rem', padding: '2rem 2rem'}}>
                    <form className="m-5" onSubmit={updateUserDetails} autoComplete="off">
                        {
                            userData?._id &&
                            <div className="mb-3">
                                <CustomInput title="Full Name" autoComplete={'off'} defaultValue={userData.fullName && userData.fullName} placeholder={userData.fullName || "Enter Full Name"} name="fullName" onChange={updateField}/>
                            </div>
                        }
                        <div className="mb-3">
                            <CustomInput title="First Name" autoComplete={'off'} defaultValue={userData.firstName && userData.firstName} placeholder={userData.firstName || "Enter First Name"} name="firstName" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomInput title="Last Name" autoComplete={'off'} defaultValue={userData.lastName && userData.lastName} placeholder={userData.lastName || "Enter Last Name"} name="lastName" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomInput title="Middle Name" autoComplete={'off'} defaultValue={userData.middleName && userData.middleName} placeholder={userData.middleName || "Enter Middle Name"} name="middleName" onChange={updateField} />
                        </div>
                        <div className="mb-3">
                            <CustomInput autoComplete='none' type="text" title="Username" defaultValue={userData.username && userData.username} placeholder={userData.username || "Enter Username"} name="username" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomInput title="Email" autoComplete={'off'} defaultValue={userData.email && userData.email} placeholder={userData.email || "Enter Email"} name="email" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomInput title="Phone" autoComplete={'off'} defaultValue={userData.phone && userData.phone} placeholder={userData.phone || "Enter Phone number"} name="phone" onChange={updateField}/>
                        </div>
                        {
                            userData?._id &&
                            (
                                <>    
                                    <div className="mb-3">
                                        <CustomInput title="Role" autoComplete={'off'} defaultValue={userData.role && userData.role} placeholder={userData.role || "Enter role"} name="role" onChange={updateField}/>
                                    </div>
                                    <div className="mb-3">
                                        <CustomSelect title="Gender" defaultValue={userData.gender && userData.gender} data={['male', 'female', 'others']} placeholder={`${userData.gender ? userData.gender  : "Select gender"}`} name="gender" onChange={updateField}/>
                                    </div>
                                    <div className="mb-3">
                                        <CustomSelect title="Country" defaultValue={userData?.country} data={[...countries]} name="country" onChange={updateField} placeholder={`${userData.country ? userData.country  : "Select country"}`} />
                                    </div>
                                    <div className="mb-3">
                                        <CustomSelect title="State of origin" defaultValue={userData?.stateOfOrigin} data={[...getCountryState()]} placeholder={`${userData.stateOfOrigin ? userData.stateOfOrigin  : "Select state of origin"}`} name="stateOfOrigin" onChange={updateField}/>
                                    </div>
                                    <div className="mb-3">
                                        <CustomSelect title="State of residence" defaultValue={userData?.stateOfResident} data={[...getCountryState()]}  placeholder={`${userData.stateOfResident ? userData.stateOfResident  : "Select state of residence"}`} name="stateOfResident" onChange={updateField}/>
                                    </div>
                                    <div className="mb-3">
                                        <CustomSelect title="LGA of origin" placeholder={`${userData.lgaOfOrigin ? userData.lgaOfOrigin  : "Select lga of origin"}`} defaultValue={userData?.lgaOfOrigin} data={filterLgas(userData?.stateOfOrigin)}   name="lgaOfOrigin" onChange={updateField}/>
                                    </div>
                                    <div className="mb-3">
                                        <CustomSelect title="LGA of residence" placeholder={`${userData.lgaOfResident ? userData.lgaOfResident  : "Select lga of residence" }`} defaultValue={userData?.lgaOfResident} data={filterLgas(userData?.stateOfResident)} name="lgaOfResident" onChange={updateField}/>
                                    </div>
                                </>
                            )
                        }
                        <div className="mb-3">
                            <CustomInput title="Password" autoComplete='off' placeholder="Full Name" defaultValue={userData?.password} type="password" name="password" onChange={updateField}/>
                        </div>
                        <CustomButton type="submit">{userData?._id ? "Update" : "Create new user"}</CustomButton>
                    </form>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(EditUser);