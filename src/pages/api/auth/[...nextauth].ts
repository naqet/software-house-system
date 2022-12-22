import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
	session: { strategy: "jwt" },
	pages: {
		signIn: "/login",
	},
	// Include user.id on session
	callbacks: {
		jwt({ token, account, user }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			if (token.user && user) {
				token.user.id = user.id;
				token.user.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user && token.user) {
				session.user.id = token.user.id;
				session.user.role = token.user.role;
			}
			return session;
		},
		async redirect({ url, baseUrl }) {
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password)
					throw new Error("Invalid email or password");

				if (!prisma) throw new Error("Internal Server Error");

				const { email, password } = credentials;

				const user = await prisma.user.findFirst({ where: { email } });

				if (!user || !user.passwordHash)
					throw new Error("Invalid email or password");

				const isPasswordValid = await bcrypt.compare(
					password,
					user.passwordHash
				);

				if (!isPasswordValid) throw new Error("Invalid email or password");

				return user;
			},
		}),
		GitHubProvider({
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		}),
	],
};

export default NextAuth(authOptions);
