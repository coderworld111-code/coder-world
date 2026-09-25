# Communication System

1. Contact form → Next.js API → Cloud Firestore `inquiries`.
2. Quote form → Next.js API → Cloud Firestore `leads`.
3. Every submission also creates a Firestore `notifications` document targeted to `coderworld111@gmail.com`.
4. Admin Panel reads these records through the Firebase Admin SDK after server-side authorization.
5. For actual email delivery, use Firebase Trigger Email or another server-side Firebase-compatible mail workflow.
6. Firestore is the source of truth; an email delivery failure must not delete or lose the inquiry.
