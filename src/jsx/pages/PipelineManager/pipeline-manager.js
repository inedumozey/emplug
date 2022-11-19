import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CustomButton from "../../components/CustomButton/custom-button";
import CustomNav from "../../layouts/nav/CustomNav";

import pageRoutes from "../../../routes";

import { jobView } from "../../../store/actions/JobPosting/job-posting.actions";
import { getSinglePipeline } from "../../../store/actions/PipelineManager/pipeline-manager.actions";


function PipelineManager({ getSinglePipeline, jobs, jobView, organisation, user }) {
	const [orgJobs, setOrgJobs] = useState([]);

	useEffect(() => {
		if (organisation) {
			const allJobs = jobs.filter(item => item.author === organisation._id);
			setOrgJobs(allJobs);
		}
	}, [jobs.length])

	async function getPipelines() {
		for (let index = 0; index < jobs.length; index++) {
			await getSinglePipeline(jobs[index]._id, user.token);
		}
	}

	useEffect(() => {
		getPipelines();
	}, [])



	return (
		<>
			<CustomNav />
			<div className="col-lg-12 mt-5" style={{ paddingLeft: '10rem', paddingRight: '10rem' }}>
				<div className="card p-5 " style={{ borderRadius: '0.4rem'}}>
					<div className="d-flex justify-content-between" style={{borderBottom: '1px solid #eee'}}>
						<h3 className="p-3" >Jobs Pipeline</h3>
						<Link to={pageRoutes.application}>
							<CustomButton>+ Create New Job</CustomButton>
						</Link>
					</div>
					<div className="">
						{
							orgJobs.length > 0 &&
							orgJobs.map((item, i) => (
							<div key={i.toString()} onClick={() => jobView(item)}  className="p-3 d-flex justify-content-between m-3" style={{
								background: 'rgb(0,181,0, 0.5)', 
								width: '50rem', 
								borderRadius: '0.4rem',
								boxShadow: 'rgb(0, 0, 0, 0.5) 0rem 0.1125rem 0.1125rem 0rem'
								}}>
								<div className='d-flex align-items-center'>
									<h4 className='' style={{ marginRight: '1rem'}}>{item.title}</h4>
									<p className='pt-2'>{item.location}</p>
								</div>
								<div className="">
									<CustomButton style={{ background: '#C91818'}}>Delete</CustomButton>
									<Link to={`${pageRoutes.pipeline.split(':')[0]}${item._id}`}>
										<CustomButton>Setup pipeline</CustomButton>
									</Link>
								</div>
							</div>
							))
						}
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = state => ({
	organisation: state.organisation.selected_organisation,
	jobs: state.jobPosting.allJobs,
	user: state.auth.auth
})


const mapDispatchToProps = dispatch => ({
	jobView: data => dispatch(jobView(data)),
	getSinglePipeline: (id, token) => dispatch(getSinglePipeline(id, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(PipelineManager);