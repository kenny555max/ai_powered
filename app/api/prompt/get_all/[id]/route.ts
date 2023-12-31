import PostModel from "'@/models/post";
import { connectToDB } from "'@/utils/db";
import { NextRequest } from "next/server";

connectToDB();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        if (!params.id) throw new Error('Invalid User Id');

        const prompts = await PostModel.find({ creator_id: params.id });

        if (!prompts) throw new Error('Internal Server Error');

        return Response.json(prompts);
    } catch (error) {
        return Response.json(error);
    }
}
