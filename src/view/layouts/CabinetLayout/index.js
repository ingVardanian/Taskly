import React from 'react';
import { Sidebar, SubHeader } from '../../components/global';
import './index.css';

const CabinetLayout = () => {

  return (
    <div className="cabinet_layout_container">
        <Sidebar />

        <SubHeader />

        <main className="main_container">

        </main>
    </div>
  )
};

export default CabinetLayout;




