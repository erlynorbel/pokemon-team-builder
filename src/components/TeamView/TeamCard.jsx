import React from 'react';
import { useTeam } from '../../contexts/TeamContext';

const TeamCard = ({ pokemon }) => {
  const { removePokemonFromTeam } = useTeam();

  return (
    <div className="team-card" onClick={() => removePokemonFromTeam(pokemon.id)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <span className="remove-button">X</span>
    </div>
  );
};

export default TeamCard;
