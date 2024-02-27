import React, { useEffect, useState } from 'react';

import img from './wea.jpg';

const App = () => {
  const [weatherlist, setweatherlist] = useState({});
  const [search, setsearch] = useState('Jaipur');

  useEffect(() => {
    const fetchData = async () => {
      const data = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=fc3d05c5c86d482da054ed481ba8555d#`;
      const res = await fetch(data);
      const weajson = await res.json();
      setweatherlist(weajson.main);
    };
    fetchData();
  }, [search]);

  return (
    <div className='fullscreen-background'>
      <div className='Card'>
        <div className='search1'>
          <input
            type='search'
            className="search-bar"
            placeholder='Enter the City/Country....'
            onChange={(event) => {
              setsearch(event.target.value);
            }}
          />
        </div>
        <div className='image-container'>
          <img className='image' alt='' src={img} />
        </div>
        <div className='info'>
          <h3 className='temp'>Temp: {weatherlist.temp} °C</h3>
          <h1 className='jaipur'>{search}</h1>
          <h3 className='tempMin'>Temp Min: {weatherlist.temp_min} °C</h3>
          <h3 className='tempMax'>Temp Max: {weatherlist.temp_max} °C</h3>
          <h3 className='pressure'>Pressure: {weatherlist.pressure}</h3>
          <h3 className='humidity'>Humidity: {weatherlist.humidity}</h3>
        </div>
      </div>
    </div>
  );
};

export default App;
