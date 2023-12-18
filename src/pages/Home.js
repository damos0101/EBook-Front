import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;
    const [totalPages, setTotalPages] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        loadBooks();
    }, [currentPage]);

    useEffect(() => {
        getTotalPagesCount();
    }, []);

    const loadBooks = async () => {
        const startIndex = (currentPage - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        const result = await axios.get(`http://localhost:8080/books`);
        const booksToDisplay = result.data.slice(startIndex, endIndex);
        setBooks(booksToDisplay);
    };

    const getTotalPagesCount = async () => {
        const result = await axios.get(`http://localhost:8080/books`);
        const totalPagesCount = Math.ceil(result.data.length / booksPerPage);
        setTotalPages(totalPagesCount);
    };

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:8080/book/${id}`);
        getTotalPagesCount();
        loadBooks();
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }} scope="col">#</th>
                            <th style={{ width: '20%' }} scope="col">Назва</th>
                            <th style={{ width: '20%' }} scope="col">Рік видання</th>
                            <th style={{ width: '20%' }} scope="col">Автор</th>
                            <th style={{ width: '45%' }} scope="col">Дія</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={index}>
                                <th scope="row">{(currentPage - 1) * booksPerPage + index + 1}</th>
                                <td>{book.title}</td>
                                <td>{book.year}</td>
                                <td>{book.author}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2' to={`/viewBook/${book.id}`}>Переглянути</Link>
                                    <Link className='btn btn-outline-primary mx-2' to={`/editBook/${book.id}`}>Редагувати</Link>
                                    <button className='btn btn-danger mx-2' onClick={() => deleteBook(book.id)}>Видалити</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className='pagination justify-content-center'>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(i + 1)} className='page-link'>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
