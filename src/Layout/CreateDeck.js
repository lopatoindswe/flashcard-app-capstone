import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createDeck } from '../utils/api';

function CreateDeck() {
  const [deck, setDeck] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  //   const handleChange = ({ target }) => {
  //     setDeck({
  //       ...deck,
  //       [target.name]: target.value,
  //     });
  //   };

  const handleChange = (event) => {
    setDeck({
      ...deck,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createDeck(deck);
    navigate('/');
  };

  console.log(deck);
  return (
    <>
      <nav className="breadcrums" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <div className="CreateDeck">
        <h1>CreateDeck</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              value={deck.name}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              type="text"
              name="description"
              onChange={handleChange}
              value={deck.description}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default CreateDeck;
