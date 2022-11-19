import React, { useState } from 'react'
import CustomButton from '../CustomButton/custom-button';
import CustomInput from '../CustomInput/custom-input';

const CoordinatorsSelect = ({orgId, token}) => {
    const [staffs, setStaffs] = useState({})
    const [addByEmail, setAddByEmail] = useState(false);
    const [staffEmails, setStaffEmails] = useState([])
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')


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

    async function httpInviteUserByEmail() {
        const  data = {
          organizationId: orgId,
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

      function toggleSelectedStaff(id) {
        const data = { ...staffs }
        if (!data[id]) {
          data[id] = true
        } else {
          data[id] = false
        }
        setStaffs(data)
      }


  return (
    <div className='card p-5'>
    <div className='d-flex justify-content-between align-items-center'>
      <p className='mb-0'>
        Add coordinators
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
          onChange={(e) => setSearch(e.target.value)}
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
  )
}

export default CoordinatorsSelect