import React, { MouseEvent } from 'react';

import Image from 'components/image';
import { PokemonDataProps } from 'components/pokemon-card';

import { ReactComponent as Close } from 'assets/close.svg';

import { pokemonColor } from 'utils/pokemon-type-color';
import { numberToKg, numberToMeter } from 'utils/tools';

import './modal.css';

interface ModalProps {
  onClose: () => void;
  showModal: boolean;
  pokemon: PokemonDataProps;
}
const Modal: React.FC<ModalProps> = ({ pokemon, onClose, showModal }) => {
  //close modal if click outside visible area
  const handleClose = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (pokemon === undefined) {
    return null;
  }

  const genderPercentage =
    pokemon.species.gender_rate !== -1 ? (pokemon.species.gender_rate / 8) * 100 : 0;

  const pokemoneBackgroundColor = pokemonColor(pokemon.types[0].type.name);
  return (
    <section className="modal-container" onClick={e => handleClose(e)} id="modal">
      <div className="modal-content">
        <header className="headerModal" style={{ backgroundColor: pokemoneBackgroundColor }}>
          <span className="pokemonId">N: #{pokemon.id}</span>
          <h1>{pokemon.name}</h1>
          <Image image={pokemon.sprites.front_default} />
          <div onClick={onClose} className="closeWrapper">
            <Close stroke="#ebebeb" strokeWidth={10} />
          </div>
        </header>

        <div className="paddingHorizontal">
          <div>
            <h2
              className="paddingHorizontal"
              style={{
                backgroundColor: pokemoneBackgroundColor,
              }}>
              Description
            </h2>
            <p className="paddingHorizontal">
              {pokemon.species.flavor_text_entries[0].flavor_text}
            </p>
          </div>

          <div>
            <h2
              className="paddingHorizontal"
              style={{
                backgroundColor: pokemoneBackgroundColor,
              }}>
              Informations
            </h2>
            <div className="paddingHorizontal flex">
              <div className="flex05">
                <div>
                  <b>Type: </b>
                  {pokemon.types.map((type, i) => (
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
                <div>
                  <b>HEIGHT:</b> {numberToMeter(pokemon.height)}
                </div>
                <div>
                  <b>WEIGHT:</b> {numberToKg(pokemon.weight)}
                </div>
              </div>

              <div className="flex05">
                <div>
                  <b>CATCH RATE:</b> {pokemon.species.capture_rate}%
                </div>
                <div>
                  <b>GENDER:</b> ♀ {genderPercentage}% | ♂ {100 - genderPercentage}%
                </div>

                <div>
                  <b>ABILITIES: </b>
                  {pokemon.abilities.map((ability, i) => (
                    <span key={i}>
                      {`${ability.ability.name}${ability.is_hidden ? ' (ability hidden)' : ''}${
                        i < pokemon.abilities.length - 1 ? ', ' : ''
                      } `}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2
              className="paddingHorizontal"
              style={{
                backgroundColor: pokemoneBackgroundColor,
              }}>
              Moves
            </h2>

            <div className="flex movesWrapper paddingHorizontal">
              {pokemon.moves.map((move, i) => (
                <div className="moveName" key={i}>
                  {move.move.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
