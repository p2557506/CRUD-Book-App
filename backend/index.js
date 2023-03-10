import express from "express"
import mysql from "mysql"
import cors from 'cors'


const app = express()

//Create connection to db
//Also use db to run queries
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"test"
})

//If there is a auth problem run this in workbench
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

//Allows us to send any json file using a client
app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    //Send message to user
    res.json("hello this is the backend")
})

app.get("/books", (req,res)=>{
    //return all books in db
    //sql query needed
    const query = "SELECT * FROM books"
    db.query(query,(err,data)=>{
        //Return either error or data if there is no problem
        if(err) return res.json(err)
        return res.json(data)
    })
    
})

app.post("/books", (req,res)=>{
    const query = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)"
    const values = [
        /**"title from backend",
        "desc from backend",
        "cover pic from backend"*/
        //Better alternative to hardcoding
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];

    db.query(query,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created successfully")
    });
});
/*End point is /books, this is the location the api recieves requests from*/
/*Method to delete book*/
app.delete("/books/:idbooks", (req,res)=>{
    const bookId = req.params.idbooks;
    const q = "DELETE FROM books WHERE idbooks = ?";

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully");
    });

});
/**New request endpoint */
app.put("/books/:idbooks", (req,res)=>{
    const bookId = req.params.idbooks;
    /*SQL squery that changes the book's title,desc,price and cover */
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE idbooks = ?";

    const values = [
        /**"title from backend",
        "desc from backend",
        "cover pic from backend"*/
        //Better alternative to hardcoding
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];

    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully");
    });

});

app.listen(8800, ()=>{
    console.log("Connected to backend!")
});
