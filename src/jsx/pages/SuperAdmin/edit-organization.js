import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomInput from "../../components/CustomInput/custom-input";
import axios from "axios";
import CustomSelect from "../../components/CustomSelect/Custom-select";
import swal from "sweetalert";

function EditOrganization(props) {
    const [userData, setUserData] = useState({})
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [loadValue, setLoadValue] = useState(0)
    const params = useParams()
    const history = useHistory()
    const { auth: { auth: { token } }} = props;

    async function getUserDetails () {
        try {
          const response = await axios(
            `https://employer-center-api.herokuapp.com/api/v1/organization/fetch-single?organizationId=${params.id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
              }
            }
          )
    
        //   console.log(response.data.data)
          setUserData(response.data.data)
          swal("Successful!", response.data.message, 'info')
        } catch (error) {
            console.log(error)
            swal("Something went wrong!", error.response.data.message, 'error')
        }
    }
    async function updateOrganizationDetails (event) {
        event.preventDefault();
        if (params.id === '0') {
            addUserDetails()
            return;
        }
        try {
            const response = await axios.put(
                `https://employer-center-api.herokuapp.com/api/v1/organization/update?organizationId=${params.id}`, userData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
                )
                
                console.log(response)
                swal("Successful!", response.data.message, 'successful')
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
            setUserData({...userData, logo: res.data.secure_url});
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
                `https://employer-center-api.herokuapp.com/api/v1/admin/add_user`, data,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
                )
                
                console.log(response)
                swal("Successful!", response.data.message, 'successful')
                //   setUserData(response.data.data)
            } catch (error) {
                console.log(error.response)
                swal("Oops, something went wrong!", error.response.data.message, 'error')
        }
      }

      function updateField(e) {
          const { name, value } = e.target;
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
        const getStates = states.filter((item) => item.country_name === userData.country)
        if (getStates.length > 0) {
          return getStates
        }
        return []
      }



      useEffect(() => {
          getCountries()
          if(params.id === '0') return;
          getUserDetails()
      }, [])

    return (
        <>  
            <div className="" style={{marginTop: '7rem', padding: '2rem 15rem'}}>

                <div>
                    <CustomButton onClick={history.goBack}>Go back</CustomButton>
                </div>
                <hr></hr>
                <div className="d-flex">

                    <div className="" style={{marginRight: '2rem'}}>
                        <img src={userData.logo}  alt={userData.organizationName} style={{width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', border: '1px solid #eee'}}/>
                        <CustomInput type="file" style={{width: '7rem'}} onChange={e => handleUpload(e.target.files[0])}/>
                        {loadValue > 0 && <p>uploading...{Math.floor(loadValue)}%</p>}
                    </div>
                    <div>
                        <p className="mb-1">Created at: {`${userData.createdAt && Date(userData.createdAt)}`}</p>
                        <p className="mb-1">Updated at: {`${new Date(userData.updatedAt)}`}</p>
                        <p className="mb-1">Initials: {userData.initials}</p>
                        <p className="mb-1">Staff: {userData.staff && userData.staff.length}</p>
                        {/* <p className="mb-1">Device token: {userData.deviceToken ? userData.deviceToken : "n/a"}</p> */}
                        {/* <p className="mb-1">Secret token: {userData.secretToken ? userData.secretToken :"n/a"}</p> */}
                    </div>
                </div>
                <div className="card" style={{borderRadius: '0.44rem', padding: '2rem 2rem'}}>
                    <form className="m-5" onSubmit={updateOrganizationDetails}>
                        <div className="mb-3">
                            <CustomInput title="Organization Name" defaultValue={userData.organizationName && userData.organizationName} placeholder={userData.organizationName || "Enter Organization Name"} name="organizationName" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomInput title="Initials" defaultValue={userData.initials && userData.initials} placeholder={userData.initials || "INL"} name="initials" onChange={updateField} />
                        </div>
                        {/* <div className="mb-3">
                            <CustomInput title="Username" defaultValue={userData.username && userData.username} placeholder={userData.username || "Enter Username"} name="username" onChange={updateField}/>
                        </div> */}
                        <div className="mb-3">
                            <CustomInput title="Email" defaultValue={userData.email && userData.email} placeholder={userData.email || "Enter Email"} name="email" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomInput title="Phone" defaultValue={userData.phone && userData.phone} placeholder={userData.phone || "Enter Phone number"} name="phone" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomInput title="Website" defaultValue={userData.website && userData.website} placeholder={userData.website || "Enter website"} name="role" onChange={updateField}/>
                        </div>
                        {/* <div className="mb-3">
                            <CustomSelect title="Gender" defaultValue={userData.gender && userData.gender} data={['male', 'female', 'others']} placeholder="Select gender" name="gender" onChange={updateField}/>
                        </div> */}
                        <div className="mb-3">
                            <CustomSelect title="Country" data={[...countries]} placeholder="Select country" name="country" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomSelect title="State of origin" data={[...getCountryState()]} placeholder="Select state of origin" name="stateOfOrigin" onChange={updateField}/>
                        </div>
                        {/* <div className="mb-3">
                            <CustomSelect title="State of residence" data={[]} placeholder="Select state of residence" name="stateOfResident" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomSelect title="LGA of origin" data={[]} placeholder="Select lga of origin" name="lgaOfOrigin" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomSelect title="LGA of residence" data={[]} placeholder="Select lga of residence" name="lgaOfResident" onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <CustomInput title="Password" placeholder="Full Name" type="password" name="password" onChange={updateField}/>
                        </div> */}
                        <CustomButton type="submit">Update</CustomButton>
                    </form>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(EditOrganization);