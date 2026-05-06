import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirigir a la landing (donde está el login) si no está autenticado
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
