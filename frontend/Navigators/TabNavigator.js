import React , {useContext} from "react"
import {View} from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminNavigator from "./AdminNavigator";
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import Icon from "react-native-vector-icons/FontAwesome";

import CartIcon from "../Shared/CartIcon";

import AuthGlobal from "../Context/store/AuthGlobal";

function MyStack() {
    const context = useContext(AuthGlobal)

    const Tab = createBottomTabNavigator();
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
                        <Icon name="home" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon name="shopping-cart" color={color} size={30} />
                            <CartIcon />
                        </View>
                    ),
                }}
            />

            {context.stateUser.user.isAdmin == true ? (
                <Tab.Screen
                    name="Admin"
                    component={AdminNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="cog" color={color} size={30} />
                        ),
                    }}
                />
            ) : null}
        </Tab.Navigator>
    )
}

export default function TabNavigator() {
    return <MyStack />
}