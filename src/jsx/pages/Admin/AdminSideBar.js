import { Link, useRouteMatch } from 'react-router-dom';

import pageRoutes from '../../../routes';

import PerfectScrollbar from "react-perfect-scrollbar";
import { Dropdown } from "react-bootstrap";



const AdminSideBar = (props) => {
	const {path, url} = useRouteMatch();
	// console.log(url);
	return (
		<div className="dlabnav" style={{top: 0, height: '100vh'}}>
			<PerfectScrollbar>
				<Dropdown as="div" className=" header-profile2 dropdown">
						<Dropdown.Toggle
					variant=""
					as="a"
					className="nav-link i-false c-pointer"
					// href="#"
					role="button"
					data-toggle="dropdown"
				>
						<div className="header-info2 d-flex align-items-center">
							<img src="" width={20} alt="" />
							<div className="d-flex align-items-center sidebar-info">
								<div>
									<span className="font-w400 d-block">Franklin Jr</span>
									<small className="text-end font-w400">Superadmin</small>
								</div>	
								<i className="fas fa-chevron-down"></i>
							</div>
						</div>
					</Dropdown.Toggle>
					<Dropdown.Menu align="right" className=" dropdown-menu dropdown-menu-end">
						<Link to="/app-profile" className="dropdown-item ai-icon">
						<svg
							id="icon-user1"
							xmlns="http://www.w3.org/2000/svg"
							className="text-primary"
							width={18}
							height={18}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
						>
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						<circle cx={12} cy={7} r={4} />
						</svg>
						<span className="ms-2">Profile </span>
						</Link>
						<Link to="/email-inbox" className="dropdown-item ai-icon">
						<svg
							id="icon-inbox"
							xmlns="http://www.w3.org/2000/svg"
							className="text-success"
							width={18}
							height={18}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
						>
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
						<polyline points="22,6 12,13 2,6" />
						</svg>
						<span className="ms-2">Inbox </span>
						</Link>
						{/* <LogoutPage /> */}
				</Dropdown.Menu>
				</Dropdown>
				<div className="mm-wrapper">

					<ul className="metismenu">
						
					<li className="mm-active">
							<Link className="has-arrow ai-icon" to="#" >
								<i className="flaticon-025-dashboard"></i>
								<span className="nav-text">Dashboard</span>
							</Link>
							<ul >
								<li><Link className="mm-active" to="/admin/users">All Users</Link></li>
								<li><Link className="mm-active" to="/admin/add-user"> Add User</Link></li>
								<li><Link className="mm-active" to="/admin/organizations"> All Organizations</Link></li>
								<li><Link className="mm-active" to="/admin/add-organizations"> Add Organization</Link></li>
								<li><Link className="mm-active" to="/admin/my-profile"> My Profile</Link></li>
								<li><Link className="mm-active" to="/admin/statistics">Statistics</Link></li>
								<li><Link className="mm-active" to="/admin/companies">Companies</Link></li>
								<li><Link className="mm-active" to="/admin/task">Task</Link></li>
							</ul>
						</li>
					</ul>
				</div>
			</PerfectScrollbar>
			</div>
	);
}


export default AdminSideBar;