const express = require('express');
const contactsController = require('../controllers/contactsController');

const router = express.Router();

// Define las rutas HTTP asociadas a la gestión de contactos.
router.get('/contacts', contactsController.getAll);
router.get('/contacts/:id', contactsController.getById);
router.post('/contacts', contactsController.create);
router.put('/contacts/:id', contactsController.update);
router.delete('/contacts/:id', contactsController.deleteById);

module.exports = router;
