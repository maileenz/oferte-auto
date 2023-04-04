import { getIronSession } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next";
import nextSession from "next-session";

export const getSession = nextSession<{ authId: string }>({
  autoCommit: true,
  name: "did",
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
});

declare module "iron-session" {
  interface IronSessionData {
    authId?: string;
  }
}

const sessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "myapp_cookiename",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const getSesh = (req: NextApiRequest, res: NextApiResponse) =>
  getIronSession(req, res, sessionOptions);

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
