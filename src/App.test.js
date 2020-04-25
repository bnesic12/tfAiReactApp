import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App is rendering properly', () => {
  render(<App />);
  //const { getByText } = render(<App />);
  //const linkElement = getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
