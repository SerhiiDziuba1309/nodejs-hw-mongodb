import createHttpError from 'http-errors';
import {
  createContact,
  getAllContacts,
  getContactById,
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
