import React, { useState } from "react";
// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import { createDrawerNavigator } from "react-navigation-drawer";
import AppLoading from "expo-app-loading";

import * as Font from "expo-font";
import Channels from "./src/screens/Channels";
import Feedback from "./src/screens/Feedback";
import Login from "./src/screens/Login";
import Settings from "./src/screens/Settings";
import SignUp from "./src/screens/SignUp";
import Timeline from "./src/screens/Timeline";

// const DrawerNavigation = createDrawerNavigator({
//   Channels: Channels,
//   Feedback: Feedback,
//   Login: Login,
//   Settings: Settings,
//   SignUp: SignUp,
//   Timeline: Timeline
// });

// const StackNavigation = createStackNavigator(
//   {
//     DrawerNavigation: {
//       screen: DrawerNavigation
//     },
//     Channels: Channels,
//     Feedback: Feedback,
//     Login: Login,
//     Settings: Settings,
//     SignUp: SignUp,
//     Timeline: Timeline
//   },
//   {
//     headerMode: "none"
//   }
// );

// const AppContainer = createAppContainer(StackNavigation);

function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return <Login />;
  }
}
async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      "roboto-regular": require("./src/assets/fonts/roboto-regular.ttf")
    })
  ]);
}
function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default App;
