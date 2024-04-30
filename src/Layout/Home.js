import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api/index';

export const Home = () => {
  const [decks, setDecks] = useState([]);
  console.log('decks: ' + decks);

  //const navigate = useNavigate();

  //gets the list of decks
  useEffect(() => {
    async function getDecks() {
      const dataFromAPI = await listDecks();
      setDecks(dataFromAPI);
    }
    getDecks();
  }, []);

  // using deleteDeck from api helpers onClick event
  async function handleDelete(deckId) {
    const confirm = window.confirm(
      'Delete this deck? You will not be able to recover it.'
    );
    console.log('confirm' + confirm);
    if (confirm) {
      await deleteDeck(deckId);
      // Update the decks state after deleting a deck
      const updatedDecks = decks.filter((deck) => deck.id !== deckId);
      setDecks(updatedDecks);
    }
  }

  console.log('decks: ' + decks);

  return (
    <section className="home-container">
      {/* A Create Deck button is shown, and clicking it brings the user to the Create Deck screen. */}
      <Link to="/decks/new">
        <button>+ Create Deck</button>
      </Link>
      {/* Existing decks are each shown with the deck name, the number of cards, and a Study, View, and Delete button. */}
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {decks.map((deck) => (
            <li key={deck.id}>
              <div className="list-group-item">
                <div className="row">
                  <div className="col-auto mr-auto">
                    <h3>{deck.name}</h3>
                  </div>
                  <div className="col-auto">
                    <p>{deck.cards.length} cards</p>
                  </div>
                </div>
                <p>{deck.description}</p>
                <div className="row">
                  <div className="col-auto mr-auto">
                    <Link to={`/decks/${deck.id}`}>
                      <button>View</button>
                    </Link>
                    <Link to={`/decks/${deck.id}/study`}>
                      <button>Study</button>
                    </Link>
                  </div>
                  <div className="col-auto">
                    <button onClick={() => handleDelete(deck.id)}>
                      Delete Deck
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
