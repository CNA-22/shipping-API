const express = require('express')
const router = express.Router();



router.post('/:userId', (req,res) =>{
    id = req.params.userId
    res.status(200).json({
        id: id,
        message: "Email Sent Successfully",
    });
});

module.exports = router;
