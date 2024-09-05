// @refresh reset
import { useEffect, useState } from "react";
import { RealtimeWeatherAPI } from "../types/weather";
import { getRealtimeWeatherByCity } from "../services/weather.service";

export default function useRealtimeWeather(urlLocation: string) {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<RealtimeWeatherAPI | null>(
    null
  );

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      const responseRealtimeWeather = await getRealtimeWeatherByCity(
        urlLocation
      );
      if (responseRealtimeWeather) {
        setSearchResult({
          ...responseRealtimeWeather,
          location: { ...responseRealtimeWeather.location, url: urlLocation },
        });
      }
      setLoading(false);
    };
    if (urlLocation !== "") {
      getWeather();
    } else {
      setSearchResult(null);
    }
  }, [urlLocation]);

  return { searchResult, loading };
}
