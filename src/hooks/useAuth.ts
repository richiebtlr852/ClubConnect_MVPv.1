import { onAuthStateChange, signOutUser } from "../services";
import { useEffect, useState, useCallback } from "react";
import type { AuthUser } from "../services";

interface UseAuthReturn {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    await signOutUser();
    setUser(null);
  }, []);

  return { user, isLoading, logout };
}
