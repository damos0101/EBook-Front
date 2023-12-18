// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">E-book</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex flex-grow-1 justify-content-center">
            <Link className="btn btn-outline-light me-2" to="/addBook">Додати нову книжку</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
