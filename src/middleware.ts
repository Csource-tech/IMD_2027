import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|admin|admin-dashboard|_next|_vercel|.*\\..*).*)",
  ],
};
