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


const OtpScreen = () => {

  const { route } = this.props;
  const token = route.params.link;
 
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    console.log("Sending OTP: " + otp);
    axios.get(baseURL + 'otp/verify', {
      headers: {
        Authorization: "Bearer " + token
      },
      body: {
        otp: otp
      }
    }).then((res) => {
      console.log(res);

      switch (res.statusCode) {
        case 401:
          setError("INVALID OTP")
          break;
        case 200:

          break;
        default:
          setError("OTP MAYBE EXPIRED")
      }
    }).catch((err) => {
      console.log(err);
    })
  };
  const handleResend = () => {
    console.log("RESEND OTP")
    axios.get(baseURL + 'otp/send', {
      headers: {
        Authorization: "Bearer " + yourJWTToken
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
