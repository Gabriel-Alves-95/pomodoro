import{ useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDvl27e5XptEew4YoGlUF-a1CRd9SZIRzk",
//   authDomain: "pomodoro-74b3c.firebaseapp.com",
//   projectId: "pomodoro-74b3c",
//   storageBucket: "pomodoro-74b3c.appspot.com",
//   messagingSenderId: "313756225442",
//   appId: "1:313756225442:web:fb7258f834591a59ebacfb"
// };


// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);

import { userIsLoggedIn, reautenticate } from "./utils/auth";

export default function App() { 


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogIn = (boolValue) => {
    setIsLoggedIn(boolValue);
    console.log(isLoggedIn);
  }

  const verifyLogin = async () => {
    if (await userIsLoggedIn() !== null) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    reautenticate(); 
    verifyLogin();
  }, [])



  const Stack = createNativeStackNavigator();
 
  const timesArr = [5, 15, 25, 0.2];
  const colorsArr = ["#f87070", "#6ff3f8", "#d981f9"];  

  const [defaultTime, setDefaultTime] = useState(timesArr[3]);  
  const [defaultColor, setDefaultColor] = useState(colorsArr[0]);  
 

  return (

    <NavigationContainer>      
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "Home" : "Login"}
        screenOptions={{headerShown: false}}
      >        
        <Stack.Screen name="Home">
          {(props) => <Home {...props} defaultTime={defaultTime} themeColor={defaultColor} updateLoginState={handleLogIn} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) =>  <Login {...props} themeColor={defaultColor} updateLoginState={handleLogIn} />}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {(props) => <Register {...props} themeColor={defaultColor} />}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {(props) => <Profile {...props} themeColor={defaultColor} />}
        </Stack.Screen>
      </Stack.Navigator>      
    </NavigationContainer>   

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d7e0ff',
    alignItems: 'center',
    justifyContent: 'center',    
  },
});
