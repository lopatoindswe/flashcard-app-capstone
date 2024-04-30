import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  readDeck,
  deleteCard,
  deleteDeck,
  listDecks,
  updateDeck,
} from '../utils/api/index';

function EditDeck() {
  const [deck, setDeck] = useState({ name: '', description: '' });
  const { deckId } = useParams();

  const navigate = useNavigate();

  //should call the read deck function and set the name of the deck to the deckName state,
  //also set the deck description to the deckDescription state
  useEffect(() => {
    async function loadDeck() {
      try {
        const data = await readDeck(deckId);
        setDeck(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setDeck({ ...deck, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    async function updateData() {
      try {
        await updateDeck(deck);
        navigate(`/decks/${deckId}`);
      } catch (error) {
        console.log(error);
      }
    }
    updateData();
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" key="0">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" key="1">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" key="2">
            Edit
          </li>
        </ol>
      </nav>

      <h2>Edit Deck</h2>
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
        <label htmlFor="email">
          Description
          <input
            id="email"
            type="text"
            name="description"
            onChange={handleChange}
            value={deck.description}
          />
        </label>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
