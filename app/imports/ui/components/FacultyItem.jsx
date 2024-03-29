import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FacultyItem = ({ faculty }) => (
  <tr>
    <td><Image alt="" src={faculty.picture} width="180" height="180" /></td>
    <td><Link to={`/facultyinfo/${faculty._id}`}>{`${faculty.firstName} ${faculty.lastName}`}</Link></td>
    <td>{faculty.position}</td>
    <td>{faculty.email}<br />{faculty.phone}</td>
    <td>{faculty.officeHours}</td>
  </tr>
);

// Require a document to be passed to this component.
FacultyItem.propTypes = {
  faculty: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    picture: PropTypes.string,
    position: PropTypes.string,
    rooms: PropTypes.string,
    officeHours: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FacultyItem;
