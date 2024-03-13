import 'react-native-gesture-handler'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from './src/context/AuthContext';
import Login from './src/screen/Login';
import * as Keychain from 'react-native-keychain';
import Spinner from './src/components/Spinner';
import { useNavigation } from "@react-navigation/native";
import Dashboard from './src/components/Dashboard';




const App = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');


  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.token || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.token !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        token: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (authContext?.authState?.authenticated === false) {
    return <Login />;
  } else {
    return <Dashboard />;
  }
};

export default App;              
