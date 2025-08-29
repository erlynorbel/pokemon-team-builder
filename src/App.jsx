import React from 'react';
import { TeamProvider } from './contexts/TeamContext';
import Pokedex from './components/Pokedex/Pokedex';
import TeamView from './components/TeamView/TeamView';
import './styles/App.css'; // Your main CSS file

function App() {
  return (
    <TeamProvider>
      <div className="app">
        <h1>Pokémon Team Builder</h1>
        <div className="main-content">
          <Pokedex />
          <TeamView />
        </div>
      </div>
    </TeamProvider>
  );
}

export default App;