export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/compliance/:path*",
    "/settings/:path*",
    "/governance/:path*",
    "/risk/:path*",
    "/audit/:path*",
    "/upload/:path*",
    "/applications/:path*",
    "/policies/:path*",
    "/roles/:path*",
  ] 
}
