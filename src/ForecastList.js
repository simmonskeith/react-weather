import { ForcastPeriod } from './ForecastPeriod';

export function ForecastList(props) {
    return (
        <table>
            {props.forecast['properties']['periods'].map((item) => 
            <tbody>
                <ForcastPeriod period={item} />
            </tbody>
        )}
        </table>
    )
}