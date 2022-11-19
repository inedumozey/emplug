import CustomNav from "../../layouts/nav/CustomNav";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomSelect from "../../components/CustomSelect/Custom-select";
import { Link } from 'react-router-dom';

function MyApplications(props) {
	return (
		<>
			<CustomNav />
			<div style={{ margin: '2rem', marginTop: '8rem', display: 'flex', padding: '0 8rem' }}>
				<CustomSelect 
					data={[]}
					placeholder="Job Title"
					style={{
						width: '30%'
					}}
					/>
				<CustomSelect 
					data={[]}
					placeholder="Location"
					style={{
						width: '30%'
					}}
				/>
				<CustomButton
					style={{
						background:'white',
						color: '#00b500',
						border: '1px solid #00b500',
						width: '15%'
					}}
				>Search</CustomButton>
			</div>
			<div className='row' >
				<div className='col-lg-8 mt-5'>
					<div style={{
						display: 'flex',
						justifyContent: 'space-around',
						width: '100%',
						paddingLeft: '10rem'
					}}>
						<hr style={{
							width: '30%'
						}}></hr>
						<span>JOBS YOU APPLIED</span>
						<hr style={{
							width: '30%'
						}}></hr>
					</div>

						

								<div className="d-flex justify-content-evenly p-2" style={{ 
									marginLeft: '10rem', 
									// display: 'flex',
									marginTop: '2rem',
									background: 'white', 
									// padding: '1rem', 
									borderRadius: '0.25rem',
									boxShadow: "0rem 0.3125rem 0.3125rem 0rem rgb(82 63 105 / 5%)",
								}}>
									<div style={{
										width: '20%', 
										display: 'flex', 
										padding: '1rem',
										paddingBottom: 0
										// justifyContent: 'center', 
										// alignItems: 'center'
									}}>
										<img src="" alt="..."/>
									</div>
									<div style={{
										padding: '1rem',
										paddingBottom: 0, 
										width: '65%', 
										fontSize: '0.7rem', 
										// borderLeft: '1px solid #eee'
										}}>
											<h4>UI/UX Designer</h4>
											<p style={{ color: '#7f7f7f'}}>Upwork | Remote only</p>
											<p>On Upwork you'll find a range of top freelancers and agencies, from developers and development agencies to designers and creative agencies, copywriters,</p>
											<p style={{ color: '#7f7f7f'}}>1 month ago <span style={{marginLeft: '1rem', color: '#00b500'}}>15 applicants</span></p> 
									</div>
									<div style={{ width: '15%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
										<Link className='mx-4' style={{ width: '100%'}}  to={`#`}  >
											<CustomButton  style={{ width: '100%'}}>View</CustomButton>
										</Link>
									</div>
								</div>
							<div className='w-100 p-4 d-flex justify-content-center align-items-center'>
								{
									// !props.jobs.allJobs.length ? <p style={{marginLeft: '9rem'}}>No Jobs Found</p> : 
									// <img style={{ width: '10rem', heigth: '10rem', marginLeft: '9rem'}} src={LoadingPic} alt='loading...'/>
								}
							</div>
						
				</div>
				<div className="col-lg-4 mt-5">
					
						<div className="card mx-2" style={{
							borderRadius: '0.25rem',
							background: '#FCFDFD',
							padding: '2rem'
						}}>
							<h4 style={{color: '#7f7f7f', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>Job Offers</h4>
							<div style={{textAlign: 'center', color: '#7f7f7f', padding: '2rem'}}>
								no job offer(s)
							</div>
						</div>
						<div className="card mt-2 mx-2" style={{
							borderRadius: '0.25rem',
							background: '#FCFDFD',
							padding: '2rem'
						}}>
							<h4 style={{color: '#7f7f7f', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>Categories</h4>

						</div>
				</div>
			</div>
		</>
	);
}

export default MyApplications;