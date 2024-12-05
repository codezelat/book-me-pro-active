import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/Lib/mongodb";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Disable body parsing to handle file streams directly
export const runtime = 'nodejs'; // Specify runtime environment
export const api = {
  bodyParser: false, // Disable body parsing for this route
};


function getFileExtension(filename) {
  // Handle empty or invalid input
  if (!filename || typeof filename !== "string") {
    return "";
  }

  // Remove any query parameters or hash
  filename = filename.split("?")[0].split("#")[0];

  // Get the last part after the final dot
  const ext = filename.split(".").pop();

  // Return empty string if there's no extension
  // or if the filename starts with a dot (hidden file)
  return !ext || ext === filename ? "" : ext.toLowerCase();
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { db } = await connectToDatabase();
  const userEmail = session.user.email;

  try {
    const formData = await req.formData();
    console.log({ formData });

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
    //console.log(formData,"profilePhoto");

    // Handle profile photo if provided
    const profilePhoto = formData.get("profilePhoto");
    if (profilePhoto && profilePhoto.name) {
      // Create base uploads directory
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadsDir, { recursive: true });

      const uniqueKey = uuidv4();
      const fileExtension = getFileExtension(profilePhoto.name);

      if (!fileExtension) {
        throw new Error("No valid extension found");
      }

      // Create filename without leading slash
      const fileName = `${uniqueKey}.${fileExtension}`;
      const profilePhotoPath = path.join(uploadsDir, fileName);

      const photoBuffer = Buffer.from(await profilePhoto.arrayBuffer());
      await fs.writeFile(profilePhotoPath, photoBuffer);

      // Store the path in database with forward slashes for web access
      updateData.profilePhoto = `/uploads/${fileName}`;
    }

    const gallery = formData.getAll("gallery");

    if (gallery && gallery.length > 0) {
      console.log("Gallery files found:", gallery);

      // Create the directory for gallery images
      const photoDir = path.join(process.cwd(), "public/uploads/gallery");
      await fs.mkdir(photoDir, { recursive: true });

      // Ensure `updateData.gallery` is an array
      updateData.gallery = [];

      for (const image of gallery) {
        if (image && image.name) {
          // Generate unique name for each image
          const uniqueKey = uuidv4();
          const fileExtension = getFileExtension(image.name);

          if (!fileExtension) {
            throw new Error(`Invalid file extension for image: ${image.name}`);
          }

          const fileName = `${uniqueKey}.${fileExtension}`;
          const imagePath = path.join(photoDir, fileName);

          // Convert image to buffer and save it
          const imageBuffer = Buffer.from(await image.arrayBuffer());
          await fs.writeFile(imagePath, imageBuffer);

          // Add the relative path of the image to the gallery array
          updateData.gallery.push(`/uploads/gallery/${fileName}`);
        } else {
          console.warn("Skipping invalid or missing image:", image);
        }
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
