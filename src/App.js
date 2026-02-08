
import {ForecastWrapper} from './ForecastWrapper';
import JeepCalc from './JeepCalc';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/weather">Weather</Link> |{" "}
          <Link to="/jeepcalc">Jeep Calculator</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/weather" element={<ForecastWrapper />} />
          <Route path="/jeepcalc" element={<JeepCalc />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
