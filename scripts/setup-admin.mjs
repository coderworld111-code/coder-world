import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const clean = (value) => value?.trim().replace(/,\s*$/, "").replace(/^["']/, "").replace(/["']$/, "");
const projectId = clean(process.env.FIREBASE_ADMIN_PROJECT_ID);
const clientEmail = clean(process.env.FIREBASE_ADMIN_CLIENT_EMAIL);
const privateKey = clean(process.env.FIREBASE_ADMIN_PRIVATE_KEY)?.replace(/\\n/g, "\n");
const adminUid = clean(process.env.ADMIN_UID);
const email = clean(process.env.ADMIN_EMAIL)?.toLowerCase();

if (!projectId || !clientEmail || !privateKey || !adminUid) throw new Error("Configure Firebase Admin credentials and ADMIN_UID in .env.local first.");

const app = getApps().length ? getApps()[0] : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const auth = getAuth(app);
const db = getFirestore(app);

const user = await auth.getUser(adminUid);
await auth.setCustomUserClaims(user.uid, { role: "SUPER_ADMIN" });
const resolvedEmail = user.email || email;
if (!resolvedEmail) throw new Error("Configure ADMIN_EMAIL in .env.local or add an email to the Firebase user first.");
await db.collection("users").doc(user.uid).set({ uid: user.uid, email: resolvedEmail, name: user.displayName || "CODER WORLD Admin", role: "SUPER_ADMIN", status: "ACTIVE", updatedAt: new Date() }, { merge: true });
console.log("Admin account configured successfully.");
