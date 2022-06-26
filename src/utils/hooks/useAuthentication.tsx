import * as React from "react";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import { AUTH_TOKEN_NAME } from "@config";
import { getExpoPushTokenAsync } from "expo-notifications";
import { API_BASE_URL } from "@env";

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
      const { token } = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => {
        if (!res.ok) throw new Error(JSON.stringify(res));
        return res.json();
      });
      const { iat, id, role } = jwt_decode(token) as DecodedToken;

      //Update local states Secure Store
      await SecureStore.setItemAsync(AUTH_TOKEN_NAME, token);
      setIsAuthenticated(true);
      setToken(token);
      setUserID(id);

      //UPDATE EXPONENT PUSH TOKEN
      await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          notificationToken: (await getExpoPushTokenAsync()).data,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(JSON.stringify(res));
        })
        .catch((err) =>
          console.log(
            "UPDATE EXPONENT PUSH TOKEN ERROR >> ",
            JSON.stringify(err)
          )
        );
    } catch (error: any) {
      setError(true);
      console.log("ERROR SIGNING IN WITH EMAIL >>> ", error);
      if (error?.status) {
        switch (Number(error.status)) {
          case 401:
            setErrorMessage("Wrong email or password");
            break;
          default:
            break;
        }
      }
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
      const token = await fetch(`${API_BASE_URL}/auth/register`, {
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
      const error = JSON.parse(e?.message);
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
      console.log("FETCH LOCAL AUTH STATE >>> ", JSON.stringify(e));
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
