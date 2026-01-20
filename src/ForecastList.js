import { ForecastPeriod } from './ForecastPeriod';

export function ForecastList(props) {
    return (
        <table>
            {props.forecast['properties']['periods'].map((item) => 
            <tbody>
                <ForecastPeriod period={item} />
            </tbody>
        )}
        </table>
    )
}