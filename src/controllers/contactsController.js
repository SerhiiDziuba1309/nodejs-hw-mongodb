import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};
export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
      throw createHttpError(
        400,
        'Missing required fields: name, phoneNumber, or contactType',
      );
    }
    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: `Successfully created a contact!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};
export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};
