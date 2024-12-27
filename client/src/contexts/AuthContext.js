import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { authService } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, username) {
    try {
      // Create the Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Get the ID token
      const token = await userCredential.user.getIdToken();
      
      // Register in our backend with the token
      await authService.register({
        email,
        username,
        token
      });

      return userCredential;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Get the ID token
      const token = await result.user.getIdToken();
      
      // Register in our backend
      await authService.register({
        email: result.user.email,
        username: result.user.displayName || result.user.email.split('@')[0],
        token
      });
      
      return result;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the ID token with custom claims
          const tokenResult = await user.getIdTokenResult();
          // Add isAdmin to the user object
          user.isAdmin = tokenResult.claims.admin === true;
        } catch (error) {
          console.error('Error getting token claims:', error);
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 