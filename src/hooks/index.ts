import { FirebaseAuth, FirebaseFirestore } from "../lib/firebase-config";
import { CollectionNames } from "../schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, Timestamp } from "firebase/firestore";
import { useMemo } from "react";
import type { SignupFormValues, Club, CollectionName, CollectionMap } from "../schemas";
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
  const { mutateAsync: createClubAccount } = useCreateDocument(CollectionNames.Club);

  return useMutation({
    ...options,
    mutationFn: async (values) => {
      const { email, password, name, suburb } = values;
      const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      const { user } = userCredential;
      const newClub: Club = {
        name,
        suburb,
        email,
        createdBy: user.uid,
      };

      try {
        await createClubAccount(newClub);
      } catch (error) {
        // If there's an error creating the club document, deleting the created user
        console.error("useSignup: Error creating club:", error);
        try {
          await user.delete();
        } catch (deleteError) {
          console.error("useSignup: Error deleting user after club creation failure:", deleteError);
        }

        throw error;
      }

      return user;
    },
  });
}
