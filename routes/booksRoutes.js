var express = require('express');
var router = express.Router();
const bookController=require('./../Controllers/booksController');
router.route('/').get(bookController.getBooks);
    // res.render("booksDetails",{layout:false,books:})

module.exports=router;