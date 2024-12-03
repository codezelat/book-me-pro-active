import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/Lib/mongodb";
import { promises as fs } from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { db } = await connectToDatabase();
  const userEmail = session.user.email;

  try {
    const formData = await req.formData();

    // Extract basic data
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

    // Handle profile photo
    const profilePhoto = formData.get("profilePhoto");
    if (profilePhoto && profilePhoto.name) {
      const photoDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(photoDir, { recursive: true });
      const uniquePhotoName = `${Date.now()}-${profilePhoto.name}`;
      const profilePhotoPath = path.join(photoDir, uniquePhotoName);
      const photoBuffer = Buffer.from(await profilePhoto.arrayBuffer());
      await fs.writeFile(profilePhotoPath, photoBuffer);
      updateData.profilePhoto = `/uploads/${uniquePhotoName}`;
    }

    // Handle gallery photos if provided
    const gallery = formData.getAll("gallery");
    if (gallery && gallery.length > 0) {
      const galleryDir = path.join(process.cwd(), "public/uploads/gallery");
      await fs.mkdir(galleryDir, { recursive: true });
      updateData.gallery = await Promise.all(
        gallery.map(async (file) => {
          const filePath = path.join(galleryDir, file.name);
          const fileBuffer = Buffer.from(await file.arrayBuffer());
          await fs.writeFile(filePath, fileBuffer);
          return `/uploads/gallery/${file.name}`;
        })
      );
    }
 

    // Update database
    await db
      .collection("users")
      .updateOne({ email: userEmail }, { $set: updateData });
    session.user.profilePhoto = updateData.profilePhoto;
    return new Response("Profile updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response("Failed to update profile", { status: 500 });
  }
}


