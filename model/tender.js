const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
    tenderId: {
        type: String,
        required: true,
        unique: true
    },
    tenderNumber: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: ['Goods', 'Services', 'Works'] // Can be expanded
    },
    publishDate: {
        type: Date,
        required: true
    },
    bidSubmissionDeadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Open', 'Closed', 'Awarded', 'Cancelled']
    },
    documents: [
        {
            documentType: String,
            documentUrl: String,
            documentSize: Number
        }
    ],
    contractDetails: {
        contractNumber: String,
        contractStartDate: Date,
        contractEndDate: Date,
    }
});

module.exports = mongoose.model('Tender', tenderSchema);