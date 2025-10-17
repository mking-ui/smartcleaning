export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/supervisor/:path*",
    "/cleaner/:path*",
    "/report/:path*",
  ],
};
