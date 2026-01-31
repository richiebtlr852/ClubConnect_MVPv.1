import { FirebaseAuth } from "../lib/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState, useCallback } from "react";
import type { User } from "firebase/auth";

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    await signOut(FirebaseAuth);
    setUser(null);
  }, []);

  return { user, isLoading, logout };
}
