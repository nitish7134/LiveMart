import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, Linking } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

import baseURL from "../../assets/common/baseUrl";



const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  const handleOpenURL = ({ url }) => {
    console.log("URL: " + url)
    var token = extractUrlValue('token', url);
    token = token.split("#")[0];
    console.log("token: " + token);

    axios.get(baseURL + 'otp/send', {
      headers: {
        authorization: 'bearer ' + token
      }
    })
    props.navigation.navigate("OtpScreen", {
      token: token
    })
    Linking.removeEventListener('url', handleOpenURL);
  }
  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: "white" }}>Login</Text>
        </EasyButton>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(baseURL + 'users/auth/google')
            Linking.addEventListener('url', handleOpenURL);
          }}            >
          <Image source={require("./../../assets/GAuthButton.png")}
            style={{ width: 200, height: 50 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(baseURL + 'users/auth/facebook')
            Linking.addEventListener('url', handleOpenURL);
          }}
        >
          <Image source={require("./../../assets/GAuthButton.png")}
            style={{ width: 200, height: 50 }} />
        </TouchableOpacity>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <EasyButton
          large
          secondary
          onPress={() => props.navigation.navigate("Register")}>
          <Text style={{ color: "white" }}>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
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

export default Login;