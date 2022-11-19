import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import swal from 'sweetalert'
import countryList from 'react-select-country-list'

import { ArrowsLeftRight, Plus } from 'phosphor-react'

import AddOrganisation from './AddOrganisation'
import EditOrganisation from './EditOrganisation'

import pageRoutes from '../../../../routes'
import Nav from '../../../layouts/nav/CustomNav'

import OrganizationPicture from '../../../../images/comapny/1.png';
import Loading from '../../../../images/loading/loading.gif';

//
import { addOrganisations, getSingleOrganisation, selectedOrganisation } from '../../../../store/actions/Organisation/OrganisationActions'
import CustomButton from '../../CustomButton/custom-button'
import CustomInput from '../../CustomInput/custom-input'


const Organisations = ({
  id,
  token,
  auth,
  add_organisation,
  add_organisation_loading,
  addOrganisations,
  getSingleOrganisation,
  get_single_organisation,
  get_single_organisation_loading,
  selectedOrganisation, history, match, location,
  error,...props
}) => {
  //Modal box
  const [addCard, setAddCard] = useState(false)
  const country_options = useMemo(() => countryList().getData(), [])

  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    if (add_organisation) {
      swal('Good job!', 'Successfully Added', 'success')
      setAddCard(false)
      setAddFormData({
        organizationName: '',
        logo: 'https://res.cloudinary.com/jubel/image/upload/v1619200849/xqaarhqtnbwvfy1gbipm.png',
        email: '',
        phone: '',
        website: '',
        subAdmins: [],
        staffs: [],
        address: '',
        country: '',
        state: '',
        industry: '',
      })
    }
  }, [add_organisation])

  useEffect(() => {
    if (error) {
      console.log(error);
      swal('Oops!', error, 'error')
    }
  }, [error])

  const handleSetAddCard = () => {
    setAddCard(false)
  }

  // delete data
  const handleDeleteClick = (organisationId) => {
    const newOrganisations = [...organisations]
    const index = organisations.findIndex(
      (organisation) => organisation.id === organisationId
    )
    newOrganisations.splice(index, 1)
    setOrganisations(newOrganisations)
  }

  //Add data
  const [addFormData, setAddFormData] = useState({
    organizationName: '',
    logo: 'https://res.cloudinary.com/jubel/image/upload/v1619200849/xqaarhqtnbwvfy1gbipm.png',
    email: '',
    phone: '',
    website: '',
    address: '',
    country: '',
    subAdmins: [],
    staffs: [],
    state: '',
    industry: '',
  })

  // Add organisation function
  const handleAddFormChange = (event) => {
    event.preventDefault()

    setAddFormData((addFormData) => {
      return {
        ...addFormData,
        [event.target.name]:
          event.target.name === 'logo'
            ? event.target.files[0]
            : event.target.value,
      }
    })
  }

  // Add phone to form data state
  const handleAddPhoneFormChange = (phone) => {
    setAddFormData((addFormData) => {
      return {
        ...addFormData,
        phone: phone,
      }
    })
  }

  const handleSubAdminsSelect = (selected) => {
    setAddFormData((addFormData) => {
      return {
        ...addFormData,
        subAdmins: selected,
      }
    })
  }

  const handleStaffSelect = (selected) => {
    setAddFormData((addFormData) => {
      return {
        ...addFormData,
        staffs: selected,
      }
    })
  }

  //Add Submit data
  const handleAddFormSubmit = (event) => {
    event.preventDefault()
    var error = false
    var errorMsg = ''
    if (addFormData.organizationName === '') {
      error = true
      errorMsg = 'Please fill organisation name'
    } else if (addFormData.logo === '') {
      error = true
      errorMsg = 'Please fill logo'
    } else if (addFormData.email === '') {
      error = true
      errorMsg = 'Please fill email'
    } else if (addFormData.phone === '') {
      error = true
      errorMsg = 'Please fill phone number'
    } else if (addFormData.website === '') {
      error = true
      errorMsg = 'Please fill website'
    } else if (addFormData.subAdmins.length === 0) {
      error = true
      errorMsg = 'Please select sub admins'
    } else if (addFormData.staffs.length === 0) {
      error = true
      errorMsg = 'Please select staffs'
    } else if (addFormData.address === '') {
      error = true
      errorMsg = 'Please fill address'
    } else if (addFormData.country === '') {
      error = true
      errorMsg = 'Please select country'
    } else if (addFormData.state === '') {
      error = true
      errorMsg = 'Please select state'
    } else if (addFormData.industry === '') {
      error = true
      errorMsg = 'Please fill industry'
    }

    if (!error) {
      const newOrganisation = {
        ...addFormData,
        logo: 'https://res.cloudinary.com/jubel/image/upload/v1619200849/xqaarhqtnbwvfy1gbipm.png',
      }
      // const newOrganisations = [...organisations, newOrganisation]
      // setOrganisations(newOrganisations)

      addOrganisations(newOrganisation, token)
    } else {
      swal('Oops', errorMsg, 'error')
    }
  }

  //Edit start
  const [editModal, setEditModal] = useState(false)
  // Edit function editable page loop
  const [editOrganisationId, setEditOrganisationId] = useState(null)

  const handleSetEditModal = () => {
    setEditModal(false)
  }

  // Edit function button click to edit
  const handleEditClick = (event, organisation) => {
    event.preventDefault()
    setEditOrganisationId(organisation.id)
    const formValues = {
      organizationName: organisation.organizationName,
      logo: organisation.logo,
      email: organisation.email,
      phone: organisation.phone,
      website: organisation.website,
      subAdmins: organisation.subAdmins,
      staffs: organisation.staffs,
      address: organisation.address,
      country: organisation.country,
      state: organisation.state,
      industry: organisation.industry,
    }
    setEditFormData(formValues)
    setEditModal(true)
  }

  // edit  data
  const [editFormData, setEditFormData] = useState({
    organizationName: '',
    logo: '',
    email: '',
    phone: '',
    website: '',
    subAdmins: '',
    staffs: '',
    address: '',
    country: '',
    state: '',
    industry: '',
  })

  //update data function
  const handleEditFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value
    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue
    setEditFormData(newFormData)
  }

  // edit form data submit
  const handleEditFormSubmit = (event) => {
    event.preventDefault()
    const editedOrganisation = {
      id: editOrganisationId,
      organizationName: editFormData.organizationName,
      logo: editFormData.logo,
      email: editFormData.email,
      phone: editFormData.phone,
      website: editFormData.website,
      subAdmins: editFormData.subAdmins,
      staffs: editFormData.staffs,
      address: editFormData.address,
      country: editFormData.country,
      state: editFormData.state,
      industry: editFormData.industry,
    }
    const newOrganisations = [...organisations]
    const index = organisations.findIndex(
      (organisation) => organisation.id === editOrganisationId
    )
    newOrganisations[index] = editedOrganisation
    setOrganisations(newOrganisations)
    setEditOrganisationId(null)
    setEditModal(false)
  }

  async function getOrganisation() {
    await getSingleOrganisation(auth._id, token);
  }

  useEffect(() => {
    getOrganisation()
  }, []);

  // console.log("Organization page==========>", auth.active)

  if(!auth) {
    return <Redirect to={pageRoutes.home}/>
  }
  
  return (
    <>
      <Nav />
      <div className='container-fluid mt-5 d-flex justify-content-center flex-wrap' >
            <div className='px-5 col-lg-12'>
              <div className='d-flex justify-content-between'>
                  <h3>Accounts</h3>
                  {/* {
                    get_single_organisation.length > 0 &&
                    <Link to={`${match.url}/create`} onClick={() => selectedOrganisation(null)}>
                    <CustomButton>+ Create Organization</CustomButton>
                    </Link>
                  } */}
              </div>
                  <hr></hr>
              {/* <div style={{position: 'relative'}} className='d-flex justify-content-between align-items-center'>
                {
                  get_single_organisation_loading ? <img style={{ width: '100px', position: 'absolute', top: '10rem', left: '25rem'}} src={Loading} alt="loading..."/> :
                    <div className='w-100'>

                      {
                        get_single_organisation.length > 0 ?
                        get_single_organisation.map(org => (
  
                        <div key={org._id} className='card mb-2 mt-4 p-4' style={{ width: '100%', borderRadius: '0.4rem'}} >
                          <div className='d-flex justify-content-between' style={{width: '100%'}}>
                            <div className='d-flex' >
                              <div className='m-2' style={{width: '80px'}}>
                                <img src={org.logo} style={{width: '100%'}} alt='...'/>
                              </div>
                              <div className='p-2 mx-2' style={{borderLeft: '1px solid #eee'}}>
                                <h5 className='m-0' style={{color: '#000'}}>{org.organizationName}</h5>
                                <p className='m-0' style={{fontSize: '0.8rem'}}>Agency</p>
                                <p className='m-0' style={{color: '#00b500'}}>{org.staffs.length + org.subAdmins.length + org.admins.length} staff{`${(org.staffs.length + org.subAdmins.length + org.admins.length) === 1 ? '' : 's'}`}</p>
                                <p className='m-0'>{`${org.address} ${org.state}, ${org.country}`}</p>
                                <p className='m-0'>9 openings</p>
                              </div>
                            </div>
                            <div className='d-flex justify-content-evenly align-items-center' style={{ width: '50%'}} >
                              <div style={{textAlign: 'center'}}>
                                <h2 style={{color: '#00b500'}}>{org.admins.length}</h2>
                                <p style={{color: '#7f7f7f'}}>Admins</p>
                              </div>
                              <div style={{textAlign: 'center'}}>
                                <h2 style={{color: '#00b500'}}>{org.subAdmins.length}</h2>
                                <p style={{color: '#7f7f7f'}}>Sub-Admins</p>
                              </div>
                              <div style={{textAlign: 'center'}}>
                                <h2 style={{color: '#00b500'}}>{org.staffs.length}</h2>
                                <p style={{color: '#7f7f7f'}}>Staffs</p>
                              </div>
                              <div style={{textAlign: 'center'}}>
                                <h2 style={{color: '#00b500'}}>9</h2>
                                <p style={{color: '#7f7f7f'}}>Openings</p>
                              </div>
                            </div>
                          </div>
                          <div className='' style={{marginLeft: '5rem'}}>
                            <Link to={pageRoutes.createOrganisation} onClick={() => selectedOrganisation(org)}>
                              <CustomButton style={{width: '15%', background: '#E8E8E8', color: '#000'}}>Edit</CustomButton>
                            </Link>
                            <Link onClick={() => selectedOrganisation(org)} to={`${pageRoutes.organisationPage.split(':')[0] + org._id}`}>
                              <CustomButton style={{width: '15%'}}>View</CustomButton>
                            </Link>
                          </div>
                        </div> 
                        )) :
                        <div className='card mt-4 d-flex justify-content-center align-items-center' style={{minHeight: '80vh'}}>
                          <Link to={`${match.url}/create`} onClick={() => selectedOrganisation(null)}>
                            <CustomButton >+ Create Organization</CustomButton>
                          </Link>
                        </div>
                      }
                    </div>
                }
              </div> */}
            </div>
            <div className='px-3'>
              <div className=' d-flex justify-content-center '>
                <CustomInput placeholder="Search" style={{width: '40rem'}}/>
              </div>
              <div className='d-flex justify-content-center flex-wrap'>

                <div className='card mb-4 mt-5 p-4 mx-4' style={{borderRadius: '0.4rem', width: '20rem'}} >
                  <div className='d-flex justify-content-center'>
                    <img src={auth.profilePicture}alt="image" style={{width: '10rem', height: '10rem', border: '1px solid #eee', borderRadius: '50%', objectFit: 'cover'}}/>
                  </div>
                  <div className='d-flex justify-content-center my-4 mb-0'  >
                    <h4 title={auth.fullName} style={{color: '#7f7f7f'}} >{auth.fullName}</h4>
                  </div>
                  <div className='d-flex justify-content-center my-4 mt-0'  >
                    <Link to={pageRoutes.profile}>
                      <CustomButton><ArrowsLeftRight size={18} style={{marginRight: '0.5rem'}} />Switch account</CustomButton>
                    </Link>
                  </div>
                </div>

                {
                  get_single_organisation.length > 0 ?
                  get_single_organisation.map(item => (

                    <div key={item._id} className='card mb-4 mt-5 p-4 mx-4' style={{borderRadius: '0.4rem', width: '20rem'}} >
                      <div className='d-flex justify-content-center'>
                        <img src={item.logo}alt="image" style={{width: '10rem', height: '10rem', border: '1px solid #eee', borderRadius: '50%', objectFit: 'cover'}}/>
                      </div>
                      <div className='d-flex justify-content-center my-4 mb-0'  >
                        <h4 title={item.organizationName} style={{color: '#7f7f7f'}} >{`${item.organizationName.slice(0, 17) + "..."}`}</h4>
                      </div> 
                      <div className='d-flex justify-content-center my-4 mt-0'  >
                        <Link onClick={() => selectedOrganisation(item)} to={`${pageRoutes.organisationPage.split(':')[0] + item._id}`}>
                          <CustomButton> <ArrowsLeftRight size={18} style={{marginRight: '0.5rem'}}/>Switch account</CustomButton>
                        </Link>
                      </div>
                    </div>
                  )) : null
                }

                <Link to={pageRoutes.createOrganisation} className='card mb-4 mt-5 p-4 mx-4 justify-content-center align-items-center' style={{borderRadius: '0.4rem', width: '20rem', cursor: 'pointer'}}>
                  <div  >
                    <div className='d-flex justify-content-center'>
                      <div className='d-flex justify-content-center align-items-center'  style={{width: '5rem', height: '5rem', border: '1px solid #eee', borderRadius: '50%', objectFit: 'cover'}}>
                      <div style={{ textAlign: 'center'}}>
                        <Plus size={32} style={{color: '#7f7f7f'}}/><br></br>
                      </div>
                      </div>
                    </div>
                        <h4 style={{color: '#7f7f7f'}} className="mt-3" >Add acount</h4>
                    {/* <div className='d-flex justify-content-center my-4 mb-0'  >
                    </div> */}
                  </div>
                </Link>
                
                
              </div>
            
            </div>
      </div>
    </>
  )
}
const mapStateToProps = ({ organisation, auth }) => ({
  token: auth.auth.token,
  id: auth.auth.user,
  auth: auth.auth.user,
  get_organisation_list: organisation.get_organisation_list,
  get_organisation_list_loading: organisation.get_organisation_list_loading,
  add_organisation: organisation.add_organisation,
  add_organisation_loading: organisation.add_organisation_loading,
  get_single_organisation: organisation.get_single_organisation,
  get_single_organisation_loading: organisation.get_single_organisation_loading,
  edit_organisation: organisation.edit_organisation,
  edit_organisation_loading: organisation.edit_organisation_loading,
  delete_organisation: organisation.delete_organisation,
  delete_organisation_loading: organisation.delete_organisation_loading,

  error: organisation.error,
})

const mapDispatchToProps = (dispatch) => ({
  addOrganisations: (data, token) => dispatch(addOrganisations(data, token)),
  getSingleOrganisation: (id, token) => dispatch(getSingleOrganisation(id, token)),
  selectedOrganisation: org => dispatch(selectedOrganisation(org)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Organisations)
