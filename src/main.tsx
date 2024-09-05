import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WeatherContextProvider } from "./provider/weather-context-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthenticatedContextProvider } from "./provider/authenticated-context-provider.tsx";
import { routesConfig } from "./lib/routes-config.tsx";
import { getLocalStorageUser } from "./lib/utils.ts";

const router = createBrowserRouter(routesConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthenticatedContextProvider usr={getLocalStorageUser()}>
      <WeatherContextProvider>
        <RouterProvider router={router} />
      </WeatherContextProvider>
    </AuthenticatedContextProvider>
  </StrictMode>
);
