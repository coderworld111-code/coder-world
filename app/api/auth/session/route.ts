import { NextResponse } from "next/server";
import { createFirebaseSession } from "@/lib/auth";
import { signupSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.idToken) return NextResponse.json({ success: false, error: { message: "Missing Firebase ID token." } }, { status: 400 });
    const profile = body.profile ? signupSchema.pick({ name: true, phone: true, company: true }).partial().parse(body.profile) : undefined;
    const session = await createFirebaseSession(body.idToken, profile);
    return NextResponse.json({ success: true, session, redirect: session.role === "CLIENT" ? "/client" : "/admin" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: { message: e instanceof Error ? e.message : "Firebase session could not be created." } }, { status: 401 });
  }
}
