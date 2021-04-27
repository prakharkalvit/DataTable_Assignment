const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    title: String,
    isbn: Number,
    pageCount: Number,
    publishedDate: String,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: String,
    authors: [String],
    categories: [String],
    price:Number,
    currency: String,
    discount: Number,
    discountUnits: String
});
const Book=mongoose.model('Book',bookSchema);
module.exports=Book;