import React from 'react';
import { Router } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import RootRoutes from './RootRoutes';

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <RootRoutes />
        {/* TODO: Implement the screen starting here
        <button> + Create Deck</button>
        <NotFound /> */}
      </div>
    </>
  );
}

export default Layout;
