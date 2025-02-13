import express from "express";
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from "../controllers/contactsController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { contactSchema, updateContactSchema } from "../schemas/contactSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();
router.use(authenticate);

router.get("/", 
ctrlWrapper(getContactsController));


router.get("/:contactId", 
isValidId,
ctrlWrapper(getContactByIdController));


router.post("/",
upload.single('photo'),
validateBody(contactSchema),
ctrlWrapper(createContactController));


router.patch("/:contactId",
isValidId,
upload.single('photo'),
validateBody(updateContactSchema),
ctrlWrapper(updateContactController));


router.delete("/:contactId",
isValidId, 
ctrlWrapper(deleteContactController));

export default router;
