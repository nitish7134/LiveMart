import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import axios from "axios";

import baseURL from "../../assets/common/baseUrl";

import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-community/async-storage"

import AuthGlobal from "../../Context/store/AuthGlobal";
import {setCurrentUser} from '../../Context/actions/Auth.actions'

const OtpScreen = (props) => {

  const { route } = props;
  const token = route.params.token;
  const context = useContext(AuthGlobal);
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    console.log("Sending OTP: " + otp);
    axios.post(baseURL + 'otp/verify', {
      otp: otp
    }, {
      headers: {
        Authorization: "Bearer " + token
      },

    }).then((res) => {
      console.log(JSON.stringify(res));

      switch (res.status) {
        case 401:
          setError("INVALID OTP")
          break;
        case 200:
          //LOGIN IN REDUX STORE
          AsyncStorage.setItem("jwt", token)
          const decoded = jwt_decode(token)
          context.dispatch(setCurrentUser(decoded))
          
          props.navigation.navigate("Home");
          break;
        default:
          setError("OTP MAYBE EXPIRED")
      }
    }).catch((err) => {
      setError("OTP MAYBE EXPIRED")

      console.log(err);
    })
  };
  const handleResend = () => {
    console.log("RESEND OTP")
    axios.get(baseURL + 'otp/send', {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  }

  return (
    <FormContainer title={"OTP Verification"}>
      <Input
        placeholder={"Enter OTP"}
        secureTextEntry={true}
        name={"otp"}
        id={"otp"}
        keyboardType={'numeric'} // This prop help to open numeric keyboard
        onChangeText={(text) => setOTP(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton large primary onPress={() => handleResend()}>
          <Text style={{ color: "white" }}>Resend OTP</Text>
        </EasyButton>
      </View>
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: "white" }}>Login</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
}
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



export default OtpScreen
