import React, { useEffect, useState } from 'react';
import { Accordion, Col, Row, Table, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import FacultyItem from '../components/FacultyItem';
import FacultyItemOffice from '../components/FacultyItemOffice';
import { ROLE } from '../../api/role/Role';

/* Renders a table containing all of the Faculty documents. Use <FacultyItem> to render each row. */
const SearchFaculty = () => {
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [facultyFirstName, setFacultyFirstName] = useState('');
  const [facultyLastName, setFacultyLastName] = useState('');
  const [facultyPosition, setFacultyPosition] = useState('');
  const [facultyOfficeHours] = useState('');
  const [facultyEmergencyPhone] = useState('');
  const [facultyEmergencyEmail] = useState('');

  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  const isOffice = Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE]);

  /* Connecting with default */
  const { ready, faculty, positions } = useTracker(() => {
    const subscription = FacultyProfiles.subscribeFaculty();
    const rdy = subscription.ready();
    const facultyItems = FacultyProfiles.find({}).fetch();
    const uniqPositions = [];
    facultyItems.map(item => {
      if (uniqPositions.indexOf(item.position) === -1) {
        uniqPositions.push(item.position);
      }
      return uniqPositions;
    });
    return {
      faculty: facultyItems,
      positions: uniqPositions,
      ready: rdy,
    };
  }, []);

  // set faculty in filteredFaculty when finished loading
  useEffect(() => {
    if (ready) {
      setFilteredFaculty(faculty);
    }
  }, [ready]);

  // for filtering
  useEffect(() => {
    let filtered = faculty;
    if (facultyFirstName) {
      filtered = filtered.filter(function (obj) { return obj.firstName.toLowerCase().includes(facultyFirstName.toLowerCase()); });
    }
    if (facultyLastName) {
      filtered = filtered.filter(function (obj) { return obj.lastName.toLowerCase().includes(facultyLastName.toLowerCase()); });
    }
    if (facultyPosition) {
      filtered = filtered.filter(function (obj) { return obj.position.toLowerCase().includes(facultyPosition.toLowerCase()); });
    }
    if (facultyOfficeHours) {
      filtered = filtered.filter(function (obj) { return obj.officeHours.toLowerCase().includes(facultyOfficeHours.toLowerCase()); });
    }
    if (facultyEmergencyPhone) {
      filtered = filtered.filter(function (obj) { return obj.emergencyPhone.toLowerCase().includes(facultyEmergencyPhone.toLowerCase()); });
    }
    if (facultyEmergencyEmail) {
      filtered = filtered.filter(function (obj) { return obj.emergencyEmail.toLowerCase().includes(facultyEmergencyEmail.toLowerCase()); });
    }
    setFilteredFaculty(filtered);
  }, [facultyFirstName, facultyLastName, facultyPosition, facultyOfficeHours, facultyEmergencyPhone, facultyEmergencyEmail]);

  const returnFilter = () => (
    <div className="pb-3" id={PAGE_IDS.FACULTY_SEARCH}>
      <h2 className="mt-4 text-center mb-2">Faculty Search</h2>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header id={COMPONENT_IDS.FACULTY_FILTER_OPTIONS}>
              Filter Options
            </Accordion.Header>
            <Accordion.Body>
              <Row className="pt-3 px-3">
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by first name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      First Name
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFacultyFirstName(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by last name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Last Name
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFacultyLastName(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by role">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Position
                    </Col>
                    <select type="text" className="shadow-sm" onChange={e => setFacultyPosition(e.target.value)}>
                      <option> </option>
                      { positions.map((item) => (
                        <option>{item}</option>
                      ))}
                    </select>
                  </label>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );

  const returnList = () => (
    <div>
      <Table striped className="border border-2">
        <thead style={{ zIndex: 200 }}>
          <tr>
            <th> </th>
            <th>Name</th>
            <th>Position</th>
            <th>Contact Info</th>
            <th>Office Hours</th>
            {isAdmin || isOffice ? ([
              <th>Emergency Phone</th>,
              <th>Emergency Email</th>,
            ]) : ''}
          </tr>
        </thead>
        {isAdmin || isOffice ? ([
          <tbody>
            { filteredFaculty.length === 0 ? (<tr><td>-</td></tr>) : filteredFaculty.map((members) => <FacultyItemOffice key={members._id} faculty={members} />)}
          </tbody>,
        ]) : ([
          <tbody>
            { filteredFaculty.length === 0 ? (<tr><td>-</td></tr>) : filteredFaculty.map((members) => <FacultyItem key={members._id} faculty={members} />)}
          </tbody>,
        ])}
      </Table>
      { filteredFaculty.length === 0 ? <div className="d-flex justify-content-center pb-2">No faculty found.</div> : '' }
    </div>
  );
  return (
    <Container id={PAGE_IDS.FACULTY_SEARCH}>
      <div className="justify-content-center">
        <Row id="dashboard-screen">
          <Col className="mx-3">
            <Row id="dashboard-filter">{returnFilter()}</Row>
            { ready ? <Row id="dashboard-list">{returnList()}</Row> : <LoadingSpinner /> }
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default SearchFaculty;
