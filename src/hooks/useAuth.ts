import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { grantToken } from "../api/authApi";
import { tokenState } from "../recoil/atom";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const [token, setToken] = useRecoilState(tokenState);
  const queryClient = useQueryClient();

  const isTokenExpired = (token:string) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const expiration = decodedToken.exp || 0
      return expiration * 1000 < Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem('token');
    queryClient.invalidateQueries({queryKey :['auth']});
  };

  return useQuery({
    queryKey: ['auth', token],
    queryFn: async () => {
      if (!token || isTokenExpired(token)) {
        clearToken();
        return null; 
      }

      return grantToken(token);
    },
    enabled: !!token,
    retry: false, 
    staleTime: 1000 * 60 * 5, 
    refetchInterval: 1000 * 60 * 5, 
  });
}