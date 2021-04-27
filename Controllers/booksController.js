const Book=require('./../models/bookModel');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE_LOCAL;
exports.getBooks= async(req,res)=>{
    try{
        let query= Book.find().lean();
        //(1)Sorting
        if(req.query.sort)
        {
            const sortBy=req.query.sort.split(',').join(' ');
            console.log(sortBy);
            query=query.sort(sortBy);
            //for descending ?sort=-price
        }
        else{
            query=query.sort('--title');
        }

        //(2)Pagination
        const page=req.query.page*1 || 1;
        const limit=req.query.limit*1 || 10;
        const skip=(page-1)*limit;
        query=query.skip(skip).limit(limit);
        if(req.query.page)
        {
            const numTours= await Book.countDocuments();
            if(skip>= numTours) throw new Error('This page does not exist');
        }
        //Execute Query
        const books=await query;
        res.render("booksTable",{layout:false,books:books})
        // res.status(200).json({
        //     status:'success',
        //     books: books
        // });
    }catch(err)
    {
    //    res.status(404).json({
    //        status:'fail',
    //         message:err
    //    });
    }
    
}