import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { UploadSimple, PencilSimple } from 'phosphor-react'

import CustomInput from '../../components/CustomInput/custom-input'
import CustomNav from '../../layouts/nav/CustomNav'
import CustomButton from '../../components/CustomButton/custom-button'
import SkillsCard from '../../components/SkillsCard/skills-card'
import ViewProject from '../../components/AddProject/view-project'

import pageRoutes from '../../../routes'

import ProfileImage from '../../../images/svg/user.svg'
import CustomSelect from '../../components/CustomSelect/Custom-select'
import ApplicantCard from '../../components/ApplicantCard/applicant-card'
import DisplayOrgJob from '../../components/DisplayOrgJob/display-org-job'

import { jobView,getAllJobs } from '../../../store/actions/JobPosting/job-posting.actions'
import UserManagement from '../UserManagement/user-management'

function OrganizationPage (props) {
  const { id } = useParams()
  const [section, setSection] = useState('profile')
  const [orgJobs, setOrgJobs] = useState([])
  const [applicants, setApplicants] = useState([])
 const [showShare, setShowShare] = useState(false);
 const [users, setUsers] = useState([])
 const [staffs, setStaffs] = useState({});
 const [search, setSearch] = useState('');
   const [addByEmail, setAddByEmail] = useState(false);
  const [selected_organisation, setSelected_organisation] = useState({})
  const [staffEmails, setStaffEmails] = useState([]);


  const {
    organisation,
    jobPosting: { allJobs },
    getAllJobs,
    auth: { token }
  } = props

  function filterOrgJobs () {
    const allOrgJobs = allJobs.filter(
      item => item.author._id === selected_organisation._id
      )
    setOrgJobs(allOrgJobs)
  }

  function getApplicants () {
    const allOrgJobs = allJobs.filter(
      item => item.author === selected_organisation._id
    )

    allOrgJobs.forEach(async (item, i) => {
      const response = await axios.get(
        `${
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
            : process.env.REACT_APP_EMPLOYER_CENTER_API
        }/shortlist/add-applicant/${item._id}`,
        {
          headers: {
            authorization: `Bearer ${props.auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const list = [...applicants]
      setApplicants(response.data.data)
    })
  }
  async function removeApplicants (userId, jobId) {
    try {
      const response = await axios.post(
        `${
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
            : process.env.REACT_APP_EMPLOYER_CENTER_API
        }/shortlist/remove-applicant`,
        {
          userId: userId,
          jobId: jobId
        },
        {
          headers: {
            authorization: `Bearer ${props.auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      getApplicants()
    } catch (error) {
      console.log(error.response)
    }
  }
  function toggleSelectedStaff(id) {
    const data = { ...staffs }
    if (!data[id]) {
      data[id] = true
    } else {
      data[id] = false
    }
    setStaffs(data)
  }

 
  function sortSelectedUser() {
    const data = Object.keys(staffs)
    const filteredData = data.filter((item) => staffs[item])
    if (!filteredData.length) {
      return []
    }
    return filteredData
  }

  async function fetchOrganizationDetails() {
    try {
      const response = await axios(
        `https://employer-center-api.herokuapp.com/api/v1/organization/fetch-single?organizationId=${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      console.log(response.data.data)
      let arr = []
      if (!staffs.length) {
        arr = response.data.data.staffs.map((item) => item._id)
      } else {
        arr = Object.keys(staffs).concat(
          response.data.data.staffs.map((item) => item._id)
        )
      }
      arr.forEach((item, i) => {
        setStaffs((prev) => ({ ...prev, [item]: true }))
        console.log(i + 1)
        console.log(staffs)
      })

      setSelected_organisation(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchAllUsers() {
    try {
      const response = await axios(
        `https://employer-center-api.herokuapp.com/api/v1/admin/fetch_all_user`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      setUsers(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  async function updateOrganization() {
    const data = { ...selected_organisation, staffs: [...sortSelectedUser()] }
    setSearch('');
    data.admins = [...data.admins.map(item => item._id)]
    delete data._id
    delete data.id
    delete data.createdBy
    delete data.createdAt
    delete data.updatedAt
    delete data.__v
    delete data.wallet
    
    try {
      const response = await axios.put(
        `https://employer-center-api.herokuapp.com/api/v1/organization/update?organizationId=${id}`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      // console.log(response.data.data)
      setSelected_organisation({})
      const arr = response.data.data.staffs
      arr.forEach((item) => {
        setStaffs({ ...staffs, [item]: true })
      })
      setSelected_organisation(response.data.data)
      swal('Successful!', response.data.message, 'success')
    } catch (error) {
      console.log(error.response)
      swal('Something went wrong!', error.response.data.message, 'error')
    }
  }

  function filterUsers(users) {
    if (!users) return []
    if (!users[0]) return []
    const data = [...users]
    if (!data[0].fullName) return []
    const result = data.filter((item) =>
      item.firstName && item.firstName.toLowerCase().includes(search.toLowerCase()) || 
      item.lastName && item.lastName.toLowerCase().includes(search.toLowerCase()) || 
      item.fullName && item.fullName.toLowerCase().includes(search.toLowerCase())
    )
    if (!result) return []
    return result
  }

  useEffect(() => {
    getApplicants()
    fetchAllUsers()
    // if (allJobs.length > 0 && selected_organisation) {
    // }
  }, [allJobs.length, orgJobs.length])

  useEffect(() => {
    filterOrgJobs()
    fetchOrganizationDetails()
  }, [selected_organisation._id])

  useEffect(() => {
    getAllJobs()
  }, [])

  async function httpInviteUserByEmail() {
    const  data = {
      organizationId: id,
      email: [...staffEmails]
    }

    try {
      const response = await axios.post(
        `https://employer-center-api.herokuapp.com/api/v1/admin/invite_user`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
        )
        
        swal('Successful!', response.data.message, 'success')
      } catch (error) {
        console.log(error.response)
        swal('Something went wrong!', error.response.data.message, 'error')
      }
      // setShowShare(false)
  }

  return (
    <>
      <CustomNav />
      <div className="row" style={{ margin: "2rem", marginTop: "2rem" }}>
        <div className="col-lg-8">
          <div className="profile card card-body px-0 pt-0 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                <div
                  className="cover-photo w-100"
                  style={{ position: "relative" }}
                >
                  <div
                    onClick={() => console.log(true)}
                    style={{
                      position: "absolute",
                      background: "rgba(255, 255, 255, 0.9)",
                      top: "10px",
                      right: "10px",
                      padding: "5px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    <UploadSimple size={20} />
                    Upload Cover Image
                  </div>
                </div>
              </div>
              <div className="profile-info">
                <div className="profile-photo" style={{ background: "white" }}>
                  <img
                    src={
                      !selected_organisation
                        ? ProfileImage
                        : selected_organisation.logo
                    }
                    className="img-fluid"
                    alt="profile"
                    style={{
                      width: "150px",
                      height: "auto",
                      objectFit: "cover",
                      border: "6px solid white",
                    }}
                  />
                </div>
                <div className="w-100">
                  <div className="profile-name d-flex justify-content-center justify-content-sm-between  w-100">
                    <div className="w-50">
                      <h4 className="mb-1" style={{ color: "#d0ef3b" }}>
                        {selected_organisation &&
                          selected_organisation.organizationName}
                      </h4>
                      {/* <p className='m-0' style={{ width: '100%' }}>
                        {!selected_organisation
                          ? 'N/A'
                          : selected_organisation.email}
                      </p> */}
                      <p
                        className="my-1"
                        style={{ width: "100%", lineHeight: "16px" }}
                      >
                        {!selected_organisation
                          ? "N/A"
                          : selected_organisation.website}
                      </p>
                    </div>
                  </div>
                  <Link
                    className="ms-auto btn btn-primary m-0 px-5"
                    style={{ alignSelf: "center" }}
                    to={`/application/${id}/${selected_organisation.initials}`}
                    id="custom-button"
                    onClick={() => props.jobView(null)}
                  >
                    Post New Job
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 ">
          <div className="row">
            <div className="card">
              <div className="card-body">
                <div className="profile-statistics">
                  <div className="text-center">
                    <div className="row">
                      <div className="row">
                        <div className="d-flex justify-content-between pb-4">
                          <span>Your Dashboard</span>
                        </div>
                        <hr></hr>
                      </div>
                      <div className="d-flex flex-column align-items-start m-3">
                        <h3 className="m-b-0" style={{ color: "#00b500" }}>
                          0
                        </h3>
                        <span>views today</span>
                      </div>
                      <div className="d-flex flex-column align-items-start m-3">
                        <h3 className="m-b-0" style={{ color: "#00b500" }}>
                          0
                        </h3>
                        <span>post views</span>
                      </div>
                      <div className="d-flex flex-column align-items-start m-3">
                        <h3 className="m-b-0" style={{ color: "#00b500" }}>
                          0
                        </h3>
                        <span>search appearances</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-4">
        <div className="col-xl-8">
          <div className="">
            <div
              className="card"
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
            >
              <div>
                <div
                  className="d-flex"
                  style={{ borderBottom: "2px solid #eee", paddingBottom: 0 }}
                >
                  <CustomButton
                    onClick={() => setSection("profile")}
                    style={{
                      width: "15rem",
                      marginBottom: 0,
                      background: `${
                        section === "profile" ? "#00b500" : "white"
                      }`,
                      color: `${section === "profile" ? "white" : "#00b500"}`,
                      border: "1px solid #00b500",
                    }}
                  >
                    Profile
                  </CustomButton>
                  <CustomButton
                    onClick={() => setSection("jobPosting")}
                    style={{
                      width: "15rem",
                      marginBottom: 0,
                      background: `${
                        section === "jobPosting" ? "#00b500" : "white"
                      }`,
                      color: `${
                        section === "jobPosting" ? "white" : "#00b500"
                      }`,
                      border: "1px solid #00b500",
                    }}
                  >
                    User Management
                  </CustomButton>
                  <CustomButton
                    onClick={() => setSection("applications")}
                    style={{
                      width: "15rem",
                      marginBottom: 0,
                      background: `${
                        section === "applications" ? "#00b500" : "white"
                      }`,
                      color: `${
                        section === "applications" ? "white" : "#00b500"
                      }`,
                      border: "1px solid #00b500",
                    }}
                  >
                    Applications
                  </CustomButton>
                </div>
              </div>
              {section === "profile" && (
                <>
                  <div
                    className="mt-4 p-5 card"
                    style={{ borderRadius: "0.4rem" }}
                  >
                    <h4
                      style={{
                        color: "#7f7f7f",
                        borderBottom: "1px solid #eee",
                        paddingBottom: "1rem",
                      }}
                    >
                      Job Openings
                    </h4>
                    <div
                      className={`d-flex flex-wrap ${
                        !orgJobs.length ? "justify-content-center " : ""
                      }`}
                    >
                      {orgJobs.length > 0 ? (
                        orgJobs.map((item) => (
                          <DisplayOrgJob
                            key={item._id}
                            {...item}
                            coverImage={selected_organisation.logo}
                          />
                        ))
                      ) : (
                        <p style={{ textAlign: "center", color: "#7f7f7f" }}>
                          No job opening(s).
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className="mt-4 p-5 card"
                    style={{ borderRadius: "0.4rem" }}
                  >
                    <h4
                      style={{
                        color: "#7f7f7f",
                        borderBottom: "1px solid #eee",
                        paddingBottom: "1rem",
                      }}
                    >
                      Staffs and Admins
                    </h4>
                    <div className="d-flex justify-content-around flex-wrap">
                      <SkillsCard
                        skills="Staffs"
                        // endorsements={selected_organisation && selected_organisation.staffs.length + selected_organisation.subAdmins.length + selected_organisation.admins.length}
                      />
                      <SkillsCard
                        skills="Admins"
                        // endorsements={selected_organisation && selected_organisation.admins.length}
                      />
                      <SkillsCard
                        skills="Sub-Admins"
                        // endorsements={selected_organisation && selected_organisation.subAdmins.length}
                      />
                    </div>
                  </div>
                  <div
                    className="mt-4 p-5 card"
                    style={{ borderRadius: "0.4rem" }}
                  >
                    <div
                      className="d-flex justify-content-between align-items-center pb-1"
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <h4
                        style={{
                          color: "#7f7f7f",
                          borderBottom: "1px solid #eee",
                          paddingBottom: "1rem",
                        }}
                      >
                        Corporate Team
                      </h4>
                      <p className="mb-0">
                        Number of staff:{" "}
                        {selected_organisation.staffs &&
                          selected_organisation.staffs.length}
                      </p>
                      <div className="d-flex align-items-center">
                        <div className="mx-4">
                          <Link
                            to="#"
                            style={{ textDecoration: "underline" }}
                            onClick={() => {
                              setShowShare(true)
                              setSearch('')
                            }}
                          >
                            Add Staff
                          </Link>
                        </div>
                        <div>
                          <CustomInput
                            placeholder="search..."
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${
                        "justify-content-center"
                        // selected_organisation.admins &&
                        // selected_organisation.admins.concat(
                        //   selected_organisation.staffs
                        // ).length === 1
                        //   ? 'justify-content-start'
                        //   : 'justify-content-center'
                      } flex-wrap`}
                    >
                      {selected_organisation.admins &&
                        [...filterUsers(selected_organisation.staffs)]
                          
                          .map((item) => (
                            <div
                              className="p-4 m-3 d-flex align-items-center"
                              style={{
                                borderRadius: "0.44rem",
                                boxShadow:
                                  "0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)",
                                border: "1px solid #eee",
                              }}
                            >
                              <div>
                                <img
                                  className=""
                                  style={{
                                    objectFit: "cover",
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    border: "1px solid #eee",
                                  }}
                                  src={
                                    !item.profilePicture
                                      ? ProfileImage
                                      : item.profilePicture
                                  }
                                  alt={item.username}
                                />
                              </div>
                              <div className="mx-2" style={{ width: "80%" }}>
                                <h4 style={{ color: "#7f7f7f" }}>
                                  {item.fullName}
                                </h4>
                                <hr
                                  className="m-0"
                                  style={{
                                    color: "rgba(127, 127, 127, 0.4)",
                                  }}
                                ></hr>
                                <p style={{ color: "#7f7f7f" }}>{item.email}</p>
                              </div>
                              <div className="d-flex align-items-center">
                                <CustomButton>View</CustomButton>
                                <CustomButton>Contact</CustomButton>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </>
              )}
              {section === "jobPosting" && (
                <div
                  className=" mt-4 p-5 d-flex justify-content-around flex-wrap"
                  style={{
                    background: "white",
                    borderRadius: "0.75rem",
                    boxShadow:
                      "0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)",
                  }}
                >
                  <UserManagement />
                </div>
              )}
              {section === "applications" && (
                <div
                  className="card mt-4 p-3"
                  style={{ borderRadius: "0.4rem" }}
                >
                  <div
                    style={{ borderBottom: "1px solid #eee" }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <h5>All Applicants</h5>
                    <div
                      style={{ width: "40rem" }}
                      className="d-flex justify-content-evenly align-items-center"
                    >
                      <p
                        className="pt-2"
                        style={{
                          color: "#00b500",
                          fontSize: "0.7rem",
                          width: "22rem",
                          marginRight: "1rem",
                        }}
                      >
                        {applicants.length} Applications
                      </p>
                      <CustomInput
                        title=""
                        placeholder="search for applicant"
                        style={{ marginRight: "1rem", height: "2.5rem" }}
                      />
                      <CustomSelect
                        data={[]}
                        title=""
                        placeholder="All Job Openings"
                        style={{ marginRight: "1rem", height: "2.5rem" }}
                      />
                      <CustomButton>Search</CustomButton>
                    </div>
                  </div>
                  <div className="p-3 d-flex justify-content-center align-items-center flex-wrap">
                    {applicants.length > 0 &&
                      applicants.map((item, i) => (
                        <ApplicantCard
                          key={i.toString()}
                          {...item}
                          token={props.auth.token}
                          removeApplicants={removeApplicants}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="row">
            <div className="col-lg-12"></div>
            <div className="col-lg-12">
              <div className="row">
                <div className="card">
                  <div className="card-body">
                    <div className="profile-statistics">
                      <div className="text-center">
                        <div className="row">
                          <div className="row">
                            <div className="d-flex justify-content-between pb-4">
                              <span>Who viewed me?</span>
                              <Link to="#" style={{ color: "#00b500" }}>
                                VIEW ALL
                              </Link>
                            </div>
                            <hr></hr>
                          </div>
                          {[].length > 0 ? (
                            <div className="d-flex m-2">
                              <div>
                                <img
                                  src={profile}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  alt="..."
                                />
                              </div>
                              <div
                                style={{ textAlign: "start", padding: "10px" }}
                              >
                                <h4 className="m-0 p-0">Audrey Alexander</h4>
                                <p className="m-0 p-0">Team lead at Google</p>
                              </div>
                            </div>
                          ) : (
                            <div>No viewed profile</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-4">
                <div className="card">
                  <div className="card-body">
                    <div className="profile-statistics">
                      <div className="text-center">
                        <div className="row">
                          <div className="row">
                            <div className="d-flex justify-content-between pb-4">
                              <span>YOU MAY LIKE THESE COURSES</span>
                            </div>
                            <hr></hr>
                          </div>
                          <Link to="#" style={{ color: "#00b500" }}>
                            SEE ALL RECOMMENDATIONS
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showShare}
        onHide={() => setShowShare(false)}
        style={{ paddingTop: '15rem' }}
      >
        
        <div className='card p-5'>
          <div className='d-flex justify-content-between align-items-center'>
            <p className='mb-0'>
              Add {Object.keys(staffs).filter((item) => staffs[item]).length} user
              {Object.keys(staffs).filter((item) => staffs[item]).length > 1
                ? 's'
                : null}{' '}
              as staff
              {Object.keys(staffs).filter((item) => staffs[item]).length > 1
                ? 's'
                : null}{' '}
              to {selected_organisation.organizationName}
            </p>
            <div className='d-flex align-items-center'>
              <input type="checkbox" className='mx-1' onChange={e => setAddByEmail(e.target.checked)}/>
              <label className='mt-2'><strong>Add by email</strong></label>
            </div>
          </div>
          <hr></hr>
          {
            addByEmail ?
            <div>
              <div className='d-flex align-items-center' style={{background: '#fafffe', flexWrap: 'wrap'}}>
                {
                  staffEmails.map(item => (
                    <div key={item} onClick={() => setStaffEmails([...staffEmails.filter(email => email !== item)])} style={{cursor: 'pointer', border: '1px solid #eee', padding: '0.5rem', borderRadius: '0.44rem', marginRight: '1rem', marginBottom: '1rem'}}>{item.toLowerCase()}</div>
                  ))
                }
                <CustomInput type="text" placeholder="Enter email" onKeyPress={e => {
                  if(e.which === 13) {
                    setStaffEmails([...staffEmails, e.target.value])
                    e.target.value = ""
                  }
                }} style={{width: '15rem', border: 'none', background: '#fafffe'}}/>
              </div>
              <CustomButton style={{width: '100%'}} onClick={httpInviteUserByEmail}>Add staff</CustomButton>
            </div> : 
            <>
              <CustomInput
                placeholder='search...'
                onChange={(e) =>  setSearch(e.target.value)}
              />
              <div
                className='p-2'
                style={{
                  border: '1px solid #eee',
                  height: '10rem',
                  overflowY: 'scroll',
                }}
              >
                <ul>
                  {[...filterUsers(users)].length > 0 ? (
                    [...filterUsers(users)].map((item) => (
                      <li
                        key={item._id}
                        onClick={() => toggleSelectedStaff(item._id)}
                        className='m-2 p-2'
                        style={{
                          background: `${
                            staffs[item._id] ? 'rgba(2, 2, 77, 0.4)' : '#eee'
                          }`,
                          cursor: 'pointer',
                          color: `${staffs[item._id] ? 'white' : 'black'}`,
                        }}
                      >
                        {item.fullName || `${item.firstName} ${item.lastName}` }
                      </li>
                    ))
                  ) : (
                    <li
                      className='m-2 p-2'
                      style={{ background: '#eee', cursor: 'pointer' }}
                    >
                      user not found!
                    </li>
                  )}
                </ul>
              </div>
              <CustomButton onClick={updateOrganization}>
                Add {Object.keys(staffs).filter((item) => staffs[item]).length} user
                {Object.keys(staffs).filter((item) => staffs[item]).length > 1
                  ? 's'
                  : null}
              </CustomButton>
            </>
          }
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  organisation: state.organisation,
  jobPosting: state.jobPosting,
  auth: state.auth.auth
})

const mapDispatchToProps = dispatch => ({
  jobView: data => dispatch(jobView(data)),
  getAllJobs: token => dispatch(getAllJobs(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationPage)
