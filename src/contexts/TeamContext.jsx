import React, { createContext, useState, useEffect, useContext } from 'react';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(() => {
    try {
      const storedTeam = localStorage.getItem('pokemonTeam');
      return storedTeam ? JSON.parse(storedTeam) : [];
    } catch (error) {
      console.error("Failed to parse team from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pokemonTeam', JSON.stringify(team));
    } catch (error) {
      console.error("Failed to save team to localStorage:", error);
    }
  }, [team]);

  const addPokemonToTeam = (pokemon) => {
    setTeam((prevTeam) => {
      if (prevTeam.length < 6 && !prevTeam.some((p) => p.id === pokemon.id)) {
        return [...prevTeam, pokemon];
      }
      return prevTeam;
    });
  };

  const removePokemonFromTeam = (pokemonId) => {
    setTeam((prevTeam) => prevTeam.filter((p) => p.id !== pokemonId));
  };

  const isPokemonInTeam = (pokemonId) => {
    return team.some((p) => p.id === pokemonId);
  };

  return (
    <TeamContext.Provider
      value={{
        team,
        addPokemonToTeam,
        removePokemonFromTeam,
        isPokemonInTeam,
        teamSize: team.length,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};
