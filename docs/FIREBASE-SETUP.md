# CODER WORLD — Firebase Setup

## 1. Create Firebase project
Create/select your Firebase project in Firebase Console. Add a Web App and copy its configuration into `.env.local` using `.env.example`.

## 2. Enable Authentication
Firebase Console → Authentication → Sign-in method:
- Email/Password: enable
- Google: enable

Add your production domain under Authentication → Settings → Authorized domains.

## 3. Create Firestore
Create Cloud Firestore in production mode, then deploy `firestore.rules` and `firestore.indexes.json`.

## 4. Enable Storage
Enable Firebase Storage and deploy `storage.rules`.

## 5. Server Firebase Admin credentials
Create a Firebase service account and put its project ID, client email and private key in `.env.local`. Never prefix these values with `NEXT_PUBLIC_` and never commit them.

## 6. Create the CODER WORLD admin
The requested admin account is:
- Email: set with `ADMIN_EMAIL`
- Admin is created manually in Firebase Authentication. Set its UID in `.env.local` as `ADMIN_UID`.
- Role: `SUPER_ADMIN`

After configuring `.env.local`, run:

```powershell
npm install
npm run setup:admin
```

The script creates/updates the Firebase Authentication user and writes the `SUPER_ADMIN` role to Firestore.

## 7. Client authentication
Clients can use:
- Email/password signup
- Email/password login
- Google Sign-In
- Email verification

Every authenticated user gets a `users/{uid}` document. New non-admin accounts receive `CLIENT`.

## 8. Contact and quote messages
Website contact and quote requests are written to Firestore collections:
- `inquiries`
- `leads`

Admin notifications are written to `notifications` with `emailTarget` sourced from `ADMIN_EMAIL`.

For actual email delivery, configure Firebase's Trigger Email extension or a Firebase-supported server-side email workflow. The database record remains the source of truth even if email delivery fails.

## 9. Important security rule
The browser Firebase configuration is not a secret. The Firebase Admin service-account private key is secret. Do not commit `.env.local`, service-account JSON, or private keys.
