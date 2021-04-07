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
  /* return (
      <View style={styles.container}>
          <TextInput
              placeholder="enter the otp"
              style={styles.enterTheOtp}
          ></TextInput>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
      </View>
  ); */
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    console.log("Sending OTP: " + otp);
  };
  const handleResend = () => {
    console.log("RESEND OTP")
  }

  return (
    <FormContainer title={"OTP Verification"}>
      <TextInput
        placeholder="Enter OTP"
        numeric value   // This prop makes the input to get numeric only 
        keyboardType={'numeric'} // This prop help to open numeric keyboard
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
