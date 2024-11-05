import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';

const AdminPanel = () => {
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

  const updateStars = async (id, stars) => {
    const memberDoc = doc(db, 'members', id);
    try {
      await updateDoc(memberDoc, { stars: Number(stars) });
      console.log('Stars updated');
    } catch (error) {
      console.error('Error updating stars:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>
      {members.map((member) => (
        <div key={member.id} className="flex items-center mb-4">
          <p className="w-1/3">{member.name}</p>
          <input
            type="number"
            className="w-1/3 p-2 border rounded"
            value={member.stars}
            onChange={(e) => updateStars(member.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
