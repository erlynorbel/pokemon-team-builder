import React from 'react';
import { useTeam } from '../../contexts/TeamContext';

const PokedexCard = ({ pokemon }) => {
  const { addPokemonToTeam, isPokemonInTeam, teamSize } = useTeam();
  const isInTeam = isPokemonInTeam(pokemon.id);
  const isTeamFull = teamSize >= 6;

  const handleAddToTeam = () => {
    if (!isInTeam && !isTeamFull) {
      addPokemonToTeam(pokemon);
    }
  };

  return (
    <div className="pokedex-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>ID: {pokemon.id}</p>
      <button
        onClick={handleAddToTeam}
        disabled={isInTeam || isTeamFull}
      >
        {isInTeam ? 'In Team' : isTeamFull ? 'Team Full' : 'Add to Team'}
      </button>
    </div>
  );
};

export default PokedexCard;
