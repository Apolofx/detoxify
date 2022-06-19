import { API_BASE_URL } from "@env";
export const fetchUserData = async (userID: number | string, token: string) => {
  return fetch(`${API_BASE_URL}/api/users/${userID}/snapshot`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw res;
      return res;
    })
    .then((res) => res.json());
};
