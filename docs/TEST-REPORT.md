# Test Report

## Static tests
`npm test` — **9/9 passed**.

## Environment limitation
`npm install` was attempted in the build environment but timed out while reaching the package registry. Therefore a real Next.js production build, Firebase Auth flow, Firestore integration, Storage rules deployment and Google Sign-In could not be executed in this environment.

After configuring Firebase, run:

```powershell
npm install
npm test
npm run setup:admin
npm run build
npm start
```

Then manually verify signup, email login, Google login, admin authorization, client authorization, contact/quote persistence, Firestore rules, Storage rules and email notification delivery.
