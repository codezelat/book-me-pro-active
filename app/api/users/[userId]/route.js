import { verifyTokenAndAuthorization } from "../../../../utils/middleware";  // Custom middleware
import { ObjectId } from "mongodb";
import dbConnect from "../../../../Lib/mongodb"; // Ensure this path is correct
import User from "../../../../models/user";
// The main handler for this route
export default async function handler(req, res) {
    const { method, query: { userId } } = req;

    // Apply the middleware to verify the user's token and authorization
    await verifyTokenAndAuthorization(req, res);
    
    if (res.headersSent) return; // Prevent further processing if an error occurred already

    try {
        if (method === "GET") {
            // Establish a database connection
            await dbConnect();

            // Fetch the user data based on userId
            const user = await User.findOne({ _id: ObjectId(userId) });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Return user data if found
            return res.status(200).json(user);
        } else {
            return res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
}
