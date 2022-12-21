export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    //"/",
    "/((?!login|signup|remindPassword|api|_next/static|favicon.ico).*)",
  ],
};
