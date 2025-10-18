import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    // Allow public routes freely
    if (
      pathname === "/" ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/assets")
    ) {
      return NextResponse.next();
    }

    // Redirect already logged-in users away from login/register pages
    if (
      role &&
      (pathname.startsWith("/login") || pathname.startsWith("/register"))
    ) {
      let redirectUrl = "/report";
      if (role === "Supervisor") redirectUrl = "/supervisor";
      else if (role === "Cleaner") redirectUrl = "/cleaner";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // Role-based protection
    if (pathname.startsWith("/supervisor") && role !== "Supervisor") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (pathname.startsWith("/cleaner") && role !== "Cleaner") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (pathname.startsWith("/report") && role !== "Reporter") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow everything else
    return NextResponse.next();
  },
  {
    callbacks: {
      // ✅ Allow public access for login/register routes
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Always allow login/register and home page
        if (
          pathname === "/" ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register")
        ) {
          return true;
        }

        // Protect private routes
        return !!token;
      },
    },
  }
);

// Apply middleware only to these routes
export const config = {
  matcher: [
    "/supervisor/:path*",
    "/cleaner/:path*",
    "/report/:path*",
    "/login",
    "/register",
  ],
};
