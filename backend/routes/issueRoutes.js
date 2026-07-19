const express = require("express");
const Issue = require("../models/Issue");
const Book = require("../models/Book");

const router = express.Router();


// ===============================
// ISSUE BOOK
// ===============================

router.post("/", async (req, res) => {

    try {

        const {
            bookId,
            memberId,
            returnDate
        } = req.body;



        const book = await Book.findById(bookId);


        if(!book){

            return res.status(404).json({
                message:"Book not found"
            });

        }



        const issue = new Issue({

            bookId,
            memberId,
            returnDate

        });



        await issue.save();



        res.status(201).json({

            message:"Book issued successfully",

            issue

        });



    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

});





// ===============================
// GET ALL ISSUED BOOKS
// ===============================

router.get("/", async(req,res)=>{

    try{


        const issues = await Issue.find()

        .populate("bookId")

        .populate("memberId");


        res.json(issues);


    }
    catch(error){


        res.status(500).json({

            error:error.message

        });


    }


});





// ===============================
// RETURN BOOK
// ===============================

router.put("/:id", async(req,res)=>{

    try{


        const issue = await Issue.findByIdAndUpdate(

            req.params.id,

            {
                status:"Returned"
            },

            {
                new:true
            }

        );


        res.json({

            message:"Book returned successfully",

            issue

        });



    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }


});



module.exports = router;