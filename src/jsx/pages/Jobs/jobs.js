import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import CustomButton from '../../components/CustomButton/custom-button'
import CustomInput from '../../components/CustomInput/custom-input'
import CustomSelect from '../../components/CustomSelect/Custom-select'
import CustomNav from '../../layouts/nav/CustomNav'
import CompanyLogo from '../../components/CompanyLogo/company-logo'

import ProfilePic from '../../../images/comapny/4.png'
import LoadingPic from '../../../images/loading/loading.gif'
import {
  ThumbsUp,
  ChatCircle,
  ShareNetwork,
  EnvelopeSimple,
  Info,
} from 'phosphor-react'
import { Modal } from 'react-bootstrap'

import pageRoutes from '../../../routes'

import axios from 'axios'

import { updateProfessionalProfile } from '../../../store/actions/MyPortfolio/my-portfolio.actions'
import {
  getAllJobs,
  jobView,
} from '../../../store/actions/JobPosting/job-posting.actions'
import { getSinglePipeline } from '../../../store/actions/PipelineManager/pipeline-manager.actions'
import GetAuthor from '../../components/GetAuthor/get-author'
import Footer from '../../layouts/Footer'
import { getSingleOrganisation } from '../../../store/actions/Organisation/OrganisationActions'
import ShareJobLink from '../../components/shareLink/ShareJobLink'

