import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api/index';
import FormCard from './FormCard';

function CreateCard() {
  const { deckId } = useParams();

  const initialCard = {
    front: '',
    back: '',
    deckId,
  };

  const [card, setCard] = useState({ ...initialCard });
  const [deck, setDeck] = useState([]);

  const navigate = useNavigate();

  //should call the read deck function and set the name of the deck to the deckName state,
  //also set the deck description to the deckDescription state
  useEffect(() => {
    async function loadData() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deckId, card);
    setCard(initialCard);
    navigate(`/decks/${deckId}`);
  };

  console.log('deck is', deck);
  console.log('card is', card);

  return (
    <div>
      {/* breadcrums */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" key="0">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" key="1">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" key="2">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>Add Card</h2>
      <FormCard formData={card} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <Link to={`/decks/${deckId}`} className="btn btn-secondary">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default CreateCard;
