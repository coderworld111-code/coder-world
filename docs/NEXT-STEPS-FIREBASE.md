# CODER WORLD — Firebase Connection Status

The Firebase Web App configuration supplied for project `coder-world-4b56b` is now placed in the local `.env.local` file. `.env.local` is ignored by Git.

## Still required for server-side Admin authorization

The Next.js server uses Firebase Admin SDK to create/verify secure session cookies and to create the requested `SUPER_ADMIN` account. Add these three values to `.env.local` from Firebase Console → Project settings → Service accounts → Generate new private key:

- `FIREBASE_ADMIN_PROJECT_ID=coder-world-4b56b`
- `FIREBASE_ADMIN_CLIENT_EMAIL=...`
- `FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"`

Never publish the private key or service-account JSON.

## Then run on Windows PowerShell

```powershell
npm install
npm run setup:admin
npm run dev
```

Admin:
- Email: set with `ADMIN_EMAIL`
- Admin is created manually in Firebase Authentication. Set its UID in `.env.local` as `ADMIN_UID`.
- Role: `SUPER_ADMIN`

Client accounts use Firebase Email/Password or Google Sign-In and are assigned `CLIENT` by the server session flow.

## Firebase Console checklist

- Authentication → Email/Password enabled
- Authentication → Google enabled
- Firestore created
- Storage enabled
- `firestore.rules` deployed
- `storage.rules` deployed
- Production domain added under Authentication → Settings → Authorized domains when the real domain is available

## Email notification note

Contact and quote submissions are persisted in Firestore and create admin notification records targeting the configured `ADMIN_EMAIL`. Actual external email delivery requires a server-side email delivery workflow such as Firebase Trigger Email/another transactional email provider; this is intentionally not faked in the application.