function Jobs(props) {
  const [data, setData] = useState()
  const [jobs, setJobs] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [orgDetails, setOrgDetails] = useState()
  const [show, setShow] = useState(false)
  const [exist, setExist] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [jobDetails, setJobDetails] = useState(null)

  const history = useHistory()

  let isRendered = useRef(false)

  // console.log({ _id, token })

  // get organization and add to state
  useEffect(() => {
    if (props.auth.auth.user) {
      const { token } = props.auth.auth
      const { _id } = props.auth.auth.user
      props.getSingleOrganisation(_id, token)
    }
  }, [])

  async function httpProfessionalProfile() {
    if (props.auth.auth.user) {
      const user = await axios.get(
        `${
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
            : process.env.REACT_APP_EMPLOYER_CENTER_API
        }/user/professional-profile?userId=${props.auth.auth.user._id}`,
        {
          headers: {
            authorization: `Bearer ${props.auth.auth.token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      props.updateProfessionalProfile(user.data.data)
      setData(user.data.data)
      return
    }
  }

  useEffect(() => {
    isRendered = true
    if (isRendered) {
      httpProfessionalProfile()
      props.getAllJobs(props.auth.auth.token)
    }

    return () => {
      isRendered = false
    }
  }, [])

  useEffect(() => {
    if (props.auth.auth.user) {
      const {
        gender,
        phone,
        stateOfOrigin,
        stateOfResident,
        lgaOfOrigin,
        lgaOfResident,
        address,
        DOB,
        skills,
      } = props.auth.auth.user;

      if(gender && phone && stateOfOrigin && stateOfResident && lgaOfOrigin && lgaOfResident && address && DOB && skills.length > 0
        ){
          const { token } = props.auth.auth
          const { _id } = props.auth.auth.user
          props.getSingleOrganisation(_id, token, history)
        } else {
          swal('Profile','Please update your profile to continue')
          return history.push(pageRoutes.editProfile)
        }
    }
  }, [
    props.jobs.allJobs.length,
    props.organisation.get_single_organisation.length,
  ])

  async function applyForJob(jobId, userId, initials) {
    try {
      const response = await axios.post(
        `${
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
            : process.env.REACT_APP_EMPLOYER_CENTER_API
        }/shortlist/add-applicant`,
        {
          jobId,
          userId,
          initials,
        },
        {
          headers: {
            authorization: `Bearer ${props.auth.auth.token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status === 201) {
        setShow(true)
      }
    } catch (error) {
      return;
      // console.log(error)
    }
  }

  // no search input and location return all jobs
  useEffect(() => {
    if (!searchInput && !searchCountry) setJobs([...props.jobs.allJobs])
  }, [!searchInput, searchCountry])

  function filterInput() {
    const data = [...props.jobs.allJobs]
    let filteredJobs
    // no search input and location return all jobs
    // if (!searchInput && !searchCountry) {
    // 	return setJobs(data);
    // }

    // search input but no location return all filtered jobs that include the search input
    if (searchInput.length > 0 && !searchCountry) {
      filteredJobs = data.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      )
      return setJobs(filteredJobs)
    }
    // no search input but location provided returen filtered jobs from that location
    if (!searchInput && searchCountry.length > 0) {
      filteredJobs = data.filter((item) =>
        item.location.toLowerCase().includes(searchCountry)
      )
      return setJobs(filteredJobs)
    }

    filteredJobs = data.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    )
    let filteredCountry = filteredJobs.filter((item) =>
      item.location.toLowerCase().includes(searchCountry)
    )
    setJobs(filteredCountry)
  }

  function resetSearchFields() {
    setSearchInput('')
    setSearchCountry('')
    filterInput()
  }

  const getCountries = useCallback(async () => {
    const response = await axios.get(
      'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json'
    )
    setCountries(response.data)
  }, [countries.length])

  useEffect(() => {
    if (!searchInput && !searchCountry) {
      setJobs([...props.jobs.allJobs])
    }
  }, [searchInput, searchCountry])

  function findIfExist() {
    // console.log('searching...')
    const jobs = props.jobs.allJobs.map((item) => item.author._id)
    const orgs = props.organisation.get_single_organisation.map(
      (item) => item._id
    )

    for (let i = 0; i < jobs.length; i++) {
      for (let j = 0; j < orgs.length; j++) {
        if (jobs[i] === orgs[j]) {
          console.log('Found')
          setExist(true)
          return
        }
      }
    }
  }

  // style
  const sticky = {
    position: '-webkit-sticky',
    position: 'sticky',
    top: 120,
  }

  return (
    <>
      <CustomNav />
      <div className='container p-2 pt-5 d-flex justify-content-center align-items-center flex-wrap'>
        <CustomInput
          placeholder='Job Title'
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          style={{
            width: '20rem',
          }}
        />
        <CustomSelect
          data={countries.map((item) => item.name)}
          placeholder='All'
          title=''
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
          style={{
            width: '10rem',
            marginLeft: '1rem',
            marginRight: '1rem',
          }}
        />
        <div
          onClick={resetSearchFields}
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          className='text-primary mx-3'
        >
          <span title='Reset Search'>clear</span>
        </div>
        <CustomButton
          onClick={filterInput}
          style={{
            background: 'white',
            color: '#00b500',
            border: '1px solid #00b500',
            width: '15rem',
          }}
        >
          Search
        </CustomButton>
      </div>
      <div className='container padding'>
        <div className='row padding'>
          <div
            className={`${props.auth.auth.user ? 'col-lg-8' : 'col'}`}
            style={{ position: 'relative' }}
          >
            <div
              className='container-fluid d-flex align-items-center justify-content-around'
              // style={{
              // 	display: 'flex',
              // 	justifyContent: 'space-around',
              // 	width: '100%',
              // 	paddingLeft: '10rem'
              // }}
            >
              <hr
                style={{
                  width: '30%',
                }}
              ></hr>
              <span>NEW JOB OFFERS</span>
              <hr
                style={{
                  width: '30%',
                }}
              ></hr>
            </div>
            {props.jobs.loading ? (
              <img
                style={{ width: '100px', position: 'absolute', left: '35rem' }}
                src={LoadingPic}
                alt='loading...'
              />
            ) : (
              <div className='container-fluid'>
                {jobs.length > 0 ? (
                  jobs.map((item) => (
                    <div
                      className='container-fluid px-0'
                      key={item._id}
                      style={{
                        // marginLeft: '10rem',
                        // display: 'flex',
                        marginTop: '2rem',
                        background: 'white',
                        // padding: '1rem',
                        borderRadius: '0.25rem',
                        boxShadow:
                          '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          padding: '1rem',
                          paddingBottom: 0,
                          // justifyContent: 'center',
                          // alignItems: 'center'
                        }}
                      >
                        <CompanyLogo
                          logoUrl={item.author.logo}
                          name={item.author.organizationName}
                        />
                        <div style={{ width: '50%', marginLeft: '1rem', marginTop: 6  }}>
                          <h4 style={{lineHeight: '1.5rem'}}>
                            <GetAuthor author={item.author.organizationName} />
                          </h4>
                          <p style={{ marginBottom: '0.5rem' }}>
                            {item.title} |
                            <span
                              style={{ color: '#7f7f7f', marginLeft: '0.5rem' }}
                            >
                              {item.location}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          padding: '1rem',
                          paddingBottom: 0,
                          width: '100%',
                          fontSize: '0.7rem',
                          // borderLeft: '1px solid #eee'
                        }}
                      >
                        <p className='mb-0'>
                          {item.jobDescription.length > 200
                            ? item.jobDescription.slice(0, 289) + '...'
                            : item.jobDescription}
                        </p>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          border: '1px solid #eee',
                        }}
                      >
                        <div
                          className='d-flex justify-content-between '
                          style={{ width: '100%', padding: 0 }}
                        >
                          <div
                            className='d-flex justify-content-center'
                            style={{
                              borderRight: '1px solid #eee',
                              margin: 0,
                              width: '50%',
                              padding: '0.7rem',
                            }}
                          >
                            <ThumbsUp
                              size={22}
                              color='#00b500'
                              style={{ cursor: 'pointer' }}
                            />
                          </div>

                          <div
                            className='d-flex justify-content-center'
                            style={{
                              // borderLeft: '1px solid #eee',
                              margin: 0,
                              width: '50%',
                              flexGrow: 1,
                              padding: '0.7rem',
                            }}
                          >
                            <ChatCircle
                              size={22}
                              color='#00b500'
                              style={{ cursor: 'pointer' }}
                            />
                          </div>

                          <div
                            className='d-flex justify-content-center'
                            style={{
                              borderLeft: '1px solid #eee',
                              margin: 0,
                              width: '100%',
                              padding: '0.7rem',
                            }}
                          >
                            <Link
                              to={pageRoutes.job.split(':')[0] + item._id}
                              onClick={() => props.jobView(item)}
                            >
                              <p
                                className='mb-1'
                                style={{ color: '#00b500', cursor: 'pointer' }}
                              >
                                View
                              </p>
                            </Link>
                          </div>
                        </div>
                        <div
                          style={{
                            width: '13rem',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginRight: '1rem',
                            borderLeft: '1px solid #eee',
                          }}
                        >
                          {props.auth.auth.user && (
                            <>
                              <Link
                                className='mx-4'
                                to={
                                  pageRoutes.getPipeline.split(':')[0] +
                                  item._id
                                }
                                onClick={() => props.jobView(item)}
                              >
                                <CustomButton style={{ width: '100%' }}>
                                  Apply
                                </CustomButton>
                              </Link>
                            </>
                          )}
                          {!props.auth.auth.user && (
                            <CustomButton
                              style={{ width: '100%' }}
                              onClick={() => setShow(true)}
                            >
                              Apply
                            </CustomButton>
                          )}
                          <Link
                            className='d-flex justify-content-center align-items-center'
                            style={{
                              width: '5rem',
                              borderLeft: '1px solid #eee',
                            }}
                            to={`#`}
                            onClick={() => {setShowShare(true); setJobDetails(item)}}
                          >
                            <ShareNetwork size={22} color='#00b500' />
                            <span>SHARE</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='w-100 p-4 d-flex justify-content-center align-items-center'>
                    {!jobs.length && <p>No Jobs Found</p>}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={`${props.auth.auth.user ? 'col-lg-4 mt-5' : ''}`}>
        
            {props.auth.auth.user && (
              <div className='' style={sticky}>
                {' '}
                <div
                  className='card mx-2 '
                  style={{
                    borderRadius: '0.25rem',
                    background: '#FCFDFD',
                    padding: '2rem',
                    height: 'auto',
                  }}
                >
                  <h4
                    style={{
                      color: '#7f7f7f',
                      borderBottom: '1px solid #eee',
                      paddingBottom: '1rem',
                    }}
                  >
                    My Applications
                  </h4>
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#7f7f7f',
                      padding: '2rem',
                    }}
                  >
                    no application(s)
                  </div>
                </div>
                <div
                  className='card mt-2 mx-2'
                  style={{
                    borderRadius: '0.25rem',
                    background: '#FCFDFD',
                    padding: '2rem',
                    height: 'auto',
                  }}
                >
                  <h4
                    style={{
                      color: '#7f7f7f',
                      borderBottom: '1px solid #eee',
                      paddingBottom: '1rem',
                    }}
                  >
                    Categories
                  </h4>
                </div>{' '}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        show={show}
        onHide={() => setShow(false)}
        style={{ paddingTop: '15rem' }}
      >
        {props.auth.auth.user && (
          <div className='p-5' style={{ textAlign: 'center' }}>
            <EnvelopeSimple size={42} style={{ color: '#00b500' }} />
            <p>Successfully Applied!</p>
            <CustomButton onClick={() => setShow(false)}>Proceed</CustomButton>
          </div>
        )}
        {!props.auth.auth.user && (
          <div className='p-5' style={{ textAlign: 'center' }}>
            <Info size={42} />
            <p>Login to apply</p>
            <div className='d-flex justify-content-center'>
              <Link to={pageRoutes.login}>
                <CustomButton onClick={() => setShow(false)}>
                  Login
                </CustomButton>
              </Link>
              <CustomButton onClick={() => setShow(false)}>Cancel</CustomButton>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        show={showShare}
        onHide={() => setShowShare(false)}
        style={{ paddingTop: '15rem' }}
      >
        <ShareJobLink jobDetails={jobDetails} setShowShare={setShowShare}/>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => ({
  myPortfolio: state.myPortfolio,
  auth: state.auth,
  jobs: state.jobPosting,
  organisation: state.organisation,
})

const mapDispatchToProps = (dispatch) => ({
  updateProfessionalProfile: (data) =>
    dispatch(updateProfessionalProfile(data)),
  getAllJobs: (token) => dispatch(getAllJobs(token)),
  jobView: (data) => dispatch(jobView(data)),
  getSinglePipeline: (id, token) => dispatch(getSinglePipeline(id, token)),
  getSingleOrganisation: (id, token) =>
    dispatch(getSingleOrganisation(id, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)
