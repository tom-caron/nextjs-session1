import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(function proxy(req) {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname.startsWith("/api")) {
    const ts = new Date().toISOString().slice(11, 19);

    console.log(
      `[${ts}] ${req.method.padEnd(6)} ${pathname} ${session ? "✓" : "○"}`,
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/api/:path*", "/profile/:path*"],
};
