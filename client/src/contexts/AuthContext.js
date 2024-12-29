import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import authService from '../services/authService';
import { toast } from 'react-hot-toast';

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, username) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
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

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
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
        token,
        photoURL: result.user.photoURL || '',
        displayName: result.user.displayName || ''
      });
      
      toast.success('Successfully logged in with Google!');
      return result;
    } catch (error) {
      console.error('Google login error:', error);
      let errorMessage = 'Failed to login with Google';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login popup was closed';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Another popup is already open';
      }
      toast.error(errorMessage);
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
          // Get the token result to check admin status
          const tokenResult = await user.getIdTokenResult();
          // Get additional user data from our backend
          const userData = await authService.getProfile();
          
          setCurrentUser({ 
            ...user, 
            ...userData,
            isAdmin: tokenResult.claims.admin === true || userData.isAdmin === true 
          });
          
          console.log('User data loaded:', {
            tokenClaims: tokenResult.claims,
            userData: userData,
            isAdmin: tokenResult.claims.admin === true || userData.isAdmin === true
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
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