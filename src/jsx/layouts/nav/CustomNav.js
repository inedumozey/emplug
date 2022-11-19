import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import pageRoutes from "../../../routes";

import CustomInput from "../../components/CustomInput/custom-input";
import Toggle from "react-toggle";

import logo from "../../../images/logo/logo.svg";
import ProfileImage from "../../../images/svg/user.svg";

import {
  RssSimple,
  Briefcase,
  Chat,
  Bell,
  Buildings,
  Triangle,
  Lock,
  Notification,
  UserSwitch,
  UsersThree
} from "phosphor-react";

import { logout } from "../../../store/actions/auth/AuthActions";
import {
  clearJobPosting,
  getAllJobs,
} from "../../../store/actions/JobPosting/job-posting.actions";
import { clearMyPortfolio } from "../../../store/actions/MyPortfolio/my-portfolio.actions";
import { clearOrganisation } from "../../../store/actions/Organisation/OrganisationActions";
import { fetchNotifications } from "../../../store/actions/notifications/NotificationAction";

import "./CustomNav.css";
import CustomButton from "../../components/CustomButton/custom-button";
import { Navbar, Container, Nav } from "react-bootstrap";
import Avatar from "react-avatar";
import routes from "../../../routes";

function CustomNav({
  auth: { auth },
  logout,
  clearJobPosting,
  clearMyPortfolio,
  getAllJobs,
  clearOrganisation,
  organisation,
  notifications: { allNotifications, loaded },
  fetchNotifications,
}) {
  const history = useHistory();

  const [dropDown, setDropDown] = useState(false);
  const [feedDrop, setFeedDrop] = useState(false);
  const [switchAccount, setSwitch] = useState(false);
  const reset = () => {
    logout();
    clearJobPosting();
    clearMyPortfolio();
    clearOrganisation();
    getAllJobs();
    history.replace(pageRoutes.home);
  };

  useEffect(() => {
    auth.user && fetchNotifications(auth.token, auth.user._id);
  }, [loaded]);
  // console.log(allNotifications)

  // console.log(auth)
  return (
    <Navbar expand="lg" sticky="top" bg="white" className="shadow">
      <Container>
        <Navbar.Brand href={pageRoutes.home}>
          <img src={logo} alt="..." width="100" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <ul className="navbar-nav mr-auto">
            {auth.user && (
              <li className="">
                <Link
                  style={{ textAlign: "center" }}
                  to={pageRoutes.organisation}
                  className="nav-link menuitems nav-item pt-4 mx-2 row justify-contents-center"
                  onMouseEnter={() => {
                    setFeedDrop(false);
                    setDropDown(false);
                  }}
                >
                  <UserSwitch size={22} />
                  <div>Accounts</div>
                </Link>
              </li>
            )}

            {auth.user && (
              <li className="">
                <Link
                  style={{ textAlign: "center" }}
                  to={pageRoutes.home}
                  className="nav-link menuitems nav-item pt-4 mx-2 row justify-contents-center"
                  onMouseEnter={() => {
                    setFeedDrop(false);
                    setDropDown(false);
                  }}
                >
                  <Briefcase size={22} />
                  <div>Interview</div>
                </Link>
              </li>
            )}
            {auth.user && (
              <li className="">
                <Link
                  style={{ textAlign: "center" }}
                  to={pageRoutes.allUsers}
                  className="nav-link menuitems nav-item pt-4 mx-2 row justify-contents-center"
                  onMouseEnter={() => {
                    setFeedDrop(false);
                    setDropDown(false);
                  }}
                >
                  <UsersThree size={22} />
                  <div>Talent Pool</div>
                </Link>
              </li>
            )}
            {auth.user && (
              <li className="">
                <Link
                  to={pageRoutes.message}
                  style={{ textAlign: "center" }}
                  className="nav-link menuitems nav-item pt-4 mx-2 row justify-content-center"
                  onMouseEnter={() => {
                    setFeedDrop(false);
                    setDropDown(false);
                  }}
                >
                  <Chat size={22} />
                  <div>Messages</div>
                </Link>
              </li>
            )}
            {auth.user && (
              <li className="">
                <Link
                  to={`${pageRoutes.notifications}`}
                  style={{ textAlign: "center" }}
                  className="nav-link menuitems nav-item pt-3 mx-2 row justify-content-center text-center"
                  onMouseEnter={() => {
                    setFeedDrop(false);
                    setDropDown(false);
                  }}
                >
                  <span className="badge rounded-pill text-secondary">
                    <Notification size={22} color="#969696" />
                    <span className="text-success">
                      {loaded ? allNotifications.length : ""}
                    </span>
                  </span>
                  <div>Notifications</div>
                </Link>
              </li>
            )}
            {!auth.user && (
              <Link
                to={pageRoutes.login}
                className="nav-link nav-item pt-4 mx-2 row justify-content-center"
              >
                <Lock size={22} />
                <div>Login</div>
              </Link>
            )}

            {auth.user && (
              <li
                style={{position: 'relative'}}
                className="nav-link menuitems nav-item pt-3 mx-2 text-center"
                onClick={() => {
                  setDropDown(true);
                  setFeedDrop(false);
                }}
              >
                <Avatar
                  src={auth.user.profilePicture}
                  name={auth.user.fullName}
                  round={true}
                  size={30}
                  color="#00b500"
                />
                <div className="">{auth.user.fullName}</div>
                {dropDown && (
                  <div style={{position: 'absolute', top:'75px', left: '50%', transform: 'translateX(-50%)', width: '150px', maxWidth: '220px', background: '#fff'}} className="drop-profile">
                    <Link
                      to={pageRoutes.profile}
                      onClick={() => setDropDown(false)}
                      className="mb-1 mt-1 drop-items"
                      style={{ cursor: "pointer", padding: "0.25rem" }}
                    >
                      Profile
                    </Link>
                    <p
                      onClick={() => setDropDown(false)}
                      className="mb-1 mt-1 drop-items px-1"
                      style={{ cursor: "pointer" }}
                    >
                      Create Resume
                    </p>
                    <Link
                      className="mb-1 mt-1 drop-items px-1 d-flex align-items-center justify-content-center"
                      style={{ cursor: "pointer" }}
                      to={pageRoutes.organisation}
                      onClick={() => {
                        // setDropDown(false)
                        // reset()
                      }}
                    >
                      Switch account
                      {/* <Toggle defaultChecked={switchAccount} onChange={() => setSwitch(!switchAccount)} /> */}
                    </Link>
                    <Link
                      className="mb-1 mt-1 drop-items px-1 d-flex align-items-center justify-content-center"
                      style={{ cursor: "pointer" }}
                      to={pageRoutes.superAdmin + "?users"}
                      onClick={() => {
                        // setDropDown(false)
                        // reset()
                      }}
                    >
                      Super admin
                      {/* <Toggle defaultChecked={switchAccount} onChange={() => setSwitch(!switchAccount)} /> */}
                    </Link>
                    <p
                      className="mb-1 mt-1 drop-items px-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setDropDown(false);
                        reset();
                      }}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </li>
            )}
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
// create origanization , profile , logout, switch account
const mapStateToProps = (state) => ({
  auth: state.auth,
  organisation: state.organisation,
  notifications: state.notifications,
});

const mapsDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  clearJobPosting: () => dispatch(clearJobPosting()),
  clearMyPortfolio: () => dispatch(clearMyPortfolio()),
  clearOrganisation: () => dispatch(clearOrganisation()),
  getAllJobs: (token) => dispatch(getAllJobs(token)),
  fetchNotifications: (token, id) => dispatch(fetchNotifications(token, id)),
});

export default connect(mapStateToProps, mapsDispatchToProps)(CustomNav);
