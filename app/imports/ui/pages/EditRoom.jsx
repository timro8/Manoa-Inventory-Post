import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Room } from '../../api/room/RoomCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';

const statusValues = ['open', 'occupied', 'maintenance'];
const buildingValues = ['POST'];

const RoomSchema = new SimpleSchema({
  room: String,
  description: String,
  building: { type: String, allowedValues: buildingValues },
  status: { type: String, allowedValues: statusValues },
});

const bridge = new SimpleSchema2Bridge(RoomSchema);

/* Renders the EditStuff page for editing a single document. */
const EditRoom = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Room.subscribeRoom();
    // const subscription = UserProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Room.find({ _id }, {}).fetch();
    const roomToEdit = document[0];
    return {
      doc: roomToEdit,
      ready: rdy,
    };
  }, [_id]);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { room, description, building, status } = data;
    const collectionName = Room.getCollectionName();
    const updateData = { id: _id, room, description, building, status };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'User updated successfully', 'success'));
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Update Room</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="room" />
                <TextField name="description" />
                <SelectField name="building" />
                <SelectField name="status" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading" />);
};

export default EditRoom;
