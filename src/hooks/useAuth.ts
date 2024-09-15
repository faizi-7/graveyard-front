import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { grantToken } from "../api/authApi";
import { tokenState } from "../recoil/atom";

export function useAuth() {
  const token = useRecoilValue(tokenState);

  return useQuery({
    queryKey: ['auth', token],
    queryFn: () => token ? grantToken(token) : Promise.resolve(null),
    enabled: !!token,
    retry : false
  });
}