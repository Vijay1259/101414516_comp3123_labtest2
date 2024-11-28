import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("Toronto");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError(false);
    } catch (error) {
      setError(true);
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      setCity(search);
      setSearch("");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Weather App</h1>
      </header>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">City not found. Please try again!</p>}
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <h3>{weather.main.temp.toFixed(1)}°C</h3>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} // Fixed string interpolation
            alt="Weather Icon"
          />
          <div className="details">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Pressure: {weather.main.pressure} hPa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
