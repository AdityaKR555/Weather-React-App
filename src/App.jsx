import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_KEY = "41dc506d85575f8006125871a5629af6";
  
  console.log("API Key:", API_KEY);


  const getWeather = async () => {

    if (!city) {
        setError("Please enter a city name!");
        setWeather(null);
        return; // Prevent API call with an empty city
    }

    try{
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      setError("");
    }
    catch(err){
      setWeather(null);
      setError("City not found. Please try again!");
    }
  }

  const getTempShadow = () => {
  if (weather?.main.temp < 15) return "5px 5px 25px rgba(0, 170, 255, 0.712)";
  if (weather?.main.temp < 35) return "5px 5px 25px rgba(192, 192, 28, 0.658)";
  return "5px 5px 25px red";
  }

  return (
    <div className='container' style={{boxShadow: weather? getTempShadow() : "5px 5px 25px rgba(192, 192, 28, 0.658)"}}>
      <div className="branding">
        <h1>WeatherApp</h1>
        <img src="src/assets/weather-logo.jpg" width={60} alt="logo" />
      </div>
      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder='Enter City Name Here...' style={{boxShadow: weather? getTempShadow() : "5px 5px 25px rgba(192, 192, 28, 0.658)"}}  onKeyDown={e => {
    if (e.key === "Enter") {
      getWeather();
    }
  }}/>
      <button onClick={getWeather} style={{margin: "1.7rem", boxShadow: weather? getTempShadow() : "5px 5px 25px rgba(192, 192, 28, 0.658)" }}>Get Weather</button>
      <div className="main-1">
        
        {city === "" ? 
            (
            <div style={{width: "110px", height: "110px", backgroundColor: "black", marginTop: "0.6rem", marginLeft: "2rem"}}></div>
            )
          :
          weather ? (
             <img
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt="weather icon"
            width={200}
          />
          ) : (
            <img
            src={'src/assets/notfound-logo.jpg'}
            alt="not found logo"
            width={110}
            style={{marginLeft: "2rem", marginTop: "0.6rem"}}
          />
          )
        }
       
        <div className="right" style={{ boxShadow: weather? getTempShadow() : "5px 5px 25px rgba(192, 192, 28, 0.658)" }}>
          {weather ? (
            <>
             <p style={{color: "wheat"}}>{weather?.name}, {weather?.sys?.country}</p>
             <p style={{color: "wheat"}}>{weather?.weather[0].main}</p>
            </>
          ) : (
            error && <p style={{ color: "tomato", textAlign: "center", fontSize: "2rem"}}>{error}</p>
          )}
       
        </div>
      </div>
      <div className="main-2">
        <div className="lower" style={{boxShadow: weather? getTempShadow() : "5px 5px 25px rgba(192, 192, 28, 0.658)" }}>
          <p className='low-head'>Min↓ / Max↑</p>
          <p className='low-content'>{weather?.main.temp_min}/{weather?.main.temp_max}</p>
        </div>
        <div className="lower" style={{boxShadow: weather? getTempShadow() : "5px 5px 25px rgba(192, 192, 28, 0.658)" }}>
          <p className='low-head'>Temp.</p>
          <p className='low-content'>{weather?.main.temp}°C</p>
        </div>
        <div className="lower" style={{boxShadow: weather? getTempShadow() : "5px 5px 25px rgba(192, 192, 28, 0.658)" }}>
          <p className="low-head">Humidity</p>
          <p className="low-content">{weather?.main.humidity}%</p>
        </div>
      </div>
    </div>
  )
}

export default App
