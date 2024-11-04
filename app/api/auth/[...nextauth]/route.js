// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/Lib/mongodb";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { db } = await connectToDatabase();

                // Log the incoming credentials for debugging
                console.log("Attempting login for email:", credentials.email);

                // Find user by email
                const user = await db.collection("users").findOne({ email: credentials.email });
                if (!user) {
                    console.log("No user found with that email.");
                    return null;
                }

                // Validate password
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    console.log("Invalid password.");
                    return null;
                }

                // Return user details on successful authentication
                console.log("User authenticated successfully:", user.email);
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    contact: user.contact, // Assuming contact exists in the user document
                };
            },
        }),
    ],
    pages: {
        signIn: '/auth/login', // Custom sign-in page
    },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            // Attach user info to JWT token on first login
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.contact = user.contact;
            }
            return token;
        },
        async session({ session, token }) {
            // Pass token data to session
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.contact = token.contact;
            return session;
        },
    },
    debug: process.env.NODE_ENV === 'development', // Enables detailed debug output in development
};

// Export NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
