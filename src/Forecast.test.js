import { render, screen } from '@testing-library/react';
import { Forecast } from './Forecast';


const boxResponse = {
    properties: {
        forecast: "https://api.weather.gov/gridpoints/BOX/63,46/forecast"
    }
}

const forecastPeriods = {
    properties: { 
        periods: [{
            number: 7,
            name:"Saturday Night",
            temperature: 65,
            temperatureUnit: "F",
            windSpeed: "5 mph",
            windDirection: "NW",
            icon: "https://api.weather.gov/icons/land/night/sct?size=medium",
            shortForecast: "Partly Cloudy",
            detailedForecast: "Partly cloudy, with a low around 65."
        },
        {
            number: 8,
            name:"Sunday",
            temperature: 75,
            temperatureUnit: "F",
            windSpeed: "2 mph",
            windDirection: "NW",
            icon: "https://api.weather.gov/icons/land/night/sct?size=medium",
            shortForecast: "Clear",
            detailedForecast: "Clear, with a low around 75."
        }]
    }
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('/points/')) {
      return Promise.resolve({
        json: jest.fn().mockResolvedValue(boxResponse)
      });
    } else if (url.includes('/gridpoints/')) {
      return Promise.resolve({
        json: jest.fn().mockResolvedValue(forecastPeriods)
      });
    } 
    return Promise.resolve({
      json: jest.fn().mockResolvedValue({})
    });
  });
  // render the Forecast component
  render(<Forecast location={{latitude: "38.8977", longitude: "-77.0365"}}/>);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('it renders forecast headings', async () => {
    const saturdayNight = await screen.findByText(/saturday night/i);
    expect(saturdayNight).toBeInTheDocument();

    const sunday = await screen.findByText(/sunday/i);
    expect(sunday).toBeInTheDocument();
});

test('it renders forecast images', async () => {
    const saturdayImage = await screen.findByAltText(/Partly Cloudy/i);
    expect(saturdayImage).toHaveAttribute('src', 'https://api.weather.gov/icons/land/night/sct?size=medium');
    const sundayImage = await screen.findByAltText(/Clear/i);
    expect(sundayImage).toHaveAttribute('src', 'https://api.weather.gov/icons/land/night/sct?size=medium');
});

test('it renders forecast temperatures', async () => {
    const saturdayTemp = await screen.findByText(/Temperature: 65 F/i);
    expect(saturdayTemp).toBeInTheDocument();

    const sundayTemp = await screen.findByText(/Temperature: 75 F/i);
    expect(sundayTemp).toBeInTheDocument();
});

test('it renders forecast wind information', async () => {
    const saturdayWind = await screen.findByText(/Wind: 5 mph NW/i);
    expect(saturdayWind).toBeInTheDocument();

    const sundayWind = await screen.findByText(/Wind: 2 mph NW/i);
    expect(sundayWind).toBeInTheDocument();
});

test('it renders forecast detailed forecasts', async () => {
    const saturdayDetailed = await screen.findByText(/Partly cloudy, with a low around 65./i);
    expect(saturdayDetailed).toBeInTheDocument();

    const sundayDetailed = await screen.findByText(/Clear, with a low around 75./i);
    expect(sundayDetailed).toBeInTheDocument();
});

