import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const USERNAME = "admin";
const PASSWORD = "password123";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (username === USERNAME && password === PASSWORD) {
            // Set session cookie (valid for API access)
            // UI will Force-Lock on reload anyway
            const oneDay = 24 * 60 * 60 * 1000;
            cookies().set("dashboard_session_v2", "true", {
                expires: Date.now() + oneDay,
                httpOnly: true,
                path: "/",
                secure: process.env.NODE_ENV === "production"
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
    }
}
