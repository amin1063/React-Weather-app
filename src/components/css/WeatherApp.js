import React, { useEffect, useState } from 'react';
import './style.css';

function WeatherApp() {
  const [cityData, setCityData] = useState(null);
  const [search, setSearch] = useState('mumbai');

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=bedb64cb338ea1d659092c62e03ab36e`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('City not found');
        }

        const jsonData = await response.json();
        // Convert temperature from Kelvin to Celsius
        jsonData.main.temp = (jsonData.main.temp - 273.15).toFixed(1);
        setCityData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCityData(null);
      }
    };

    fetchApi();
  }, [search]);

  console.log(cityData);

  return (
    <div className="weather-app">
      <div className="header">
        <h1>Weather App</h1>
        <div className="input">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <div className="content">
        <div className="location">
          {cityData ? (
            <React.Fragment>
              <h2>Current Location</h2>
              <p>{cityData.name}, {cityData.sys.country}</p>
            </React.Fragment>
          ) : (
            <p>City not found</p>
          )}
        </div>
        <div className="weather-card">
          {cityData ? (
            <React.Fragment>
              <div className="temperature">
                <h3>Temperature</h3>
                <p>{cityData.main.temp}°C</p>
              </div>
              <div className="conditions">
                <h3>Conditions</h3>
                <p>{cityData.weather[0].description}</p>
              </div>
              <div className="humidity">
                <h3>Humidity</h3>
                <p>{cityData.main.humidity}%</p>
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
