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
    console.log(formData,"profilePhoto");

    // Handle profile photo if provided
    const profilePhoto = formData.get("profilePhoto");
    console.log(profilePhoto.name,"profilePhoto");
    if (profilePhoto && profilePhoto.name) {
      const photoDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(photoDir, { recursive: true });
      const profilePhotoPath = path.join(photoDir, profilePhoto.name);
      const photoBuffer = Buffer.from(await profilePhoto.arrayBuffer());
      await fs.writeFile(profilePhotoPath, photoBuffer);
      updateData.profilePhoto = `/uploads/${profilePhoto.name}`;
    }

    const gallery = formData.get("gallery");
    if (gallery && Array.isArray(gallery)) {
      const photoDir = path.join(process.cwd(), "public/uploads/gallery");
      await fs.mkdir(photoDir, { recursive: true });
    
      // Ensure `updateData.gallery` is an array
      updateData.gallery = [];
    
      for (const image of gallery) {
        const imagePath = path.join(photoDir, image.name);
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        await fs.writeFile(imagePath, imageBuffer);
    
        // Push each uploaded image path to the `gallery` array
        updateData.gallery.push(`/uploads/gallery/${image.name}`);
      }
    }
    
    
    

    // Handle gallery photos if provided
    // const gallery = formData.getAll("gallery");
    // console.log(gallery,"gallery");
    
    // if (gallery && gallery.length > 0) {
    //   const galleryDir = path.join(process.cwd(), "public/uploads/gallery");
    //   await fs.mkdir(galleryDir, { recursive: true });
    //   updateData.gallery = await Promise.all(
    //     gallery.map(async (file) => {
    //       const filePath = path.join(galleryDir, file.name);
    //       const fileBuffer = Buffer.from(await file.arrayBuffer());
    //       await fs.writeFile(filePath, fileBuffer);
    //       return `/uploads/gallery/${file.name}`;
    //     })
    //   );
    // }

    await db.collection("users").updateOne({ email: userEmail }, { $set: updateData });
    session.user.profilePhoto = updateData.profilePhoto;
    return new Response("Profile updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response("Failed to update profile", { status: 500 });
  }
}
