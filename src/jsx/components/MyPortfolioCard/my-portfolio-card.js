import CustomButton from "../CustomButton/custom-button";
import { Link } from 'react-router-dom';

const MyPortfolioCard = ({section, data, setEditField}) => (
	<>
		<div className="card" style={{width: '56rem', borderRadius: '5px', }}>
			<div style={{width: '54rem', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee'}}>
				<h4 className="text-primary" >{section}</h4>
				<Link to="#" onClick={() => setEditField({show: true, section: section.toLowerCase() })} className="btn btn-primary light btn-xs mb-1 me-1" style={{borderRadius: '5px'}}> + add </Link>
			</div>
			<div>

			<div style={{  width: '100%', }}>
				{
					data.map((item, index) => (
							<div key={index} style={{width: '90%', border: '0.5px solid #dee2e6', margin: '2rem', marginLeft: '1rem', borderRadius: '4px', border: 'none'}}>
								<div className="card-body" style={{position: 'relative', padding: 0, display: 'flex', width: '100%', margin: '2rem', marginLeft: `${!item.coverImage ? "0" : "1rem"}`,}}	>	
										<p onClick={() => setEditField({show: true, section: section.toLowerCase() })} style={{color: '#56b609', position: 'absolute', right: 0, cursor: 'pointer'}}>edit</p>

										{item.coverImage && <img  src={item.coverImage}  alt="profile" className="img-fluid " style={{ width: '12rem', objectFit: 'cover', height: '12rem',}} />}
											<div style={{width: '100%', padding: '1rem'}}>
											{item.companyName && <h4 style={{marginLeft: '1rem'}}>{item.companyName}</h4>}
											{item.projectName && <h4 style={{marginLeft: '1rem'}}>{item.projectName}</h4>}
											{item.institution && <h4 style={{marginLeft: '1rem'}}>{item.institution}</h4>}
											{item.description && <p style={{margin: 0, marginLeft: '1rem'}}>{item.description.text}</p>}
											{item.qualification && <p style={{margin: 0, marginLeft: '1rem'}}>{item.qualification}</p>}
											{item.position && <p style={{margin: 0, marginLeft: '1rem'}}>{item.position}</p>}
											{item.duties && <p style={{margin: 0, marginLeft: '1rem'}}>{item.duties}</p>}
											{
												item.graduation && <div style={{marginLeft: '1rem'}}>
													<p>
														{
															new Date(item.graduation.split("T")[0]).getFullYear()
														}
													</p>
													</div>
											}
											{
												
												<div style={{paddingLeft: '1rem', display: 'flex'}}>
													<p style={{marginBottom: 0}}>
														{
															item.from  && Date(item.from).split("T")[0]
														}
													</p>
													<p style={{margin: '0 0.5rem'}}> {item.from && item.to && "-"} </p>
													<p style={{marginBottom: 0,}}>
														{
															item.to  && Date(item.to).split("T")[0]
														}
													</p>
												</div>
											}
											
											<CustomButton style={{marginLeft: '1rem'}}>{section.toLowerCase() === "projects" ? "see project" : "view " + section.toLowerCase() }</CustomButton>
											</div>
								</div>
								
							</div>
							
							))
						}
					</div>
			</div>
		</div>
	</>
);


export default MyPortfolioCard;