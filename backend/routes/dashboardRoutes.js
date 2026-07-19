const express = require("express");

const Book = require("../models/Book");
const Member = require("../models/Member");
const Issue = require("../models/Issue");

const router = express.Router();


// ========================================
// DASHBOARD COUNT API
// ========================================

router.get("/", async (req, res) => {

    try {


        const totalBooks = await Book.countDocuments();


        const totalMembers = await Member.countDocuments();


        const issuedBooks = await Issue.countDocuments({
            status: "Issued"
        });


        const returnedBooks = await Issue.countDocuments({
            status: "Returned"
        });



        res.json({

            totalBooks,

            totalMembers,

            issuedBooks,

            returnedBooks

        });



    }
    catch(error){


        res.status(500).json({

            error: error.message

        });


    }


});



module.exports = router;