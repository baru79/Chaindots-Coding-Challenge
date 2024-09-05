import { PropsWithChildren } from "react";
import { AuthenticatedContextProvider } from "../provider/authenticated-context-provider";
import { WeatherContextProvider } from "../provider/weather-context-provider";
import { MemoryRouter } from "react-router-dom";
import { User } from "../types/users";

type WrapperProps = PropsWithChildren & { usr: User | null };

const Wrapper = ({ children, usr }: WrapperProps) => (
  <AuthenticatedContextProvider usr={usr}>
    <WeatherContextProvider>
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </WeatherContextProvider>
  </AuthenticatedContextProvider>
);

export default Wrapper;
