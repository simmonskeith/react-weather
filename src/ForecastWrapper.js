import React from 'react';
import { Forecast } from './Forecast';


export function ForecastWrapper() {

    const [zipCode, setZipCode] = React.useState("");
    const [tempZipCode, setTempZipCode] = React.useState("");

    const fetchForecast = async () => {
        setZipCode(tempZipCode);
    }
    
    return (
            
            <div>
                <input type="text" placeholder="Enter Zip Code" onChange={(e) => setTempZipCode(e.target.value)} />
                <button onClick={fetchForecast} disabled={tempZipCode.length !== 5 && !Number.isNaN(tempZipCode)}>Get Forecast</button>
                <h2>Weather Forecast</h2>
               
                {zipCode ? <Forecast zipCode={zipCode} /> : <p>Please enter a zip code to get the forecast.</p>}
            </div>
    );
}