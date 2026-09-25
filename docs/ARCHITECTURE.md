# CODER WORLD Firebase Architecture

Next.js App Router + React + TypeScript provides the website, client portal and server routes. Firebase provides Authentication, Google Sign-In, Cloud Firestore, Storage and Security Rules. The Firebase Admin SDK is used only on the trusted server side for session verification and privileged operations.

Flow: Browser → Next.js → Firebase Auth / Firestore / Storage.

Roles: SUPER_ADMIN, ADMIN, MANAGER, CLIENT. The primary admin address is configured with `ADMIN_EMAIL`.

Security: Firebase ID tokens establish identity; server routes exchange verified ID tokens for HTTP-only Firebase session cookies; Firestore rules enforce resource authorization; Admin SDK credentials never enter browser code.
