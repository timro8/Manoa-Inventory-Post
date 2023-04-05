import React, {} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ErrorField, SubmitField, TextField, AutoField, SelectField, AutoForm } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { imageOption, OfficeRequests, requestToConditions } from '../../api/user/OfficeRequestCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  firstName: String,
  lastName: String,
  description: String,
  requestTo: {
    type: String,
    allowedValues: requestToConditions,
  },
  picture: {
    type: String,
    optional: true,
    allowedValues: imageOption,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const ServiceRequest = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, firstName, lastName, description, requestTo, picture } = data;
    const owner = Meteor.user().username;
    const collectionName = OfficeRequests.getCollectionName();
    const definitionData = { owner, title, firstName, lastName, description, requestTo, picture };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return (
    <div style={{ border: '10px solid #969696' }}>
      <Container className="py-3">
        <Row>
          <Col className="text-center">
            <h2>Service Request</h2>
          </Col>
        </Row>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
          <AutoField name="firstName" />
          <ErrorField name="firstName">
            <span>You have to provide your last name!</span>
          </ErrorField>
          <AutoField name="lastName" />
          <ErrorField name="lastName">
            <span>You have to provide your last name!</span>
          </ErrorField>
          <AutoField name="description" />
          <TextField name="title" placeholder="What is your request about?" />
          <SelectField name="picture" placeholder="choose an option" />
          <SelectField name="requestTo" placeholder="Office or It support" />
          <SubmitField value="Submit" />
        </AutoForm>
      </Container>
    </div>
  );
};

export default ServiceRequest;
