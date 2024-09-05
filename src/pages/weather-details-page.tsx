import { useParams } from "react-router-dom";
import useWeatherContext from "../hooks/useWeatherContext";
import styled from "styled-components";
import WeatherCard from "../components/weather-card";
import useForecastWeather from "../hooks/useForecastWeather";
import { APIType } from "../types/weather.d";
import SkeletonCard from "../components/skeleton-card";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const WeatherDetailsPage = () => {
  const { locationId } = useParams();
  const { isFavoriteLocation, updateFavoriteLocations } = useWeatherContext();
  const { forecast, loading } = useForecastWeather(locationId);

  return (
    <StyledContainer>
      <h1>Weather Details</h1>
      {loading ? (
        <SkeletonCard />
      ) : (
        location &&
        forecast && (
          <WeatherCard
            weather={{ forecast: forecast, method: APIType.Forecast }}
            isFavoriteLocation={isFavoriteLocation(forecast.location.url)}
            onChangeFavoriteLocation={updateFavoriteLocations}
          />
        )
      )}
    </StyledContainer>
  );
};

export default WeatherDetailsPage;
