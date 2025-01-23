import { Contact } from '../models/contacts.js';

export const getAllContacts = async () => {
  return await Contact.find();
};
export const getContactById = async (id) => {
  return await Contact.findById(id);
};
export const createContact = async (payload) => {
  const newContact = new ContactsCollection(payload);
  return await newContact.save();
};
export const updateContact = async (contactId, updateData) => {
  return await Contacts.findByIdAndUpdate(contactId, updateData, {
    new: true,
    runValidators: true,
  });
};
