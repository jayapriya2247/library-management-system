const mongoose = require("mongoose");


const issueSchema = new mongoose.Schema({

    bookId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Book",

        required: true

    },


    memberId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Member",

        required: true

    },


    issueDate: {

        type: Date,

        default: Date.now

    },


    returnDate: {

        type: Date,

        required: true

    },


    status: {

        type: String,

        default: "Issued"

    }


});


module.exports = mongoose.model("Issue", issueSchema);