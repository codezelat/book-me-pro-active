// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../../Lib/mongodb";

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

                const user = await db.collection("users").findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("No user found with that email.");
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid password.");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    contact: user.contact,
                    title: user.title,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    description: user.description,
                    hourlyRate: user.hourlyRate, 
                    profilePhoto: user.profilePhoto, 
                
                    
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
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.contact = user.contact;
                token.title = user.title;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.description = user.description;
                token.hourlyRate = user.hourlyRate;
                token.profilePhoto = user.profilePhoto;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.contact = token.contact;
            session.user.title = token.title;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            session.user.description = token.description;
            session.user.hourlyRate = token.hourlyRate;
            session.user.profilePhoto = token.profilePhoto;
            return session;
        },
    },
    debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };