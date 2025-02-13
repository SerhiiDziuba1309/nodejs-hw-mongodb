
import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePagination } from '../utils/parsePagination.js';
import { parseSort } from '../utils/parseSort.js';
import { parseFilters } from '../utils/parseFilters.js';
import { formatPagination } from '../utils/formatPagination.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePagination(req.query);
    const { sortBy, sortOrder } = parseSort(req.query);
    const filters = parseFilters(req.query);

    const { contacts, totalItems } = await getAllContacts(req.user._id, page, perPage, sortBy, sortOrder, filters);

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        ...formatPagination(page, perPage, totalItems),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const contact = await getContactById(req.user._id, req.params.contactId);
    if (!contact) throw createHttpError(404, 'Contact not found');

    res.json({
      status: 200,
      message: `Successfully found contact with id ${req.params.contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, contactType } = req.body;
    const userId = req.user._id; 
    const photo = req.file;

    let photoUrl = null;

    if (photo) {
      photoUrl = await saveFileToCloudinary(photo.path);
    }

    const newContact = await createContact(userId, {
      name,
      phoneNumber,
      contactType,
      photo: photoUrl,
    });

    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const updatedContact = await updateContact(req.user._id, req.params.contactId, req.body);
    if (!updatedContact) throw createHttpError(404, 'Contact not found');

    res.status(200).json({
      status: 200,
      message: 'Successfully updated a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const deletedContact = await deleteContact(req.user._id, req.params.contactId);
    if (!deletedContact) throw createHttpError(404, 'Contact not found');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const photo = req.file;

    let photoUrl = null;

    if (photo) {
      photoUrl = await saveFileToCloudinary(photo.path);
    }

    const result = await updateContact(contactId, {
      ...req.body,
      photo: photoUrl,
    });

    if (!result) {
      next(createHttpError(404, "Contact not found"));
      return;
    }

    res.json({
      status: 200,
      message: "Successfully patched a contact!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};