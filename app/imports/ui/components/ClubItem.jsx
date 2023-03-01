import React from 'react';
import { Container, Image } from 'react-bootstrap';
// import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';

const ClubItem = ({ club }) => (
  <tr>
    <td><Image alt="" src={club.picture} width="180" height="180" /></td>
    <td>{`${club.name}`}</td>
    <td>{club.website} </td>
    <td>{club.description}</td>
    <td>{club.interests.toLocaleString()}</td>
    <td>{club.adminList.toLocaleString()}</td>
  </tr>
);

// Require a document to be passed to this component.
ClubItem.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    interests: PropTypes.array,
    // eslint-disable-next-line react/forbid-prop-types
    adminList: PropTypes.array,
  }).isRequired,
};

export default ClubItem;
