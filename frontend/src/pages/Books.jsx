import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Books() {
    const [books, setBooks] = useState([])

    useEffect(() =>{
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_DB_ENDPOINT)
                setBooks(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks()
    },[]);

   const handleDelete  = async (id) => {
        try {
            await axios.delete(process.env.REACT_APP_DB_ENDPOINT+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
   }
  return (
    <div >
       <h1>AI Comics</h1>
       <div className="books">
        {books.map(book =>(
            <div className="book" key={book.id}>
                <img src={process.env.REACT_APP_DB_UPLOADS+`${book.cover}`} alt="Book Cover" />
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>{book.price}$</span>
                <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                <button className='update'> <Link className='updateLink' to={`/update/${book.id}`}>Update</Link></button>
            </div>
        ))}
       </div>
        <button className='addButton'>
        <Link className='linkButton' to="/add">Add new book</Link>
        </button>

    </div>
  )
}

export default Books
