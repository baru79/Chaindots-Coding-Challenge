import { useContext } from "react";
import { WeatherContext } from "../context/weather-context";

export default function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("Please use Weather provider in the parent element");
  }

  return context;
}
