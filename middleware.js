import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    // 🚫 Prevent logged-in users from visiting login/register
    if (
      role &&
      (pathname.startsWith("/login") || pathname.startsWith("/register"))
    ) {
      let redirectUrl = "/report"; // Default redirect
      if (role === "Supervisor") redirectUrl = "/supervisor";
      else if (role === "Cleaner") redirectUrl = "/cleaner";
      return Response.redirect(new URL(redirectUrl, req.url));
    }

    // 🔒 Role-based route protection
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
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // ✅ Allow public access to login/register
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
          return true;
        }

        // Require authentication for other routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/supervisor/:path*",
    "/cleaner/:path*",
    "/report/:path*",
  ],
};
