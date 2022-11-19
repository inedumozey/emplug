import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import { ArrowLeft, Users, GenderMale, GenderFemale, Flag, GlobeHemisphereEast, HouseSimple, FileCsv } from 'phosphor-react'
import CustomButton from '../../components/CustomButton/custom-button'
import CustomSelect from '../../components/CustomSelect/Custom-select'
import CustomNav from '../../layouts/nav/CustomNav'
import TalentsCard from './talentsCard'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import AllStatus from '../../components/Jobick/Applications/AllStatus'
import CustomInput from '../../components/CustomInput/custom-input'
import AllApplicants from './all-applicants'
import { lgas } from './lgas'
import routes from '../../../routes'



function Talents(props) {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState([])
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('Nigeria')
  const [states, setStates] = useState([])

  const [stateOfOrigin, setStateOfOrigin] = useState("")
  const [stateOfResidence, setStateOfResidence] = useState("")
  const [lgaOfOrigin, setLgaOfOrigin] = useState("")
  const [lgaOfResidence, setLgaOfResidence] = useState("")
  const [selectedSkills, setSelectedSkills] = useState("") 
  const [skills, setSkills] = useState([])

  const {
    auth: {
      auth: { token },
    },
  } = props




  const params = useParams()
  const history = useHistory()

  async function httpApply() {
    try {
      const response = await axios(
        `https://employer-center-api.herokuapp.com/api/v1/application/fetch-by-job-id/${params.id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      )
      console.log("Applicants------------>>>>>>>>>>>>>>>>", response.data.data)
      setUser(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function httpGetSkills() {
    try {
      const response = await axios(
        `https://employer-center-api.herokuapp.com/api/v1/admin/fetch_skills`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      )
      // console.log("Skills------------>>>>>>>>>>>>>>>>", response.data.data)
      setSkills(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

   // Fetch all countries and all states
   async function getCountries() {
    const response = await axios.get(
      'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json'
    )
    // console.log(response.data)
    setCountries(response.data)
    const stateResponse = await axios.get(
      'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json'
    )
    // console.log(stateResponse.data)
    setStates(stateResponse.data)
  }


  // Get state from selected country

  function getStates(arr) {
    const data = [...arr]
    const filteredResult = data.filter(item => item.country_name.toLowerCase() === selectedCountry.toLowerCase())
    return filteredResult;
  }


  function searchByNameOrEmail() {

    const filteredResult = filterAll().filter(item => {
      if(item.userId) {
        return item.userId.fullName.toLowerCase().includes(search.toLowerCase()) || item.userId.email.toLowerCase().includes(search.toLowerCase())
      }
    })
    return filteredResult;
  }

  function getNumberOfGender(gender, arr = []) {
    const data = [...arr]
    const filteredResult = data.filter(item => {
      if(item.userId && item.userId.gender) {
        return item.userId.gender.toLowerCase() === gender.toLowerCase();
      }
    })
    return filteredResult.length;
  }

  useEffect(() => {
    httpApply()
  }, [user.length])


  useEffect(() => {
    getCountries()
    httpGetSkills()
  }, [])


  function filterAll() {
    // state of origin
    // state of residence
    // lga of origin
    // lga of residence
    const data = [...user]

    if (stateOfOrigin.length > 0 && lgaOfOrigin.length > 0 && stateOfResidence.length > 0 && lgaOfResidence.length > 0) {
      // console.log(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfOrigin = data.filter(item => item.userId && item.userId.stateOfOrigin && item.userId.stateOfOrigin.toLowerCase().includes(stateOfOrigin.toLowerCase()))
      const forLgaOfOrigin = forStateOfOrigin.filter(item => item.userId && item.userId.lgaOfOrigin && item.userId.lgaOfOrigin.toLowerCase().includes(lgaOfOrigin.toLowerCase()))
      const forStateOfResidence = forLgaOfOrigin.filter(item => item.userId && item.userId.stateOfResident && item.userId.stateOfResident.toLowerCase().includes(stateOfResidence.toLowerCase()))
      const filteredResult = forStateOfResidence.filter(item => item.userId && item.userId.lgaOfResident && item.userId.lgaOfResident.toLowerCase().includes(lgaOfResidence.toLowerCase()))
      // console.log(filteredResult)
      return filteredResult;
    }
    
    if (stateOfOrigin.length > 0 && !lgaOfOrigin.length && !stateOfResidence.length && !lgaOfResidence.length) {
      // console.log(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const filteredResult = data.filter(item => item.userId && item.userId.stateOfOrigin && item.userId.stateOfOrigin.toLowerCase().includes(stateOfOrigin.toLowerCase()))
      // console.log(filteredResult)
      return filteredResult;
    }

    if (stateOfOrigin.length > 0 && !lgaOfOrigin.length && stateOfResidence.length > 0 && !lgaOfResidence.length) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfOrigin = data.filter(item => item.userId && item.userId.stateOfOrigin && item.userId.stateOfOrigin.toLowerCase().includes(stateOfOrigin.toLowerCase()))
      const filteredResult = forStateOfOrigin.filter(item => item.userId && item.userId.stateOfResident && item.userId.stateOfResident.toLowerCase().includes(stateOfResidence.toLowerCase()))
      // console.log(filteredResult)
      return filteredResult;
    }
    
    if (!stateOfOrigin.length && !lgaOfOrigin.length && stateOfResidence.length > 0 && !lgaOfResidence.length) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const filteredResult = data.filter(item => item.userId && item.userId.stateOfResident && item.userId.stateOfResident.toLowerCase().includes(stateOfResidence.toLowerCase()))
      // console.log(filteredResult)
      return filteredResult;
    }
    
    if (stateOfOrigin.length > 0 && lgaOfOrigin.length > 0 && !stateOfResidence.length && !lgaOfResidence.length) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfOrigin = data.filter(item => item.userId && item.userId.stateOfResident && item.userId.stateOfResident.toLowerCase().includes(stateOfOrigin.toLowerCase()))
      const filteredResult = forStateOfOrigin.filter(item => item.userId && item.userId.lgaOfOrigin && item.userId.lgaOfOrigin.toLowerCase().includes(lgaOfOrigin.toLowerCase()))
      // console.log(filteredResult)
      return filteredResult;
    }
    
    if (!stateOfOrigin.length && !lgaOfOrigin.length && stateOfResidence.length > 0 && lgaOfResidence.length > 0) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfResidence = data.filter(item => item.userId && item.userId.stateOfResident && item.userId.stateOfResident.toLowerCase().includes(stateOfResidence.toLowerCase()))
      const filteredResult = forStateOfResidence.filter(item => item.userId && item.userId.lgaOfOrigin && item.userId.lgaOfResident.toLowerCase().includes(lgaOfResidence.toLowerCase()))
      // console.log(filteredResult)
      return filteredResult;
    }

    if (stateOfOrigin.length > 0 && !lgaOfOrigin.length && stateOfResidence.length > 0 && lgaOfResidence.length > 0) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfOrigin = data.filter(item => item.userId && item.userId.stateOfOrigin && item.userId.stateOfOrigin.toLowerCase().includes(stateOfOrigin.toLowerCase()))
      // const forLgaOfOrigin = forStateOfOrigin.filter(item => item.userId && item.userId.lgaOfOrigin && item.userId.lgaOfOrigin.toLowerCase().includes(lgaOfOrigin.toLowerCase()))
      const forStateOfResidence = forStateOfOrigin.filter(item => item.userId && item.userId.stateOfResident && item.userId.stateOfResident.toLowerCase().includes(stateOfResidence.toLowerCase()))
      const filteredResult = forStateOfResidence.filter(item => item.userId && item.userId.lgaOfResident && item.userId.lgaOfResident.toLowerCase().includes(lgaOfResidence.toLowerCase()))
      // console.log(filteredResult)
      return filteredResult;
    }
    if (stateOfOrigin.length > 0 && lgaOfOrigin.length > 0 && stateOfResidence.length > 0 && !lgaOfResidence.length) {
      // alert(`SOO: ${stateOfOrigin} LOO${lgaOfOrigin} SOR:${stateOfResidence} LOR:${lgaOfResidence}`)
      const forStateOfOrigin = data.filter(item => item.userId && item.userId.stateOfOrigin && item.userId.stateOfOrigin.toLowerCase().includes(stateOfOrigin.toLowerCase()))
      const forLgaOfOrigin = forStateOfOrigin.filter(item => item.userId && item.userId.lgaOfOrigin && item.userId.lgaOfOrigin.toLowerCase().includes(lgaOfOrigin.toLowerCase()))
      const filteredResult = forStateOfOrigin.filter(item => item.userId && item.userId.stateOfResident && item.userId.stateOfResident.toLowerCase().includes(stateOfResidence.toLowerCase()))
      // const filteredResult = forStateOfResidence.filter(item => item.userId && item.userId.lgaOfResident && item.userId.lgaOfResident.toLowerCase().includes(lgaOfResidence.toLowerCase()))
      // console.log(filteredResult)
      return filteredResult;
    }
    // console.log(data)
    return data;

  }

  function filterSkills(arr) {
    const data = [...arr]

    if (selectedSkills.length > 0 ){
      const filteredResult = data.filter(item => item.userId && item.userId.skills && item.userId.skills.join().toLowerCase().includes(selectedSkills.toLowerCase()))
      return filteredResult;
    }

    return data;
  }


  function filterLGAs(state) {
    const data = [...lgas]
    const filteredResult = data.filter(item => {
      if (item.state.toLowerCase() === state.toLowerCase()) {
        return item.lgas
      }
    })

    if(filteredResult.length > 0) {
      return filteredResult[0].lgas
    }

    return []
  }

  const headers = [
    { label: "Full Name", key: "fullName" },
    { label: "Ref Id", key: "id" },
    { label: "Gender", key: "gender" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "State of origin", key: "stateOfOrigin" },
    { label: "State of residence", key: "stateOfResident" },
    { label: "LGA of origin", key: "lgaOfOrigin" },
    { label: "LGA of residence", key: "lgaOfResident" },
  ];

  function resetFilters() {
    setStateOfOrigin(""); 
    setStateOfResidence(""); 
    setLgaOfOrigin(""); 
    setLgaOfResidence("")
    setSelectedSkills("");
  }


  // console.log(searchByNameOrEmail().map(item => ({
  //   fullName: item.userId.fullName,
  //   email: item.userId.email,
  //   phone: item.userId.phone,
  //   gender: item.userId.gender,
  //   stateOfOrigin: item.userId.stateOfOrigin,
  //   stateOfResident: item.userId.stateOfResident,
  //   lgaOfOrigin: item.userId.lgaOfOrigin,
  //   lgaOfResident: item.userId.lgaOfResident,
  //   id: item.id
  // })))
  

  return (
    <>
      <CustomNav />
      <div  className='d-flex justify-content-center'>
        <div className='mt-5 p-0'  style={{
          position: 'relative', 
          margin: '2rem',
          marginTop: '1.5rem',
          minWidth: 0,
          paddingLeft: '5rem',
          paddingRight: '5rem',
        }}>
          <div className='row'>
            <div
              className='col-auto mb-3'
              style={{ cursor: 'pointer' }}
              onClick={() => history.replace(routes.job.split(':')[0] + params.id)}
            >
              <CustomButton>
                <ArrowLeft size={20} /> Back
              </CustomButton>
            </div>
          </div>
          <div className='mb-3 d-flex justify-content-between align-items-center'>
            <div className=''>
              <h1>Applicants</h1>
              <p>
                View all applicants
              </p>
            </div>
            <CSVLink data={searchByNameOrEmail().map(item => ({
                fullName: item.userId.fullName,
                email: item.userId.email,
                phone: item.userId.phone,
                gender: item.userId.gender,
                stateOfOrigin: item.userId.stateOfOrigin,
                stateOfResident: item.userId.stateOfResident,
                lgaOfOrigin: item.userId.lgaOfOrigin,
                lgaOfResident: item.userId.lgaOfResident,
                id: item.id
              }))} headers={headers}>
              <CustomButton> <FileCsv size={22} /> Download CSV</CustomButton>
            </CSVLink>
          </div>
          <div className='d-flex align-items-center'>
            <CustomInput value={search} onChange={e => setSearch(e.target.value)} placeholder="search..." style={{marginBottom: '1rem', width: '20rem'}}/>
            <Link to="#" style={{ textDecoration: 'underline'}} onClick={() => setSearch("")} className="mx-3">Clear Search</Link>
            <Link to="#" style={{ textDecoration: 'underline'}} onClick={resetFilters} className="mx-3">Reset Filter</Link>
            <Link to="#" style={{ textDecoration: 'underline'}} onClick={() => setShow(true)} className="mx-3">Advanced Search</Link>
          </div>
          <div className='d-flex align-items-center p-4'  style={{position: 'sticky', top: '6rem', zIndex: '5', background: 'white', width: '100%'}}>

            <div title='All candidates'  style={{ cursor: 'pointer', borderRadius: '0.44rem', textAlign: 'center', width: '18rem', background: '#00b500', color: 'white'}} className='card d-flex mx-2'>
              <div className=''>
                <div>
                  <Users size={30} />
                </div>
                {/* <hr className='m-1'></hr> */}
                <p className='mb-0 mt-2' style={{color: 'white'}}>All Applicants</p>
                <hr className='m-1'></hr>
                <h4 className='mt-2' style={{color: '#fff'}}>{user.length}</h4>
              </div>
            </div>

            <div title='Male' style={{ cursor: 'pointer', borderRadius: '0.44rem', textAlign: 'center', width: '18rem', background: '#00b500', color: 'white'}} className='card d-flex mx-2'>
              <div className=''>
                <div>
                  <GenderMale size={30} />
                </div>
                {/* <hr className='m-1'></hr> */}
                <p className='mb-0 mt-2' style={{color: 'white'}}>Male</p>
                <hr className='m-1'></hr>
                <h4 className='mt-2' style={{color: '#fff'}}>{getNumberOfGender('male', [...searchByNameOrEmail().filter(item => item.userId !== null)])}</h4>
              </div>
            </div>

            <div title='Female' style={{ cursor: 'pointer', borderRadius: '0.44rem', textAlign: 'center', width: '18rem', background: '#00b500', color: 'white'}} className='card d-flex mx-2'>
              <div className=''>
                <div>
                  <GenderFemale size={30} />
                </div>
                {/* <hr className='m-1'></hr> */}
                <p className='mb-0 mt-2' style={{color: 'white'}}>Female</p>
                <hr className='m-1'></hr>
                <h4 className='mt-2' style={{color: '#fff'}}>{getNumberOfGender('female', [...searchByNameOrEmail().filter(item => item.userId !== null)])}</h4>
              </div>
            </div>

            <div title='State of origin'  style={{ cursor: 'pointer', borderRadius: '0.44rem', textAlign: 'center', width: '18rem', background: '#00b500', color: 'white'}} className='card d-flex mx-2'>
              <div className=''>
                <div>
                  <GlobeHemisphereEast size={30} />
                </div>
                {/* <hr className='m-1'></hr> */}
                <p className='mb-0 mt-2' style={{color: 'white'}}>State of origin</p>
                <hr className='m-1'></hr>
                <h4 className='mt-2' style={{color: '#fff'}}>{(stateOfOrigin && filterAll().length) || 0}</h4>
              </div>
            </div>

            <div title='State of residence'  style={{ cursor: 'pointer', borderRadius: '0.44rem', textAlign: 'center', width: '20rem', background: '#00b500', color: 'white'}} className='card d-flex mx-2'>
              <div className=''>
                <div>
                  <Flag size={30} />
                </div>
                {/* <hr className='m-1'></hr> */}
                {/* <p className='mb-0 mt-2' style={{color: 'white'}} >{`${"State of residence".slice(0, 15)}...`}</p> */}
                <p className='mb-0 mt-2' style={{color: 'white'}} >{`${"State of residence"}`}</p>
                <hr className='m-1 mt-0'></hr>
                <h4 className='mt-2' style={{color: '#fff'}}>{(stateOfResidence && filterAll().length) || 0}</h4>
              </div>
            </div>

            <div title='LGA of origin' style={{ cursor: 'pointer', borderRadius: '0.44rem', textAlign: 'center', width: '18rem', background: '#00b500', color: 'white'}} className='card d-flex mx-2'>
              <div className=''>
                <div>
                  <HouseSimple size={30} />
                </div>
                {/* <hr className='m-1'></hr> */}
                <p className='mb-0 mt-2' style={{color: 'white'}}>LGA of origin</p>
                <hr className='m-1'></hr>
                <h4 className='mt-2' style={{color: '#fff'}}>{(lgaOfOrigin && filterAll().length) || 0}</h4>
              </div>
            </div>

            <div title='LGA of residence' style={{ cursor: 'pointer', borderRadius: '0.44rem', textAlign: 'center', width: '20rem', background: '#00b500', color: 'white'}} className='card d-flex mx-2'>
              <div className=''>
                <div>
                  <Flag size={30} />
                </div>
                {/* <hr className='m-1'></hr> */}
                <p className='mb-0 mt-2' style={{color: 'white'}} >{`${"LGA of residence"}`}</p>
                {/* <p className='mb-0 mt-2' style={{color: 'white'}} >{`${"LGA of residence".slice(0, 10)}...`}</p> */}
                <hr className='m-1'></hr>
                <h4 className='mt-2' style={{color: '#fff'}}>{(lgaOfResidence && filterAll().length) || 0}</h4>
              </div>
            </div>

          </div>
          <hr></hr>          
          
          <div className=''>
            <AllApplicants 
              users={filterSkills([...searchByNameOrEmail().filter(item => item.userId !== null)])} 
            />
          </div>

        </div>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          style={{paddingTop: '9rem'}}
        >

          <div className='card p-5' style={{borderRadius: '0.44rem'}}>
            <div className='d-flex justify-content-between align-items-center'>
              <h4>Add filters</h4>
              <Link to="#" style={{textDecoration: 'underline'}} onClick={resetFilters}>Reset fields</Link>
            </div>
            <hr></hr>
            <p>Filter applicants:</p>
              <form>
                <div className='mb-3'>
                  <select className='form-control'defaultValue={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} value={selectedCountry}>
                    <option>{selectedCountry || "Select country"}</option>
                    {
                      countries?.map(item => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='mb-3'>
                  <select className='form-control' onChange={e => setStateOfOrigin(e.target.value)} value={stateOfOrigin}>
                    <option>{stateOfOrigin || "Who are from this state"}</option>
                    {
                      getStates(states).map(item => (
                        <option key={item.id} value={item.name.toLowerCase().includes('federal'.toLowerCase()) ? 'Federal Capital Territory' : item.name}>{item.name.toLowerCase().includes('abuja'.toLowerCase()) ? 'Federal Capital Territory' : item.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='mb-3'>
                  <select className='form-control' onChange={e => setLgaOfOrigin(e.target.value)} value={lgaOfOrigin}>
                    <option>{lgaOfOrigin || "From this LGA"}</option>
                    {
                      filterLGAs(stateOfOrigin).map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='mb-3'>
                  <select className='form-control' onChange={e => setStateOfResidence(e.target.value)} value={stateOfResidence}>
                    <option>{stateOfResidence || "Who reside in this state"}</option>
                    {
                      getStates(states).map(item => (
                        <option key={item.id} value={item.name.toLowerCase().includes('abuja'.toLowerCase()) ? 'Federal Capital Territory' : item.name}>{item.name.toLowerCase().includes('abuja'.toLowerCase()) ? 'Federal Capital Territory' : item.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='mb-3'>
                  <select className='form-control' onChange={e => setLgaOfResidence(e.target.value)} value={lgaOfResidence}>
                    <option>{lgaOfResidence || "Living in this LGA"}</option>
                    {
                      filterLGAs(stateOfResidence).map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='mb-3'>
                  <select className='form-control' onChange={e => setSelectedSkills(e.target.value)} value={selectedSkills}>
                    <option value="">Select skills</option>
                    {
                      skills.map(item => (
                        <option key={item._id} value={item.name}>{item.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='mb-3'>
                  <CustomButton style={{width: '100%'}} onClick={() => {filterAll(); setShow()}}>Apply</CustomButton>
                </div>
              </form>
          </div>

        </Modal>

      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Talents)
