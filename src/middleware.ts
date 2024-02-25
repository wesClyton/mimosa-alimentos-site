import { NextAuthMiddlewareOptions, NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = (req: NextRequestWithAuth) => {
  console.log("[MIDDLEWARE_NEXT_AUTH_TOKEN]: ", req.nextauth.token);

  console.log(`aquii`);

  // const isPrivateRoutes = req.nextUrl.pathname.startsWith("/private");
  // const isAdmin = req.nextauth.token;

  // if(!isAdmin && isPrivateRoutes) {
  //   return NextResponse.rewrite(new URL("/denied"));
  // }

};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = {
  matcher: '/painel/:path*',
};
