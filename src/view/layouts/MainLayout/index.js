import { Outlet,  useLocation } from 'react-router-dom';

import MainHeader from '../../components/global/MainHeader';
import './index.css';
import MainPage from './MainPage/MainPage';

const MainLayout = () => {
  const location = useLocation();

    return (
      <div className="main_layout_container">
        <MainHeader />
        <main>
          <Outlet />
          {!location.pathname || location.pathname === '/' ? <MainPage /> : null}
        </main>
      </div>
    )
};
  
export default MainLayout;