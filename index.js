let express=require("express");
let bodyParser=require("body-parser");
let mongoose=require("mongoose");

const app=express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://localhost:27017/Database');
let db=mongoose.connection;
db.on('error',()=> console.log("Error in Connecting to Database"));
db.once('open',()=> console.log("Connected to Database"));

app.post("/sign_up",(req,res) => {
    let name= req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let contact=req.body.contact;
    let gender=req.body.gender;

    let data={
        "name":name,
        "email":email,
        "password":password,
        "contact":contact,
        "gender":gender,
    };

    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully");
    });
    return res.redirect('signup_successful.html');
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html');
}).listen(8080);

console.log("Listening on port 8080");