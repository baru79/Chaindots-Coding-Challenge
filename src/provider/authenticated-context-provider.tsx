import { PropsWithChildren, useState } from "react";
import { User } from "../types/users";
import { AuthenticatedContext } from "../context/authenticated-context";
import { addUser, getUsers } from "../services/mock.service";

type AuthProps = PropsWithChildren & { usr: User | null };

export function AuthenticatedContextProvider({ children, usr }: AuthProps) {
  const [user, setUser] = useState<User | null>(usr);

  const validateUserCredentials = async (
    user: Omit<User, "id">
  ): Promise<User | undefined> => {
    const users = await getUsers();
    return users.find(
      (u) =>
        u.email.toLowerCase() === user.email.toLowerCase() &&
        u.password.toLowerCase() === user.password.toLowerCase()
    );
  };

  const getUser = async (user: Omit<User, "id">): Promise<User | undefined> => {
    const users = await getUsers();
    return users.find(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );
  };

  const login = async (user: Omit<User, "id">): Promise<User | undefined> => {
    const existUser = await validateUserCredentials(user);
    if (existUser) {
      setUser(existUser);
      localStorage.setItem("user", JSON.stringify(existUser));
    }
    return existUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = async (
    user: Omit<User, "id">
  ): Promise<User | undefined> => {
    const existUser = await getUser(user);
    if (!existUser) {
      const newUser = await addUser(user);
      if (newUser) {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        return newUser;
      }
    }
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthenticatedContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated,
      }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
}
