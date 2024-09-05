import { useContext } from "react";
import { AuthenticatedContext } from "../context/authenticated-context";

export default function useAuthenticatedContext() {
  const context = useContext(AuthenticatedContext);
  if (!context) {
    throw new Error("Please use Authenticated provider in the parent element");
  }

  return context;
}
