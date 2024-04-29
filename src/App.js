import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('JAIPUR');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=fc3d05c5c86d482da054ed481ba8555d`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      axios.get(url)
        .then((response) => {
          setData(response.data);
          setLocation('');
          setError('');
        })
        .catch((err) => {
          setError('Failed to fetch data. Please try again.');
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value.toUpperCase())}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="search" />
      </div>
      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
            </div>
            <div className="description">
              {data.weather && <p>{data.weather[0].main}</p>}
            </div>
          </div>

          {data.name && (
            <div className="bottom">
              <div className="feels">
                {data.main && <p className='bold'>{data.main.feels_like.toFixed()}°C</p>}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main && <p className='bold'>{data.main.humidity}%</p>}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind && <p className='bold'>{data.wind.speed.toFixed()} MPH</p>}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
