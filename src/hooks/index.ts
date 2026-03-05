import { FirebaseAuth, FirebaseFirestore } from "../lib/firebase-config";
import { signUp, onAuthStateChange, ClubService } from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, query, setDoc, Timestamp } from "firebase/firestore";
import { useMemo } from "react";
import type { SignupFormValues, CollectionName, CollectionMap } from "../schemas";
import type { UseMutationOptions, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { User } from "firebase/auth";
import type { CollectionReference, QueryConstraint } from "firebase/firestore";
import type { z } from "zod";

interface UseGetDocumentsParams<TCollectionName extends CollectionName> {
  collectionName: TCollectionName;
  queryConstraints?: QueryConstraint[];
  enabled?: boolean;
}

// Adapted from - https://github.com/manufac-analytics/mover/blob/eb9a9fdfbc1db047c2c8d111391473ac0cc7a8a3/apps/web/src/hooks/api.ts#L37
// A general hook for get a typed instance of any collection
export function useCollection<TCollectionName extends CollectionName>(
  collectionName: TCollectionName,
): CollectionReference<z.infer<(typeof CollectionMap)[TCollectionName]>> {
  type DocumentType = z.infer<(typeof CollectionMap)[TCollectionName]>;
  const collectionRef = useMemo<CollectionReference<DocumentType>>(() => {
    const result = collection(FirebaseFirestore, collectionName).withConverter<DocumentType>({
      toFirestore: (data) => {
        // Write data to firestore directly
        return data;
      },
      fromFirestore: (snap) => {
        // Typecast data when fetching from firestore
        // TODO: Maybe parse using schema here. For additonal type safety
        return snap.data() as DocumentType;
      },
    });
    return result;
  }, [collectionName]);
  return collectionRef;
}

export function useGetDocuments<TCollectionName extends CollectionName>({
  collectionName,
  queryConstraints,
  enabled,
}: UseGetDocumentsParams<TCollectionName>): UseQueryResult<z.infer<(typeof CollectionMap)[TCollectionName]>[]> {
  const collectionRef = useCollection(collectionName);
  const result = useQuery<z.infer<(typeof CollectionMap)[TCollectionName]>[]>({
    queryKey: [collectionName, queryConstraints],
    queryFn: async () => {
      // Reference: https://firebase.google.com/docs/firestore/query-data/queries
      const queryRef = query(collectionRef, ...(queryConstraints ?? []));
      const snapshot = await getDocs(queryRef);
      const documents = snapshot.docs.map((doc) => {
        return doc.data();
      });
      return documents;
    },
    enabled,
  });

  return result;
}

export function useCreateDocument<TCollectionName extends CollectionName>(
  collectionName: TCollectionName,
  options?: UseMutationOptions<
    z.infer<(typeof CollectionMap)[TCollectionName]>,
    Error,
    z.infer<(typeof CollectionMap)[TCollectionName]>
  >,
): UseMutationResult<
  z.infer<(typeof CollectionMap)[TCollectionName]>,
  Error,
  z.infer<(typeof CollectionMap)[TCollectionName]>
> {
  const collectionRef = useCollection(collectionName);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const timeStamp = Timestamp.now();
      const docRef = doc(collectionRef);

      const payload: z.infer<(typeof CollectionMap)[TCollectionName]> = {
        ...data,
        createdAt: timeStamp,
        updatedAt: timeStamp,
        id: docRef.id,
      };

      await setDoc(docRef, payload);
      return payload;
    },
    ...options,
    onSuccess: async (...args) => {
      // Invalidate all queries related to this collection
      await queryClient.invalidateQueries({
        queryKey: [collectionName],
      });
      options?.onSuccess?.(...args);
    },
  });
}

export function useSignUp(
  options?: UseMutationOptions<User, Error, SignupFormValues>,
): UseMutationResult<User, Error, SignupFormValues> {
  return useMutation({
    ...options,
    mutationFn: async (values) => {
      const { email, password, name, suburb } = values;

      // Use signUp function to create user
      const authUser = await signUp({
        email,
        password,
        name,
        suburb,
      });

      try {
        // Use ClubService to create club
        await ClubService.createClub({
          name,
          suburb,
          email,
          createdBy: authUser.uid,
        });
      } catch (error) {
        console.error("useSignup: Error creating club:", error);
        throw error;
      }

      // Return Firebase User for compatibility
      const firebaseUser = FirebaseAuth.currentUser;
      if (firebaseUser === null) {
        throw new Error("User not found after signup");
      }

      return firebaseUser;
    },
  });
}

// Export package hooks
export {
  useCreatePackage,
  useGetPackageById,
  useGetPackagesByClubId,
  useUpdatePackage,
  useDeletePackage,
} from "./usePackages";

// Export club hooks
export { useGetClubByUserId, useGetClubById } from "./useClub";
