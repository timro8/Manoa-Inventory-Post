import { Meteor } from 'meteor/meteor';
import { Room } from '../../api/room/RoomCollection';
import { Clubs } from '../../api/clubs/Clubs';
import { Interests } from '../../api/clubs/Interests';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { OfficeRequests } from '../../api/user/OfficeRequestCollection';
import { Ports } from '../../api/room/Ports';

// Initialize the database with a default data document.
function addRequest(data) {
  console.log(`  Adding: ${data.email} (${data.description}) `);
  OfficeRequests.define(data);
}

function addRoom(data) {
  console.log(`  Adding: ${data.room} (${data.description}) ${data.building}`);
  Room.define(data);
}

function addInterest(data) {
  console.log(`  Adding: ${data.interest}`);
  Interests.define(data);
}

function addClub(data) {
  console.log(`  Adding: ${data.name}`);
  Clubs.define(data);
}

function addFaculty(data) {
  console.log(`  Adding: ${data.email}`);
  FacultyProfiles.define(data);
}

function addPort(data) {
  console.log(`  Adding: ${data.port} (${data.room}) ${data.side} ${data.idf} ${data.status}`);
  Ports.define(data);
}

// Initialize the RoomsCollection if empty.
if (Room.count() === 0) {
  if (Meteor.settings.defaultRoomData) {
    console.log('Creating default room data.');
    Meteor.settings.defaultRoomData.map(data => addRoom(data));
  }
}

// Initialize the Interests if empty.
if (Interests.count() === 0) {
  if (Meteor.settings.defaultInterests) {
    console.log('Creating default interests.');
    Meteor.settings.defaultInterests.map(interests => addInterest(interests));
  }
}

// Initialize the ClubsCollection if empty.
if (Clubs.count() === 0) {
  if (Meteor.settings.defaultClubs) {
    console.log('Creating default clubs.');
    Meteor.settings.defaultClubs.map(clubs => addClub(clubs));
  }
}

if (FacultyProfiles.count() === 1) {
  if (Meteor.settings.defaultFacultys) {
    console.log('Creating default Facultys data.');
    Meteor.settings.defaultFacultys.map(data => addFaculty(data));
  }
}

if (OfficeRequests.count() === 0) {
  if (Meteor.settings.defaultRequest) {
    console.log('Creating default request data.');
    Meteor.settings.defaultRequest.map(data => addRequest(data));
  }
}

if (Ports.count() === 0) {
  if (Meteor.settings.defaultPorts) {
    console.log('Creating default Port Data.');
    Meteor.settings.defaultPorts.map(data => addPort(data));
  }
}
