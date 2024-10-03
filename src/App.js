import { useState, useEffect } from 'react';
import { MainLayout, CabinetLayout } from './view/layouts';
import { Login, Register } from './view/pages/auth';
import CabinetBoard from './view/pages/cabinetBoard';
import LoadingWrapper from './view/components/shared/LoadingWrapper';
import { db, auth, doc, getDoc, getDocs, collection, onAuthStateChanged } from './services/firebase/firebase';
import { AuthContextProvider } from './context/AuthContext';
import { ROUTES_CONSTANTS } from './routes';
import {  
  Route, 
  Navigate,
  RouterProvider,
  createBrowserRouter, 
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import { store } from './state-managment/store';
import { Provider } from 'react-redux';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); //Todo Next Redux
  const [userProfileInfo, setUserProfileInfo] = useState({ //Todo Next Redux
    firstName: '',
    lastName: '',
    headline: '',
    email: ''
  });

  useEffect(() => {
    const handleGetUsersData = async () => {
        const queryData = await getDocs(collection(db, 'registerUsers'));
        const result = queryData.docs.map((doc) => {
            const { firstName, lastName } = doc.data();
            return {label: `${firstName} ${lastName}`, value: doc.id}
        });

        setUsers(result);
    }

    handleGetUsersData();
}, []);


  useEffect(() => {
    setLoading(true);
    
    onAuthStateChanged(auth, (user) => { 
      setLoading(false)

      if (user) {
        setIsAuth(true);
          const { uid } = user;
          const ref = doc(db, 'registerUsers', uid);

          getDoc(ref).then((userData) => {
            if (userData.exists()) {
              setUserProfileInfo(userData.data()) 
            }
          })
      } else {

      }
    })
  }, [])

  return (
    <LoadingWrapper loading={loading} fullScreen>
      <Provider store={store}>
        <AuthContextProvider value={{ 
          isAuth,
          userProfileInfo, 
          setIsAuth, 
          users
        }}>
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
        </AuthContextProvider>
      </Provider>
    </LoadingWrapper>
  )
};

export default App;





