import { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import pageRoutes from '../../../routes'

import { Modal } from 'react-bootstrap'

import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox'
import CustomInput from '../../components/CustomInput/custom-input'
import CustomSelect from '../../components/CustomSelect/Custom-select'
import CustomNav from '../../layouts/nav/CustomNav'
import CustomTextArea from '../../components/CustomTextArea/CustomText'
import CustomButton from '../../components/CustomButton/custom-button'
import Footer from '../../layouts/Footer'

import {
  updateJobPosting,
  createAJob,
  updateAJob,
} from '../../../store/actions/JobPosting/job-posting.actions'

function CreateNewJob({
  auth,
  createAJob,
  get_single_organisation,
  updateJobPosting,
  jobPosting,
  updateAJob,
}) {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [salary, setSalary] = useState('')
  const [salaryType, setSalaryType] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [workType, setWorkType] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [workExperience, setWorkExperience] = useState('')
  const [highestEducation, setHighestEducation] = useState('')
  const [location, setLocation] = useState('')
  const [certifications, setCertifications] = useState([])
  const [skills, setSkills] = useState([])
  const [industry, setIndustry] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [attachmentTitle, setAttachmentTitle] = useState('')
  const [loadValue, setLoadValue] = useState(0)
  const [attachment, setAttachment] = useState('')

  const inputRef = useRef()

  const params = useParams()
  console.log(params)

  const [randomText, setRandomText] = useState('')

  const [code, setCode] = useState(0)

  // send job data to create a job
  async function httpPostJob(e) {
    e.preventDefault()
    const data = {
      title,
      salary,
      salaryType,
      employmentType,
      workType,
      // country,
      state,
      jobDescription,
      workExperience,
      location,
      certifications,
      skill: skills,
      industry,
      startDate,
    }

    data.author = params.id
    data.initials = params.initials
    data.highiestEduction = highestEducation
    data.closingDate = endDate
    data.organizationId = params.id

    if (
      !title ||
      !salary ||
      !salaryType ||
      !employmentType ||
      !workType ||
      !country ||
      !state ||
      !jobDescription ||
      !workExperience ||
      !data.highiestEduction ||
      !location ||
      !certifications.length ||
      !skills.length ||
      !industry ||
      !startDate ||
      !data.closingDate ||
      !data.author ||
      !data.initials
    )
      return

    if (jobPosting.job_view) {
      console.log('updating....')
      updateAJob({
        data,
        jobId: jobPosting.job_view._id,
        token: auth.token,
        setCode,
      })
      return
    }
    createAJob({ data, userId: auth.user._id, token: auth.token, setCode })
  }

  function updateCertsOrSkills(name) {
    if (!randomText) return

    let data

    if (name === 'certificate') {
      data = [...certifications]
      data.push(randomText)
      setCertifications(data)
      // setRandomText('')
      return
    }

    if (name === 'skills') {
      data = [...skills]
      data.push(randomText)
      setSkills(data)
      // setRandomText('')
      return
    }
    setRandomText('')
  }

  function removeBadge(name, value) {
    let data
    if (name === 'certificate') {
      data = [...certifications]
      const newCertificates = data.filter((item) => item !== value)
      setCertifications(newCertificates)
      return
    }

    if (name === 'skills') {
      data = [...skills]
      const newSkills = data.filter((item) => item !== value)
      setSkills(newSkills)
      return
    }
  }



  
  async function handleUpload (imageData, setFunc) {
    const data = new FormData()
    const cloudName = 'daqj8bnrb'

    data.append('file', imageData)
    data.append('upload_preset', 'my_default')

    // console.log("Format", imageData.name.split('.')[1])
    // const value = await uploadToBB();

    setAttachmentFormat(imageData.name.split('.')[1])
    

    return axios
      .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, data, {
        onUploadProgress: ProgressEvent => {
          setLoadValue((ProgressEvent.loaded / ProgressEvent.total) * 100)
        }
      })
      .then(async res => {
        setFunc(res.data.secure_url)
        setLoadValue(0)
      })
      .catch(console.log)
  }

  function uploadImage (data) {
    handleUpload(data, setAttachment)
  }

  // Cache values for fetched countries and states
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])

  // Fetch all countries and all states
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

  // Get the states of a particular country selected
  function getCountryState() {
    const getStates = states.filter((item) => item.country_name === country)
    if (getStates.length > 0) {
      return getStates
    }
    return []
  }

  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    if (!jobPosting.job_view) return
    // console.log(jobPosting.job_view)
    const {
      author,
      certifications,
      employmentType,
      jobDescription,
      location,
      salary,
      skills,
      startDate,
      title,
      workExperience,
      industry,
      salaryType,
      _id,
    } = jobPosting.job_view

    setCertifications(certifications)
    setEmploymentType(employmentType)
    setJobDescription(jobDescription)
    setLocation(location)
    setSalary(salary)
    setSkills(skills)
    setStartDate(startDate)
    setTitle(title)
    setWorkExperience(workExperience)
    setIndustry(industry)
    setSalaryType(salaryType)
  }, [])

  useEffect(() => {
    if (code === 200 || code === 201) {
      setShow(true)
    }
  }, [code])

  useEffect(() => {
    if (!jobPosting.job_view) return
    setShow(true)
  }, [jobPosting.job_view])

  const history = useHistory()
  const salaryOptions = ['Hourly', 'Monthly', 'Quarterly', 'Per Milestone']
  const employmentDataType = ['Full time', 'Part time', 'Contract']
  const workDataType = ['On-site', 'Hybrid', 'Remote']
  const yearsOfExperience = ['< 1', '1-2', '2-4', '5-10', '15+']

  // style
  const sticky = {
    position: '-webkit-sticky',
    position: 'sticky',
    top: 120,
  }

  return (
    <>
      <CustomNav />
      <div className='mt-5 px-5 mb-5'>
        <ol
          className='d-flex p-4 flex-wrap'
          style={{ borderBottom: '1px solid #eee' }}
        >
          <li
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              color: `${
                history.location.pathname === '/application' && '#00b500'
              }`,
            }}
          >
            Employment Information
          </li>
          <li
            style={{
              marginLeft: '5rem',
              textAlign: 'center',
              fontSize: '1.5rem',
            }}
          >
            Pipeline Setup
          </li>
        </ol>
      </div>

      <div className='w-100 d-flex px-5'>
        <div className='col-lg-8 card p-5' style={{ borderRadius: '0.4rem' }}>
          <h4>Basic Information</h4>
          <form className='' onSubmit={httpPostJob}>
            <div className='d-flex flex-wrap mt-4'>
              <div className='px-2 mt-4' style={{ width: '25rem' }}>
                <CustomInput
                  title='Job Title *'
                  placeholder='Job Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className=' px-2 mt-4' style={{ width: '25rem' }}>
                <CustomInput
                  title='Salary'
                  placeholder='E.g N300,000'
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>

            <div className='mt-4 px-2'>
              <label style={{ color: '#7f7f7f' }}>
                <strong>Salary Method *</strong>
              </label>
              <div className='d-flex flex-wrap justify-content-center justify-content-sm-start'>
                {salaryOptions.map((item, i) => (
                  <CustomCheckBox
                    key={i.toString()}
                    setOption={setSalaryType}
                    item={item}
                    option={salaryType}
                  />
                ))}
              </div>
            </div>

            <div className='mt-4 px-2 d-flex flex-wrap'>
              <div>
                <label style={{ color: '#7f7f7f' }}>
                  <strong>Employment Type *</strong>
                </label>
                <div className='d-flex flex-wrap justify-content-center'>
                  {employmentDataType.map((item, i) => (
                    <CustomCheckBox
                      key={i.toString()}
                      setOption={setEmploymentType}
                      item={item}
                      option={employmentType}
                    />
                  ))}
                </div>
              </div>
              <div className='px-2 mt-3' style={{ width: '25rem' }}>
                <CustomInput
                  title='Position Available *'
                  placeholder='E.g 10 Positions'
                />
              </div>
            </div>

            <div className='mt-4 px-2 d-flex flex-wrap'>
              <div>
                <label style={{ color: '#7f7f7f' }}>
                  <strong>Work Type *</strong>
                </label>
                <div className='d-flex flex-wrap justify-content-center'>
                  {workDataType.map((item, i) => (
                    <CustomCheckBox
                      key={i.toString()}
                      setOption={setWorkType}
                      item={item}
                      option={workType}
                    />
                  ))}
                </div>
              </div>
              <div className='px-2 mt-3' style={{ width: '25rem' }}>
                <CustomInput title='Work Hours *' placeholder='E.g 9am - 5pm' />
              </div>
            </div>

            <div className='d-flex flex-wrap mt-4'>
              <div className='px-2 mt-4' style={{ width: '25rem' }}>
                <CustomSelect
                  title='Job Location *'
                  data={countries}
                  placeholder='Country'
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className=' px-2 mt-4' style={{ width: '25rem' }}>
                <CustomSelect
                  title='State *'
                  data={getCountryState()}
                  placeholder='State'
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            <div className='d-flex flex-wrap mt-4'>
              <div className='px-2 mt-4 w-100'>
                <CustomTextArea
                  title='Job Description *'
                  style={{
                    height: '15rem',
                  }}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>
            <div className='d-flex flex-wrap mt-5'>
              <h4>Qualification Requirements</h4>
            </div>

            <div className='mt-4 px-2'>
              <label style={{ color: '#7f7f7f' }}>
                <strong>How many years of work experience do you need?</strong>
              </label>
              <div className='d-flex flex-wrap justify-content-center justify-content-sm-start'>
                {yearsOfExperience.map((item, i) => (
                  <CustomCheckBox
                    key={i.toString()}
                    setOption={setWorkExperience}
                    item={item}
                    option={workExperience}
                  />
                ))}
              </div>
            </div>

            <div className='d-flex flex-wrap mt-4'>
              <div className=' px-2 mt-4' style={{ width: '25rem' }}>
                <CustomSelect
                  title='Education *'
                  data={[
                    { name: 'ssce' },
                    { name: 'bsc' },
                    { name: 'msc' },
                    { name: 'national diploma' },
                    { name: 'higher national diploma' },
                  ]}
                  placeholder='What should be the lowest education'
                  onChange={(e) => setHighestEducation(e.target.value)}
                />
              </div>
              <div className='px-2 mt-4' style={{ width: '25rem' }}>
                <CustomSelect
                  title='Location'
                  data={countries}
                  value={location}
                  placeholder='What location is required'
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className='px-2 mt-4'>
              <div className='d-flex flex-wrap'>
                {certifications.length > 0 &&
                  certifications.map((item, i) => (
                    <span
                      key={i.toString()}
                      onClick={() => removeBadge('certificate', item)}
                      style={{ cursor: 'pointer' }}
                      className='badge badge-success m-2'
                    >
                      {item}
                    </span>
                  ))}
              </div>
              <div className='d-flex flex-wrap'>
                <div style={{ width: '25rem' }}>
                  <CustomInput
                    title='Certifications'
                    placeholder='Name of certification'
                    onChange={(e) => setRandomText(e.target.value)}
                    name='certificate'
                    value={randomText}
                  />
                </div>
                <div style={{ paddingTop: '1rem' }}>
                  <CustomButton
                    style={{ height: '3rem' }}
                    onClick={() => {
                      updateCertsOrSkills('certificate')
                    }}
                  >
                    Add Certificate
                  </CustomButton>
                </div>
              </div>
            </div>

            <div className='px-2 mt-4'>
              <div className='d-flex flex-wrap'>
                {skills.length > 0 &&
                  skills.map((item, i) => (
                    <span
                      key={i.toString()}
                      onClick={() => removeBadge('skills', item)}
                      style={{ cursor: 'pointer' }}
                      className='badge badge-success m-2'
                    >
                      {item}
                    </span>
                  ))}
              </div>
              <div className='d-flex flex-wrap'>
                <div style={{ width: '25rem' }}>
                  <CustomInput
                    title='Required skills'
                    placeholder='Add skills'
                    name='skills'
                    onChange={(e) => setRandomText(e.target.value)}
                  />
                </div>
                <div style={{ paddingTop: '1rem' }}>
                  <CustomButton
                    style={{ height: '3rem' }}
                    onClick={() => {
                      updateCertsOrSkills('skills')
                    }}
                  >
                    Add Skills
                  </CustomButton>
                </div>
              </div>
            </div>

            <div className='px-2 mt-4 d-flex flex-wrap'>
              <div
                className='pt-4'
                style={{ width: '25rem', marginRight: '1rem' }}
              >
                <CustomInput
                  title='Start Date *'
                  type='date'
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div className='pt-4' style={{ width: '25rem' }}>
                <CustomInput
                  title='Closing Date *'
                  type='date'
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                  style={{ width: '100%' }}
                  required
                />
              </div>
            </div>
            <div className='px-2 mt-4 d-flex flex-wrap'>
              <div
                className='pt-4'
                style={{ width: '25rem', marginRight: '1rem' }}
              >
                <CustomInput
                  title={`Attachment * ${loadValue > 0 ? "uploading..." : ""} ${ loadValue > 0 ? Math.floor(loadValue) + '%' : ""}`}
                  type='file'
                  onChange={(e) => uploadImage(e.target.files[0])}
                  // value={startDate}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div className='pt-4' style={{ width: '25rem' }}>
                <CustomInput
                  title='Attachment title *'
                  type='text'
                  onChange={(e) => setAttachmentTitle(e.target.value)}
                  value={attachmentTitle}
                  style={{ width: '100%' }}
                  placeholder="Enter attachment title"
                  required
                />
              </div>
            </div>
            <div className='px-2 mt-4'>
              <CustomSelect
                title='Select Industry'
                data={['Tech', 'Agriculture', 'Catering']}
                placeholder='what industry is required'
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>

            <div className='d-flex justify-content-between mt-5 flex-wrap'>
              <div className='p-3'>
                <Link to={pageRoutes.organisationPage}>
                  <CustomButton className='px-4'>Cancel</CustomButton>
                </Link>
              </div>
              <div className='p-3'>
                <CustomButton
                  style={{
                    background: '#fff',
                    border: '1px solid #00b500',
                    color: '#00b500',
                  }}
                >
                  Save as Draft
                </CustomButton>
                {jobPosting.loading ? (
                  <CustomButton disabled={jobPosting.loading} className='px-4'>
                    Loading...
                  </CustomButton>
                ) : (
                  <CustomButton type='submit' className='px-4'>
                    Publish
                  </CustomButton>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className='col-lg-4 p-3 pt-0 d-none d-sm-block'>
          <div style={sticky}>
            <div style={{ background: '#FCFDFD' }} className='p-3 mb-4'>
              <div
                className='d-flex justify-content-between align-items-center mb-4 px-2'
                style={{ borderBottom: '1px solid #eee' }}
              >
                <h5 style={{ color: '#7f7f7f' }}>INIVITES</h5>
                <p style={{ color: '#00b500', cursor: 'pointer' }}>VIEW ALL</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p>no invites</p>
              </div>
            </div>

            <div style={{ background: '#FCFDFD' }} className='p-3 mb-4'>
              <div
                className='d-flex justify-content-between align-items-center mb-4 px-2'
                style={{ borderBottom: '1px solid #eee' }}
              >
                <h5 style={{ color: '#7f7f7f' }}>APPLICATIONS</h5>
                <p style={{ color: '#00b500', cursor: 'pointer' }}>VIEW ALL</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p>no applications</p>
              </div>
            </div>

            <div style={{ background: '#FCFDFD' }} className='p-3 mb-4'>
              <div
                className='d-flex justify-content-between align-items-center mb-4 px-2'
                style={{ borderBottom: '1px solid #eee' }}
              >
                <h5 style={{ color: '#7f7f7f' }}>JOB POSTING</h5>
              </div>
              <div className='px-3'>
                <p style={{ color: '#00b500', cursor: 'pointer' }}>show all</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Modal
        show={show}
        onHide={() => {
          setCode(0)
          setShow(false)
        }}
        style={{ paddingTop: '15rem' }}
      >
        {(code === 201 || code === 200) && (
          <div className='p-5' style={{ textAlign: 'center' }}>
            <h4 className='p-4'>Job {code === 200 ? 'updated' : 'created'}!</h4>
            <div className='d-flex justify-content-between px-5'>
              <CustomButton
                style={{
                  background: 'red',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                }}
                onClick={() => history.goBack()}
              >
                Back to dashboard
              </CustomButton>
              {jobPosting.job_view && (
                <Link
                  to={`${pageRoutes.pipeline.split(':')[0]}${params.id}/${
                    jobPosting.job_view._id
                  }`}
                >
                  <CustomButton
                    style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
                  >
                    Proceed to pipeline setup
                  </CustomButton>
                </Link>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  get_single_organisation: state.organisation,
  jobPosting: state.jobPosting,
})

const mapDispatchToProps = (dispatch) => ({
  updateJobPosting: (id) => dispatch(updateJobPosting(id)),
  createAJob: (data, userId, token) =>
    dispatch(createAJob(data, userId, token)),
  updateAJob: (data, jobId, token) => dispatch(updateAJob(data, jobId, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewJob)
