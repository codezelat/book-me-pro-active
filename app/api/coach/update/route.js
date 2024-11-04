import connectToDatabase from "@/Lib/mongodb";
import { NextResponse } from "next/server";
import { GridFSBucket, ObjectId } from "mongodb";

export async function POST(req) {
    try {
        const { db } = await connectToDatabase();
        const formData = await req.formData();

        const coachId = formData.get("coachId");  // assuming the client sends `coachId` in the form data
        if (!coachId) {
            return NextResponse.json({ message: "Coach ID is required" }, { status: 400 });
        }

        // Parse form data fields
        const profilePhoto = formData.get("profilePhoto");  // Blob or file type
        const gallery = formData.getAll("gallery");  // Array of Blobs or file types
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const contact = formData.get("contact");
        const title = formData.get("title");
        const description = formData.get("description");
        const hourlyRate = formData.get("hourlyRate");

        // Validate required fields (if any specific field is mandatory)
        if (!email || !firstName || !lastName || !contact) {
            return NextResponse.json({ message: "Some required fields are missing" }, { status: 400 });
        }

        // Prepare fields to update
        const updateData = {
            firstName,
            lastName,
            email,
            contact,
            title,
            description,
            hourlyRate: Number(hourlyRate),
            updatedAt: new Date(),
        };

        // Profile Photo Upload
        if (profilePhoto) {
            const bucket = new GridFSBucket(db, { bucketName: "photos" });
            const uploadStream = bucket.openUploadStream(profilePhoto.name);
            uploadStream.end(profilePhoto);
            updateData.image = `/api/files/${uploadStream.id}`; // assuming you will have an API to serve files
        }

        // Gallery Upload
        if (gallery.length > 0) {
            const galleryUrls = [];
            const bucket = new GridFSBucket(db, { bucketName: "photos" });

            for (const file of gallery) {
                const uploadStream = bucket.openUploadStream(file.name);
                uploadStream.end(file);
                galleryUrls.push(`/api/files/${uploadStream.id}`);
            }

            updateData.gallery = galleryUrls;
        }

        // Update the coach data in the database
        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(coachId) },
            { $set: updateData }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "No changes made to the profile" }, { status: 304 });
        }

        return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
