import { FirebaseAuth } from "../lib/firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
  suburb: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

/**
 * Sign up a new user
 * Future: POST /api/auth/signup
 */
export async function signUp(credentials: SignUpCredentials): Promise<AuthUser> {
  try {
    const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, credentials.email, credentials.password);

    const result: AuthUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: credentials.name,
    };

    return result;
  } catch (error: unknown) {
    throw new Error(handleAuthError(error));
  }
}

/**
 * Sign in an existing user
 * Future: POST /api/auth/login
 */
export async function signIn(credentials: LoginCredentials): Promise<AuthUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(FirebaseAuth, credentials.email, credentials.password);

    const result: AuthUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    };

    return result;
  } catch (error: unknown) {
    throw new Error(handleAuthError(error));
  }
}

/**
 * Sign out the current user
 * Future: POST /api/auth/logout
 */
export async function signOutUser(): Promise<void> {
  try {
    await signOut(FirebaseAuth);
  } catch {
    throw new Error("Failed to sign out. Please try again.");
  }
}

/**
 * Get the current authenticated user
 * Future: GET /api/auth/me
 */
export function getCurrentUser(): User | null {
  return FirebaseAuth.currentUser;
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
  const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
    if (user !== null) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } else {
      callback(null);
    }
  });

  return unsubscribe;
}

/**
 * Handle Firebase auth errors and return user-friendly messages
 */
function handleAuthError(error: unknown): string {
  const errorCode = (error as { code?: string }).code ?? "";

  let message = "";

  if (errorCode === "auth/email-already-in-use") {
    message = "This email is already registered. Please sign in instead.";
  } else if (errorCode === "auth/invalid-email") {
    message = "Invalid email address.";
  } else if (errorCode === "auth/operation-not-allowed") {
    message = "Email/password sign-in is not enabled. Please contact support.";
  } else if (errorCode === "auth/weak-password") {
    message = "Password is too weak. Please use at least 6 characters.";
  } else if (errorCode === "auth/user-disabled") {
    message = "This account has been disabled. Please contact support.";
  } else if (errorCode === "auth/user-not-found") {
    message = "No account found with this email.";
  } else if (errorCode === "auth/wrong-password") {
    message = "Incorrect password.";
  } else if (errorCode === "auth/invalid-credential") {
    message = "Invalid email or password.";
  } else if (errorCode === "auth/too-many-requests") {
    message = "Too many failed attempts. Please try again later.";
  } else if (errorCode === "auth/network-request-failed") {
    message = "Network error. Please check your connection and try again.";
  } else {
    console.error("Unhandled auth error:", errorCode, error);
    message = "An error occurred. Please try again.";
  }

  return message;
}
