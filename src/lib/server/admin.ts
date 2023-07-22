import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { LH_CLIENT_EMAIL, LH_PRIVATE_KEY, LH_PROJECT_ID } from "$env/static/private";
import pkg from "firebase-admin";

try {
    pkg.initializeApp({
      credential: pkg.credential.cert({
        projectId: LH_PROJECT_ID,
        clientEmail: LH_CLIENT_EMAIL,
        privateKey: LH_PRIVATE_KEY,
      }),
    });
  } catch (err) {
    if (!/already exists/u.test(err.message)) {
      console.error('Firebase Admin Error: ', err.stack)
    }
  }  

export const adminDB = getFirestore();
export const adminAuth = getAuth();