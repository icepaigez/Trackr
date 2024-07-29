import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase/firebase';
import { ref, get } from 'firebase/database';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Check user role
        const userEmail = user.email.replace('.', ',');
        const adminUserRef = ref(db, `adminUsers/${userEmail}`);
        const regularUserRef = ref(db, `regularUsers/${userEmail}`);

        const adminUserSnapshot = await get(adminUserRef);
        const regularUserSnapshot = await get(regularUserRef);

        if (adminUserSnapshot.exists()) {
          setUserRole('admin');
        } else if (regularUserSnapshot.exists()) {
          setUserRole('regularUser');
        } else {
          setUserRole('user');
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
      // You might want to perform additional cleanup here
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const value = {
    currentUser,
    userRole,
    loading,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};