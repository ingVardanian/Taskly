import React, { useEffect, useState } from 'react';
import { Sidebar, SubHeader } from '../../components/global';
import { Outlet } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import './index.css';
import { db } from '../../../services/firebase/firebase';

const CabinetLayout = () => {
  const [projectName, setProjectName] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // <-- Add searchTerm here

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const project = snapshot.docs[0].data();
          setProjectName(project.projectName);
        }
      } catch (error) {
        console.error('Failed to fetch project:', error);
      }
    };

    fetchProject();
  }, []);

  return (
    <div className="cabinet_layout_container">
      <Sidebar />

      <SubHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="main_container">
        <h2 style={{ padding: '10px 20px' }}>{projectName}</h2>

        <Outlet context={{ searchTerm }} />
      </main>
    </div>
  );
};

export default CabinetLayout;
