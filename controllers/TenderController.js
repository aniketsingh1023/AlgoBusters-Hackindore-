const Tender = require('../model/tender');

const generateTenderId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000); // Adjust range as needed
  return `TND-${timestamp}-${randomNum}`;
};

exports.CreateTender = async (req, res) => {
  try {
    const {
      tenderNumber,
      title,
      description,
      category,
      publishDate,
      bidSubmissionDeadline,
      documents
    } = req.body;

    const newTender = new Tender({
      tenderId: generateTenderId(), // Replace with your ID generation logic
      tenderNumber,
      title,
      description,
      category,
      publishDate: new Date(publishDate), // Convert to Date object
      bidSubmissionDeadline: new Date(bidSubmissionDeadline),
      documents,
      status: 'Open' // Default status
    });

    const savedTender = await newTender.save();
    res.status(201).json(savedTender);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create tender' });
  }
}

exports.getTender = async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.json(tenders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tenders' });
  }
}

exports.updateTender = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTender = req.body;
d
    const tender = await Tender.findByIdAndUpdate(id, updatedTender, { new: true });

    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }

    res.json(tender);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tender' });
  }
}

exports.deleteTender = async (req, res) => {
  try {
    const { id } = req.params;

    const tender = await Tender.findByIdAndDelete(id);

    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }

    res.json({ message: 'Tender deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tender' });
  }
}