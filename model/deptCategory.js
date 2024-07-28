const mongoose = require("mongoose");

const deptCategorySchema = new mongoose.Schema(
    {
        dept: {
            type:String,
            required:true,
        },
        //0->to reject
        //1->to approve
        deptCatStatus: {
            type:Boolean,
            default:false
        }
    }
);

module.exports = mongoose.model("deptCategorySchema", deptCategorySchema);