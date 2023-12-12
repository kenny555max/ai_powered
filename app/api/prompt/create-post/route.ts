import PostModel from "'@/models/post";
import { connectToDB } from "'@/utils/db";

export async function POST(req: Request, res: Response) {
    try {
        await connectToDB();

        const body = await req.json();

        console.log(body)

        const prompt = await PostModel.create(body);

        return Response.json('successfull');
    } catch (error) {
        console.log(error);
        return Response.json(error.message);
    }
}