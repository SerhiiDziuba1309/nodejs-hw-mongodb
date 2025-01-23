import express from 'express';
import {
  getContactsController,
  getContactByIdController,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', getContactsController);
router.get('/:contactId', getContactByIdController);

export default router;
