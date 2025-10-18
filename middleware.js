// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    // 🚫 Redirect already logged-in users away from login/register pages
    if (
      role &&
      (pathname.startsWith("/login") || pathname.startsWith("/register"))
    ) {
      let redirectUrl = "/report"; // default redirect
      if (role === "Supervisor") redirectUrl = "/supervisor";
      else if (role === "Cleaner") redirectUrl = "/cleaner";
      return Response.redirect(new URL(redirectUrl, req.url));
    }

    // 🔒 Role-based protection for specific routes
    if (pathname.startsWith("/supervisor") && role !== "Supervisor") {
      return Response.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/cleaner") && role !== "Cleaner") {
      return Response.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/report") && role !== "Reporter") {
      return Response.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // must have a valid session
    },
  }
);

// 🧭 Routes to apply middleware to
export const config = {
  matcher: [
    "/supervisor/:path*",
    "/cleaner/:path*",
    "/report/:path*",
  ],
};
