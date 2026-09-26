# Firebase Authentication

- Email/password signup and login use Firebase Authentication.
- Google Sign-In uses Firebase Authentication.
- New normal accounts receive `CLIENT`.
- The primary admin email is configured as `ADMIN_EMAIL`; its Firebase UID is configured as `ADMIN_UID`.
- The server verifies Firebase ID tokens and creates an HTTP-only Firebase session cookie.
- Admin pages require an authorized Firebase role.
- Firestore Security Rules enforce ownership/admin access.
- Passwords are handled by Firebase Authentication; the application never stores password hashes.
