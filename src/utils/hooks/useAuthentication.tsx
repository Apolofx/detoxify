import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_NAME } from "@config";

/**
 * This hook manages users authentication state
 */
export default function useAuthentication(): Authenticator {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);
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
      setIsLoading(true);
      const token = await fetch("http://dev.detoxify.ar/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(JSON.stringify(res));
          return res.json();
        })
        .then((res) => res.token);

      await SecureStore.setItemAsync(AUTH_TOKEN_NAME, token);
      console.log("TOKEN >>>", token);
      setIsAuthenticated(true);
      setToken(token);
    } catch (e: any) {
      console.log(e);
      setError(true);
    } finally {
      setIsLoading(false);
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
      console.log(JSON.stringify(e));
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    //TODO REMOVE THIS MOCK TOKEN
    fetchLocalAuthState();
    // signOut()
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

export type Authenticator = {
  isLoading: boolean;
  error: boolean;
  token: string | null;
  isAuthenticated: boolean;
  signOut: () => void;
  signInWithEmail: (
    email: string,
    password: string,
    callback?: Function
  ) => Promise<void>;
  signUpWithEmail: () => void;
};
