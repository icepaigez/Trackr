import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase/firebase';
import { ref, get } from 'firebase/database';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Error Boundary Component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page or contact support.</h1>;
    }
    return this.props.children;
  }
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const checkUserRole = async (user) => {
      if (user) {
        // Set current user immediately
        setCurrentUser(user);
        setLoading(false);

        // Check for cached role
        const cachedRole = localStorage.getItem('userRole');
        if (cachedRole) {
          setUserRole(cachedRole);
        } else {
          // Set a default role immediately
          setUserRole('guest');
        }

        // Then check the actual role in the background
        const userEmail = user.email.replace('.', ',');
        const adminUserRef = ref(db, `adminUsers/${userEmail}`);
        const regularUserRef = ref(db, `regularUsers/${userEmail}`);
        try {
          const [adminUserSnapshot, regularUserSnapshot] = await Promise.all([
            get(adminUserRef),
            get(regularUserRef)
          ]);

          if (adminUserSnapshot.exists()) {
            setUserRole('admin');
            localStorage.setItem('userRole', 'admin');
          } else if (regularUserSnapshot.exists()) {
            setUserRole('regularUser');
            localStorage.setItem('userRole', 'regularUser');
          } else {
            setUserRole('guest');
            localStorage.setItem('userRole', 'guest');
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          setUserRole('guest');
          localStorage.setItem('userRole', 'guest');
        }
      } else {
        // No user logged in
        setCurrentUser(null);
        setUserRole('guest');
        localStorage.removeItem('userRole');
        setLoading(false);
      }
    };

    unsubscribe = onAuthStateChanged(auth, checkUserRole);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserRole('guest');
      localStorage.removeItem('userRole');
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
