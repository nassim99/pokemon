import React from 'react';

import Image from 'components/image';
import { pokemonColor } from 'utils/pokemon-type-color';

export type PokemonDataProps = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  species: {
    gender_rate: number;
    capture_rate: number;
    flavor_text_entries: Array<{
      flavor_text: string;
    }>;
  };
};

interface PokemonCardProps {
  item: PokemonDataProps;
  onPress: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ item, onPress }) => {
  return (
    <div className="pokemonCard" onClick={onPress}>
      <div className="pokemonIdCard">#{item.id}</div>
      <div
        className="flex pokemonImageWrapper"
        style={{
          backgroundColor: pokemonColor(item.types[0].type.name),
        }}>
        <Image image={item.sprites.front_default} />
      </div>
      <div className="pokemonNameWrapper">
        <h3>{item.name}</h3>
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
