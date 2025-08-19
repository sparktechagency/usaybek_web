import { removeCookie } from "./utils";
import { authKey } from "./constants";
import { useLazyGetProfileQuery } from "@/redux/api/authApi";

export function useHandleLogout() {
  const [getProfile] = useLazyGetProfileQuery();

  const logout = () => {
    removeCookie(authKey);
    getProfile({});
  };
  return logout;
}
