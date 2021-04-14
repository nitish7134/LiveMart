import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminNavigator from "./AdminNavigator";
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserProfile from "./../Screens/User/UserProfile";

import CartIcon from "../Shared/CartIcon";

import AuthGlobal from "../Context/store/AuthGlobal";
import { useEffect } from "react/cjs/react.development";

function MyStack() {
  const context = useContext(AuthGlobal);

  const Tab = createBottomTabNavigator();
  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    }
  }, [context.stateUser.isAuthenticated]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require("../assets/HomeIcon.png")} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Image source={require("../assets/CartIcon.png")} />
              <CartIcon />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require("../assets/UserIcon.png")} />
          ),
        }}
      />
      {context.stateUser.userProfile.role != "Customer" ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require("../assets/UserIcon.png")} />
            ),
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}
// SAALE PHONE CHECK KAR
export default function TabNavigator() {
  return <MyStack />;
}
