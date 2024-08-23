import { Outlet } from 'react-router-dom';

import MainHeader from '../../components/global/MainHeader';
import './index.css';

const MainLayout = () => {
    return (
      <div className="main_layout_container">
        <MainHeader />

        <main>
          <Outlet />
        </main>
      </div>
    )
};
  
export default MainLayout;