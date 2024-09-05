import { AxiosError, isAxiosError } from "axios";
import { API_KEY } from "../lib/constants";
import {
  ForecastWeatherAPI,
  RealtimeWeatherAPI,
  SearchLocation,
} from "../types/weather.d";
import api from "./api.service";

export async function getRealtimeWeatherByCity(
  city: string
): Promise<RealtimeWeatherAPI | undefined> {
  try {
    const { data } = await api.get(
      `/current.json?q=${city}&rapidapi-key=${API_KEY}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new AxiosError(error.response?.data.message);
    }
  }
}

export async function getLocationByCity(
  city: string
): Promise<SearchLocation[] | undefined> {
  try {
    const { data } = await api.get(
      `/search.json?q=${city}&rapidapi-key=${API_KEY}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new AxiosError(error.response?.data.message);
    }
  }
}

export async function getForecastByCity(
  city: string,
  days = 5
): Promise<ForecastWeatherAPI | undefined> {
  try {
    const { data } = await api.get(
      `/forecast.json?q=${city}&days=${days}&rapidapi-key=${API_KEY}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new AxiosError(error.response?.data.message);
    }
  }
}
