import React, { useState } from "react";
import {
  View, Text, StyleSheet, Linking, Image, TouchableOpacity
} from "react-native";
import { Picker } from '@react-native-community/picker';
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import GButton from '../../assets/GAuthButton.png'
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";


const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Customer");
  const [adress, setaddress] = useState("Customer");

  const [error, setError] = useState("");

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhoneNumber(phoneno) {
    const re = /^[6-9]\d{9}$/
    return re.test(String(phoneno).toLowerCase());
  }
  const register = () => {
    if (!validateEmail(email)) {
      setError("INVALID EmailID")
      return;
    }
    if (!validatePhoneNumber(phone)) {
      setError("INVALID Phone No")
      return;
    }


    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
      return;
    }
    setError("");
    let user = {
      Name: name,
      email: email,
      password: password,
      phoneNo: phone,
      role: selectedRole
    };
    var url = "http://ec2-18-216-67-251.us-east-2.compute.amazonaws.com:3000/users/signup"
    console.log("POSTING TO URL: " +url)
    axios({
      method: 'POST',
      url: url,
      body: user,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    })
      .then((res) => {
        console.log(JSON.stringify(res));
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("OtpScreen");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  function extractUrlValue(key, url) {
    if (typeof (url) === 'undefined')
      url = window.location.href;
    var match = url.match('[?&]' + key + '=([^&]+)');
    return match ? match[1] : null;
  }

  const handleOpenURL = ({ url }) => {
    console.log("URL: " + url)
    const token = extractUrlValue('token', url);

    console.log("token: " + token);

    axios.get(baseURL + 'otp/send', {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    props.navigation.navigate("OtpScreen", {
      token: token
    })
    Linking.removeEventListener('url', myhandler);
  }
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <View style={styles.container}>
            <Picker
              selectedValue={selectedRole}
              // style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
            >
              <Picker.Item label="Customer" value="Customer" />
              <Picker.Item label="Retailer" value="Retailer" />
              <Picker.Item label="Wholeasaler" value="Retailer" />
            </Picker>
          </View>
          <EasyButton large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
          </EasyButton>
        </View>
        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
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
      </FormContainer>
      
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default Register;
