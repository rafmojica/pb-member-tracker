import React from 'react';
import { auth, db } from '../config/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const SignIn = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user data exists in Firestore
      const userRef = doc(db, 'members', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Add user data to Firestore
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          stars: 0, // Initialize stars to 0 or any default value
        });
      }

      console.log("user signed is signed in babyyyyyy");
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome to Project Bracket</h2>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-100"
        >
          Sign In RN!!!!!
        </button>
      </div>
    </div>
  );
};

export default SignIn;
