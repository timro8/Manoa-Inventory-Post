import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import AdminHome from '../pages/AdminHome';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE } from '../../api/role/Role';
import ReservationForm from '../pages/ReservationForm';
import MapPage from '../pages/MapPage';
import EditUser from '../pages/EditUser';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
// import { Test } from '../pages/Test';
import ConfirmEditUser from '../pages/ConfirmEditUser';
import ServiceRequest from '../pages/ServiceRequest';
import SearchFaculty from '../pages/SearchFaculty';
import CreateUser from '../pages/CreateUser';
import ConfirmCreateUser from '../pages/ConfirmCreateUser';
import LoadingSpinner from '../components/LoadingSpinner';
import CreateRoom from '../pages/CreateRoom';
import EditRoom from '../pages/EditRoom';
import RoomAvi from '../pages/RoomAvi';
import StudentHome from '../pages/StudentHome';
import FacultyHome from '../pages/FacultyHome';
import ITSupportHome from '../pages/ITSupportHome';
import OfficeHome from '../pages/OfficeHome';
import SearchClubs from '../pages/SearchClubs';
import FullFacultyInfo from '../pages/FullFacultyInfo';
import PortSearch from '../pages/SearchPorts';
import StudentList from '../pages/StudentList';
import OfficeRequestHome from '../pages/OfficeRequestHome';
import EditRequest from '../pages/EditRequest';
import EditClub from '../pages/EditClub';
import RequestList from '../pages/RequestList';
import EditPort from '../pages/EditPort';
import ProfileUpdate from '../pages/ProfileUpdate';
import FullClubInfo from '../pages/FullClubInfo';
import CreatePort from '../pages/CreatePort';
import ForgotPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';
import RoomSearch from '../pages/RoomSearch';
import CreateClub from '../pages/CreateClub';
import AddComment from '../pages/AddComment';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/request-list" element={<RequestList />} />
          <Route path="/availability" element={<ProtectedRoute><RoomAvi /></ProtectedRoute>} />
          <Route path="/faculty" element={<SearchFaculty />} />
          <Route path="/facultyinfo/:_id" element={<FullFacultyInfo />} />
          <Route path="/clubs" element={<SearchClubs />} />
          <Route path="/clubinfo/:_id" element={<FullClubInfo />} />
          <Route path="/profile" element={<ProtectedRoute><ProfileUpdate /></ProtectedRoute>} />
          <Route path="/reserve" element={<ProtectedRoute><ReservationForm /></ProtectedRoute>} />
          <Route path="/service" element={<ProtectedRoute><ServiceRequest /></ProtectedRoute>} />
          <Route path="/editUser/:_id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
          <Route path="/editSpace/:_id" element={<ProtectedRoute><EditRoom /></ProtectedRoute>} />
          <Route path="/createUser" element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
          <Route path="/createClub" element={<ProtectedRoute><CreateClub /></ProtectedRoute>} />
          <Route path="/editUser/confirmEdit/:_id" element={<ProtectedRoute><ConfirmEditUser /></ProtectedRoute>} />
          <Route path="/createUser/confirmCreate/:_id" element={<ProtectedRoute><ConfirmCreateUser /></ProtectedRoute>} />
          <Route path="/editRoom/:_id" element={<ProtectedRoute><EditRoom /></ProtectedRoute>} />
          <Route path="/createPort" element={<ProtectedRoute><CreatePort /></ProtectedRoute>} />
          <Route path="/editPort/:_id" element={<ProtectedRoute><EditPort /></ProtectedRoute>} />
          <Route path="/createRoom" element={<ProtectedRoute><CreateRoom /></ProtectedRoute>} />
          <Route path="/admin-home" element={<AdminProtectedRoute ready={ready}><AdminHome /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="/student-home" element={<StudentProtectedRoute><StudentHome /></StudentProtectedRoute>} />
          <Route path="/faculty-home" element={<FacultyProtectedRoute><FacultyHome /></FacultyProtectedRoute>} />
          <Route path="/student-list" element={<FacultyProtectedRoute><StudentList /></FacultyProtectedRoute>} />
          <Route path="/itsupport-home" element={<ITSupportProtectedRoute><ITSupportHome /></ITSupportProtectedRoute>} />
          <Route path="/ports" element={<ITSupportProtectedRoute><PortSearch /></ITSupportProtectedRoute>} />
          <Route path="/search-rooms" element={<ProtectedRoute><RoomSearch /></ProtectedRoute>} />
          <Route path="/office-home" element={<OfficeProtectedRoute><OfficeHome /></OfficeProtectedRoute>} />
          <Route path="/editReq/:_id" element={<ProtectedRoute><EditRequest /></ProtectedRoute>} />
          <Route path="/editCom/:_id" element={<ProtectedRoute><AddComment /></ProtectedRoute>} />
          <Route path="/editClub/:_id" element={<ProtectedRoute><EditClub /></ProtectedRoute>} />
          <Route path="/office-request-home" element={<OfficeRequestHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/**
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  // console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/admin-home" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

/**
 * FacultyProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and faculty role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const FacultyProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isFaculty = Roles.userIsInRole(Meteor.userId(), [ROLE.FACULTY]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isFaculty) ? children : <Navigate to="/notauthorized" />;
};

/**
 * OfficeProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and office role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const OfficeProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isOffice = Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isOffice) ? children : <Navigate to="/notauthorized" />;
};

/**
 * ITSupportProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and IT support role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ITSupportProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isITSupport = Roles.userIsInRole(Meteor.userId(), [ROLE.ITSUPPORT]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isITSupport) ? children : <Navigate to="/notauthorized" />;
};

/**
 * TAProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and student role with TA attribute before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const TAProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isStudent = Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT]);
  let isTA = false;
  if (isStudent) {
    const profile = StudentProfiles.getData();
    isTA = profile.TA;
  }
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isStudent && isTA) ? children : <Navigate to="/notauthorized" />;
};

/**
 * RAProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and student role with RA attribute before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const RAProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isStudent = Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT]);
  let isRA = false;
  if (isStudent) {
    const profile = StudentProfiles.getData();
    isRA = profile.RA;
  }
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isStudent && isRA) ? children : <Navigate to="/notauthorized" />;
};

/**
 * GraduateProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and student role with graduate attribute before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const GraduateProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isStudent = Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT]);
  let isGraduate = false;
  if (isStudent) {
    const profile = StudentProfiles.getData();
    isGraduate = profile.graduate;
  }
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isStudent && isGraduate) ? children : <Navigate to="/notauthorized" />;
};

/**
 * StudentProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and student role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const StudentProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isStudent = Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isStudent) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

FacultyProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

FacultyProtectedRoute.defaultProps = {
  children: <Landing />,
};

OfficeProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

OfficeProtectedRoute.defaultProps = {
  children: <Landing />,
};

ITSupportProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ITSupportProtectedRoute.defaultProps = {
  children: <Landing />,
};

TAProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

TAProtectedRoute.defaultProps = {
  children: <Landing />,
};

RAProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

RAProtectedRoute.defaultProps = {
  children: <Landing />,
};

GraduateProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

GraduateProtectedRoute.defaultProps = {
  children: <Landing />,
};

StudentProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

StudentProtectedRoute.defaultProps = {
  children: <Landing />,
};

export default App;
