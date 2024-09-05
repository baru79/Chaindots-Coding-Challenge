import ProtectedRoute from "../components/protected-route";
import ErrorPage from "../pages/error-page";
import FavoritesPage from "../pages/favorites-page";
import HomePage from "../pages/home-page";
import LayoutPage from "../pages/layout-page";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import WeatherDetailsPage from "../pages/weather-details-page";

export const routesConfig = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutPage>
          <HomePage />
        </LayoutPage>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/favorites",
    element: (
      <ProtectedRoute>
        <LayoutPage>
          <FavoritesPage />
        </LayoutPage>
      </ProtectedRoute>
    ),
  },
  {
    path: "/favorites/:locationId",
    element: (
      <ProtectedRoute>
        <LayoutPage>
          <WeatherDetailsPage />
        </LayoutPage>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];
