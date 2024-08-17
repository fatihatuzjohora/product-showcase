import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
  Auth,
  User,
} from "firebase/auth";
import { createContext, useEffect, useState, ReactNode, Context } from "react";
import { getAuth } from "firebase/auth";
import app from "../component/firebase/firebase.config";

// Define the types for the context
interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (name: string, image: string) => Promise<void>;
  setLoading: (value: boolean) => void;
}

// Create the context with a default value of `null`
export const AuthContext: Context<AuthContextType | null> = createContext<AuthContextType | null>(null);

// Define the AuthProvider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = getAuth(app);

  console.log(auth);
  // Function to create a new user
  const createUser = (email: string, password: string): Promise<void> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      throw error;
    });
  };

  // Function to sign in a user
  const signInUser = (email: string, password: string): Promise<void> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      throw error;
    });
  };

  // Function to update the user's profile

  const updateUserProfile = async (name: string, image: string) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image,
        });

        // Ensure that the user object matches the expected type
        setUser({
          ...auth.currentUser,
          displayName: name,
          photoURL: image,
          emailVerified: auth.currentUser.emailVerified, // Ensure this is boolean
          isAnonymous: auth.currentUser.isAnonymous,
          metadata: auth.currentUser.metadata,
          providerData: auth.currentUser.providerData,
          uid: auth.currentUser.uid,
        } as User); // Ensure this object is of type User
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Function to log out the user
  const logout = (): Promise<void> => {
    setLoading(true);
    return signOut(auth).then(() => {
      setUser(null);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      throw error;
    });
  };

  // Observer to track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // Define the context value
  const contextValue: AuthContextType = {
    user,
    loading,
    createUser,
    signInUser,
    logout,
    updateUserProfile,
    setLoading,
  };

  // Provide the context to child components
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
