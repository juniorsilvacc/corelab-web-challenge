import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { signOut } from "../contexts/AuthContext";
import { AuthError } from "./errors/AuthError";

export function apiConfig(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["@corelab.token"]}`,
    },
  });

  // Middleware para interceptar rotas privadas
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // Qualquer error 401 devemos deslogar da aplicação
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          signOut();
        } else {
          return Promise.reject(new AuthError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
