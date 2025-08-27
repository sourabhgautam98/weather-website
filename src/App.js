import React, { useState } from "react";
import axios from "axios";
import "./App.css"; 

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!location) return;

    try {
      const response = await axios.get(API_URL, {
        params: {
          q: location,
          units: "metric",
          appid: API_KEY,
        },
      });
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City not found");
      } else {
        setError("An error occurred while fetching weather data");
      }
      setWeatherData(null);
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Get Weather
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-container">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div className="weather-info">
            <div className="weather-main">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p className="temperature">
                {Math.round(weatherData.main.temp)}°C
              </p>
            </div>
            <p className="description">{weatherData.weather[0].description}</p>
            <div className="weather-details">
              <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind: {weatherData.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
