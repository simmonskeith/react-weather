import { useState } from 'react';



function JeepCalc() {

    const [mileage, setMileage] = useState('');
    const [stats, setStats] = useState(null);

    const calculateJeepStats = () => {
        if (!mileage) {
            setStats(null);
            return;
        }
        const purchaseDate = new Date(2020, 4, 14);
        const purchaseMileage = 64247;
        const mfgDate = new Date(2017, 0, 1);
        const currentDate = new Date();

        const totalMiles = mileage - purchaseMileage;
        const totalDays = (currentDate.getTime() - purchaseDate.getTime()) / (1000 * 3600 * 24);
        const lifetimeDays = (currentDate.getTime() - mfgDate.getTime()) / (1000 * 3600 * 24);
        const dailyAverage = totalMiles / totalDays;
        const lifetimeAverage = mileage / lifetimeDays;
        const originalDailyAverage = purchaseMileage / ((purchaseDate.getTime() - mfgDate.getTime()) / (1000 * 3600 * 24));
        const result = {
            totalMiles: totalMiles,
            totalDays: totalDays,
            originalDailyAverage: originalDailyAverage.toFixed(2),
            dailyAverage: dailyAverage.toFixed(2),
            lifetimeAverage: lifetimeAverage.toFixed(2)
        };
        setStats(result);
    }

  return (
  <div>
        <h1>Jeep Mileage Calculator</h1>
        <label>Mileage: 
            <input type="number" min="0" value={mileage} onChange={(e) => setMileage(e.target.value)} />
        </label>
        <button onClick={calculateJeepStats} disabled={!mileage}>Calculate</button>
        <div>
            {stats && (
                <div>
                    <p>My miles: {stats?.totalMiles}</p>
                    <p>Days Owned: {stats?.totalDays.toFixed(2)} ({(stats?.totalDays / 365).toFixed(2)} years)</p>
                    
                    <h3>Current</h3>
                    <p>{stats?.dailyAverage} miles/day</p>
                    <p>{(stats?.dailyAverage * 365).toFixed(2)} miles/year</p>

                    <h3>Lifetime</h3>
                    <p>{stats?.lifetimeAverage} miles/day</p>
                    <p>{(stats?.lifetimeAverage * 365).toFixed(2)} miles/year</p>

                    <h3>Purchased</h3>
                    <p>{stats?.originalDailyAverage} miles/day</p>
                    <p>{(stats?.originalDailyAverage * 365).toFixed(0)} miles/year</p>
                </div>
            )}
        </div>
       
    </div>);
}

export default JeepCalc;