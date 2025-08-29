import React from 'react';
import { useTeam } from '../../contexts/TeamContext';
import TeamCard from './TeamCard.jsx';

const TeamView = () => {
  const { team } = useTeam();
  const teamSlots = Array.from({ length: 6 }, (_, index) => team[index] || null);

  return (
    <div className="team-view">
      <h2>Your Team ({team.length}/6)</h2>
      <div className="team-grid">
        {teamSlots.map((pokemon, index) => (
          <div key={pokemon ? pokemon.id : `slot-${index}`} className="team-slot">
            {pokemon ? <TeamCard pokemon={pokemon} /> : <div className="empty-slot">Empty Slot</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamView;
