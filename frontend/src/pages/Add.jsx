import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';


function Add() {
    const[book, setBook] = useState({
        title:"",
        desc:"",
        price: null,
        cover: null
    });

    const navigate = useNavigate()

  const handleChange = (e) => {
    setBook((prev) => ({...prev, [e.target.name]: e.target.value}))
  };

  const handleImageChange = (e) => {
    setBook((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleClick = async e => {
    e.preventDefault()
    try {
        await axios.post(process.env.REACT_APP_DB_ENDPOINT, book)
        navigate("/")
    } catch (err) {
        console.log(err)
    }
  };

  console.log(book)
  return (
    <div className='form'>
        <h1> Add a new book</h1>
        <input type="text" placeholder='title' onChange={handleChange} name='title'/>
        <input type="text" placeholder='desc ' onChange={handleChange} name='desc'/>
        <input type="number" placeholder='price' onChange={handleChange} name='price'/>
        <input type="file" name="cover" onChange={handleImageChange} />
        <button className="formButton" onClick={handleClick}> Add</button>
    </div>
  )
};

export default Add
