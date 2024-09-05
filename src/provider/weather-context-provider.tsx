import { ReactNode, useEffect, useState } from "react";
import { WeatherContext } from "../context/weather-context";
import { FavoriteLocation, RealtimeWeatherAPI } from "../types/weather.d";
import {
  addFavoriteLocation,
  getFavoriteLocations,
  removeFavoriteLocation,
  updateFavoriteLocation,
} from "../services/mock.service";
import useAuthenticatedContext from "../hooks/useAuthenticatedContext";

export function WeatherContextProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthenticatedContext();
  const [urlLocationSearched, setUrlLocationSearched] = useState("");
  const [favoriteLocations, setFavoriteLocations] = useState<
    FavoriteLocation[]
  >([]);

  const updateLocationSearched = (urlLocation: string) =>
    setUrlLocationSearched(urlLocation);

  const getLoggedUserFavoriteLocations = (): FavoriteLocation[] => {
    let filteredFavoriteLocations: FavoriteLocation[] = [];
    if (user) {
      filteredFavoriteLocations = favoriteLocations.filter((fl) =>
        fl.usersId.includes(user.id)
      );
    }
    return filteredFavoriteLocations;
  };

  const isFavoriteLocation = (url: string) => {
    if (!user) return false;
    return !!favoriteLocations.find(
      (fl) => fl.location.url === url && fl.usersId.includes(user?.id)
    );
  };

  const updateFavoriteLocations = async (location: RealtimeWeatherAPI) => {
    if (!user) return;
    const responseFavoriteLocations = await getFavoriteLocations();
    const existLocation = responseFavoriteLocations.find(
      (fl) => fl.location.url === location.location.url
    );
    if (existLocation) {
      const existUser = existLocation.usersId.includes(user.id);
      if (!existUser) {
        const newFavoriteLocation = {
          ...existLocation,
          usersId: [...existLocation.usersId, user.id],
        };
        const filteredLocations = responseFavoriteLocations.filter(
          (fl) => fl.id !== existLocation.id
        );
        updateFavoriteLocation(existLocation.id, newFavoriteLocation);
        const res = [...filteredLocations, newFavoriteLocation];
        setFavoriteLocations(res);
      } else {
        const filteredUsersId = existLocation.usersId.filter(
          (userId) => userId !== user.id
        );
        const filteredLocations = responseFavoriteLocations.filter(
          (fl) => fl.id !== existLocation.id
        );
        if (filteredUsersId.length === 0) {
          removeFavoriteLocation(existLocation.id);
          setFavoriteLocations(filteredLocations);
        } else {
          const newFavoriteLocation = {
            ...existLocation,
            usersId: filteredUsersId,
          };
          updateFavoriteLocation(existLocation.id, newFavoriteLocation);
          const res = [...filteredLocations, newFavoriteLocation];
          setFavoriteLocations(res);
        }
      }
    }
    if (!existLocation) {
      const newFavoriteLocation = { ...location, usersId: [user.id] };
      const addedFavoriteLocation = await addFavoriteLocation(
        newFavoriteLocation
      );
      setFavoriteLocations([
        ...responseFavoriteLocations,
        addedFavoriteLocation,
      ]);
    }
  };

  useEffect(() => {
    const getAllFavoriteLocations = async () => {
      const responseFavoriteLocations = await getFavoriteLocations();
      setFavoriteLocations(responseFavoriteLocations);
    };
    getAllFavoriteLocations();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        urlLocationSearched,
        updateLocationSearched,
        updateFavoriteLocations,
        isFavoriteLocation,
        getLoggedUserFavoriteLocations,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
