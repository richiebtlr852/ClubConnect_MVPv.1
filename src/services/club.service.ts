import { FirebaseFirestore } from "../lib/firebase-config";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  Timestamp,
} from "firebase/firestore";
import type { Club } from "../schemas";

export interface CreateClubData {
  name: string;
  suburb: string;
  email: string;
  createdBy: string;
}

const COLLECTION_NAME = "club";

/**
 * Create a new club
 * Future: POST /api/clubs
 */
export async function createClub(data: CreateClubData): Promise<Club> {
  try {
    const clubsRef = collection(FirebaseFirestore, COLLECTION_NAME);
    const docRef = doc(clubsRef);
    const timestamp = Timestamp.now();

    const clubData: Club = {
      ...data,
      id: docRef.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await setDoc(docRef, clubData);
    return clubData;
  } catch (error: unknown) {
    console.error("createClub error:", error);
    throw new Error("Failed to create club. Please try again.");
  }
}

/**
 * Get club by ID
 * Future: GET /api/clubs/:id
 */
export async function getClubById(clubId: string): Promise<Club | null> {
  try {
    const docRef = doc(FirebaseFirestore, COLLECTION_NAME, clubId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Club;
    }

    return null;
  } catch (error: unknown) {
    console.error("getClubById error:", error);
    throw new Error("Failed to fetch club details.");
  }
}

/**
 * Get club by user ID (creator)
 * Future: GET /api/clubs/by-user/:userId
 */
export async function getClubByUserId(userId: string): Promise<Club | null> {
  try {
    const clubsRef = collection(FirebaseFirestore, COLLECTION_NAME);
    const q = query(clubsRef, where("createdBy", "==", userId), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as Club;
    }

    return null;
  } catch (error: unknown) {
    console.error("getClubByUserId error:", error);
    throw new Error("Failed to fetch club.");
  }
}

// Export as ClubService for backward compatibility
export const ClubService = {
  createClub,
  getClubById,
  getClubByUserId,
};
