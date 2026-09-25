# CODER WORLD

Professional CODER WORLD website foundation with public website, Firebase Authentication, Google Sign-In, Client Portal, Admin Panel, Firestore communication/CRM data, Firebase Storage rules and role-based authorization.

## Stack
- Next.js
- React
- TypeScript
- Firebase Authentication
- Google Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Admin SDK

## Admin
- Email: `coderworld111@gmail.com`
- Admin is created manually in Firebase Authentication. Set its UID in `.env.local` as `ADMIN_UID`.
- Role: `SUPER_ADMIN`

Set these in `.env.local` and run `npm run setup:admin` to create/update the Firebase Authentication account.

## Run
```powershell
npm install
npm run setup:admin
npm run dev
```

Open `http://localhost:3000`.

See `docs/FIREBASE-SETUP.md` for Firebase Console setup, Authentication, Firestore, Storage, service-account configuration and email notification setup.

## Communication
Contact forms write to Firestore `inquiries`; quote forms write to `leads`; both create an admin `notifications` record targeting `coderworld111@gmail.com`. Configure Firebase Trigger Email (or another server-side Firebase-compatible mail workflow) for actual email delivery.

## Security
The browser never receives Firebase Admin credentials. Admin authorization is enforced server-side and in Firestore Security Rules. Client records should be linked to the authenticated Firebase UID.

## Production notes
- Do not ship `.env.local` in ZIPs or source control.
- Configure Firebase Auth with Email/Password and Google providers.
- Configure `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, and `FIREBASE_ADMIN_PRIVATE_KEY` for the server.
- Optional admin email delivery uses Resend: set `RESEND_API_KEY`, `EMAIL_FROM`, and `ADMIN_EMAIL`.
- Client registration creates `users/{uid}` and `clients/{uid}` and records name, phone, company, email, and Google profile data when available.
- Client/admin chat uses `conversations/{clientUid}/messages/{messageId}` and polls every 3 seconds.
