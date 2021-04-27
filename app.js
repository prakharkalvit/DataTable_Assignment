var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
const dotenv=require('dotenv');
var mongoose= require('mongoose');
dotenv.config({path:'./config.env'});
app.engine('hbs',exphbs());
app.set('view engine', 'hbs');
app.use(express.json());
const bookRouter=require('./routes/booksRoutes');
const DB=process.env.DATABASE_LOCAL;
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(con=>{
    console.log('db connection successfull');
}).catch(err=>{
    console.log(err);
});
const port=process.env.port;
app.use('/books',bookRouter);

app.listen(port,()=>{
    console.log('Server is listening on port'+port);
})
module.exports=app;
