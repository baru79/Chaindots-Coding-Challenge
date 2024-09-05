import { Link } from "react-router-dom";
import useWeatherContext from "../hooks/useWeatherContext";
import WeatherCard from "../components/weather-card";
import styled from "styled-components";
import { APIType } from "../types/weather.d";

const StyledTitle = styled.h1`
  text-align: center;
`;

const StyledListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const FavoritesPage = () => {
  const {
    getLoggedUserFavoriteLocations,
    isFavoriteLocation,
    updateFavoriteLocations,
  } = useWeatherContext();
  return (
    <>
      <StyledTitle>Favorites</StyledTitle>
      <StyledListContainer>
        {getLoggedUserFavoriteLocations().map((fl) => {
          return (
            <StyledLink to={`/favorites/${fl.id}`} key={fl.id}>
              <WeatherCard
                weather={{ realTime: fl, method: APIType.Realtime }}
                isFavoriteLocation={isFavoriteLocation(fl.location.url)}
                onChangeFavoriteLocation={updateFavoriteLocations}
              />
            </StyledLink>
          );
        })}
      </StyledListContainer>
    </>
  );
};

export default FavoritesPage;
