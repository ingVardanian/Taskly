import React from 'react';
import { Sidebar, SubHeader } from '../../components/global';
import { Outlet } from 'react-router-dom';
import './index.css';

const CabinetLayout = () => {
  return (
    <div className="cabinet_layout_container">
        <Sidebar />

        <SubHeader />

        <main className="main_container">
          <Outlet />
        </main>
    </div>
  )
};

export default CabinetLayout;




