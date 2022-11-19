import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import { Modal } from 'react-bootstrap'
import CustomInput from '../../../components/CustomInput/custom-input'
import CustomSelect from '../../../components/CustomSelect/Custom-select'
import CustomButton from '../../../components/CustomButton/custom-button'
import { useParams } from 'react-router-dom'

function Venue(props) {
  const [name, setName] = useState('')
  const [coordinator, setCoordinator] = useState('')
  const [sub_coordinators, setSubCoordinators] = useState([])
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [localGovernment, setLocalGovernment] = useState('')
  const [capacity, setCapacity] = useState(0)
  const [staffs, setStaffs] = useState([])
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [message, setMessage] = useState('')

  const params = useParams()

  async function getOrganisationStaff() {
    try {
      const response = await axios(
        `https://employer-center-api.herokuapp.com/api/v1/organization/organization-staffs?organizationId=${params.organization_id}`
      )
      setStaffs(response.data.data)
    } catch (error) {
      console.log(error)
    }
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

  // Get the states of a particular country selected
  function getCountryState() {
    const getStates = states.filter((item) => item.country_name === country)
    if (getStates.length > 0) {
      return getStates
    }
    return []
  }

  async function httpCreateVenue(event) {
    event.preventDefault()
    const data = {
      name,
      coordinator,
      sub_coordinators,
      address,
      country,
      state,
      localGovernment,
      capacity,
    }

    const arr = []

    arr.push(data)

    try {
      const response = await axios.post(
        `https://employer-center-api.herokuapp.com/api/v1/venue/create/${params.id}`,
        arr
      )
      swal('success', response.data.message, 'success')
      console.log(response)
      props.fetchAllVenues(params.id)
      setMessage(response.data.message)
      clearFields()
    } catch (error) {
      console.log(error)
    }
  }

  function clearFields() {
    setName('')
    setCoordinator('')
    setSubCoordinators([])
    setCapacity('')
    setAddress('')
    setCountry('')
    setState('')
    setLocalGovernment('')
  }

  useEffect(() => {
    getOrganisationStaff()
    getCountries()
  }, [])

  // useEffect(() => {
  //         const options = {
  //             method: 'GET',
  //             headers: {
  //                 'X-RapidAPI-Host': 'nigeria-states-and-lga.p.rapidapi.com',
  //                 'X-RapidAPI-Key': 'ef9d17f102msha78a2393ae3d7b1p1d9e14jsn67e97a34060c'
  //             }
  //         };

  //         fetch('https://nigeria-states-and-lga.p.rapidapi.com/lgalists', options)
  //             .then(response => response.json())
  //             .then(response => console.log(response))
  //             .catch(err => console.error(err));

  //     }, [])

  return (
    <>
      <div className='card p-4 px-0'>
        <div className='px-4'>
          <h4>Add Venues</h4>
          <p
            onClick={() => {
              props.setShow(false)
              props.setShowVenues(true)
            }}
            style={{
              cursor: 'pointer',
              background: '#E9F8EA',
              color: 'green',
              padding: '1rem',
              textDecoration: 'underline',
            }}
          >
            {message} click to view venues
          </p>
          <hr></hr>
        </div>
        <form className='px-4' onSubmit={httpCreateVenue}>
          <div className='mb-3'>
            <CustomInput
              title='Center'
              placeholder='Enter name of center'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className='mb-3'>
            <CustomSelect
              title='Coordinator'
              data={staffs.map((item) => ({
                name: item.fullName,
                id: item._id,
              }))}
              placeholder='Coordinator'
              onChange={(e) => setCoordinator(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <CustomSelect
              title='Sub-Coordinators'
              data={staffs.map((item) => ({
                name: item.fullName,
                id: item._id,
              }))}
              placeholder='Select Coordinators'
              onChange={(e) =>
                setSubCoordinators([...sub_coordinators, e.target.value])
              }
            />
          </div>
          <div className='mb-3'>
            <CustomInput
              title='Address'
              placeholder='Enter Address'
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <div className='mb-3'>
            <CustomInput
              title='Capacity'
              placeholder='0'
              type='number'
              onChange={(e) => setCapacity(e.target.value)}
              value={capacity}
            />
          </div>
          <div className='mb-3'>
            <CustomInput
              title='Local Government Area'
              placeholder='Enter Address'
              onChange={(e) => setLocalGovernment(e.target.value)}
              value={localGovernment}
            />
          </div>
          <div className='mb-3'>
            <CustomSelect
              title='Country *'
              data={countries}
              placeholder='Select country'
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <CustomSelect
              title='State *'
              data={[...getCountryState()]}
              placeholder='Select state'
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <CustomButton type='submit'>Add venue</CustomButton>
            <CustomButton
              onClick={clearFields}
              style={{
                background: 'transparent',
                border: '1px solid red',
                color: 'red',
              }}
            >
              Clear
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  )
}

export default Venue
