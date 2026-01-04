import React from 'react';
import { Forecast } from './Forecast';


export function ForecastWrapper() {

    const defaultLocation = {latitude: null, longitude: null, name: null, stateabbreviation: null, zipCode: null};
    const [location, setLocation] = React.useState(defaultLocation);
    const [zipCode, setZipCode] = React.useState("");
    const [tempZipCode, setTempZipCode] = React.useState("");
    
    const fetchZip = async () => {
        try {
            const response = await fetch(`http://api.zippopotam.us/us/${zipCode}`, { method: 'GET'});
            if (response.status === 200) {
                const zipInfo = await response.json();
                if (!zipInfo.places) {
                    setLocation(defaultLocation);
                    return;
                }
                const updatedLocation = {
                    latitude: zipInfo.places[0]['latitude'],
                    longitude: zipInfo.places[0]['longitude'],
                    name: zipInfo.places[0]['place name'],
                    stateabbreviation: zipInfo.places[0]['state abbreviation'],
                    zipCode: zipCode
                }
                setLocation(updatedLocation);
            }
            else {
                setLocation(defaultLocation);
            }
        } catch (error) {
            console.error("Error fetching zip code info:", error);
        }
    }

    React.useEffect(() => {
        if (isValidZip(zipCode)) {
            console.log("Fetching zip code info for " + zipCode);
            fetchZip();
        }   
    }, [zipCode]);

    const updateZip = () => {
        if (isValidZip(tempZipCode)) {
            setZipCode(tempZipCode);
        }
    }

    const isValidZip = (zip) => {
        return zip.length === 5 && Number.isFinite(Number(zip));
    }
    
    return (
            
            <div>
                <input type="text" placeholder="Enter Zip Code" onChange={(e) => setTempZipCode(e.target.value)} />
                <button onClick={updateZip} disabled={!isValidZip(tempZipCode)}>Get Forecast</button>
                <h2>Weather Forecast</h2>
               
                {location.name 
                    ? <Forecast location={location} /> 
                    : <p>Please enter a valid zip code to get the forecast.</p>}
            </div>
    );
}