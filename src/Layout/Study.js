import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { readDeck } from '../utils/api';

function Study() {
  // get cards from the deck
  const [cardsFromDeck, setCardsFromDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [deck, setDeck] = useState({});
  const [cardFront, setCardFront] = useState(true);
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

  function flip() {
    setCardFront(!cardFront);
  }

  function next() {
    // if there is a next card in the deck
    if (currentCardIndex + 1 < cardsFromDeck.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      setCardFront(true);
      // if there is no next card adter click on next we need to show restart popup
    } else {
      const confirm = window.confirm(
        `Restart cards? Click 'cancel' to return to home page.`
      );

      if (confirm) {
        setCurrentCardIndex(0);
        setCardFront(true);
      } else {
        navigate('/');
      }
    }
  }



  function BreadCrumb() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item" key ="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page" key="2">Study</li>
            </ol>
        </nav>
    )
}




  // nav breadcrums
  // header
  // Card with Flip button

  if (cardsFromDeck.length >= 3) {
    return (
      <div className="study">
        <BreadCrumb/>
        <h2>Study: {deck.name}</h2>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Card {currentCardIndex + 1} of {cardsFromDeck.length}{' '}
            </h4>
            <p className="card-text">
              {cardFront
                ? `${cardsFromDeck[currentCardIndex].front}`
                : `${cardsFromDeck[currentCardIndex].back}`}
            </p>
            <button onClick={flip}>Flip</button>
            {cardFront ? null : <button onClick={next}>Next</button>}
          </div>
        </div>
      </div>
    );
  } else {
    return(
        <><BreadCrumb/>
            <h2>Study: {deck.name}</h2>
    <div className="card">
        <div className="card-body">
            <h4 className="card-title">Not Enough Cards</h4>
            <p className="card-text">You need at least 3 cards to study. There are {cardsFromDeck.length} cards in this deck. </p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
        </div>
    </div>
</>
    )
  }
}

export default Study;
