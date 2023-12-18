import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewBook() {

    const [book, setBook]=useState({
        title:"",
        year:"",
        author:"",
        description:"",
    });

    const {id}=useParams();

    useEffect(()=>{
        loadBook();
    }, [])

    const loadBook=async ()=>{
        const result=await axios.get(`http://localhost:8080/book/${id}`);
        setBook(result.data);
    }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Подробиці книги</h2>
                <div className='card'>
                    <div className='card-header'>
                        Id книги: {book.id}
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Назва: </b>
                                {book.title}
                            </li>

                            <li className='list-group-item'>
                                <b>Рік видання: </b>
                                {book.year}
                            </li>

                            <li className='list-group-item'>
                                <b>Автор: </b>
                                {book.author}
                            </li>

                            <li className='list-group-item'>
                                <b>Опис книги: </b>
                                {book.description}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to={"/"}>Повернутись на головну</Link>
            </div>
        </div>
    </div>
  )
}
