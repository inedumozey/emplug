import React,{useEffect, useState, useRef} from 'react';
import {Link,useHistory} from 'react-router-dom';
import CustomButton from '../../../components/CustomButton/custom-button';
import {
  EnvelopeSimple, 
  Phone, 
  GenderIntersex, 
  GlobeHemisphereEast, 
  House,
  Calendar,
  Users,
  Buildings,
  GraduationCap,
  Translate,
  PersonSimpleRun,
  ShieldPlus
} from 'phosphor-react'
import { Modal } from 'react-bootstrap'
import routes from '../../../../routes';
import { connect } from 'react-redux';
import { displayApplicantInfo } from '../../../../store/actions/PipelineManager/pipeline-manager.actions'




const DisplayDashboard = (props) =>{
    const [user, setUser] = useState({})
    const [show, setShow] = useState(false)
	const [data, setData] = useState(
		document.querySelectorAll('#applications-data tbody tr')
	)
	const sort = 8
	const activePag = useRef(0)
	const [test, settest] = useState(0)

	const { users, displayApplicantInfo, httpMoveApplicant } = props;

  const history = useHistory();

	  // Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove('d-none')
			} else {
				data[i].classList.add('d-none')
			}
		}
	}
	// use effect
	useEffect(() => {
		setData(document.querySelectorAll('#applications-data tbody tr'))
		//chackboxFun()
	}, [test])
	// Active pagginarion
		activePag.current === 0 && chageData(0, sort)
	// paggination
		let paggination = Array(Math.ceil(data.length / sort))
			.fill()
			.map((_, i) => i + 1)
	 // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i
		chageData(activePag.current * sort, (activePag.current + 1) * sort)
		settest(i)
	}
	const chackbox = document.querySelectorAll('.application_sorting_1 input')
	const motherChackBox = document.querySelector('.sorting_asc input')
	const chackboxFun = (type) => {
		for (let i = 0; i < chackbox.length; i++) {
		const element = chackbox[i]
			if (type === 'all') {
				if (motherChackBox.checked) {
					element.checked = true
				} else {
					element.checked = false
				}
			} else {
				if (!element.checked) {
					motherChackBox.checked = false
					break
				} else {
					motherChackBox.checked = true
				}
			}
		}
	}


	return (
    <>
      <div
        className='table-responsive dataTables_wrapper'
        id='applications-data'
      >
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
                    onClick={() => chackboxFun('all')}
                  />
                  <label className='form-check-label' htmlFor='checkAll' />
                </div>
              </th>
              <th className='sorting_asc'>Ref ID</th>
              <th className='sorting_asc'>Photo</th>
              <th className='sorting_asc'>Full Name</th>
              <th className='sorting_asc'>State of origin</th>
              <th className='sorting_asc'>State of Residence</th>
              <th className='sorting_asc'>LGA of origin</th>
              <th className='sorting_asc'>LGA of Residence</th>
              {/* <th className="sorting_asc">Type</th> */}
              {/* <th className="sorting_asc">Position</th> */}
              {/* <th className='sorting_asc'>Contact</th> */}
              {/* <th className="sorting_asc">Status</th> */}
              {/* <th className='sorting_asc'>Status</th> */}
              <th className='sorting_asc'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((item) => (
                <tr role='row' className='odd' key={item._id}>
                  <td className='application_sorting_1'>
                    <div className='checkbox me-0 align-self-center'>
                      <div className='form-check custom-checkbox '>
                        <input
                          type='checkbox'
                          onClick={() => chackboxFun()}
                          className='form-check-input'
                          id='check1'
                          required
                        />
                        <label className='form-check-label' htmlFor='check1' />
                      </div>
                    </div>
                  </td>
                  <td title={item.id}>{item.id || 'n/a'}</td>
                  <td className='d-flex align-items-center'>
                    <img
                      title={item.userId.fullName}
                      style={{
                        width: '50px',
                        border: '1px solid #7f7f7f',
                        overflow: 'hidden',
                        borderRadius: '50%',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                      src={item.userId.profilePicture}
                      alt={item.userId.fullName}
                    />
                  </td>
                  <td className='wspace-no'>{item.userId.fullName}</td>
                  <td className='wspace-no'>{item.userId.stateOfOrigin}</td>

                  <td className='wspace-no' style={{textAlign: 'start'}}>
                      {item.userId.stateOfResident || 'n/a'}
                  </td>
                  <td>
                      {item.userId.lgaOfOrigin || 'n/a'}
                  </td>
                  <td>
                      {item.userId.lgaOfResident || 'n/a'}
                  </td>
                  <td className='' >
                      <CustomButton style={{
                        background: `${item.status === 'passed' ? 'green' : 'transparent'}`,
                        border: `${item.status === 'passed' ? 'none' : '1px solid #02024D'}`,
                        color: `${item.status === 'passed' ? 'white' : '#02024D'}` 
                      }} onClick={() => {httpMoveApplicant({ id: item.userId._id, status: item.status})}}>{`${item.status === 'passed' ? 'Verified' : 'Move to next'}`}</CustomButton>
                      <Link to={routes.viewApplicantProfile.split(':')[0] + item._id}>
                        <CustomButton onClick={() => {displayApplicantInfo(item)}}>View</CustomButton>
                      </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className='d-sm-flex text-center justify-content-between align-items-center'>
          <div className='dataTables_info' id='example5_info'>
            Showing {activePag.current * sort + 1} to{' '}
            {data.length > (activePag.current + 1) * sort
              ? (activePag.current + 1) * sort
              : data.length}{' '}
            of {data.length} entries
          </div>

          <div
            className='dataTables_paginate paging_simple_numbers'
            id='example5_paginate'
          >
            <Link
              to='/applications'
              className='paginate_button previous disabled'
              onClick={() =>
                activePag.current > 0 && onClick(activePag.current - 1)
              }
            >
              <i className='fa fa-angle-double-left' aria-hidden='true'></i>
            </Link>
            <span>
              {paggination.map((number, i) => (
                <Link
                  key={i}
                  to='/applications'
                  className={`paginate_button  ${
                    activePag.current === i ? 'current' : ''
                  } `}
                  onClick={() => onClick(i)}
                >
                  {number}
                </Link>
              ))}
            </span>
            <Link
              to='/applications'
              className='paginate_button next'
              onClick={() =>
                activePag.current + 1 < paggination.length &&
                onClick(activePag.current + 1)
              }
            >
              <i className='fa fa-angle-double-right' aria-hidden='true'></i>
            </Link>
          </div>
        </div>
      </div>
      <Modal
          show={show}
          onHide={() => {
            setShow(false)
          }}
          style={{ paddingTop: '9rem' }}
        >

            <div className='card p-5' style={{borderRadius: '0.44rem'}}>
                <h4>{user.fullName} {user.otherName} {user.surname}</h4>
                <hr></hr>
                <div className='d-flex justify-content-center'>
                    {user.userId && <img src={user.userId.profilePicture} alt="photo" style={{border: '1px solid #eee', width: '150px', height: '150px', padding: '2rem', objectFit: 'cover'}}/>}
                    </div>
                <hr></hr>
                <div>
                    <p className='mb-2'> <EnvelopeSimple size={20} style={{marginRight: '1rem'}}/> Email: <strong>{user.email} </strong></p>
                    {user.userId && <p className='mb-2'> <Phone size={20} style={{marginRight: '1rem'}}/> Phone No: <strong>{user.userId.phone}</strong></p>}
                    {user.gender && <p className='mb-2'> <GenderIntersex size={20} style={{marginRight: '1rem'}}/> Gender: <strong>{user.gender}</strong></p>}
                    {user.Nationality && <p className='mb-2'> <GlobeHemisphereEast size={20} style={{marginRight: '1rem'}}/> Nationality: <strong>{user.Nationality}</strong></p>}
                    {user.DOB && <p className='mb-2'> <Calendar size={20} style={{marginRight: '1rem'}}/> Date of birth: <strong>{Date(user.DOB).split('G')[0]}</strong></p>}
                    {user.maritalStatus && <p className='mb-2'> <Users size={20} style={{marginRight: '1rem'}}/> Marital status: <strong>{user.maritalStatus}</strong></p>}
                    {user.attitudeTestState && <p className='mb-2'> <Buildings size={20} style={{marginRight: '1rem'}}/> Aptitude test state: <strong>{user.attitudeTestState}</strong></p>}
                    {user.educationalQualification && <ul className='mb-2'> <GraduationCap size={20} style={{marginRight: '1rem'}}/> Educational qualification:{user.educationalQualification.length > 0 && user.educationalQualification.map(item => <strong><li key={item._id} className="mx-5">- {item.certificateObtained}</li></strong>)}</ul>}
                    {user.languageSpoken && <ul className='mb-2'> <Translate size={20} style={{marginRight: '1rem'}}/> Language:{user.languageSpoken.length > 0 && user.languageSpoken.map(item => <strong><li key={item} className="mx-5">- {item}</li></strong>)}</ul>}
                    {user.hobbies && <p className='mb-2'> <PersonSimpleRun size={20} style={{marginRight: '1rem'}}/> Hobbies: <strong>{user.hobbies}</strong></p>}
                    {user.userId && <p className='mb-2'> <GlobeHemisphereEast size={20} style={{marginRight: '1rem'}}/> State of origin: <strong>{user.userId.stateOfOrigin}</strong></p>}
                    {user.userId && <p className='mb-2'> <GlobeHemisphereEast size={20} style={{marginRight: '1rem'}}/> LGA of origin: <strong>{user.userId.lgaOfOrigin}</strong></p>}
                    {user.userId && <p className='mb-2'> <House size={20} style={{marginRight: '1rem'}}/> State of residence: <strong>{user.userId.stateOfResident}</strong></p>}
                    {user.userId && <p className='mb-2'> <GlobeHemisphereEast size={20} style={{marginRight: '1rem'}}/> LGA of residence: <strong>{user.userId.lgaOfResident}</strong></p>}
                    {user.religion && <p className='mb-2'> <ShieldPlus size={20} style={{marginRight: '1rem'}}/> Religion: <strong>{user.religion}</strong></p>}
                    {user.village && <p className='mb-2'> <GlobeHemisphereEast size={20} style={{marginRight: '1rem'}}/> Village: <strong>{user.village}</strong></p>}
                    {/* {user.active && <p className='mb-2'> {users.active ? <CircleWavyCheck size={20} style={{marginRight: '1rem'}}/> : <CircleWavyWarning size={20} style={{marginRight: '1rem'}}/>} {user.active ? "Active": "Inactive"}</p>} */}
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

const mapDispatchToProps = dispatch => ({
  displayApplicantInfo: data => dispatch(displayApplicantInfo(data))
})
export default connect(null, mapDispatchToProps)(DisplayDashboard);