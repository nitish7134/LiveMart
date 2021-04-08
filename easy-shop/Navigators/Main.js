import React, { useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from "./TabNavigator";
// import AdminNavigator from "./AdminNavigator";

import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'
import AuthWebView from '../Screens/User/AuthWebView'
import OtpScreen from "../Screens/User/Otp"

import AuthGlobal from "../Context/store/AuthGlobal";

//TESTING
import PostSignup from '../Screens/User/PostSignup';

const Stack = createStackNavigator();

const Main = () => {
  const context = useContext(AuthGlobal)

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Login"
        component={Login
        }
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="PostSignUp"
        component={PostSignup}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="User Profile"
        component={UserProfile}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
