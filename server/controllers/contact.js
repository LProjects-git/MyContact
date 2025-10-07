const express = require('express');
const contact = require('../models/contact');
const user = require('../models/user');
const requireAuth = require('../middlewares/requireAuth'); 
const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
    try {
        const contacts = await contact.find({user:req.user.userId});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body;
        const user = req.user;
        const newContact = new contact({user: req.user.userId,firstName, lastName, phone });
        await newContact.save();
        res.status(201).json({message:"Contact created", contact : newContact});
    }   catch (error) { 
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' , error});
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body;
        const updatedContact = await contact.findByIdAndUpdate(
        req.params.id, { firstName, lastName, phone });
        res.status(200).json({ contact: updatedContact });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        }
});

router.delete('/:id', async(req, res) => {
    try {
        await contact.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;