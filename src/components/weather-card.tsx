import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";
import {
  APIType,
  ForecastWeatherAPI,
  RealtimeWeatherAPI,
} from "../types/weather.d";
import ForecastCard from "./forecast-card";

const StyledCard = styled(Card)`
  max-width: 300px;
  min-height: 300px;
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: end;
`;

export type WeatherProps =
  | { method: APIType.Realtime; realTime: RealtimeWeatherAPI }
  | {
      method: APIType.Forecast;
      forecast: ForecastWeatherAPI;
    };

interface WeatherCardProps {
  weather: WeatherProps;
  isFavoriteLocation: boolean;
  onChangeFavoriteLocation: (
    location: RealtimeWeatherAPI | ForecastWeatherAPI
  ) => void;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
`;

const StyledSubHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const WeatherCard = ({
  weather,
  isFavoriteLocation,
  onChangeFavoriteLocation,
}: WeatherCardProps) => {
  const matches: boolean = useMediaQuery("(max-width:320px)");

  const { current, location } =
    weather.method === APIType.Realtime ? weather.realTime : weather.forecast;

  const favIconColor = isFavoriteLocation ? "green" : "lightgray";

  const handleClickFavoriteIcon = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const weatherData =
      weather.method === APIType.Realtime ? weather.realTime : weather.forecast;
    onChangeFavoriteLocation({
      location: weatherData.location,
      current: weatherData.current,
    });
  };

  return (
    <StyledCard
      data-testid={"weather-card-matches"}
      aria-label={`weather-card-matches-${matches}`}
      sx={{
        width: matches ? 270 : 300,
        backgroundImage:
          "linear-gradient(60deg, #d1eaff 0, #a8c8f8 50%, #7ea8e0 100%)",
      }}
    >
      <CardHeader
        sx={{ height: 100 }}
        avatar={
          <Avatar sx={{ bgcolor: "transparent" }} aria-label="icon-condition">
            <CardMedia
              component="img"
              image={`${current.condition.icon}`}
              alt={current.condition.text}
            />
          </Avatar>
        }
        title={
          <Typography
            variant="subtitle1"
            sx={{ color: "text.primary", fontSize: 16 }}
          >
            {location.name}
          </Typography>
        }
        subheader={
          <StyledSubHeader>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {`${location.region} - ${location.country}`}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: 10 }}
            >
              {`Lat: ${location.lat} - Lon: ${location.lon}`}
            </Typography>
          </StyledSubHeader>
        }
        action={
          <StyledCardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={handleClickFavoriteIcon}
            >
              <FavoriteIcon style={{ color: favIconColor }} />
            </IconButton>
          </StyledCardActions>
        }
      />
      <CardContent>
        <StyledContainer>
          <Divider>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Realtime weather
            </Typography>
          </Divider>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Condition: ${current.condition.text}`}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Temperature: ${current.temp_c}°C`}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Humidity: ${current.humidity}%`}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Wind Speed:: ${current.wind_kph}kph`}
          </Typography>
        </StyledContainer>
        {weather.method === APIType.Forecast && (
          <ForecastCard weather={weather.forecast} />
        )}
      </CardContent>
    </StyledCard>
  );
};

export default WeatherCard;
