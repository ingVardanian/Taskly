import { useState, useEffect } from 'react';
import { MainLayout, CabinetLayout } from './view/layouts';
import { Login, Register } from './view/pages/auth';
import LoadingWrapper from './view/components/shared/LoadingWrapper';
import { db, auth, doc, getDoc, onAuthStateChanged } from './services/firebase/firebase';
import { AuthContextProvider } from './context/AuthContext';
import {  
  Route, 
  RouterProvider,
  createHashRouter, 
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';

const route = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="cabinet" element={<CabinetLayout />} />
    </Route>
  )
);


const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProfileInfo, setUserProfileInfo] = useState({
    firstName: '',
    lastName: '',
    headline: '',
    email: ''
  });

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
        <AuthContextProvider value={{ isAuth, userProfileInfo, setIsAuth }}>
          <RouterProvider router={route}/>
        </AuthContextProvider>
      </LoadingWrapper>
  )
};

export default App;



