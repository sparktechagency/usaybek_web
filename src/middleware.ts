// // middleware.ts (Next.js Middleware)
// import { NextRequest, NextResponse } from "next/server";
// import { roleKey } from "./lib";
// import { cookies } from "next/headers";

// // Define route arrays for authentication-based and user landing pages.
// const authRoutes = [
//   "/sign-in",
//   "/sign-up",
//   "/forgot-password",
//   "/reset-password",
//   "/varify-otp-password",
//   "/onside-account",
// ];

// const userLanding = [
//   "/about-us",
//   "/contact-us",
//   "/fqa",
//   "/history",
//   "/like-videos",
// ];

// // Middleware function to check user roles and access rights.
// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const cookiesStore = await cookies();
//   const authRole = cookiesStore.get(roleKey)?.value; // Get user role from cookies

//   if (!authRole) {
//     if (authRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   // Handle role-based routing for admins
//   if (authRole === "USER") {
//     if (
//       /^\/dashboard\/*/.test(pathname) ||
//       userLanding.some((route) => pathname.match(route))
//     ) {
//       return NextResponse.next();
//     }
//   } else if (authRole === "ADMIN") {
//     if (/^\/admin\/*/.test(pathname)) {
//       return NextResponse.next();
//     }
//   }

//   return NextResponse.redirect(new URL("/", request.url));
// }

// // Configuring the middleware to apply on specific routes
// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/admin/:path*",
//     "/about-us",
//     "/contact-us",
//     "/fqa",
//     "/history",
//     "/like-videos",
//     "/sign-in",
//     "/sign-up",
//     "/forgot-password",
//     "/reset-password",
//     "/varify-otp-password",
//     "/onside-account",
//   ],
// };

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { roleKey } from "./lib";

// Define route constants for better readability and maintainability
const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/varify-otp-password",
  "/onside-account",
];

const userLanding = [
  "/fqa",
  "/about-us",
  "/contact-us",
  "/history",
  "/like-videos",
  // "dashboard",
  // "/dashboard/:path*",
];

// Helper function to check if the path matches any of the defined routes
const pathMatches = (path: string, routes: string[]) => {
  return routes.some(route => new RegExp(route.replace(':path*', '.*')).test(path));
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const authRole = cookiesStore.get(roleKey)?.value;

  // If no role is assigned, redirect to the login page for any restricted path
  if (!authRole) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Handle route access for authenticated users
  if (authRole === "USER") {
    if (pathMatches(pathname, userLanding)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Handle route access for admin users
  if (authRole === "ADMIN") {
    if (/^\/admin\/*/.test(pathname)) {
      return NextResponse.next();
    }
    // Admins are allowed to access admin-related paths
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    // "/dashboard/:path*",
    "/admin/:path*",
    "/fqa",
    "/about-us",
    "/contact-us",
    "/history",
    "/like-videos",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/varify-otp-password",
    "/onside-account",
  ],
};
