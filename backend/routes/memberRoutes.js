const express = require("express");
const Member = require("../models/Member");

const router = express.Router();


// ==============================
// ADD MEMBER
// ==============================

router.post("/", async (req, res) => {

    try {

        const member = new Member(req.body);

        await member.save();

        res.status(201).json({
            message: "Member added successfully",
            member
        });

    }
    catch(error){

        res.status(500).json({
            error: error.message
        });

    }

});




// ==============================
// GET ALL MEMBERS
// ==============================

router.get("/", async (req,res)=>{

    try{

        const members = await Member.find();

        res.json(members);

    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

});




// ==============================
// GET SINGLE MEMBER
// ==============================

router.get("/:id", async(req,res)=>{

    try{

        const member = await Member.findById(req.params.id);

        res.json(member);

    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

});




// ==============================
// UPDATE MEMBER
// ==============================

router.put("/:id", async(req,res)=>{

    try{

        const member = await Member.findByIdAndUpdate(

            req.params.id,

            req.body,

            {new:true}

        );


        res.json({

            message:"Member updated successfully",

            member

        });

    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

});




// ==============================
// DELETE MEMBER
// ==============================

router.delete("/:id", async(req,res)=>{

    try{


        await Member.findByIdAndDelete(req.params.id);


        res.json({

            message:"Member deleted successfully"

        });


    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

});



module.exports = router;