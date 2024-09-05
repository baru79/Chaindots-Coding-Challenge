import { useEffect, useState } from "react";
import { getForecastByCity } from "../services/weather.service";
import { ForecastWeatherAPI } from "../types/weather";
import { getFavoriteLocation } from "../services/mock.service";

export default function useForecastWeather(locationId?: string) {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastWeatherAPI>();

  useEffect(() => {
    const getForecast = async () => {
      setLoading(true);
      const location = await getFavoriteLocation(`${locationId}`);
      if (location) {
        const { url } = location.location;
        const responseForecast = await getForecastByCity(url);
        if (responseForecast) {
          setForecast({
            ...responseForecast,
            location: { ...responseForecast.location, url },
          });
        }
        setLoading(false);
      }
    };
    if (locationId) {
      getForecast();
    }
  }, [locationId]);

  return { forecast, loading };
}
