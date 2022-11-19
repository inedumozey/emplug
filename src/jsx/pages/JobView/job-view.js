import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import CustomButton from '../../components/CustomButton/custom-button'
import CustomNav from '../../layouts/nav/CustomNav';
import ShareJobLink from '../../components/shareLink/ShareJobLink';
import { Modal } from 'react-bootstrap'

import {
  BookmarkSimple,
  ShareNetwork,
  NotePencil,
  Article,
  Folders,
  EnvelopeSimple,
  Info,
} from 'phosphor-react'


import OrgPic from '../../../images/comapny/1.png'
import GetAuthor from '../../components/GetAuthor/get-author'

import pageRoutes from '../../../routes'
import { deleteJob } from '../../../store/actions/JobPosting/job-posting.actions'
import { getSingleOrganisation } from '../../../store/actions/Organisation/OrganisationActions'

function JobView(props) {
  const [orgDetails, setOrgDetails] = useState()
  const [exist, setExist] = useState(null)
  const [show, setShow] = useState(false);
  const [showShare, setShowShare] = useState(false)
  const [jobDetails, setJobDetails] = useState(null)
  const params = useParams()

  const history = useHistory()

  function findOrg() {
    // console.log("The organization=======> ", props.organisation.get_single_organisation)
    // console.log("The job=======> ", props.jobPosting.job_view.author._id)
    props.organisation.get_single_organisation.forEach((item) => {
      if ((item._id === props.jobPosting.job_view.author._id) || props.auth.auth.user._id === "6241b038a2e5695e68279e1d") {
        // console.log("Exist========> ", true)
        setExist(true)
      }
    })
  }

  function httpDeleteJob() {
    if (props.jobPosting.job_view) {
      props.deleteJob(props.jobPosting.job_view._id, props.auth.auth.token)
      history.goBack()
    }
  }

  // get organization and add to state
  useEffect(() => {
    if (props.auth.auth.user) {
      const { token } = props.auth.auth
      const { _id } = props.auth.auth.user
      props.getSingleOrganisation(_id, token)
    }
    findOrg()
  }, [props.organisation.get_single_organisation.length])

  // useEffect(() => {
  // }, [exist])
  return (
    <>
      <CustomNav />
      <div className='contaier-fluid p-4 d-flex justify-content-center flex-wrap mt-5'>
        <div className='col-lg-8 p-2'>
          <div
            className='card mb-4 p-5'
            style={{ borderRadius: '0.4rem', height: 'auto' }}
          >
            <h2
              style={{
                color: '#7f7f7f',
                borderBottom: '1px solid #eee',
                paddingBottom: '1rem',
              }}
            >
              <GetAuthor
                author={
                  props.jobPosting.job_view && props.jobPosting.job_view.title
                }
              />
            </h2>
            <p className='mb-0' style={{ color: '#7f7f7f' }}>
              Date posted:{' '}
              {props.jobPosting.job_view && props.jobPosting.job_view.startDate}
            </p>
            <p className='mb-0' style={{ color: '#7f7f7f' }}>
              Monthly Salary: N
              {props.jobPosting.job_view && props.jobPosting.job_view.salary}
            </p>
            <p className='mb-0' style={{ color: '#00b500' }}>
              0 Applicants
            </p>

            <div className='d-flex  text-center justify-content-sm-between flex-wrap'>
              <div>
                {exist ? (
                  <>
                    {' '}
                    <Link to={`${pageRoutes.application}`}>
                      <CustomButton style={{ width: '10rem' }}>
                        Update
                      </CustomButton>
                    </Link>
                    <Link to={pageRoutes.talents.split(':')[0] + params.id}>
                      <CustomButton style={{ width: '10rem' }}>
                        Analytics
                      </CustomButton>
                    </Link>
                  </>
                ) : props.auth.auth.user ? (
                  <Link
                    to={`${pageRoutes.apply.split(':')[0]}${
                      props.jobPosting.job_view &&
                      props.jobPosting.job_view.author._id
                    }`}
                    onClick={() => setShow(true)}
                  >
                    <CustomButton style={{ width: '10rem' }}>
                      APPLY
                    </CustomButton>
                  </Link>
                ) : (
                  <CustomButton
                    style={{ width: '10rem' }}
                    onClick={() => setShow(true)}
                  >
                    APPLY
                  </CustomButton>
                )}
                {exist && (
                  <>
                    <Link
                      to={`${pageRoutes.pipeline.split(':')[0]}${
                        props.jobPosting.job_view.author._id
                      }/${props.jobPosting.job_view._id}`}
                    >
                      <CustomButton style={{ width: '10rem' }}>
                        Pipeline
                      </CustomButton>
                    </Link>
                    <CustomButton
                      onClick={httpDeleteJob}
                      style={{ width: '10rem', background: 'red' }}
                    >
                      Delete
                    </CustomButton>
                  </>
                )}
              </div>
              <div className='pt-2 d-flex justify-content-evenly flex-wrap'
                style={{ cursor: 'pointer' }}
                onClick={() => {setShowShare(true); setJobDetails(props.jobPosting.job_view)}}
              >
                <ShareNetwork
                  size={22}
                  color='#00b500'
                />
                <span>SHARE</span>
              </div>
            </div>
          </div>
          <div
            className='card mb-4 p-5'
            style={{ borderRadius: '0.4rem', height: 'auto' }}
          >
            <h3
              style={{
                color: '#7f7f7f',
                marginBottom: '2rem',
                borderBottom: '1px solid #eee',
                paddingBottom: '1rem',
              }}
            >
              Job Description
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              {props.jobPosting.job_view &&
                props.jobPosting.job_view.jobDescription}
            </p>
            <h3
              style={{
                color: '#7f7f7f',
                marginBottom: '2rem',
                borderBottom: '1px solid #eee',
                paddingBottom: '1rem',
              }}
            >
              Skills/Qualification
            </h3>
            {props.jobPosting.job_view &&
              props.jobPosting.job_view.skills.map((item) => (
                <p className='mb-0' key={item.toLowerCase()}>
                  + {item}
                </p>
              ))}
          </div>
          <div
            className='card mb-4 p-5'
            style={{ borderRadius: '0.4rem', height: 'auto' }}
          >
            <h3
              style={{
                color: '#7f7f7f',
                borderBottom: '1px solid #eee',
                paddingBottom: '1rem',
              }}
            >
              Related Jobs
            </h3>
          </div>
        </div>
        <div className='col-lg-4'>
          <div
            className='card mb-4 p-5'
            style={{ borderRadius: '0.4rem', height: 'auto' }}
          >
            <div className='d-flex justify-content-center mb-4'>
              <img
                src={
                  props.jobPosting.job_view &&
                  props.jobPosting.job_view.author.logo
                }
                alt='...'
                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h5
                style={{
                  color: '#7f7f7f',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '1rem',
                }}
              >
                <GetAuthor
                  token={props.auth.token}
                  author={props.jobPosting.job_view.author.organizationName}
                  setOrgDetails={setOrgDetails}
                />
              </h5>
              <p className='mb-0' style={{ color: '#7f7f7f' }}>
                {orgDetails &&
                  `${orgDetails.address} ${orgDetails.state}, ${orgDetails.country}`}
              </p>
              <p className='mb-0' style={{ color: '#7f7f7f' }}>
                0 Current Jobs Openings
              </p>
            </div>
            <div className='d-flex justify-content-around mt-4'>
              <CustomButton>FOLLOW</CustomButton>
              <CustomButton>CONTACT</CustomButton>
            </div>
          </div>
          <div
            className='card mb-4 p-5'
            style={{ borderRadius: '0.4rem', height: 'auto' }}
          >
            <div
              className='mb-4'
              style={{ color: '#7f7f7f', cursor: 'pointer' }}
            >
              <BookmarkSimple size={22} style={{ marginRight: '2rem' }} />
              <span>Saved Jobs</span>
            </div>
            <div
              className='mb-4'
              style={{ color: '#7f7f7f', cursor: 'pointer' }}
            >
              <NotePencil size={22} style={{ marginRight: '2rem' }} />
              <span>Applied Jobs</span>
            </div>
            <div
              className='mb-4'
              style={{ color: '#7f7f7f', cursor: 'pointer' }}
            >
              <Article size={22} style={{ marginRight: '2rem' }} />
              <span>Resume Builder</span>
            </div>
            <div
              className='mb-4'
              style={{ color: '#7f7f7f', cursor: 'pointer' }}
            >
              <Folders size={32} style={{ marginRight: '2rem' }} />
              <span>My Credentials</span>
            </div>
          </div>
          <div
            className='card mb-4 p-5'
            style={{ borderRadius: '0.4rem', height: 'auto' }}
          >
            <h4
              className='mb-4'
              style={{
                color: '#7f7f7f',
                borderBottom: '1px solid #eee',
                paddingBottom: '1rem',
              }}
            >
              Job Details
            </h4>
            <div className='pb-2 d-flex align-items-center justify-content-between'>
              <h6 style={{ marginRight: '2rem', color: '#7f7f7f' }}>Job id:</h6>
              <h6 style={{ color: '#7f7f7f' }}>
                jb
                {props.jobPosting.job_view &&
                  props.jobPosting.job_view._id.slice(0, 9)}
              </h6>
            </div>
            <div className='pb-2 d-flex align-items-center justify-content-between'>
              <h6 style={{ marginRight: '2rem', color: '#7f7f7f' }}>
                Location:
              </h6>
              <h6 style={{ color: '#7f7f7f' }}>
                {props.jobPosting.job_view &&
                  props.jobPosting.job_view.location}
              </h6>
            </div>
            <div className='pb-2 d-flex align-items-center justify-content-between'>
              <h6 style={{ marginRight: '2rem', color: '#7f7f7f' }}>
                Company:
              </h6>
              <h6 style={{ color: '#7f7f7f' }}>
                <GetAuthor
                  token={props.auth.token}
                  userId={
                    props.jobPosting.job_view &&
                    props.jobPosting.job_view.author
                  }
                  setOrgDetails={setOrgDetails}
                />
              </h6>
            </div>
            <div className='pb-2 d-flex align-items-center justify-content-between'>
              <h6 style={{ marginRight: '2rem', color: '#7f7f7f' }}>Type:</h6>
              <h6 style={{ color: '#7f7f7f' }}>Private</h6>
            </div>
            <div className='pb-2 d-flex align-items-center justify-content-between'>
              <h6 style={{ marginRight: '2rem', color: '#7f7f7f' }}>
                Employment Status:
              </h6>
              <h6 style={{ color: '#7f7f7f' }}>
                {props.jobPosting.job_view &&
                  props.jobPosting.job_view.employmentType}
              </h6>
            </div>
            <div className='pb-2 d-flex align-items-center justify-content-between'>
              <h6 style={{ marginRight: '2rem', color: '#7f7f7f' }}>
                Position:
              </h6>
              <h6 style={{ color: '#7f7f7f' }}>
                {props.jobPosting.job_view && props.jobPosting.job_view.title}
              </h6>
            </div>
            <div className='pb-2 d-flex align-items-center justify-content-between'>
              <h6 style={{ marginRight: '2rem', color: '#7f7f7f' }}>
                Experience:
              </h6>
              <h6 style={{ color: '#7f7f7f' }}>
                {props.jobPosting.job_view &&
                  props.jobPosting.job_view.workExperience}{' '}
                years
              </h6>
            </div>
            <div className='pb-2 d-flex align-items-center justify-content-between'>
              <h6 style={{ marginRight: '2rem', color: '#7f7f7f' }}>Degree:</h6>
              <h6 style={{ color: '#7f7f7f' }}>
                {props.jobPosting.job_view &&
                  props.jobPosting.job_view.certifications[0]}
              </h6>
            </div>
          </div>
        </div>
      </div>
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

      {/* modal to open share link */}
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
  jobPosting: state.jobPosting,
  auth: state.auth,
  organisation: state.organisation,
})

const mapDispatchToProps = (dispatch) => ({
  deleteJob: (id, token) => dispatch(deleteJob(id, token)),
  getSingleOrganisation: (id, token) => dispatch(getSingleOrganisation(id, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(JobView)
