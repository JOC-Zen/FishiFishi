import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect to landing (with login form) if not authenticated
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/portal/:path*"],
};
