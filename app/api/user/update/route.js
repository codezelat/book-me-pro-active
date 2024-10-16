import { getServerSession } from "next-auth";
import clientPromise from "@/Lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";  // Corrected import

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const { name, contact } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  try {
    // Update user profile
    await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: { name, contact } }
    );

    // Re-fetch updated session after profile update (optional if required)
    const updatedSession = await getServerSession(authOptions);

    return new Response(JSON.stringify({ message: "Profile updated successfully", user: updatedSession.user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating profile" }), { status: 500 });
  }
}
