import { render, screen } from '@testing-library/react';
import App from './App';

test('renders get forecast button', () => {
  render(<App />);
  const getForecastButton = screen.getByText(/get forecast/i);
  expect(getForecastButton).toBeInTheDocument();
});
