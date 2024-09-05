import { createContext } from "react";
import { User } from "../types/users";

export interface AuthenticatedContextProps {
  user?: User | null;
  login: (user: Omit<User, "id">) => Promise<User | undefined>;
  logout: () => void;
  register: (user: Omit<User, "id">) => Promise<User | undefined>;
  isAuthenticated: () => boolean;
}

export const AuthenticatedContext =
  createContext<AuthenticatedContextProps | null>(null);
