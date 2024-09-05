import { Avatar, CardMedia, Divider, Typography } from "@mui/material";
import { ForecastWeatherAPI } from "../types/weather.d";
import styled from "styled-components";

interface ForecastCardProps {
  weather?: ForecastWeatherAPI;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
`;

const StyledDividerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ForecastCard = ({ weather }: ForecastCardProps) => {
  return (
    <StyledContainer>
      {weather?.forecast.forecastday.map((fd) => {
        const { condition, mintemp_c, maxtemp_c, avghumidity, maxwind_kph } =
          fd.day;
        return (
          <div key={fd.date}>
            <Divider>
              <StyledDividerContainer>
                <Avatar
                  sx={{ bgcolor: "transparent" }}
                  aria-label="icon-condition"
                >
                  <CardMedia
                    component="img"
                    image={`${condition.icon}`}
                    alt={condition.text}
                  />
                </Avatar>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  {`Forecast for ${fd.date}`}
                </Typography>
              </StyledDividerContainer>
            </Divider>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {`Condition: ${condition.text}`}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {`Temperature Min: ${mintemp_c}°C`}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {`Temperature Max: ${maxtemp_c}°C`}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {`Humidity: ${avghumidity}%`}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {`Wind Speed Max: ${maxwind_kph}kph`}
            </Typography>
          </div>
        );
      })}
    </StyledContainer>
  );
};

export default ForecastCard;
