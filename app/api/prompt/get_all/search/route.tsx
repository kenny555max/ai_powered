import PostModel from "'@/models/post";
import { connectToDB } from "'@/utils/db";
import { NextApiRequest } from "next";

connectToDB();

export async function GET(req: NextApiRequest) {
    try {
        const url = new URL(req.url!);
        const searchTerm = url.searchParams.get('query');

        const prompts = await PostModel.find({
            $or: [
                { tags: searchTerm }, // Check if searchTerm is in the tags array
                { post: { $regex: searchTerm, $options: 'i' } }, // Check if searchTerm is in the post sentence (case-insensitive)
                { creator_name: { $regex: searchTerm, $options: 'i' } }, // Check if searchTerm matches creator_name (case-insensitive)
                { creator_email: { $regex: searchTerm, $options: 'i' } }, // Check if searchTerm matches creator_email (case-insensitive)
            ],
        })

        return Response.json(prompts);
    } catch (error) {
        return Response.json(error.message);
    }
}