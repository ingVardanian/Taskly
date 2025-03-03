import { useEffect } from 'react';
import { MainLayout, CabinetLayout } from './view/layouts';
import { Login, Register } from './view/pages/auth';
import CabinetBoard from './view/pages/cabinetBoard';
import LoadingWrapper from './view/components/shared/LoadingWrapper';
import { ROUTES_CONSTANTS } from './routes';
import { fetchUserProfileInfo } from './state-managment/slices/authUserInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import TeamLayout from './view/layouts/TeamLayout';
import ProjectSettingsLayout from './view/layouts/ProjectSettingsLayout';

const App = () => {
  const dispatch = useDispatch();
  const { loading, authUserInfo: { isAuth } } = useSelector(state => state.authInfo);

  useEffect(() => {
    dispatch(fetchUserProfileInfo());
  }, [dispatch]);

  return (
    <LoadingWrapper loading={loading} fullScreen>

      <RouterProvider router={
        createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<MainLayout/>}>
              <Route
                path={ROUTES_CONSTANTS.LOGIN}
                element={!isAuth ? <Login/> : <Navigate to={ROUTES_CONSTANTS.CABINET}/>}
              />
              <Route
                path={ROUTES_CONSTANTS.REGISTER}
                element={!isAuth ? <Register/> : <Navigate to={ROUTES_CONSTANTS.REGISTER}/>}
              />

              {/* ------ Cabinet Layout Route ------ */}
              <Route
                path={ROUTES_CONSTANTS.CABINET}
                element={isAuth ? <CabinetLayout/> : <Navigate to={ROUTES_CONSTANTS.LOGIN}/>}
              >
                <Route path={ROUTES_CONSTANTS.CABINET} element={<CabinetBoard/>}/>
              </Route>
              {/* ------ Team Layout Route ------ */}
              <Route
                path={ROUTES_CONSTANTS.TEAM}
                element={isAuth ? <TeamLayout/> : <Navigate to={ROUTES_CONSTANTS.LOGIN}/>}
              >
                <Route path={ROUTES_CONSTANTS.TEAM} element={<TeamLayout/>}/>
              </Route>
              {/* ------ Projject Settings Layout Route ------ */}
              <Route
                path={ROUTES_CONSTANTS.PROJECT_SETTINGS}
                element={isAuth ? <ProjectSettingsLayout/> : <Navigate to={ROUTES_CONSTANTS.LOGIN}/>}
              >
                <Route path={ROUTES_CONSTANTS.PROJECT_SETTINGS} element={<ProjectSettingsLayout/>}/>
              </Route>
            </Route>
          )
        )
      }/>
    </LoadingWrapper>
  );
};

export default App;





