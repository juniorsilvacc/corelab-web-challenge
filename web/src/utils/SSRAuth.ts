import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { parseCookies, destroyCookie } from "nookies";
import { AuthError } from "../services/errors/AuthError";

// Usuários logados
export function SSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies["@corelab.token"];

    // Token inválido
    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (error) {
      //Se caso ocorrer um error precisa destroir o cookie
      if (error instanceof AuthError) {
        destroyCookie(ctx, "@corelab.token");

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  };
}
