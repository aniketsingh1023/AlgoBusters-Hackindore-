// // const deptCategorySchema=require('../model/deptCategory');

// // exports.getCategoryStatus=async (req,res) => {
// //     try {
// //         //fetch the category status
// //         //i have 2 buttons on frontend-approve/reject
// //         //if call from frontend is approve 
// //         // then make deptCatStatus=true
// //         //else false;

// //     } catch (e) {
// //         console.error(error);
// // 		return res.status(500).json({
// // 			success: false,
// // 			message: "Unable to get department status",
// // 		});
// //     }
// // }



// const express = require('express');
// c
// const bodyParser = require('body-parser');
// const deptCategorySchema = require('../model/deptCategory');
// app.use(bodyParser.json());

// exports.getCategoryStatus = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { action } = req.body;

//         // Validate action
//         if (!['approve', 'reject'].includes(action)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid action. Use 'approve' or 'reject'.",
//             });
//         }


//         // Update the category status based on the action
//         const newStatus = action === 'approve';

//         // Update the category status in the database
//         const updatedDeptCategory = await deptCategorySchema.findByIdAndUpdate(
//             id,
//             { deptCatStatus: newStatus },
//             { new: true, runValidators: true }
//         );

//         if (!updatedDeptCategory) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Department category not found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: updatedDeptCategory,
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Unable to get department status",
//         });
//     }
// }

// module.exports = app;