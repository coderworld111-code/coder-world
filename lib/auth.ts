import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { sendAdminEmail } from "@/lib/email";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "coderworld111@gmail.com";
export const ADMIN_UID = process.env.ADMIN_UID || "";
export const ADMIN_ROLES = new Set(["SUPER_ADMIN", "ADMIN", "MANAGER"]);
export function isAdminRole(role: string) { return ADMIN_ROLES.has(role); }

export async function createFirebaseSession(idToken: string, profile?: { name?: string; phone?: string; company?: string }) {
  const decoded = await adminAuth().verifyIdToken(idToken);
  if (!decoded.email) throw new Error("A verified email address is required.");
  const isAdmin = !!ADMIN_UID && decoded.uid === ADMIN_UID;
  if (!decoded.email_verified && !isAdmin) throw new Error("Please verify your email address before signing in.");

  const userRef = adminDb().collection("users").doc(decoded.uid);
  const snap = await userRef.get();
  const existing = snap.data() || {};
  const role = isAdmin ? "SUPER_ADMIN" : ((existing.role as string | undefined) || "CLIENT");
  const now = new Date();
  const userData = {
    uid: decoded.uid,
    email: decoded.email,
    name: profile?.name || decoded.name || existing.name || "",
    phone: profile?.phone ?? existing.phone ?? "",
    company: profile?.company ?? existing.company ?? "",
    photoURL: decoded.picture || existing.photoURL || null,
    role,
    status: existing.status || "ACTIVE",
    updatedAt: now,
    createdAt: existing.createdAt || now,
  };
  await userRef.set(userData, { merge: true });

  if (role === "CLIENT") {
    const isNewClient = !snap.exists;
    await adminDb().collection("clients").doc(decoded.uid).set({
      uid: decoded.uid,
      email: decoded.email,
      name: userData.name,
      phone: userData.phone,
      company: userData.company,
      photoURL: userData.photoURL,
      status: userData.status,
      updatedAt: now,
      createdAt: existing.createdAt || now,
    }, { merge: true });
    if (isNewClient) {
      await adminDb().collection("notifications").add({ type:"CLIENT_REGISTERED", title:"New Client Registered", message:`${userData.name || userData.email} created a client account.`, link:"/admin/clients", read:false, emailTarget:ADMIN_EMAIL, createdAt:now });
      await sendAdminEmail("New Client Registered", `A new client registered on CODER WORLD.\nName: ${userData.name || "-"}\nEmail: ${userData.email}\nPhone: ${userData.phone || "-"}\nCompany: ${userData.company || "-"}`);
    }
  }

  const expiresIn = 1000 * 60 * 60 * 24 * 5;
  const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn });
  (await cookies()).set("cw_firebase_session", sessionCookie, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 5 });
  return { uid: decoded.uid, email: decoded.email, role };
}

export async function getSession() {
  const token = (await cookies()).get("cw_firebase_session")?.value;
  if (!token) return null;
  try {
    const decoded = await adminAuth().verifySessionCookie(token, true);
    const snap = await adminDb().collection("users").doc(decoded.uid).get();
    const role = (snap.data()?.role as string | undefined) || (!!ADMIN_UID && decoded.uid === ADMIN_UID ? "SUPER_ADMIN" : "CLIENT");
    return { userId: decoded.uid, email: decoded.email || "", role };
  } catch { return null; }
}
export async function requireAdminSession() { const session = await getSession(); return session && isAdminRole(session.role) ? session : null; }
export async function requireClientSession() { const session = await getSession(); return session && session.role === "CLIENT" ? session : null; }
export async function clearSession() { (await cookies()).delete("cw_firebase_session"); }
