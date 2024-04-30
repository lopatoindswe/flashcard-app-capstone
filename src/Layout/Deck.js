import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  readDeck,
  deleteCard,
  deleteDeck,
  listDecks,
  updateDeck,
} from '../utils/api/index';

function Deck() {
  const [cardsFromDeck, setCardsFromDeck] = useState([]);
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function loadDeck() {
      try {
        const data = await readDeck(deckId);
        setDeck(data);
        setCardsFromDeck(data.cards);
      } catch (error) {
        console.log(error);
      }
    }
    loadDeck();
  }, [deckId]);

  const handleCardDelete = ({ target }) => {
    const confirm = window.confirm(
      `Delete this card? You will not be able to recover it.`
    );
    if (confirm) {
      async function deleteData() {
        try {
          await deleteCard(target.value)
            .then(updateDeck(deckId))
            .then(window.location.reload());
        } catch (error) {
          console.log(error);
        }
      }
      deleteData();
    }
  };

  const handleDeckDelete = ({ target }) => {
    const message = window.confirm(
      `Delete this deck? You will not be able to recover it.`
    );
    if (message) {
      async function deleteData() {
        try {
          await deleteDeck(target.value);
          const data = await listDecks();
          setCardsFromDeck(data);
        } catch (error) {
          console.log(error);
        }
      }
      deleteData();
    }
  };

  // structure
  // breadcrums
  // title + body + button edit, study, add cards, delete
  // "Cards" Title
  //  Cards rectangle
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" key="0">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" key="2">
            {deck.name}
          </li>
        </ol>
      </nav>

      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <Link to={`/decks/${deckId}/edit`} className="btn btn-primary">
        Edit
      </Link>
      <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
        Study
      </Link>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        Add Cards
      </Link>
      <button
        onClick={handleDeckDelete}
        value={deck.id}
        className="btn btn-danger btn-icon"
      >
        Delete
      </button>
      <br />
      <br />

      <h2>Cards</h2>
      <div className="list-of-cards">
        {cardsFromDeck.map((card) => (
          <ul key={card.id}>
            <div className="list-group-item">
              <div className="row">
                <div className="col-auto mr-auto" style={{ maxWidth: 300 }}>
                  <p>{card.front}</p>
                </div>
                <div className="col-auto" style={{ maxWidth: 300 }}>
                  <p>{card.back}</p>
                </div>
              </div>

              <div className="row justify-content-end">
                <div className="col-auto">
                  <Link
                    to={`/decks/${deckId}/cards/${card.id}/edit`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger btn-icon"
                    onClick={handleCardDelete}
                    value={card.id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </ul>
        ))}
      </div>
    </>
  );
}

export default Deck;
