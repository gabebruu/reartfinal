import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        // O middleware já está protegendo as rotas definidas no matcher
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // Se houver token, permite acesso
                return !!token;
            },
        },
    }
);

export const config = {
    // Apenas proteger rotas do dashboard, NÃO incluir /api/auth
    matcher: [
        "/dashboard/:path*",
    ],
};