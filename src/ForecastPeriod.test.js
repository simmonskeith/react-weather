import { render, screen } from '@testing-library/react';
import { ForecastPeriod } from './ForecastPeriod';

const period = {
    number: 7,
    name:" Saturday Night",
    temperature: 65,
    temperatureUnit: "F",
    windSpeed: "5 mph",
    windDirection: "NW",
    icon: "https://api.weather.gov/icons/land/night/sct?size=medium",
    shortForecast: "Partly Cloudy",
    detailedForecast: "Partly cloudy, with a low around 65."
};

test('renders forecast heading', () => {
    render(<table><tbody><ForecastPeriod period={period}/></tbody></table>);
    const forecastName = screen.getByRole('heading');
    expect(forecastName).toHaveTextContent("Saturday Night");
});

test('renders forecast temperature', () => {
    render(<table><tbody><ForecastPeriod period={period}/></tbody></table>);
    const tempElement = screen.getByText(/Temperature:/i);
    expect(tempElement).toHaveTextContent("Temperature: 65 F");
});

test('renders forecast wind', () => {
    render(<table><tbody><ForecastPeriod period={period}/></tbody></table>);
    const windElement = screen.getByText(/Wind:/i);
    expect(windElement).toHaveTextContent("Wind: 5 mph NW");
});

test('renders forecast detailed forecast', () => {
    render(<table><tbody><ForecastPeriod period={period}/></tbody></table>);
    const detailedForecastElement = screen.getByText(period.detailedForecast);
    expect(detailedForecastElement).toBeInTheDocument();
});