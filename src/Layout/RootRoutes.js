import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateDeck from './CreateDeck';
import Study from './Study';
import Deck from './Deck';
import EditDeck from './EditDeck';
import EditCard from './EditCard';
import CreateCard from './CreateCard';
import NotFound from "./NotFound";

// Home	/	Shows a list of decks with options to create, study, view, or delete a deck
// Study	/decks/:deckId/study	Allows the user to study the cards from a specified deck
// Create Deck	/decks/new	Allows the user to create a new deck
// Deck	/decks/:deckId	Shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck
// Edit Deck	/decks/:deckId/edit	Allows the user to modify information on an existing deck
// Add Card	/decks/:deckId/cards/new	Allows the user to add a new card to an existing deck
// Edit Card	/decks/:deckId/cards/:cardId/edit	Allows the user to modify information on an existing card

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="decks/new" element={<CreateDeck />} />
      <Route path="decks/:deckId" element={<Deck />} />
      <Route path="decks/:deckId/edit" element={<EditDeck />} />
      <Route path="decks/:deckId/study" element={<Study />} />
      <Route path="decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
      <Route path="decks/:deckId/cards/new" element={<CreateCard />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default RootRoutes;
