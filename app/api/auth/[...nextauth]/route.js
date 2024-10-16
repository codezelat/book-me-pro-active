// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/Lib/mongodb"; // Adjust this path as per your project
import bcrypt from "bcryptjs"; // Ensure bcrypt is imported

// Define and export authOptions
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", required: true }, // Added 'required' to credentials
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                const client = await clientPromise;
                const db = client.db("your-database-name"); // Replace with your actual database name
                const user = await db.collection("users").findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("No user found with that email");
                }

                // Use bcrypt.compare to compare the password
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid email or password");
                }

                return { email: user.email, name: user.name, contact: user.contact  }; // Return user object on successful login
            },
        }),
    ],
    pages: {
        signIn: '/auth/login', // Custom sign-in page
    },
    session: {
        strategy: "jwt", // Use JWT for session management
    },
    callbacks: {
        async jwt({ token, user }) {
            // Add user information to the token if available
            if (user) {
                token.email = user.email;
                token.name = user.name;
                token.contact = user.contact; 
            }
            return token;
        },
        async session({ session, token }) {
            // Pass user information from the token to the session
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.contact = token.contact; 
            return session;
        },
    },
};

// Initialize NextAuth with authOptions
const handler = NextAuth(authOptions);

// Export the NextAuth handler
export { handler as GET, handler as POST };
