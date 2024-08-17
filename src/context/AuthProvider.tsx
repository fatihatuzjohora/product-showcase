import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
  User,
  GoogleAuthProvider,
  signInWithPopup,
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
  signInWithGoogle: () => Promise<void>;
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

  // Function to create a new user
  const createUser = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Function to sign in a user
  const signInUser = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const user = result.user;
      console.log(credential, user);
      setUser(user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update the user's profile
  const updateUserProfile = async (name: string, image: string) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image,
        });

        setUser({
          ...auth.currentUser,
          displayName: name,
          photoURL: image,
        } as User);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Function to log out the user
  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
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
    signInWithGoogle,
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
