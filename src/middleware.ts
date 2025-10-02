// import { NextRequest, NextResponse } from "next/server";
// import { roleKey } from "./lib";
// import { cookies } from "next/headers";

import { NextRequest } from "next/server";

// const authRoutes = [
//   "/sign-in",
//   "/sign-up",
//   "/forgot-password",
//   "/reset-password",
//   "/varify-otp-password",
//   "/onside-account",
// ];

// const userlanding = [
//   "/about-us",
//   "/contact-us",
//   "/fqa",
//   "/history",
//   "/like-videos",
// ];

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const cookiesStore = await cookies();
//   const authRole = cookiesStore.get(roleKey)?.value;

//   // Check if the user is authenticated
//   if (!authRole) {
//     if (authRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   // Admin specific routes
//   if (authRole === "ADMIN") {
//     // Redirect to /admin if trying to access root
//     if (pathname === "/") {
//       return NextResponse.redirect(new URL("/admin", request.url));
//     }

//     const routes = [/^\/admin\/*/];
//     if (routes.some((route) => pathname.match(route))) {
//       return NextResponse.next();
//     }
//   } 
//   // User specific routes
//   else if (authRole === "USER") {
//     const routes = [/^\/dashboard\/*/];
//     if (routes.some((route) => pathname.match(route))) {
//       return NextResponse.next();
//     } else if (userlanding.some((route) => pathname.match(route))) {
//       return NextResponse.next();
//     }
//   }

//   // Default redirect to the home page if no conditions match
//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: [
//     "/dashboard/:page*",
//     "/admin/:page*",
//     "/about-us",
//     "/contact-us",
//     "/fqa",
//     "/history",
//     "/like-videos",
//     // auth route all
//     "/sign-in",
//     "/sign-up",
//     "/forgot-password",
//     "/reset-password",
//     "/varify-otp-password",
//     "/onside-account",
//   ],
// };

export async function middleware(request: NextRequest) {
 console.log("Middleware is running");
}