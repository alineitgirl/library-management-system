import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
    env: {
        imagekit: {
            publicKey,
            privateKey,
            urlEndpoint
        }
    }
} = config;

const imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint
});

export async function GET() {
    const result = imagekit.getAuthenticationParameters();

    return NextResponse.json({
        token: result.token,
        expire: result.expire,
        signature: result.signature,
        publicKey: config.env.imagekit.publicKey
    });
}