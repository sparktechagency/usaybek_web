import { removeCookie } from "./utils";
import { authKey, roleKey } from "./constants";
import { useLazyGetProfileQuery } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

export function useHandleLogout() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [getProfile] = useLazyGetProfileQuery();

  const logout = () => {
    removeCookie(authKey);
    removeCookie(roleKey);
    router.push("/");
    getProfile({});
    setAuth({})
  };
  return logout;
}
