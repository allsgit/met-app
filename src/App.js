import './App.scss';
import DescriptImage from './assets/cloud.png';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const key = `392295a71823ede3e5a56a6b97ff2bac`;
  const [data, setData] = useState({});
  const [location, setLocation] = useState('lyon');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=fr&appid=${key}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };
  let iconUrl = `https://openweathermap.org/img/wn/${
    data.weather ? data.weather.map((el) => el.icon) : ''
  }@2x.png`;

  function colorSwitch() {
    if (data.main.temp >= 20) {
      return 'temp-jaune';
    } else if (data.main.temp < 20 && data.main.temp > 10) {
      return 'temp';
    } else if (data.main.temp < 10) {
      return 'temp-blue';
    }
  }

  return (
    <div className="App">
      <div className="weather-container">
        <div className="search-div">
          <input
            type="text"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
            onKeyPress={searchLocation}
            placeholder="Entrer la ville"
            className="search-input"
          />
        </div>
        <div className="top">
          {' '}
          <div className="location">
            <p>
              {data.name ? (
                <p>
                  {data.name.replace(
                    'Arrondissement de',
                    ' '
                  )}
                </p>
              ) : (
                ' '
              )}
            </p>
          </div>
          <div
            className={
              data.main
                ? colorSwitch(data.main.temp)
                : 'temp'
            }
          >
            {data.main ? <p>{data.main.temp} °C</p> : ''}
          </div>
        </div>
        <div className="middle">
          {' '}
          <div className="description">
            <img src={iconUrl} alt="" />
            <p className="weather-situation">
              {' '}
              {data.weather ? (
                <p>
                  {data.weather.map((el) => {
                    if (el.main == 'Clouds') {
                      return 'Nuageux';
                    } else if (el.main == 'Clear') {
                      return 'Dégagé';
                    } else if (el.main == 'Rain') {
                      return 'Pluie';
                    } else if (el.main == 'Thnderstrom') {
                      return 'Orage';
                    } else if (el.main == 'Mist') {
                      return 'Brouillard';
                    }
                  })}
                </p>
              ) : (
                ' '
              )}
            </p>
          </div>
        </div>
        <div className="bottom">
          {' '}
          <div className="reel">
            <p>
              Température ressentie :
              {data.main ? (
                <p>{data.main.feels_like} °C</p>
              ) : (
                ' '
              )}
            </p>
          </div>
          <div className="humidity">
            <p>Humidité : </p>{' '}
            {data.main ? (
              <p>{data.main.humidity} %</p>
            ) : (
              ' '
            )}
          </div>
          <div className="wind-speed">
            <p>
              Vent :{' '}
              {data.wind ? (
                <p>{data.wind.speed} KM/H </p>
              ) : (
                ' '
              )}{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
