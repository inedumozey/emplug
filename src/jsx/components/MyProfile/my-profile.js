import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomButton from '../CustomButton/custom-button';


const MyProfile = ({ user, setProfile }) => (
	<>
		
		<div className="profile-lang  mb-5">
			<h4 className="text-primary mb-2">Language</h4>
			<Link to="/app-profile" className="text-muted pe-3 f-s-16">
				<i className="flag-icon flag-icon-us" />English
			</Link>
		</div>
		<div className="profile-personal-info">
			<h4 className="text-primary mb-4">
				Personal Information
			</h4>
			<div className="row mb-2">
				<div className="col-3">
					<h5 className="f-w-500"> Name<span className="pull-right">:</span></h5>
				</div>
				<div className="col-9">
					<span>{user.fullName}</span>
				</div>
				<div className="col-3">
					<h5 className="f-w-500"> Middle Name<span className="pull-right">:</span></h5>
				</div>
				<div className="col-9">
					<span>{user.middleName}</span>
				</div>
			</div>
			<div className="row mb-2">
				<div className="col-3">
					<h5 className="f-w-500">Email<span className="pull-right">:</span></h5>
				</div>
				<div className="col-9">
					<span>{user.email}</span>
				</div>
			</div>
			<div className="row mb-2">
				<div className="col-3">
					<h5 className="f-w-500">  Gender<span className="pull-right">:</span></h5>
				</div>
				<div className="col-9">
					<span>{user.gender}</span>
				</div>
			</div>
			<div className="row mb-2">
				<div className="col-3">
					<h5 className="f-w-500">Phone Number<span className="pull-right">:</span></h5>
				</div>
				<div className="col-9">
					<span>{user.phone}</span>
				</div>
			</div>
			<div className="row mb-2">
				<div className="col-3">
					<h5 className="f-w-500">  Username<span className="pull-right">:</span></h5>
				</div>
				<div className="col-9">
					<span>{user.username}</span>
				</div>
			</div>
			<div className="row mb-2">
				<div className="col-3">
					<h5 className="f-w-500">Roles<span className="pull-right">:</span></h5>
				</div>
				<div className="col-9">
					<span>{user.role}</span>
				</div>
			</div>
		</div>
		<CustomButton onClick={() => setProfile(true)}>Update Details</CustomButton>
	</>
);


const mapStateToProps = state => ({
	user: state.auth.auth.user
})


export default connect(mapStateToProps)(MyProfile);