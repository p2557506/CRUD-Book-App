import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = ()  => {
    //Taking data from inputs => use UseState
    const [book,setBook] = useState({
        title:"",
        desc:"",
        cover:"",
        price:null,
    });

    const navigate = useNavigate()
    //Arrow function 
    const handleChange = (e) =>{
        setBook(prev=>({...prev, [e.target.name]: e.target.value}));

    };

    const handleClick = async (e) => {
        //e.preventDefault() stops browser from refreshing everytime button is clicked
        e.preventDefault()
        //Axios used to communicate with backend, in this case to send data, function should be async when making api requests
        try{
            //Sending JSON Object to endpoint
            await axios.post("http://localhost:8800/books",book)
            navigate("/")

        }catch(err){
            console.log(err)
        }

    }

    console.log(book)
    return (
        //Form section
        <div className="form">
            <h1>Add</h1>
            <input type="text" placeholder="title" onChange={handleChange} name="title" />
            <input type="text" placeholder="desc" onChange={handleChange} name="desc" />
            <input type="text" placeholder="cover" onChange={handleChange} name="cover"/>
            <input type="number" placeholder="price"onChange={handleChange} name="price"/>
            {/*Button sends fields to backend server when clicked */}
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add