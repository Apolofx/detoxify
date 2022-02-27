import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_NAME } from "@config";

/**
 * This hook manages users authentication state
 */
export default function useAuthentication() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [token, setToken] = React.useState<string | void>();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const signOut = async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_NAME);
    setIsAuthenticated(false);
  };
  
  const signInWithEmail = async (
    email: string,
    password: string,
    callback?: Function
  ) => {
    try {
      // fetch backend to get token
      const token = await fetch("http://192.168.0.103:8081/auth", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((res) => res.token);
      await SecureStore.setItemAsync(AUTH_TOKEN_NAME, token);
      setIsAuthenticated(true);
      setToken(token);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };
  const signUpWithEmail = () => {};

  const fetchLocalAuthState = async () => {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (isAvailable) {
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_NAME);
        if (token) {
          setIsAuthenticated(true);
          setToken(token);
        }
      }
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    //TODO REMOVE THIS MOCK TOKEN
    // fetchLocalAuthState();
    signInWithEmail("nacho", "cacho");
    const timeout = setTimeout(() => {
      signOut();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return {
    isLoading,
    error,
    token,
    isAuthenticated,
    signOut,
    signInWithEmail,
    signUpWithEmail,
  };
}
