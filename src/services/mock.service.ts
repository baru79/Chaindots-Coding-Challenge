import { User } from "../types/users";
import {
  FavoriteLocation,
  Location,
  RealtimeWeatherAPI,
} from "../types/weather";
import apiMock from "./api.mock.service";

export async function getFavoriteLocations(): Promise<FavoriteLocation[]> {
  try {
    const { data } = await apiMock.get("/favoriteLocations");
    return data;
  } catch (error) {
    throw new Error(`There was a problem with your request. Error: ${error}`);
  }
}

export async function getFavoriteLocation(
  id: string
): Promise<FavoriteLocation> {
  try {
    const { data } = await apiMock.get(`/favoriteLocations/${id}`);
    return data;
  } catch (error) {
    throw new Error(`There was a problem with your request. Error: ${error}`);
  }
}

export async function addFavoriteLocation(
  location: RealtimeWeatherAPI
): Promise<FavoriteLocation> {
  try {
    const { data } = await apiMock.post("/favoriteLocations", location);
    return data;
  } catch (error) {
    throw new Error(`There was a problem with your request. Error: ${error}`);
  }
}

export async function removeFavoriteLocation(id: string): Promise<Location> {
  try {
    const { data } = await apiMock.delete(`/favoriteLocations/${id}`);
    return data;
  } catch (error) {
    throw new Error(`There was a problem with your request. Error: ${error}`);
  }
}

export async function updateFavoriteLocation(
  id: string,
  location: RealtimeWeatherAPI
): Promise<Location> {
  try {
    const { data } = await apiMock.patch(`/favoriteLocations/${id}`, location);
    return data;
  } catch (error) {
    throw new Error(`There was a problem with your request. Error: ${error}`);
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const { data } = await apiMock.get("/users");
    return data;
  } catch (error) {
    throw new Error(`There was a problem with your request. Error: ${error}`);
  }
}

export async function addUser(
  user: Omit<User, "id">
): Promise<User | undefined> {
  try {
    const { data } = await apiMock.post("/users", user);
    return data;
  } catch (error) {
    throw new Error(`There was a problem with your request. Error: ${error}`);
  }
}
