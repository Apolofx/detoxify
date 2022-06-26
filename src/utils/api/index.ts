import { API_BASE_URL } from "@env";
export const fetchUserData = async (userID: number | string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const URL = `${API_BASE_URL}/api/users/${userID}/snapshot`;
  console.log(
    "FETCHING USER >>> ",
    JSON.stringify({ URL, ...config }, null, 2)
  );
  return fetch(URL, config)
    .then((res) => {
      if (!res.ok) throw res;
      return res;
    })
    .then((res) => res.json());
};
