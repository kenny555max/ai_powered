import PostModel from "'@/models/post";
import { connectToDB } from "'@/utils/db";

export async function GET() {
    try {
        await connectToDB();

        const prompts = await PostModel.find();

        if (!prompts) throw new Error('Internal Server Error');

        return Response.json(prompts);
    } catch (error) {
        return Response.json(error);
    }
}