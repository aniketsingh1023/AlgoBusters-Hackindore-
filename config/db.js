const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {})
    .then(() => console.log("DB Connection Successful"))
    .catch( (error) => {
        console.log("Issue");
        console.error(error.message);
        process.exit(1);
    } );
}

module.exports = dbConnect;