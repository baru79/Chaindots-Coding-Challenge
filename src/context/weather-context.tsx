import { createContext } from "react";
import { FavoriteLocation, RealtimeWeatherAPI } from "../types/weather.d";

export interface WeatherContextProps {
  urlLocationSearched: string;
  updateLocationSearched: (location: string) => void;
  updateFavoriteLocations: (location: RealtimeWeatherAPI) => void;
  isFavoriteLocation: (url: string) => boolean;
  getLoggedUserFavoriteLocations: () => FavoriteLocation[];
}

export const WeatherContext = createContext<WeatherContextProps | null>(null);
