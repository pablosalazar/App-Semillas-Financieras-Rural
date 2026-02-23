import { getUserByDocumentNumber } from "@/features/users/services/user.service";
import type { User } from "@/features/users/types";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "app_user";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount, then verify they still exist in Firestore
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        // Convert date strings back to Date objects
        if (parsedUser.birthdate) {
          parsedUser.birthdate = new Date(parsedUser.birthdate);
        }
        if (parsedUser.createdAt) {
          parsedUser.createdAt = new Date(parsedUser.createdAt);
        }
        if (parsedUser.updatedAt) {
          parsedUser.updatedAt = new Date(parsedUser.updatedAt);
        }

        // Verify the user still exists in the database
        const existsInDb = await getUserByDocumentNumber(
          parsedUser.documentNumber,
        );
        if (!existsInDb) {
          // User was deleted from DB — clear the stale local session
          localStorage.removeItem(USER_STORAGE_KEY);
          return;
        }

        setUserState(parsedUser);
      } catch (error) {
        console.error("Error verifying user session:", error);
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      // Save to localStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      // Remove from localStorage
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    setUser,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthenticatedUser(): User {
  const { user } = useAuth();
  if (!user) {
    throw new Error(
      "useAuthenticatedUser must be used within a protected route",
    );
  }
  return user;
}
