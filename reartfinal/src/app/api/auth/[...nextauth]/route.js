import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/database/connection";
import User from "@/database/models/User";

const providers = [
    CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    await connectDB();

                    const user = await User.findOne({ email: credentials.email }).lean();
                    if (!user) {
                        return null;
                    }

                    if (!user.password) {
                        return null;
                    }

                    const match = await bcrypt.compare(credentials.password, user.password);
                    if (!match) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    };
                } catch (error) {
                    console.error("Erro no authorize:", error);
                    return null;
                }
            },
        }),
];

// Adicionar Google Provider apenas se as credenciais estiverem configuradas
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    );
}

const handler = NextAuth({
    providers,

    secret: process.env.NEXTAUTH_SECRET,

    session: { strategy: "jwt" },

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    await connectDB();
                    const existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            createdAt: new Date(),
                        });
                    }
                } catch (error) {
                    console.error("Erro ao criar/atualizar usuário do Google:", error);
                    return false;
                }
            }
            return true;
        },

        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            if (account?.provider === "google") {
                try {
                    await connectDB();
                    const dbUser = await User.findOne({ email: token.email }).lean();
                    if (dbUser) {
                        token.id = dbUser._id.toString();
                    }
                } catch (error) {
                    console.error("Erro ao buscar usuário no JWT:", error);
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id || token.sub;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
    },

    pages: {
        signIn: "/",
    },
});

export { handler as GET, handler as POST };