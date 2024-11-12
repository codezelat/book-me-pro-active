// app/api/users/[userId]/route.js
import { verifyTokenAndAuthorization } from "../../../../utils/middleware";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../Lib/mongodb"; // Adjust this path if needed

export default async function handler(req, res) {
    const {
      method,
      query: { userId },
    } = req;
  
    // Apply the middleware to check if the user is authenticated
    await verifyTokenAndAuthorization(req, res);
    
    if (res.headersSent) return; // If headers are already sent due to an error (Unauthorized), we stop further processing.
  
    try {
      if (method === "GET") {
        // Fetch the user data based on userId
        const user = await User.findOne({ _id: userId });
  
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        // Respond with user data if found
        return res.status(200).json(user);
      } else {
        return res.status(405).json({ message: "Method Not Allowed" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  }