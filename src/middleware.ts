import { NextRequest, NextResponse } from "next/server";
import { roleKey } from "./lib";
import { cookies } from "next/headers";

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/varify-otp-password",
  "/onside-account",
];

const userlanding = [
  "/about-us",
  "/contact-us",
  "/fqa",
  "/history",
  "/like-videos",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const authRole = cookiesStore.get(roleKey)?.value;

  // no allowed for the user
    if (!authRole) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
//   if (authRole == "ADMIN" || "USER") {
//     if (authRoutes.some((route) => pathname.match(route))) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   } else {
//     return NextResponse.next();
//   }

  //    admin private route || user private route
  if (authRole === "ADMIN") {
    const routes = [/^\/admin\/*/];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  } else if (authRole === "USER") {
    const routes = [/^\/dashboard\/*/];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    } else if (userlanding.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard/:page*",
    "/admin/:page*",
    "/about-us",
    "/contact-us",
    "/fqa",
    "/history",
    "/like-videos",
    // auth route all
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/varify-otp-password",
    "/onside-account",
  ],
};
