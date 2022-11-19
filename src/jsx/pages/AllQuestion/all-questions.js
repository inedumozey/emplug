import CustomButton from "../../components/CustomButton/custom-button";
import CustomNav from "../../layouts/nav/CustomNav";
import { FileText } from 'phosphor-react';

import './all-questions.css';


function AllQuestions(props) {
	return (
		<>
			<CustomNav />
			<div style={{marginTop: '10rem', padding: '1rem 10rem'}}>
				<CustomButton style={{ width: '15rem'}}>Go back</CustomButton>
				<div className="w-100 d-flex wrap mt-5">
					<div className="card p-5" style={{borderRadius: '0.4rem', width: '44rem'}}>
						<h4>All Questions</h4>

						<div className="w-100 mt-4">
							<div className="d-flex p-2 justify-content-evenly align-items-center" style={{ width: '100%', height: '5rem', background: '#E9F8EA', borderRadius: '0.4rem'}}>
								<div className="d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px', background: 'linear-gradient(180deg, #00B507 0%, #0E950E 100%)', borderRadius: "50%"}}>
									<FileText size={32} style={{ color: 'white'}} />
								</div>
								<div className="pt-4" style={{ width: '55%'}}>
									<h4>ios 11 guidelines for Ux/UI designers</h4>
									<p>Test Question</p>
								</div>
								<div className="d-flex" style={{ width: '30%'}}>
									<CustomButton style={{width: '100%', background: '#E9F8EA', border: '1px solid #00B507', color: '#00B507'}} >View</CustomButton>
									<CustomButton style={{width: '100%', background: '#E9F8EA', border: '1px solid #00B507', color: '#00B507'}} >Edit</CustomButton>
								</div>
							</div>
						</div>

						<div className="w-100 mt-4">
							<div className="d-flex p-2 justify-content-evenly align-items-center" style={{ width: '100%', height: '5rem', background: '#E9F8EA', borderRadius: '0.4rem'}}>
								<div className="d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px', background: 'linear-gradient(180deg, #00B507 0%, #0E950E 100%)', borderRadius: "50%"}}>
									<FileText size={32} style={{ color: 'white'}} />
								</div>
								<div className="pt-4" style={{ width: '55%'}}>
									<h4>ios 11 guidelines for developers</h4>
									<p>Choice Question</p>
								</div>
								<div className="d-flex" style={{ width: '30%'}}>
									<CustomButton style={{width: '100%', background: '#E9F8EA', border: '1px solid #00B507', color: '#00B507'}} >View</CustomButton>
									<CustomButton style={{width: '100%', background: '#E9F8EA', border: '1px solid #00B507', color: '#00B507'}} >Edit</CustomButton>
								</div>
							</div>
						</div>
					</div>

					<div className="p-3 pt-0" style={{width: '35%'}}>
						<div style={{background: '#FCFDFD'}} >
							<div className="d-flex justify-content-between p-4" style={{ borderBottom: '1px solid #eee'}}>
								<h4>INVITES</h4>
								<h4 style={{ color: '#00B507', cursor: 'pointer'}}>VIEW ALL</h4>
							</div>
							<div className="p-4" style={{ textAlign: 'center'}}>
								<p>no invites</p>
							</div>
						</div>

						<div style={{background: '#FCFDFD'}} className="mt-4" >
							<div className="d-flex justify-content-between p-4" style={{ borderBottom: '1px solid #eee'}}>
								<h4>Applications</h4>
								<h4 style={{ color: '#00B507', cursor: 'pointer'}}>VIEW ALL</h4>
							</div>
							<div className="p-4" style={{ textAlign: 'center'}}>
								<p>no applicants</p>
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	);
}

export default AllQuestions;