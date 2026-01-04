import React from 'react';
import { ForecastList } from './ForecastList';

export function Forecast(props) {
    
    const [forecast, setForecast] = React.useState(null); 


    const fetchForecast = async () => {
        setForecast(null);
        const requestUrl = `https://api.weather.gov/points/${props.location.latitude},${props.location.longitude}`
        const forecastResponse = await fetch(requestUrl, { method: 'GET'});
        var boxResponse = await forecastResponse.json();
        var boxForecast = await fetch(boxResponse['properties']['forecast'], { method: 'GET'});
        const forecastJson = await boxForecast.json();
        setForecast(forecastJson);
    }

    React.useEffect(() => {
        // miht not be necessary to check for location change any longer.
        if (props.location.name !== null) {
            fetchForecast();
        }
    }, [props.location]);

    return (
            
            <div>
                {props.location.name ? 
                    (<p>Forecast for {props.location.name}, {props.location.stateabbreviation} (lat: {props.location.latitude}, long: {props.location.longitude})</p>) : 
                    (<></>)}
                {forecast && forecast['properties'] && forecast['properties']['periods'] ? (
                    <ForecastList location={props.location} forecast={forecast} />
                ) : (
                    <p>No forecast data available.</p>
                )}
            </div>
    );
}

