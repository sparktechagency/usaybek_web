import { removeCookie } from "./utils";
import { authKey, roleKey } from "./constants";
import { useLazyGetProfileQuery } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";

export function useHandleLogout() {
  const router = useRouter();
  const [getProfile] = useLazyGetProfileQuery();

  const logout = () => {
    removeCookie(authKey);
    removeCookie(roleKey);
    router.push("/");
    getProfile({});
  };
  return logout;
}
