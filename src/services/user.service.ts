import { FirebaseAuth } from "../lib/firebase-config";
// import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  suburb: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserProfileData {
  uid: string;
  email: string;
  name: string;
  suburb: string;
}

export interface UpdateUserProfileData {
  name?: string;
  suburb?: string;
}

/**
 * Create a new user profile
 * Future: POST /api/users
 */
export function createUserProfile(
  data: CreateUserProfileData
): UserProfile {
  // TODO: Implement Firestore logic
  // const db = getFirestore();
  // const userRef = doc(db, "users", data.uid);
  // await setDoc(userRef, {
  //   ...data,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });

  // For now, return the data as-is
  const result: UserProfile = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return result;
}

/**
 * Get user profile by ID
 * Future: GET /api/users/:id
 */
export function getUserProfile(_uid: string): UserProfile | null {
  // TODO: Implement Firestore logic
  // const db = getFirestore();
  // const userRef = doc(db, "users", _uid);
  // const userSnap = await getDoc(userRef);
  //
  // if (userSnap.exists()) {
  //   return userSnap.data() as UserProfile;
  // }

  return null;
}

/**
 * Update user profile
 * Future: PATCH /api/users/:id
 */
export function updateUserProfile(
  _uid: string,
  _data: UpdateUserProfileData
): void {
  // TODO: Implement Firestore logic
  // const db = getFirestore();
  // const userRef = doc(db, "users", _uid);
  // await updateDoc(userRef, {
  //   ..._data,
  //   updatedAt: new Date(),
  // });
}

/**
 * Get current user's profile
 * Future: GET /api/users/me
 */
export function getCurrentUserProfile(): UserProfile | null {
  const currentUser = FirebaseAuth.currentUser;
  if (currentUser === null) {
    return null;
  }

  return getUserProfile(currentUser.uid);
}

// Export as UserService for backward compatibility
export const UserService = {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  getCurrentUserProfile,
};
