import { Outlet } from "react-router-dom";
import useRealtimeWeather from "../hooks/useRealtimeWeather";
import useWeatherContext from "../hooks/useWeatherContext";
import WeatherCard from "../components/weather-card";
import Header from "../components/header";
import styled from "styled-components";
import { APIType } from "../types/weather.d";
import SkeletonCard from "../components/skeleton-card";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 40px;
`;

const HomePage = () => {
  const { urlLocationSearched, isFavoriteLocation, updateFavoriteLocations } =
    useWeatherContext();
  const { searchResult, loading } = useRealtimeWeather(urlLocationSearched);

  return (
    <StyledContainer>
      <Header />
      {loading ? (
        <SkeletonCard />
      ) : (
        searchResult && (
          <WeatherCard
            weather={{ realTime: searchResult, method: APIType.Realtime }}
            isFavoriteLocation={isFavoriteLocation(searchResult.location.url)}
            onChangeFavoriteLocation={updateFavoriteLocations}
          />
        )
      )}
      <Outlet />
    </StyledContainer>
  );
};

export default HomePage;
