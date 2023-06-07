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
    setBook((prev) => ({ ...prev, cover: e.target.files[0] }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', book.title);
      formData.append('desc', book.desc);
      formData.append('price', book.price);
      formData.append('image', book.cover);

      await axios.post(process.env.REACT_APP_DB_ENDPOINT+'upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  console.log(book)
  return (
    <form className='form'>
      <h1>Add a new book</h1>
      <input type='text' placeholder='Title' onChange={handleChange} name='title' />
      <input type='text' placeholder='Description' onChange={handleChange} name='desc' />
      <input type='number' placeholder='Price' onChange={handleChange} name='price' />
      <input type='file' name='image' onChange={handleImageChange} />
      <button className='formButton' onClick={handleClick}>
        Add
      </button>
    </form>
  );
};

export default Add
