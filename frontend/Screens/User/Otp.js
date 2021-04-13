import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import axios from "axios";

import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { setCurrentUser } from "../../Context/actions/Auth.actions";

const OtpScreen = (props) => {
  const context = useContext(AuthGlobal);
  const { route } = props;
  const token = route.params.token;
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    console.log("Sending OTP: " + otp);
    axios
      .post(
        baseURL + "otp/verify",
        {
          otp: otp,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(JSON.stringify(res));

        switch (res.status) {
          case 401: {
            setError("INVALID OTP");
            break;
          }
          case 200: {
            console.log("Response: " + res.data);
            AsyncStorage.setItem("jwt", res.data.token);
            context.dispatch(setCurrentUser(res.data.token, res.data.user));
            console.log(context.stateUser);
            props.navigation.navigate("PostSignUp");
            break;
          }
          default:
            setError("ERROR");
        }
      })
      .catch((err) => {
        setError(err.message);

        console.log(err);
      });
  };
  const handleResend = () => {
    console.log("RESEND OTP");
    axios.get(baseURL + "otp/send", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  return (
    <FormContainer title={"OTP Verification"}>
      <Input
        placeholder={"Enter OTP"}
        secureTextEntry={true}
        name={"otp"}
        id={"otp"}
        keyboardType={"numeric"} // This prop help to open numeric keyboard
        onChangeText={(text) => setOTP(text)}
      />
      <View style={styles.buttonGroup}>
        <EasyButton style={{ innerHeight: 5 }} onPress={() => handleResend()}>
          <Text style={{ color: "black" }}>Resend OTP</Text>
        </EasyButton>
      </View>
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: "black" }}>Login</Text>
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
/*
const styles = StyleSheet.create({
    container: {
        width: 169,
        height: 286
    },
    enterTheOtp: {
        fontFamily: "roboto-700",
        color: "#121212",
        height: 83,
        width: 169,
        textAlign: "center",
        fontSize: 20
    },
    button: {
        width: 136,
        height: 75,
        backgroundColor: "#E6E6E6",
        marginTop: 128,
        marginLeft: 16
    },
    submit: {
        fontFamily: "roboto-700",
        color: "#121212",
        height: 35,
        width: 101,
        textAlign: "center",
        marginTop: 25,
        marginLeft: 18
    }
}); */

export default OtpScreen;
