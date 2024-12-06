export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/Lib/mongodb";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

function getFileExtension(filename) {
  if (!filename || typeof filename !== "string") return "";
  filename = filename.split("?")[0].split("#")[0];
  const ext = filename.split(".").pop();
  return !ext || ext === filename ? "" : ext.toLowerCase();
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { db } = await connectToDatabase();
  const userEmail = session.user.email;

  try {
    console.log("Parsing formData...");
    const formData = await req.formData();
    console.log("Form Data Keys:", Array.from(formData.keys())); // Debugging

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const title = formData.get("title");
    const description = formData.get("description");
    const hourlyRate = parseFloat(formData.get("hourlyRate"));

    const updateData = {
      firstName,
      lastName,
      email,
      contact,
      title,
      description,
      hourlyRate,
    };

    const profilePhoto = formData.get("profilePhoto");
    if (profilePhoto && profilePhoto.name) {
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      console.log("Creating uploads directory:", uploadsDir);
      await fs.mkdir(uploadsDir, { recursive: true });

      const uniqueKey = uuidv4();
      const fileExtension = getFileExtension(profilePhoto.name);

      if (!fileExtension) {
        throw new Error("No valid extension found");
      }

      const fileName = `${uniqueKey}.${fileExtension}`;
      const profilePhotoPath = path.join(uploadsDir, fileName);

      const photoBuffer = Buffer.from(await profilePhoto.arrayBuffer());
      await fs.writeFile(profilePhotoPath, photoBuffer);

      updateData.profilePhoto = `/uploads/${fileName}`;
    }

    console.log("Updating user with email:", userEmail);
    await db.collection("users").updateOne({ email: userEmail }, { $set: updateData });

    session.user.profilePhoto = updateData.profilePhoto;
    console.log("Profile updated successfully");
    return NextResponse.json("Profile updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json("Failed to update profile", { status: 500 });
  }
}
