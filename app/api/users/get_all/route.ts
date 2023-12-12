import UserModel from "'@/models/user";
import { connectToDB } from "'@/utils/db";
import { NextRequest } from "next/server";

connectToDB();

export async function GET(req: NextRequest) {
    try {
        const users = await UserModel.find();

        if (!users) throw new Error('Internal Server Error');

        return Response.json(users);
    } catch (error) {
        return Response.json(error);
    }
}
