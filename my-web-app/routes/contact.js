const express = require('express');
const router = express.Router();
const contact = require('../models/Contact');

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  try {
    const newContact = new contact({
      name,
      email,
      phone,
      message
    });

    await newContact.save();
    res.status(200).json({ message: 'Formulario enviado correctamente' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Error al guardar el contacto' });
  }
});

module.exports = router;