import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Modal from '../index';
import data from './pokemon.json';
import { PokemonDataProps } from 'types/pokemon-data';
import { pokemonColor } from 'utils/pokemon-type-color';

let pokemon: undefined | PokemonDataProps = data;
const closeModal = jest.fn(() => (pokemon = undefined));

describe('Modal Component', () => {
  beforeEach(() => {
    render(<Modal pokemon={pokemon} onClose={closeModal} />);
  });

  it('should modal render pokemon data', () => {
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toHaveStyle('background-color: ' + pokemonColor('grass'));
  });
  it('test close button', async () => {
    expect(pokemon).not.toBe(undefined);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('closeButton'));
    expect(closeModal).toBeCalledTimes(1);
  });
  it('test matched snapshot', async () => {
    expect(screen.getByTestId('modalContainer')).toMatchSnapshot();
  });
});
