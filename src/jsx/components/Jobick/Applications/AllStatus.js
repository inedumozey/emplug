import React,{useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import DropdownBlog from './../DropdownBlog';

const AllStatus = (props) =>{
	const [data, setData] = useState(
		document.querySelectorAll('#applications-data tbody tr')
	)
	const sort = 8
	const activePag = useRef(0)
	const [test, settest] = useState(0)

	const { users } = props;

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
              <th className='sorting_asc'>Email</th>
              {/* <th className="sorting_asc">Type</th> */}
              {/* <th className="sorting_asc">Position</th> */}
              <th className='sorting_asc'>Contact</th>
              {/* <th className="sorting_asc">Status</th> */}
              <th className='sorting_asc'>Status</th>
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
                  <td title={item.id}>{item.id}</td>
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
                  <td className='wspace-no'>{item.userId.email}</td>

                  <td className='wspace-no'>
                    <span className='text-secoundry fs-14 font-w600'>
                      <i className='fas fa-phone-alt me-2'></i>
                      {item.userId.phone}
                    </span>
                  </td>
                  <td>
                    <span className='btn btn-outline light  border-light btn-sm'>
                      Pending
                    </span>
                  </td>
                  <td>
                    <DropdownBlog />
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
    </>
  )
}
export default AllStatus;