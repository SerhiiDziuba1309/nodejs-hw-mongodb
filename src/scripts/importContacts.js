import mongoose from 'mongoose';
import { Contact } from '../models/contacts.js';
import { initMongoConnection } from '../db/initMongoConnection.js';
import fs from 'fs';
import path from 'path';
const importContacts = async () => {
  try {
    await initMongoConnection();
    const contactsPath = path.resolve('C:\\projects\\Node.js\\contacts.json');
    const contactsData = JSON.parse(fs.readFileSync(contactsPath, 'utf-8'));
    await Contact.insertMany(contactsData);
    console.log('Contacts imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error importing contacts:', error.message);
    process.exit(1);
  }
};
importContacts();
