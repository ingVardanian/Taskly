import { useEffect } from 'react';
import { MainLayout, CabinetLayout } from './view/layouts';
import { Login, Register } from './view/pages/auth';
import CabinetBoard from './view/pages/cabinetBoard';
import LoadingWrapper from './view/components/shared/LoadingWrapper';
import { ROUTES_CONSTANTS } from './routes';
import {  
  Route, 
  Navigate,
  RouterProvider,
  createBrowserRouter, 
  createRoutesFromElements,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileInfo } from './state-management/slices/authUserInfoSlice';

const App = () => {
  const dispatch = useDispatch();
  const {loading, authUserInfo: { isAuth }} = useSelector(state => state.authInfo);

  useEffect(() => {
    dispatch(fetchUserProfileInfo())
  }, []);

  return (
    <LoadingWrapper loading={loading} fullScreen>
          <RouterProvider router={
            createBrowserRouter(
              createRoutesFromElements(
                <Route path="/" element={<MainLayout />}>
                    <Route 
                      path={ROUTES_CONSTANTS.LOGIN} 
                      element={!isAuth ? <Login /> : <Navigate to={ROUTES_CONSTANTS.CABINET}/>}
                    />
                    <Route 
                      path={ROUTES_CONSTANTS.REGISTER} 
                      element={!isAuth ? <Register /> : <Navigate to={ROUTES_CONSTANTS.REGISTER}/>}
                    />

                    {/* ------ Cabinet Layout Route ------ */}
                    <Route 
                      path={ROUTES_CONSTANTS.CABINET} 
                      element={isAuth ? <CabinetLayout /> : <Navigate to={ROUTES_CONSTANTS.LOGIN}/>} 
                    >
                      <Route path={ROUTES_CONSTANTS.CABINET} element={<CabinetBoard />}/>
                    </Route>
                </Route>
              )
            )
          }/>
    </LoadingWrapper>
  )
};

export default App;





