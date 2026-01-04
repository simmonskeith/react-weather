import React from 'react';
import { ForecastList } from './ForecastList';

export function Forecast(props) {
    const defaultLocation = {latitude: null, longitude: null, name: null, stateabbreviation: null};
    const [location, setLocation] = React.useState(defaultLocation);
    const [forecast, setForecast] = React.useState(null);   

    const fetchForecast = async () => {
        const response = await fetch(`http://api.zippopotam.us/us/${props.zipCode}`, { method: 'GET'});
        const zipInfo = await response.json();
        if (!zipInfo.places) {
            setForecast(null);
            return;
        }
        const updatedLocation = {
            latitude: zipInfo.places[0]['latitude'],
            longitude: zipInfo.places[0]['longitude'],
            name: zipInfo.places[0]['place name'],
            stateabbreviation: zipInfo.places[0]['state abbreviation']
        }
        setLocation(updatedLocation);
        
        const requestUrl = `https://api.weather.gov/points/${updatedLocation.latitude},${updatedLocation.longitude}`
        const forecastResponse = await fetch(requestUrl, { method: 'GET'});
        var boxResponse = await forecastResponse.json();
        var boxForecast = await fetch(boxResponse['properties']['forecast'], { method: 'GET'});
        const forecastJson = await boxForecast.json();
        setForecast(forecastJson);
    }

    React.useEffect(() => {
        if (props.zipCode && props.zipCode.length === 5) {
            fetchForecast();
        }
    });

    return (
            
            <div>
                {location.name ? (<p>Forecast for {location.name}, {location.stateabbreviation} (lat: {location.latitude}, long: {location.longitude})</p>) : (<></>)}
                {forecast && forecast['properties'] && forecast['properties']['periods'] ? (
                    <ForecastList location={location} forecast={forecast} />
                ) : (
                    <p>No forecast data available. Please enter a valid zip code and click "Get Forecast".</p>
                )}
            </div>
    );
}

