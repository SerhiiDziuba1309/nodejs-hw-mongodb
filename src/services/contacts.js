import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async (userId, page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', filters = {}) => {
  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === 'asc' ? 1 : -1;

  const contacts = await Contact.find({ userId, ...filters })
    .sort({ [sortBy]: sortDirection })
    .skip(skip)
    .limit(perPage);

  const totalItems = await Contact.countDocuments({ userId, ...filters });
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    contacts,
    totalItems,
    totalPages,
  };
};

export const getContactById = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const createContact = async (userId, payload) => {
  return await Contact.create({ ...payload, userId });
};

export const updateContact = async (userId, contactId, updateData) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, userId }, 
    updateData,
    { new: true, runValidators: true }
  );
};

export const deleteContact = async (userId, contactId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId }); // 🔹 Видаляємо тільки свої контакти
};
