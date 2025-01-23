import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error retrieving contacts',
      error: error.message,
    });
  }
};
export const getContactByIdController = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error retrieving contact',
      error: error.message,
    });
  }
};
export const createContactController = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Missing required fields: name, phoneNumber or contactType',
    );
  }
  const newContact = await createContact({
    name,
    phoneNumber,
    email,
    isFavourite: isFavourite || false,
    contactType,
  });
  res.status(201).json({
    status: 201,
    message: 'Seccessfully created a contsct!',
    data: newContact,
  });
};
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;
  if (!Object.keys(updateData).length) {
    throw createHttpError(400, 'Missing fields to update');
  }
  const updatedContact = await updateContact(contactId, updateData);
  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContact(contactId);
  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }
  res.status(204).send();
};
