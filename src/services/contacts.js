import { Contact } from '../models/contacts.js';

export const getAllContacts = async (page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc') => {
  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === 'asc' ? 1 : -1;

  const contacts = await Contact.find()
    .sort({ [sortBy]: sortDirection }) 
    .skip(skip)
    .limit(perPage);

  const totalItems = await Contact.countDocuments();
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    contacts,
    totalItems,
    totalPages,
  };
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
  return await Contact.findByIdAndDelete(contactId);
};
