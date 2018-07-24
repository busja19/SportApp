var express = require("express"); 
var app = express(); 
const path  = require('path');
const VIEWS = path.join(__dirname, 'views');    


app.set('view engine', 'jade');

var mysql = require('mysql'); //allow install mysql


app.use(express.static("scripts")); // allow the application to access the cripts folder contents to use in the application.
app.use(express.static("images"));


//function to set up a simple hello response



const db = mysql.createConnection({
  
host: 'den1.mysql6.gear.host',
user: 'nodedatabase',
password: 'Kn6E69-nlY9-',
database: 'nodedatabase'
}); 

db.connect((err) => {
  if(err){
    console.log("You Broke it...")
   // throw(err)
  }
  else{
  
  console.log("Getting there liam it connected...")
  }
});

// End establish connection



//create a database table

app.get('/createtable', function(req,res){
  let sql = 'CREATE TABLE products (Id int NOTNULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Price int, Image varchar(255), Activity varchar (255));'
  let query = db.query(sql,(err,res)=>{
    if (err) throw err;
    console.log(res);
});
  res.send("Table Created!")
});


app.get('/tables', function(req,res){
  let sql = 'SELECT * FROM INFORMATION_SCHEMA.TABLES'
  let query = db.query(sql,(err,res)=>{
    if (err) throw err;
    console.log(res);
});
  res.send("Table Created!")
});




//end create  table


//sql insert data example
app.get('/insert', function(req,res){
  let sql = 'INSERT INTO products (Name, Price, Image, Activity) VALUES ("Polar M400", 199, "polarm400.png", "Running");'
  let query = db.query(sql,(err,res)=>{
    if (err) throw err;
    console.log(res);
});
  res.send("Item Created!")
});


//end sql data example



//sql QUERY to show example
app.get('/queryme', function(req,res){
  let sql = 'SELECT * FROM products'
  let query = db.query(sql,(err,res)=>{
    if (err) throw err;
    console.log(res);
});
  res.send("Look at the console!")
  
  
});

//end sql QUERY to show example

//function to render the home page
app.get('/',function(req, res){
res.render('index', {root:VIEWS});
  console.log("this is my first app");
  });



// function to render the products
app.get('/products', function(req, res){
 let sql = 'SELECT * FROM products;'
  let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1);

    res.render('products', {root: VIEWS,res1});
  });
 
  console.log("Now you are on the products page!");
});




// function to render the individual products
app.get('/item/:id', function(req, res){
 let sql = 'SELECT * FROM products WHERE Id = ;'
  let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1);

    res.render('item', {root: VIEWS,res1});
  });
 
  console.log("Now you are on the individual product page!");
});






// used to output activity in the console
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function()
            {console.log("It is running!");
            });

