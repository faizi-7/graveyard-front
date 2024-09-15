import { selector } from "recoil";
import { tokenState } from "./atom";
import { useQuery } from "@tanstack/react-query";
import { grantToken } from "../api/authApi";

export const authState = selector({
  key: 'authState',
  get: ({ get }) => {
    const token = get(tokenState);

    if (!token) {
      return { data: null, isLoading: false, error: null };
    }

    const { data, isLoading, error } = useQuery({
      queryKey: ['auth', token],
      queryFn: () => grantToken(token),
      enabled: !!token,
    });

    return { data, isLoading, error };
  },
});