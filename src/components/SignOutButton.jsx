import React from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
