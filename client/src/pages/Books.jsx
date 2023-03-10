import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import {Link} from "react-router-dom"
const Books = ()  => {
    const [books,setBooks] = useState([])

    useEffect(()=>{
        //Async because making an api request
        const fetchAllBooks = async ()=> {
            try{
                //endpoint
                const res = await axios.get("http://localhost:8800/books")
                console.log(res)
                setBooks(res.data)
            }
            catch(err){
            console.log(err)
        }
        }
        fetchAllBooks();

    },[]);

    const handleDelete = async (id) =>{
        try {
            await axios.delete("http://localhost:8800/books/"+id)
            /*Refreshes page */
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Lama book Shop</h1>
            <div className="books">
                {/*Image can be null */}
                {/*Each book in array returns an img,
                title,desc and price */}
                {books.map(book=> (
                   <div className="book" key ={book.idbooks}>
                       {book.cover && <img src={books.cover} alt="" />}
                       <h2>{book.title}</h2>
                       <p>{book.desc}</p>
                       <span>{book.price}</span>
                       <button className="delete" onClick={()=>handleDelete(book.idbooks)}>Delete</button>
                       {/*Update button redirects to update page*/}
                       <button className="update">
                        <Link to={`/update/${book.idbooks}`}>Update</Link>
                       </button>
                       {/*Button to delete and update books on the shop*/}
                   </div> 
                ))}
            </div>
            <button>
                <Link to="/add">Add new book</Link>
            </button>
        </div>
    )
}

export default Books