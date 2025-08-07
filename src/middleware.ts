import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const publicUrl = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const { user } = (await auth()) || {};
  const isAuth = !!user;
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const origin = nextUrl.origin;
  const form = nextUrl.searchParams.get("from");
  const isUpdatePasswordPage =
    nextUrl.searchParams.get("updatePassword") === "true";
  const params = nextUrl.search;
  const passwordNotExit = user?.isPasswordExit === false;

  if (passwordNotExit) {
    const redirectUrl = publicUrl.includes(pathname) ? "/" : pathname;

    if (isUpdatePasswordPage) {
      return NextResponse.next();
    } else {
      if (publicUrl.some((u) => pathname.startsWith(u))) {
        return NextResponse.redirect(
          new URL(
            `/login?updatePassword=true&from=${form || redirectUrl}`,
            origin,
          ),
          301,
        );
      }
    }
  } else {
    if (publicUrl.some((u) => pathname.startsWith(u))) {
      if (isAuth) {
        return NextResponse.redirect(new URL(form || "/", origin));
      } else if (isUpdatePasswordPage) {
        return NextResponse.redirect(new URL("/login", origin), 301);
      }

      return NextResponse.next();
    }

    if (!isAuth) {
      return NextResponse.redirect(
        new URL(`/login?from=${pathname + params}`, origin),
      );
    }
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/figma-connect",
    "/dashboard/:path*",
    "/author/:path*",
    "/onboarding",
    "/redeem",
  ],
};
