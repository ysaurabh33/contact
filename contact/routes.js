const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/contacts', controller.getContact);
router.post('/contacts', controller.addContact);
router.put('/contacts/:id', controller.updateContact);
router.delete('/contacts/:id', controller.deleteContact);
router.get('/search/:keyword', controller.searchContact);
router.get('/sort/:keyword', controller.sortContact);

module.exports.router = router;