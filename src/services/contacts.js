import { Contact } from '../models/contacts.js';

export const getAllContacts = async () => {
  return await Contact.find();
};
export const getContactById = async (id) => {
  return await Contact.findById(id);
};
export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};
export const updateContact = async (contactId, updateData) => {
  return await Contact.findByIdAndUpdate(contactId, updateData, {
    new: true,
    runValidators: true,
  });
};
export const deleteContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
};
