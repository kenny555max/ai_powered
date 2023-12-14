import UserModel from "'@/models/user";
import { connectToDB } from "'@/utils/db";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

import { GoogleProfile } from 'next-auth/providers/google';
import { SignInCallback } from 'next-auth/internals';

interface SignInCallbackParams {
  profile: GoogleProfile;
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
    console.log('fucked up here');
  throw new Error("Google client ID or client secret is not defined");
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret
        })
    ],
    callbacks: {
        async signIn({ profile }: SignInCallbackParams): Promise<boolean | undefined> {
            try {
                await connectToDB();

                if (!profile) {
                    console.error('Google sign-in: Invalid or missing profile');
                    return false;
                }

                let isUser = await UserModel.findOne({ email: profile.email });

                if (isUser) {
                    return true;
                }

                const user = await UserModel.create({
                    username: profile.name,
                    avatar: profile.picture,
                    is_avatar: profile.picture ? true : false,
                    email: profile.email,
                    email_verified: profile.email_verified,
                    google_profile_id: profile.sub
                });

                if (user) {
                    return user;
                } else {
                    throw new Error('Internal Server Error');
                }
            } catch (error) {
                console.log('GOOGLE NII OOO' + error);
                return false;
            }
        },
        async session({ session }: {
            session: {
                user: {
                    name: string | null | undefined,
                    image: string | null | undefined,
                    email: string | null | undefined,
                    id: string | null | undefined
                }
            }
        }) {
            try {
                if (!session.user) {
                    console.error('Session: User data is missing');
                    return false;
                }

                const user = await UserModel.findOne({ email: session.user.email });

                if (user) {
                    session.user.id = user._id.toString();
                    console.log('Session updated with user ID:', session.user.id);
                    return session;
                } else {
                    console.error('Session: User not found in the database');
                    return false;
                }
            } catch (error) {
                console.error('Session error:', error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };
