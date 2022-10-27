import { useQuery } from "@tanstack/react-query";
import { api } from "../axios";

type User = {
  id: string;
  username: string;
  email: string;
  phone: string;
};

export async function getUsers() {
  const { data } = await api.get<User[]>("/users");

  const users = data.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
  }));

  return {
    users,
  };
}

export function useUsers() {
  return useQuery(["users"], () => getUsers(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
