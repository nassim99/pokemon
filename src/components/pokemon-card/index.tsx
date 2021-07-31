import React from 'react';

import Image from 'components/image';
import { pokemonColor } from 'utils/pokemon-type-color';
import { PokemonDataProps } from 'types/pokemon-data';

interface PokemonCardProps {
  item: PokemonDataProps;
  onPress: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ item, onPress }) => {
  return (
    <div data-testid="pokemonCard" className="pokemonCard" onClick={onPress}>
      <div className="pokemonIdCard">#{item.id}</div>
      <div
        className="flex pokemonImageWrapper"
        style={{
          backgroundColor: pokemonColor(item.types[0].type.name),
        }}>
        <Image image={item.sprites.front_default} />
      </div>
      <div className="pokemonNameWrapper">
        <h3 data-testid="pokemonName">{item.name}</h3>
        <div className="flex typesWrapper">
          {item.types.map((type, i) => (
            <span
              key={i}
              className="typeName"
              style={{
                color: pokemonColor(type.type.name),
              }}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
