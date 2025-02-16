
import mongoose, { Types } from "mongoose";
import { Contact } from "../db/models/contacts.js";

export const getAllContacts = async (
  userId,
  page = 1,
  perPage = 10,
  sortBy = "name",
  sortOrder = "asc",
  filters = {}
) => {
  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const contacts = await Contact.find({ userId, ...filters })
    .select(
      "name phoneNumber email isFavourite contactType userId photo createdAt updatedAt"
    )
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
  if (!Types.ObjectId.isValid(contactId)) {
    return null;
  }

  return await Contact.findOne({ _id: new Types.ObjectId(contactId), userId });
};

export const createContact = async (userId, payload) => {
  const newContact = await Contact.create({ userId, ...payload });
  return newContact;
};

export const updateContact = async (userId, contactId, updateData) => {
  if (!Types.ObjectId.isValid(contactId)) {
    return null;
  }

  return await Contact.findOneAndUpdate(
    { _id: new Types.ObjectId(contactId), userId },
    updateData,
    { new: true, runValidators: true }
  );
};

export const deleteContact = async (userId, contactId) => {
  if (!Types.ObjectId.isValid(contactId)) {
    return null;
  }

  return await Contact.findOneAndDelete({ _id: new Types.ObjectId(contactId), userId });
};
