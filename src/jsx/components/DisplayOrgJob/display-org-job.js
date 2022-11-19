import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory, Link } from "react-router-dom";

import { DotsThreeCircleVertical, PencilSimple, Trash } from 'phosphor-react';

import { deleteJob, jobView } from "../../../store/actions/JobPosting/job-posting.actions";

import CustomButton from "../CustomButton/custom-button";

import pagesRoute from "../../../routes";

function DisplayOrgJob(props) {
	const [data, setData] = useState();
	const [showDropdown, setShowDropdown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const { 
		coverImage, 
		_id, 
		title, 
		startDate, 
		industry, 
		jobView,
		auth,
		deleteJob
	} = props;

	// console.log(_id)

	useEffect(() => {
		setData({
			author: props.author,
			employmentType: props.employmentType,
			title: props.title,
			workExperience: props.workExperience,
			certifications: props.certifications,
			location: props.location,
			_id: props._id,
			salary: props.salary,
			startDate: props.startDate,
			skills: props.skills,
			jobDescription: props.jobDescription,
			industry: props.industry,
			salaryType: props.salaryType
		})
	}, []);

	function httpDeleteJob() {
		if(_id) {
			deleteJob(_id, auth.token);
			return;
		}
	}
	return (
    <>
      <div
        className='card m-2 row'
        onClick={() => {
          if (showDropdown) {
            setShowDropdown(false)
          }
        }}
        style={{
          width: '15rem',
          border: '1px solid #eee',
          textAlign: 'center',
          borderRadius: '5px',
          boxShadow: '0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)',
          position: 'relative',
        }}
      >
        <div className='col text-end'>
          <DotsThreeCircleVertical
            onClick={() => setShowDropdown(true)}
            size={22}
            color='#7f7f7f'
            style={{
              cursor: 'pointer',
              alignSelf: 'end',
            }}
          />
        </div>
        {showDropdown && (
          <div
            style={{
              border: '1px solid #eee',
              padding: '5px',
              width: '10rem',
              position: 'absolute',
              top: '2.5rem',
              right: '1rem',
              borderRadius: '5px',
              background: 'white',
            }}
          >
            <Link
              to={pagesRoute.application}
              onClick={() => {
                props.jobView(data)
                setShowDropdown(false)
              }}
              style={{
                color: '#7f7f7f',
                cursor: 'pointer',
                marginBottom: '0.5rem',
              }}
            >
              {' '}
              <PencilSimple size={15} /> Edit
            </Link>
            <div
              onClick={() => {
                httpDeleteJob()
                setShowDropdown(false)
              }}
              style={{
                color: 'red',
                cursor: 'pointer',
              }}
            >
              {' '}
              <Trash size={15} color='red' /> Delete
            </div>
          </div>
        )}

        <div className='col justify-content-center text-end '>
          <div style={{ width: '150px', height: '150px' }} className=' mb-2 '>
            <img
              className='w-74'
              style={{ objectFit: 'cover', width: '100%' }}
              src={coverImage && coverImage}
              alt='...'
            />
          </div>
        </div>
        <h4 title={title}>{title.slice(0, title.length - 2)}...</h4>
        <p>
          {industry},{' '}
          {startDate &&
            startDate
              .split('T')[0]
              .split('-')
              .map((item) => item + '.')}
        </p>
        <Link
          onClick={() => jobView(data)}
          className='w-100'
          to={`${pagesRoute.job.split(':')[0]}${_id}`}
        >
          <CustomButton style={{ width: '100%' }}>View</CustomButton>
        </Link>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
	myPortfolio: state.myPortfolio,
	auth: state.auth.auth
})

const mapDispatchToProps = dispatch => ({
	deleteJob: (id, token) => dispatch(deleteJob(id, token)),
	jobView: data => dispatch(jobView(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayOrgJob);