import * as React from "react";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import { AUTH_TOKEN_NAME } from "@config";
import { getExpoPushTokenAsync } from "expo-notifications";

type DecodedToken = {
  id: number;
  iat: number;
  role: "REGULAR" | "ADMIN";
};

/**
 * This hook manages users authentication state
 */
export default function useAuthentication(): Authenticator {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [token, setToken] = React.useState<string | null>(null);
  const [userID, setUserID] = React.useState<number | null>(null);
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
      setError(false);
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

      //UPDATE EXPONENT PUSH TOKEN
      await fetch(`http://dev.detoxify.ar/api/users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          notificationToken: (await getExpoPushTokenAsync()).data,
        }),
      })
        .then((res) => console.log(JSON.stringify(res)))
        .catch((err) => console.log(JSON.stringify(err)));

      await SecureStore.setItemAsync(AUTH_TOKEN_NAME, token);
      setIsAuthenticated(true);
      setToken(token);
      setUserID((jwt_decode(token) as DecodedToken).id);
    } catch (e: any) {
      const error = JSON.parse(e.message);
      if (error?.status) {
        switch (Number(error.status)) {
          case 401:
            setErrorMessage("Wrong email or password");
            break;
          default:
            break;
        }
      }
      setError(true);
    } finally {
      callback && callback();
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    callback?: Function
  ) => {
    try {
      // fetch backend to get token
      setIsLoading(true);
      setError(false);
      const token = await fetch("http://dev.detoxify.ar/auth/register", {
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
      setIsAuthenticated(true);
      setUserID((jwt_decode(token) as DecodedToken).id);
    } catch (e: any) {
      const error = JSON.parse(e.message);
      if (error?.status) {
        switch (Number(error.status)) {
          case 409:
            setErrorMessage("Email already in use");
            break;
          default:
            break;
        }
      }
      setError(true);
    } finally {
      callback && callback();
      setIsLoading(false);
    }
  };

  const fetchLocalAuthState = async () => {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (isAvailable) {
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_NAME);
        if (token) {
          setIsAuthenticated(true);
          setToken(token);
          setUserID((jwt_decode(token) as DecodedToken).id);
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
    fetchLocalAuthState();
  }, []);
  return {
    errorMessage,
    isLoading,
    error,
    token,
    userID,
    isAuthenticated,
    signOut,
    signInWithEmail,
    signUpWithEmail,
  };
}
