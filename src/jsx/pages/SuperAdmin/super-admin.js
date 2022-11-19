import { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import routes from '../../../routes';
import CustomButton from '../../components/CustomButton/custom-button';
import CustomInput from '../../components/CustomInput/custom-input';
import SideBar from '../../layouts/nav/SideBar';
import DropdownBlog from '../../components/Jobick/DropdownBlog';
import { UserCirclePlus, Buildings, Briefcase, EnvelopeSimple, Phone, GenderIntersex, CircleWavyCheck, CircleWavyWarning, Globe, Users, ArticleMedium   } from 'phosphor-react'
import axios from 'axios';
import { connect } from 'react-redux';
import CustomSelect from '../../components/CustomSelect/Custom-select';
import { Modal } from 'react-bootstrap';
import { selectedOrganisation } from '../../../store/actions/Organisation/OrganisationActions'

function SuperAdmin(props) {
    const [show, setShow] = useState(false)
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [pageVew, setPageView] = useState(false)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [organizations, setOrganizations] = useState([])
    const [jobs, setJobs] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const { auth: { auth }, selectedOrganisation} = props;


    const history =  useHistory()
    const section = history.location.search.split('?')[1]

    function loginAdmin(event) {
        event.preventDefault()

        setErrorMessage("")
        if (!password) {
            setErrorMessage("Please type in a password")
            return;
        }

        // console.log(process.env.REACT_APP_SUPER_ADMIN_PASSWORD)
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
            const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/user/all`,
            // const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/admin/fetch_all_user`,
            {
              headers: {
                authorization: `Bearer ${auth.token}`,
                'Content-type': 'application/json'
              }
            })
            setUsers(response?.data?.data?.users)
            // console.log("Users: ", response?.data?.data?.users)
        } catch (error) {
            console.log(error)
        }
    }
    async function deactivateUser(userId) {
        console.log(auth.token)
        try {
            const response = await axios.put(`https://employer-center-api.herokuapp.com/api/v1/user/suspend/${userId}`, {},
            {
              headers: {
                authorization: `Bearer ${auth.token}`,
                'Content-type': 'application/json'
              }
            })
            getAllUsers();
            // setUsers(response?.data?.data?.users)
            // console.log("Users: ", response?.data?.data?.users)
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteUser(userId) {
        console.log(auth.token)
        try {
            const response = await axios.delete(`https://employer-center-api.herokuapp.com/api/v1/user/delete/${userId}`,
            {
              headers: {
                authorization: `Bearer ${auth.token}`,
                'Content-type': 'application/json'
              }
            })
            getAllUsers();
            // setUsers(response?.data?.data?.users)
            // console.log("Users: ", response?.data?.data?.users)
        } catch (error) {
            console.log(error)
        }
    }

    // https://employer-center-api.herokuapp.com/api/v1/job/all

    async function getAllJobs() {
        
        try {
            const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/job/all`,
            {
              headers: {
                authorization: `Bearer ${auth.token}`,
                'Content-type': 'application/json'
              }
            })
            setJobs(response.data.data)
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
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    // async function getAllJobs() {
    //     try {
    //         const response = await axios(`https://employer-center-api.herokuapp.com/api/v1/admin/fetch_all_user`,
    //         {
    //           headers: {
    //             authorization: `Bearer ${auth.token}`,
    //             'Content-type': 'application/json'
    //           }
    //         })
    //         console.log(response.data.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    function filter(arr) {
        if(!arr) return;
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
        getAllUsers()
        getAllOrganizations()
        getAllJobs()
    }, [users?.length, organizations?.length, jobs?.length])


    console.log("Jobs: ", jobs)

    return (
        <>
            <div className="">
                {
                    !pageVew &&
                    <div className="d-flex justify-content-center align-items-center " style={{paddingTop: '15rem'}}>
                        <form className='p-5' style={{background: 'white', borderRadius: '10px', border: '1px solid #eee'}} onSubmit={loginAdmin}>
                            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                            <CustomInput onChange={e => {setPassword(e.target.value); setErrorMessage("")}} title="Password" placeholder="Enter admin password" type="password" style={{marginBottom: '1rem'}}/>
                            <CustomButton type="submit" style={{width: '100%', marginBottom: '1rem'}}>Login</CustomButton>
                            <Link to={routes.home} style={{textAlign: 'center'}}>
                                <p>
                                    Back to homepage
                                </p>
                            </Link>
                        </form>
                    </div>
                }
                {
                    pageVew &&
                    <div className='' >
                        <SideBar />
                        {
                            section === 'users' &&
                            <div style={{marginLeft: '20rem'}}  className="p-5">
                                <div className='d-flex justify-content-between'>
                                    <h1>Users</h1>
                                    <Link to={routes.superAdminUser.split(':')[0] + '0'}>
                                        <CustomButton> 
                                            <UserCirclePlus size={20} style={{marginRight: '0.5rem'}} /> 
                                            Add user
                                        </CustomButton>
                                    </Link>
                                </div>
                                <hr></hr>
                                <CustomInput onChange={e => setSearchInput(e.target.value)} placeholder="Search" style={{marginBottom: '1rem'}}/>
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
                                            <th className='sorting_asc'>Full Name</th>
                                            <th className='sorting_asc'>Email</th>
                                            <th className='sorting_asc'>Delete</th>
                                            <th className='sorting_asc'>Suspend status</th>
                                            <th className='sorting_asc'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {
                                               filter(users).map(item => (

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
                                                    <td className='wspace-no'>{item.fullName}</td>
                                                    <td className='wspace-no'>{item.email}</td>

                                                    <td className='wspace-no'>
                                                        <CustomButton onClick={() => deleteUser(item._id)} style={{marginRight: '2rem', background: 'transparent', border: '1px solid red', color: 'red'}}>Delete</CustomButton>
                                                    </td>
                                                    <td>
                                                        <span onClick={() => deactivateUser(item._id)} className='btn btn-outline light  border-light btn-sm' style={{
                                                            background: `${!item.is_suspended ? "#00b500" : "red"}`,
                                                            color: `${!item.is_suspended ? "white" : "white"}`,
                                                        }}>
                                                        {!item.is_suspended ? "Suspend" : "Suspended"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <CustomButton onClick={() => {setShow(true); setUser(item)}} style={{background: 'transparent', color: '#00b500', border: '1px solid #00b500'}} title={`view ${item.fullName.toLowerCase()} details`}>View</CustomButton>
                                                    </td>
                                                    </tr>
                                               ))
                                           }
                                        </tbody>
                                </table>
                                </div>
                            </div>
                        }
                        {
                            section === 'companies' &&
                            <div style={{marginLeft: '20rem'}}  className="p-5">
                                <div className='d-flex justify-content-between'>
                                    <h1>Companies</h1>
                                    <Link to={routes.createOrganisation}>
                                        <CustomButton>
                                            <Buildings size={20} style={{marginRight: '0.5rem'}}/>
                                            Add organization
                                        </CustomButton>
                                    </Link>
                                </div>
                                <hr></hr>
                                <CustomInput onChange={e => setSearchInput(e.target.value)} placeholder="Search" style={{marginBottom: '1rem'}}/>
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
                                            <th className='sorting_asc'>Logo</th>
                                            <th className='sorting_asc'>Organization Name</th>
                                            <th className='sorting_asc'>Email</th>
                                            <th className='sorting_asc'>Contact</th>
                                            <th className='sorting_asc'>Status</th>
                                            <th className='sorting_asc'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {
                                               filter(organizations).map(item => (

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
                                                        title={item.organizationName}
                                                        style={{
                                                            width: '50px',
                                                            border: '1px solid #7f7f7f',
                                                            overflow: 'hidden',
                                                            borderRadius: '50%',
                                                            height: '50px',
                                                            objectFit: 'cover',
                                                        }}
                                                        src={item.logo}
                                                        alt={item.organizationName}
                                                        />
                                                    </td>
                                                    <td className='wspace-no'>{item.organizationName}</td>
                                                    <td className='wspace-no'>{item.email}</td>

                                                    <td className='wspace-no'>
                                                        <span className='text-secoundry fs-14 font-w600'>
                                                        <i className='fas fa-phone-alt me-2'></i>
                                                        {item.phone}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className='btn btn-outline light  border-light btn-sm'>
                                                        Pending
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <CustomButton onClick={() => {setShow(true); setUser(item)}} style={{background: 'transparent', color: '#00b500', border: '1px solid #00b500'}} title={`view ${item.organizationName.toLowerCase()} details`}>View</CustomButton>
                                                    </td>
                                                    </tr>
                                               ))
                                           }
                                        </tbody>
                                </table>
                                </div>
                                
                            </div>
                        }
                        {
                            section === 'jobs' &&
                            <div style={{marginLeft: '20rem'}}  className="p-5">
                                <div className='d-flex justify-content-between'>
                                    <h1>Jobs</h1>
                                    <CustomButton>
                                        <Briefcase size={20} style={{marginRight: '0.5rem'}}/>
                                        Add Job
                                    </CustomButton>
                                </div>
                                <hr></hr>
                                <CustomInput placeholder="Search" style={{marginBottom: '1rem'}}/>
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
                                            <th className='sorting_asc'>Logo</th>
                                            <th className='sorting_asc'>Job Title</th>
                                            <th className='sorting_asc'>Organization Name</th>
                                            <th className='sorting_asc'>Phone no.</th>
                                            <th className='sorting_asc'>Status</th>
                                            <th className='sorting_asc'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {
                                            jobs.map(item => (

                                                <tr role='row' className='odd' key={item._id}>
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
                                                    title={"item.userId.fullName"}
                                                    style={{
                                                        width: '50px',
                                                        border: '1px solid #7f7f7f',
                                                        overflow: 'hidden',
                                                        borderRadius: '50%',
                                                        height: '50px',
                                                        objectFit: 'cover',
                                                    }}
                                                    src={item.author.logo}
                                                    alt={item.author.organizationName}
                                                    />
                                                </td>
                                                <td className='wspace-no'>{item.title}</td>
                                                <td className='wspace-no'>{item.author.organizationName}</td>

                                                <td className='wspace-no'>
                                                    <span className='text-secoundry fs-14 font-w600'>
                                                    <i className='fas fa-phone-alt me-2'></i>
                                                    {item.author.phone}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className='btn btn-outline light  border-light btn-sm'>
                                                    Pending
                                                    </span>
                                                </td>
                                                <td>
                                                    <CustomButton>View</CustomButton>
                                                </td>
                                                </tr>
                                            ))
                                           }
                                        </tbody>
                                </table>
                                </div>
                            </div>
                        }
                        {
                            section === 'applications' &&
                            <div style={{marginLeft: '20rem'}}  className="p-5">
                                <h1>Applications</h1>
                                <hr></hr>
                            </div>
                        }
                        {
                            section === 'stats' &&
                            <div style={{marginLeft: '20rem'}}  className="p-5">
                                <h1>Statistics</h1>
                                <hr></hr>
                            </div>
                        }
                    </div>
                }
            </div>
            <Modal show={show}
                onHide={() => {
                    setShow(false)
                }}
          style={{ paddingTop: '9rem' }}>
              <div className='card p-5' style={{borderRadius: '0.44rem'}}>
                <h4>{user.fullName||user.organizationName}</h4>
                <hr></hr>
                <div className='d-flex justify-content-center'>
                    <img src={user.profilePicture||user.logo} alt="photo" style={{border: '1px solid #eee', width: '150px', height: '150px', padding: '2rem', objectFit: 'cover'}}/>
                </div>
                <hr></hr>
                <div>
                    <p className='mb-2'> <EnvelopeSimple size={20} style={{marginRight: '1rem'}}/> {user.email}</p>
                    <p className='mb-2'> <Phone size={20} style={{marginRight: '1rem'}}/> {user.phone}</p>
                    {user.staff && <p className='mb-2'> <Users size={20} style={{marginRight: '1rem'}}/> {user.staff.length} staff(s)</p>}
                    {user.website && <p className='mb-2'> <Globe size={20} style={{marginRight: '1rem'}}/> {user.website}</p>}
                    {user.gender && <p className='mb-2'> <GenderIntersex size={20} style={{marginRight: '1rem'}}/> {user.gender}</p>}
                    {user.active && <p className='mb-2'> {users.active ? <CircleWavyCheck size={20} style={{marginRight: '1rem'}}/> : <CircleWavyWarning size={20} style={{marginRight: '1rem'}}/>} {user.active ? "Active": "Inactive"}</p>}
                </div>
                <hr></hr>
                <div className='d-flex justify-content-center'>
                    <CustomButton onClick={() => deleteUser(user._id)} style={{marginRight: '2rem', background: 'transparent', border: '1px solid red', color: 'red'}}>Delete</CustomButton>
                    { user.fullName && <Link to={routes.superAdminUser.split(':')[0] + user._id}>
                        <CustomButton>Edit</CustomButton>
                    </Link>}
                    { user.organizationName && <Link to={routes.createOrganisation + `?${user._id}`} onClick={() => selectedOrganisation(user)}>
                        <CustomButton>Edit</CustomButton>
                    </Link>}
                    { user.organizationName && <Link onClick={() => selectedOrganisation(user)} to={routes.organisationPage.split(':')[0] + user._id}>
                        <CustomButton>View organization</CustomButton>
                    </Link>}
                </div>
              </div>

            </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    selectedOrganisation: org => dispatch(selectedOrganisation(org))
});

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);