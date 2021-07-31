import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import MockIntersectionObserver from '../__mocks__/intersectionObserverMock';
window.IntersectionObserver = MockIntersectionObserver;

test('render pokemon text', () => {
  render(<App />);
  const linkElement = screen.getByText(/pokémon/i);
  expect(linkElement).toBeInTheDocument();
});
