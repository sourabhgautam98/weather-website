import React, { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const App = () => {
  const [weatherlist, setWeatherList] = useState(null);
  const [search, setSearch] = useState('Jaipur');
  const debouncedSearch = useDebounce(search, 500); // Adjust delay as needed

  useEffect(() => {
    const fetchData = async () => {
      const data = `https://api.openweathermap.org/data/2.5/weather?q=${debouncedSearch}&units=metric&appid=fc3d05c5c86d482da054ed481ba8555d`;
      const res = await fetch(data);
      const weatherData = await res.json();
      setWeatherList(weatherData.main);
    };
    fetchData();
  }, [debouncedSearch]);

  return (
    <div className='fullscreen-background'>
      <div className='Card'>
        <div className='search1'>
          <input
            type='search'
            className="search-bar"
            placeholder='Enter the City/Country....'
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        
          <div className='info'>
            <h3 className='temp'>Temp: {weatherlist?.temp} °C</h3>
            <h1 className='jaipur'>{search}</h1>
            <h3 className='tempMin'>Temp Min: {weatherlist?.temp_min} °C</h3>
            <h3 className='tempMax'>Temp Max: {weatherlist?.temp_max} °C</h3>
            <h3 className='pressure'>Pressure: {weatherlist?.pressure}</h3>
            <h3 className='humidity'>Humidity: {weatherlist?.humidity}</h3>
          </div>
      
      </div>
    </div>
  );
};

export default App;
