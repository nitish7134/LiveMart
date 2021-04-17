import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import { Picker } from "@react-native-community/picker";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { getUserProfile } from "../../Context/actions/Auth.actions";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const PostSignup = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Customer");
  const [error, setError] = useState("--");
  const [token, setToken] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        // props.navigation.navigate("Login")
        props.navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
      setUserProfile(context.stateUser.userProfile);
      setToken(context.stateUser.token);
    }, [context.stateUser.isAuthenticated])
  );
  function validatePhoneNumber(phoneno) {
    const re = /^[6-9]\d{9}$/;
    return re.test(String(phoneno).toLowerCase());
  }
  const handleSubmit = () => {
    if (validatePhoneNumber(phone)) {
      setError("INVALID PHONE NUMBER");
    } else {
      var user = {};
      if (!userProfile.phoneNo) user.phoneNo = phone;
      if (!userProfile.role) {
        user.role = selectedRole;
      }
      if (userProfile.password === "false") {
        user.password = password;
      }

      try {
        console.log("token " + token);
        console.log(user);
        axios
          .put(
            baseURL + "users",
            {
              user: user,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((response) => {
            if (response.status(200))
              props.navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            // props.navigation.navigate("Home");
            else setError(response.status);
          });
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }
  };
  if (userProfile.phoneNo && userProfile.role && userProfile.password == "true")
    // props.navigation.navigate("Home");
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  console.log(JSON.stringify(userProfile));
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Post SignUp"}>
        {/* <Input
                placeholder={"Enter Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            /> */}
        {userProfile.password === "false" ? (
          <Input
            placeholder={"Enter Password"}
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        ) : null}

        {!userProfile.phoneNo ? (
          <Input
            placeholder={"Phone Number"}
            name={"phone"}
            id={"phone"}
            keyboardType={"numeric"}
            onChangeText={(text) => setPhone(text)}
          />
        ) : null}

        {!userProfile.role ? (
          <View style={styles.container}>
            <Picker
              selectedValue={selectedRole}
              // style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedRole(itemValue)
              }
            >
              <Picker.Item label="Customer" value="Customer" />
              <Picker.Item label="Retailer" value="Retailer" />
              <Picker.Item label="Wholeasaler" value="Retailer" />
            </Picker>
          </View>
        ) : null}
        <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: "white" }}>Continue</Text>
        </EasyButton>
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default PostSignup;
