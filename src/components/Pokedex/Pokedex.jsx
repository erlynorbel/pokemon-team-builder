import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import PokedexCard from './PokedexCard.jsx';
import SearchBar from '../SearchBar.jsx';
import LoadingSpinner from '../LoadingSpinner.jsx';

const Pokedex = () => {
  const { data, loading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDetailedPokemon = async () => {
      if (data && data.results) {
        const detailedPromises = data.results.map(async (p) => {
          const response = await fetch(p.url);
          return response.json();
        });
        const detailedPokemon = await Promise.all(detailedPromises);
        setPokemonList(detailedPokemon);
      }
    };
    fetchDetailedPokemon();
  }, [data]);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="pokedex">
      <h2>Pokédex</h2>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <PokedexCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
