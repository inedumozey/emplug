import { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import routes from '../../../routes';
import CustomButton from '../../components/CustomButton/custom-button';
import CustomInput from '../../components/CustomInput/custom-input';
import SideBar from '../../layouts/nav/SideBar';
import DropdownBlog from '../../components/Jobick/DropdownBlog';
import { 
    UserCirclePlus, 
    Buildings, 
    Briefcase, 
    EnvelopeSimple, 
    Phone, 
    GenderIntersex, 
    CircleWavyCheck, 
    CircleWavyWarning, 
    Globe, 
    Users, 
    ArticleMedium, 
    House,
    GlobeHemisphereEast
} from 'phosphor-react'
import axios from 'axios';
import { connect } from 'react-redux';
import CustomSelect from '../../components/CustomSelect/Custom-select';
import { Modal } from 'react-bootstrap';

function AllApplicants(props) {
    const [show, setShow] = useState(false)
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [pageVew, setPageView] = useState(false)
    const [users, setUsers] = useState([])
    const  [user, setUser] = useState({})
    const [organizations, setOrganizations] = useState([])
    const [jobs, setJobs] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const { auth: { auth }} = props;


    const history =  useHistory()
    const section = history.location.search.split('?')[1]

    function loginAdmin(event) {
        event.preventDefault()

        setErrorMessage("")
        if (!password) {
            setErrorMessage("Please type in a password")
            return;
        }

        console.log(process.env.REACT_APP_SUPER_ADMIN_PASSWORD)
        if (password !== process.env.REACT_APP_SUPER_ADMIN_PASSWORD) {
            setErrorMessage("Password incorrect.")
            return;
        }
        setErrorMessage("")
        alert("Logged in as admin")
        setPageView(true);
    }
    

    async function getAllUsers() {
        try {
            const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/admin/fetch_all_user`,
            {
              headers: {
                authorization: `Bearer ${auth.token}`,
                'Content-type': 'application/json'
              }
            })
            setUsers(response.data.data)
            // console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function getAllOrganizations() {
        try {
            const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/organization/fetch-all`,
            {
              headers: {
                authorization: `Bearer ${auth.token}`,
                'Content-type': 'application/json'
              }
            })
            setOrganizations(response.data.data)
            // console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function getAllJobs() {
        try {
            const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/admin/fetch_all_user`,
            {
              headers: {
                authorization: `Bearer ${auth.token}`,
                'Content-type': 'application/json'
              }
            })
            // console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    function filter(arr) {
        const data = [...arr]
        const filteredResult = data.filter(item => {
            if(item.organizationName && item.organizationName.toLowerCase().includes(searchInput.toLowerCase())) {
                return item;
            }
            if(item.fullName && item.fullName.toLowerCase().includes(searchInput.toLowerCase())) {
                return item;
            }
        })
        return filteredResult;
    }

    useEffect(() => {
        // getAllUsers()
        setUsers(props.users.map(item => ({...item.userId, id: item.id})))
        getAllOrganizations()
    }, [props.users.length, organizations.length, jobs.length])




    return (
        <>
            <div className="" style={{borderRadius: '0.44rem'}}>
               
                <div className='table-responsive dataTables_wrapper'>
                <table
                    className='table dataTable display mb-4 dataTablesCard order-table  card-table text-black  application no-footer ms-0'
                    id='example5'
                    >
                        <thead>
                            <tr role='row'>
                            <th className='sorting_asc'>
                                <div className='form-check custom-checkbox '>
                                <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='checkAll'
                                    required
                                    // onClick={}
                                />
                                <label className='form-check-label' htmlFor='checkAll' />
                                </div>
                            </th>
                            <th className='sorting_asc'>Photo</th>
                            <th className='sorting_asc'>Ref Id</th>
                            <th className='sorting_asc'>Full Name</th>
                            <th className='sorting_asc'>State of origin</th>
                            <th className='sorting_asc'>State of residence</th>
                            <th className='sorting_asc'>LGA of origin</th>
                            <th className='sorting_asc'>LGA of residence</th>
                            <th className='sorting_asc'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filter(users).map((item, i) => (

                                    <tr role='row' key={item._id} className='odd' >
                                    <td className='application_sorting_1'>
                                        <div className='checkbox me-0 align-self-center'>
                                        <div className='form-check custom-checkbox '>
                                            <input
                                                type='checkbox'
                                                className='form-check-input'
                                                id='check1'
                                                required
                                            />
                                            <label className='form-check-label' htmlFor='check1' />
                                        </div>
                                        </div>
                                    </td>
                                    <td className='d-flex align-items-center'>
                                        <img
                                        title={item.fullName}
                                        style={{
                                            width: '50px',
                                            border: '1px solid #7f7f7f',
                                            overflow: 'hidden',
                                            borderRadius: '50%',
                                            height: '50px',
                                            objectFit: 'cover',
                                        }}
                                        src={item.profilePicture}
                                        alt={item.fullName}
                                        />
                                    </td>
                                    <td className='wspace-no'>{item.id}</td>
                                    <td className='wspace-no'>{item.fullName}</td>
                                    <td className='wspace-no'>{item.stateOfOrigin || 'N/A'}</td>

                                    <td className='wspace-no'>
                                        {item.stateOfResident || "N/A"}
                                    </td>
                                    <td>
                                        {item.lgaOfOrigin || "N/A"}
                                    </td>
                                    <td>
                                        {item.lgaOfResident || "N/A"}
                                    </td>
                                    <td>
                                        <CustomButton onClick={() => {setShow(true); setUser(item)}} style={{background: 'transparent', color: '#02024D', border: '1px solid #02024D'}} title={`view ${item.fullName.toLowerCase()} details`}>View</CustomButton>
                                    </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                </table>
                </div>
            </div>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                style={{paddingTop: '9rem'}}
            >

                <div className='card p-5' style={{borderRadius: '0.44rem'}}>
                    <h4>{user.fullName}</h4>
                    <hr></hr>
                    <div className='d-flex justify-content-center'>
                        <img src={user.profilePicture} alt="photo" style={{border: '1px solid #eee', width: '150px', height: '150px', padding: '2rem', objectFit: 'cover'}}/>
                     </div>
                    <hr></hr>
                    <div>
                        <p className='mb-2'> <EnvelopeSimple size={20} style={{marginRight: '1rem'}}/> {user.email}</p>
                        <p className='mb-2'> <Phone size={20} style={{marginRight: '1rem'}}/> {user.phone}</p>
                        {user.gender && <p className='mb-2'> <GenderIntersex size={20} style={{marginRight: '1rem'}}/> {user.gender}</p>}
                        {user.stateOfOrigin && <p className='mb-2'> <GlobeHemisphereEast size={20} style={{marginRight: '1rem'}}/> Origin: {user.stateOfOrigin}</p>}
                        {user.stateOfResident && <p className='mb-2'> <House size={20} style={{marginRight: '1rem'}}/> Resident: {user.stateOfResident}</p>}
                        {user.active && <p className='mb-2'> {users.active ? <CircleWavyCheck size={20} style={{marginRight: '1rem'}}/> : <CircleWavyWarning size={20} style={{marginRight: '1rem'}}/>} {user.active ? "Active": "Inactive"}</p>}
                    </div>
                    <hr></hr>
                    <div className='d-flex justify-content-center'>
                        <CustomButton onClick={() => setShow(false)} style={{width: '100%'}}>Close</CustomButton>
                    </div>  
                </div>
            </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AllApplicants);