const document = require('../model/document');

exports.updateDocument = async (req, res) => {
    try {
        const {
            Name,
            PhoneNumber,
            DocumentType,
            CardNumber,
            Issue
        } = req.body;

        // Find the document by PhoneNumber
        const existingDocument = await document.findOne({ PhoneNumber });

        if (!existingDocument) {
            // User with PhoneNumber doesn't exist
            return res.status(400).json({ error: 'User with provided PhoneNumber does not exist' });
        }

        // Update existing document fields
        existingDocument.Name = Name;
        existingDocument.DocumentType = DocumentType;
        existingDocument.CardNumber = CardNumber;
        existingDocument.Issue = Issue;

        // Save the updated document
        const saveddocument = await existingDocument.save();
        res.status(200).json(saveddocument);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update document' });
    }
};

exports.createDocument = async (req, res) => {
    try {
        const {
            Name,
            PhoneNumber,
            DocumentType,
            CardNumber,
            Issue
        } = req.body;

        // Find the document by PhoneNumber
        const existingDocument = await document.findOne({ PhoneNumber });

        if (existingDocument) {
            // User with PhoneNumber doesn't exist
            return res.status(400).json({ error: 'User with provided PhoneNumber already exist exist' });
        }

        // Save the created document
        const createDoc = await document.create({Name,PhoneNumber,DocumentType,CardNumber,Issue});
        res.status(200).json(createDoc);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create document' });
    }
};

// To get documents for a specific officer
exports.getDocuments = async (req,res)=>{
    try {
        // const { officer } = req.params;
        // const documents = await Document.getDocumentsByOfficer(officer);
        // res.json(documents);
        console.log("hello")
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
}