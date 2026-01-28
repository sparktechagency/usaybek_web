// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import { roleKey } from "./lib";

// // Define route constants for better readability and maintainability
// const authRoutes = [
//   "/sign-in",
//   "/sign-up",
//   "/forgot-password",
//   "/reset-password",
//   "/varify-otp-password",
//   "/onside-account",
// ];

// const userLanding = [
//   "/fqa",
//   "/history",
//   "/like-videos",
// ];

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const cookiesStore = await cookies();
//   const authRole = cookiesStore.get(roleKey)?.value;

//   // If no role is assigned, redirect to the login page for any restricted path
//   if (!authRole) {
//     if (authRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   // Handle route access for authenticated users || pathname.startsWith("/dashboard/");
//   if (authRole === "USER") {
//     const isUserRoute = userLanding.includes(pathname);
//     if (isUserRoute) {
//       return NextResponse.next();
//     }
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Handle route access for admin users
//   if (authRole === "ADMIN") {
//     if (/^\/admin\/*/.test(pathname)) {
//       return NextResponse.next();
//     }
//     // Admins are allowed to access admin-related paths
//     return NextResponse.redirect(new URL("/admin", request.url));
//   }

//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: [
//     "/admin/:path*",
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


import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authKey, roleKey } from "./lib";


/* ---------------- ROUTES ---------------- */

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/varify-otp-password",
];

const publicRoutes = [
  "/",
  "/blogs",
  "/promotions",
  "/about-us",
  "/terms",
  "/privacy",
  "/onside-account",
  "/contract",
];

const userRoutes = [
  "/dashboard",
  "/like-videos",
  "/history",
];

const adminRoutes = [
  "/admin",
];

/* ---------------- HELPERS ---------------- */

const matchRoute = (routes: string[], pathname: string) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

/* ---------------- MIDDLEWARE ---------------- */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const token = cookieStore.get(authKey)?.value;
  const role = cookieStore.get(roleKey)?.value;

  const isAuth = matchRoute(authRoutes, pathname);
  const isPublic = matchRoute(publicRoutes, pathname);
  const isUser = matchRoute(userRoutes, pathname);
  const isAdmin = matchRoute(adminRoutes, pathname);

  /* ---------- NOT LOGGED IN ---------- */
  if (!token) {
    if (isUser || isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  /* ---------- LOGGED IN ---------- */

  // prevent visiting auth pages after login
  if (isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /* ---------- USER ROLE ---------- */
  if (role === "USER") {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  /* ---------- ADMIN ROLE ---------- */
  if (role === "ADMIN") {
    if (isUser) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  /* ---------- FALLBACK ---------- */
  return NextResponse.redirect(new URL("/sign-in", request.url));
}

/* ---------------- MATCHER ---------------- */

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
