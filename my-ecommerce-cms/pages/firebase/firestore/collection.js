import firebase_app from "../config";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(firebase_app);

// Create a new collection
export const collectionRef = db.collection("products");
