const express = require('express');
const router = express.Router();
const { db } = require('../firebase'); // Firestore instance
const MineIncharge = require('../models/mineIncharge');

// Add a new Mine Incharge
router.post('/mine-incharge', async (req, res) => {
  try {
    const mineIncharge = new MineIncharge(req.body);
    await db.collection('mineIncharges').doc(mineIncharge.id).set(mineIncharge.toJson());
    res.status(201).json({ message: 'Mine Incharge created successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Mine Incharges
router.get('/mine-incharges', async (req, res) => {
  try {
    const snapshot = await db.collection('mineIncharges').get();
    const mineIncharges = snapshot.docs.map((doc) =>
      MineIncharge.fromSnapshot(doc)
    );
    res.status(200).json(mineIncharges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a Mine Incharge by ID
router.get('/mine-incharge/:id', async (req, res) => {
  try {
    const doc = await db.collection('mineIncharges').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Mine Incharge not found' });
    }
    const mineIncharge = MineIncharge.fromSnapshot(doc);
    res.status(200).json(mineIncharge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Mine Incharge
router.put('/mine-incharge/:id', async (req, res) => {
  try {
    const updatedData = req.body;
    await db.collection('mineIncharges').doc(req.params.id).update(updatedData);
    res.status(200).json({ message: 'Mine Incharge updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Mine Incharge
router.delete('/mine-incharge/:id', async (req, res) => {
  try {
    await db.collection('mineIncharges').doc(req.params.id).delete();
    res.status(200).json({ message: 'Mine Incharge deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
