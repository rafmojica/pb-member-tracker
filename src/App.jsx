import React, { useEffect, useState } from 'react';
import { auth, db } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import MembersList from './components/MembersList';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch user data from Firestore
        const userDocRef = doc(db, 'members', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setIsAdmin(userData.isAdmin === true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false); // Set loading to false after auth state is determined
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Render a loading indicator or return null while loading
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <MembersList /> : <Navigate to="/signin" />}
      />
      <Route
        path="/signin"
        element={user ? <Navigate to="/" /> : <SignIn />}
      />
      <Route
        path="/admin"
        element={user && isAdmin ? <AdminPanel /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
