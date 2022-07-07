import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { parseCookies } from "nookies";

// Visisitantes
export function SSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (cookies["@corelab.token"]) {
      return {
        redirect: {
          destination: "/vehicles",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
