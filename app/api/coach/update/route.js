import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/Lib/mongodb";
import { promises as fs } from "fs";
import path from "path";


// Disable body parsing to handle file streams directly
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
    
    // Extract basic data from formData
    const name = formData.get("name"); 
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const title = formData.get("title");
    const description = formData.get("description");
    const hourlyRate = parseFloat(formData.get("hourlyRate"));

    const updateData = {
      name,
      firstName,
      lastName,
      email,
      contact,
      title,
      description,
      hourlyRate,
   
      
    };

    // Handle profile photo if provided
    const profilePhoto = formData.get("profilePhoto");
    if (profilePhoto && profilePhoto.name) {
      const photoDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(photoDir, { recursive: true });
      const profilePhotoPath = path.join(photoDir, profilePhoto.name);
      const photoBuffer = Buffer.from(await profilePhoto.arrayBuffer());
      await fs.writeFile(profilePhotoPath, photoBuffer);
      updateData.profilePhoto = `/uploads/${profilePhoto.name}`;
    }

   // Handle gallery photos if provided
const galleryFiles = formData.getAll("gallery");

if (galleryFiles && galleryFiles.length > 0) {
  const galleryDir = path.join(process.cwd(), "public/uploads/gallery");

  // Ensure the directory exists
  await fs.mkdir(galleryDir, { recursive: true });

  // Update gallery paths
  updateData.gallery = await Promise.all(
    galleryFiles.map(async (file, index) => {
      const timestamp = Date.now(); // Add a timestamp to avoid overwriting files
      const sanitizedFileName = `${timestamp}-${index}-${file.name.replace(
        /[^a-zA-Z0-9.-]/g,
        ""
      )}`; // Sanitize file name to remove special characters
      const filePath = path.join(galleryDir, sanitizedFileName);
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // Write the file to the gallery directory
      await fs.writeFile(filePath, fileBuffer);

      // Return the relative path for storage in the database
      return `/uploads/gallery/${sanitizedFileName}`;
    })
  );
}

    await db.collection("users").updateOne({ email: userEmail }, { $set: updateData });
    session.user.profilePhoto = updateData.profilePhoto;
    return new Response("Profile updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response("Failed to update profile", { status: 500 });
  }
}
