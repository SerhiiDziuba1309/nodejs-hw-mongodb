import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', getContactsController);
router.get('/:contactId', getContactByIdController);
router.post('/', ctrlWrapper(createContactController));
router.patch('/:contactId', ctrlWrapper(updateContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
export default router;
