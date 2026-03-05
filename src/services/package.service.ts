import { FirebaseFirestore } from "../lib/firebase-config";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import type { PackageSchemaValues } from "../schemas";

export interface CreatePackageData {
  clubID: string;
  name: string;
  season: string;
  sponsorshipAmount: number;
  description: string;
  benefits: Array<{ id: string; text: string }>;
  createdBy: string;
}

export interface UpdatePackageData {
  name?: string;
  season?: string;
  sponsorshipAmount?: number;
  description?: string;
  benefits?: Array<{ id: string; text: string }>;
}

const COLLECTION_NAME = "packages";

/**
 * Create a new package
 * Future: POST /api/packages
 */
export async function createPackage(data: CreatePackageData): Promise<PackageSchemaValues> {
  try {
    const packagesRef = collection(FirebaseFirestore, COLLECTION_NAME);
    const docRef = doc(packagesRef);
    const timestamp = Timestamp.now();

    const packageData: PackageSchemaValues = {
      ...data,
      id: docRef.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await setDoc(docRef, packageData);
    return packageData;
  } catch (error: unknown) {
    console.error("createPackage error:", error);
    throw new Error("Failed to create package. Please try again.");
  }
}

/**
 * Get package by ID
 * Future: GET /api/packages/:id
 */
export async function getPackageById(packageId: string): Promise<PackageSchemaValues | null> {
  try {
    const docRef = doc(FirebaseFirestore, COLLECTION_NAME, packageId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PackageSchemaValues;
    }

    return null;
  } catch (error: unknown) {
    console.error("getPackageById error:", error);
    throw new Error("Failed to fetch package details.");
  }
}

/**
 * Get all packages for a club
 * Future: GET /api/packages?clubId=:clubId
 */
export async function getPackagesByClubId(clubId: string): Promise<PackageSchemaValues[]> {
  try {
    const packagesRef = collection(FirebaseFirestore, COLLECTION_NAME);
    const q = query(packagesRef, where("clubID", "==", clubId));
    const querySnapshot = await getDocs(q);

    const packages: PackageSchemaValues[] = [];
    querySnapshot.docs.forEach((doc) => {
      packages.push(doc.data() as PackageSchemaValues);
    });

    return packages;
  } catch (error: unknown) {
    console.error("getPackagesByClubId error:", error);
    throw new Error("Failed to fetch packages.");
  }
}

/**
 * Update a package
 * Future: PATCH /api/packages/:id
 */
export async function updatePackage(
  packageId: string,
  data: UpdatePackageData
): Promise<void> {
  try {
    const docRef = doc(FirebaseFirestore, COLLECTION_NAME, packageId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error: unknown) {
    console.error("updatePackage error:", error);
    throw new Error("Failed to update package.");
  }
}

/**
 * Delete a package
 * Future: DELETE /api/packages/:id
 */
export async function deletePackage(packageId: string): Promise<void> {
  try {
    const docRef = doc(FirebaseFirestore, COLLECTION_NAME, packageId);
    await deleteDoc(docRef);
  } catch (error: unknown) {
    console.error("deletePackage error:", error);
    throw new Error("Failed to delete package.");
  }
}

// Export as PackageService for backward compatibility
export const PackageService = {
  createPackage,
  getPackageById,
  getPackagesByClubId,
  updatePackage,
  deletePackage,
};
