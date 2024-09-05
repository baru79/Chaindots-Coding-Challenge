import { describe, it, expect, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import WeatherCard from "./weather-card";
import { APIType } from "../types/weather.d";
import { mockForecast, mockWeather } from "../tests/mocks";
import { createMatchMedia } from "../tests/setup";

describe("WeatherCard", () => {
  const onClick = vi.fn();

  it("should match (max-width:320px)", () => {
    window.matchMedia = createMatchMedia(320);
    render(
      <WeatherCard
        weather={{ realTime: mockWeather, method: APIType.Realtime }}
        isFavoriteLocation={true}
        onChangeFavoriteLocation={onClick}
      />
    );
    const card = screen.getByTestId("weather-card-matches");
    expect(card.ariaLabel).to.equal("weather-card-matches-true");
  });
  it("should match (max-width:1024px)", () => {
    window.matchMedia = createMatchMedia(1024);
    render(
      <WeatherCard
        weather={{ realTime: mockWeather, method: APIType.Realtime }}
        isFavoriteLocation={true}
        onChangeFavoriteLocation={onClick}
      />
    );
    const card = screen.getByTestId("weather-card-matches");
    expect(card.ariaLabel).to.equal("weather-card-matches-false");
  });
  it("should render green color as favorite icon", () => {
    render(
      <WeatherCard
        weather={{ realTime: mockWeather, method: APIType.Realtime }}
        isFavoriteLocation={true}
        onChangeFavoriteLocation={onClick}
      />
    );
    expect(screen.getByTestId("FavoriteIcon").style.color).equals("green");
  });
  it("should render lightgray color as favorite icon", () => {
    render(
      <WeatherCard
        weather={{ realTime: mockWeather, method: APIType.Realtime }}
        isFavoriteLocation={false}
        onChangeFavoriteLocation={onClick}
      />
    );
    expect(screen.getByTestId("FavoriteIcon").style.color).equals("lightgray");
  });
  it("should render forecast info", async () => {
    render(
      <WeatherCard
        weather={{
          forecast: { ...mockWeather, ...mockForecast },
          method: APIType.Forecast,
        }}
        isFavoriteLocation={false}
        onChangeFavoriteLocation={onClick}
      />
    );
    const forecastLabel = screen.getByText("Forecast for 2024-08-31");
    expect(forecastLabel.textContent).toBe("Forecast for 2024-08-31");

    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledWith({
      location: mockWeather.location,
      current: mockWeather.current,
    });
  });
  it("should click on favorite icon for forecast card", async () => {
    render(
      <WeatherCard
        weather={{
          forecast: { ...mockWeather, ...mockForecast },
          method: APIType.Forecast,
        }}
        isFavoriteLocation={false}
        onChangeFavoriteLocation={onClick}
      />
    );
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledWith({
      location: mockWeather.location,
      current: mockWeather.current,
    });
  });
  it("should click on favorite icon for weather card", async () => {
    render(
      <WeatherCard
        weather={{ realTime: mockWeather, method: APIType.Realtime }}
        isFavoriteLocation={false}
        onChangeFavoriteLocation={onClick}
      />
    );
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledWith({
      location: mockWeather.location,
      current: mockWeather.current,
    });
  });
});
