import * as React from "react";
import * as SecureStore from "expo-secure-store";

const TOKEN = "token";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result
  } else {
    alert("No values stored under that key.");
  }
}

export default function useAuthentication() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [token, setToken] = React.useState<string | void>();
  const fetchSecureStore = async () => {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (isAvailable) setToken(await getValueFor(TOKEN));
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    //TODO REMOVE THIS MOCK TOKEN
    save(TOKEN, "abcd1234");
    fetchSecureStore();
  }, []);
  return { isLoading, error, token };
}
