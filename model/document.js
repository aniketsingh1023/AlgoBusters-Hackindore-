const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        IssuedOfficer: {
            type: String,
            enum: ['adhar', 'pan', 'noc'],
        },
        Name: {
            type: String,
            required: true,
        },
        PhoneNumber: {
            type: String,
            default: false
        },
        DocumentType: {
            enum: ['adhar', 'pan', 'noc'],
        },
        CardNumber: {
            type: Number,
            required: true,
        },
        Issue: {
            type: String,
        },
    }
);

documentSchema.statics.getDocumentsByOfficer = async function (officer) {
    return await this.find({ IssuedOfficer: officer });
};

module.exports = mongoose.model("document", documentSchema);