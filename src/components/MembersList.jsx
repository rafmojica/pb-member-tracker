import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import SignOutButton from './SignOutButton';
import { StarIcon } from '@heroicons/react/24/solid'; // Updated import for Heroicons v2

const MembersList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const membersRef = collection(db, 'members');
    const unsubscribe = onSnapshot(membersRef, (snapshot) => {
      const membersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(membersData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header with Sign Out Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Club Members</h1>
        <SignOutButton />
      </div>

      {/* Members Table */}
      <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">Member Name</th>
            <th className="py-3 px-6 text-center">Stars</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b">
              <td className="py-3 px-6">{member.name}</td>
              <td className="py-3 px-6">
                {/* Display star icons */}
                <div className="flex justify-center">
                  {[...Array(Number(member.stars))].map((_, index) => (
                    <StarIcon
                      key={index}
                      className="h-6 w-6 text-yellow-500"
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersList;
