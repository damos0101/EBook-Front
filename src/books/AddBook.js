import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddBook() {

    let navigate=useNavigate()

    const [book, setBook]=useState({
        title:"",
        year:"",
        author:"",
        description:""
    })

    const{title, year, author, description}=book

    const onInputChange=(e)=>{
        setBook({ ...book, [e.target.name]: e.target.value});
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/book", book)
        navigate("/")
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Додати нову книгу</h2>
                
                <form onSubmit={(e)=>onSubmit(e)}>
                <div className='mb-3'>
                    <label htmlFor='Title' className='form-label'>
                        Назва книги
                    </label>
                    <input type={'text'}
                    className='form-control'
                    placeholder='Введіть назву книги'
                    name='title'
                    value={title}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='Year' className='form-label'>
                        Рік видання
                    </label>
                    <input type={'number'}
                    className='form-control'
                    placeholder='Введіть рік видання книги'
                    name='year'
                    value={year}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='Author' className='form-label'>
                        Автор книги
                    </label>
                    <input type={'text'}
                    className='form-control'
                    placeholder='Введіть автора книги'
                    name='author'
                    value={author}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='Description' className='form-label'>
                        Опис книги
                    </label>
                    <input type={'text'}
                    className='form-control'
                    placeholder='Введіть опис книги'
                    name='description'
                    value={description}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <button type='submit' className='btn btn-outline-primary'>
                    Підтвердити
                </button>

                <Link className='btn btn-outline-danger mx-2' to="/" >
                    Відмінити
                </Link>
                </form>

            </div>
        </div>
    </div>
  )
}
