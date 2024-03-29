import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const userClubsPublications = {
  userClubsPub: 'userClubsPub',
};

class UserClubsCollection extends BaseCollection {
  constructor() {
    super('UserClubs', new SimpleSchema({
      email: String,
      club: String,
    }));
  }

  /**
   * Defines a new UserClubs item.
   * @return {String} the docID of the new document.
   * @param email
   * @param club
   */
  define({ email, club }) {
    const docID = this._collection.insert({
      email,
      club,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param email the new email (optional).
   * @param club the new club (optional).
   * @returns never
   */
  update(docID, { email, club }) {
    const updateData = {};
    if (email) {
      updateData.email = email;
    }
    if (club) {
      updateData.club = club;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /*
   * Default publication method for entities.
   * It publishes the entire collection for users.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(userClubsPublications.userClubsPub, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /*
   * Subscription method for UserClubs.
   */
  subscribeUserClubs() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userClubsPublications.userClubsPub);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.STUDENT, ROLE.OFFICE, ROLE.FACULTY, ROLE.ITSUPPORT]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{email: *, club: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const club = doc.club;
    return { email, club };
  }

  /**
   * Checks the UserClubs collection to see if an inputted Club Advisor already exists.
   * @param email
   * @param club
   * @return true
   * @return false
   */
  checkExists(email, club) {
    const instances = this.find({ email, club }, {}).count();
    if (instances === 0) {
      return false;
    }
    return true;
  }
}

/*
 * Provides the singleton instance of this class to all other entities.
 */
export const UserClubs = new UserClubsCollection();
