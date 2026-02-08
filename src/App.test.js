import { render, screen } from '@testing-library/react';

import { ForecastWrapper } from './ForecastWrapper';


test('renders get forecast button', () => {
  render(<ForecastWrapper />);
  const getForecastButton = screen.getByText(/Get Forecast/i);
  expect(getForecastButton).toBeInTheDocument();
});
