import { useState, useEffect } from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiThermometer, WiStrongWind } from 'react-icons/wi';
import { motion } from 'framer-motion';

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (position) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}`
        );
        
        if (!response.ok) throw new Error('Weather data unavailable');
        
        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          city: data.name,
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          wind: data.wind.speed
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => fetchWeather(position),
        error => {
          setError('Please enable location access for weather');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return <WiDaySunny className="animate-pulse" size={40} />;
    switch(weather.condition) {
      case 'Rain': return <WiRain size={40} />;
      case 'Clouds': return <WiCloudy size={40} />;
      default: return <WiDaySunny size={40} />;
    }
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
      
      {loading ? (
        <div className="animate-pulse">Loading weather...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">
              {getWeatherIcon()}
            </div>
            <div>
              <p className="text-3xl font-bold">{weather.temp}°C</p>
              <p className="text-gray-600 dark:text-gray-400">{weather.city}</p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <WiThermometer />
              <span>{weather.humidity}% Humidity</span>
            </div>
            <div className="flex items-center gap-2">
              <WiStrongWind />
              <span>{weather.wind} m/s</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}