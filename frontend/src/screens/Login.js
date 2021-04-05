import React, { Component } from "react";

var config = require('../../configF');
// import {useState} from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  ScrollView
} from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import Selector from './Selector';
// import { Picker } from '@react-native-picker/picker';

// const [selectedRole, setSelectedRole] = useState();


function Login(props) {
  return (
    <ScrollView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect}
          imageStyle={styles.rect_imageStyle}
          source={require("../assets/images/Gradient_Z84KvDv.png")}
        >
          <View style={styles.logoStackColumn}>
            <View style={styles.logoStack}>
              <View style={styles.logo}>
                <View style={styles.rect7Filler}></View>
                <View style={styles.rect7}></View>
              </View>
              <Text style={styles.liveMart}>LiveMart</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.form}>
                <View style={styles.nameColumn}>
                  <View style={styles.name}>
                    <EvilIconsIcon name="user" style={styles.icon5}></EvilIconsIcon>
                    <TextInput
                      placeholder="Name"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.nameInput}
                    ></TextInput>
                  </View>
                  <View style={styles.email}>
                    <EvilIconsIcon name="envelope" style={styles.icon6}></EvilIconsIcon>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.emailInput}
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.nameColumnFiller}></View>
                <View style={styles.password}>
                  <EvilIconsIcon name="lock" style={styles.icon7}></EvilIconsIcon>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={true}
                    style={styles.passwordInput}
                  ></TextInput>
                </View>
                <View>
                  <Selector />
                </View>
              </View>
              <View style={styles.formFiller}></View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Timeline")}
                style={styles.button}
              >
                <Text style={styles.text2}>Continue</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <View style={styles.usernameColumn}>
                <View style={styles.username}>
                  <EvilIconsIcon
                    name="user"
                    style={styles.icon22}
                  ></EvilIconsIcon>
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={false}
                    style={styles.usernameInput}
                  ></TextInput>
                </View>
                <View style={styles.password}>
                  <EvilIconsIcon
                    name="lock"
                    style={styles.icon2}
                  ></EvilIconsIcon>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={false}
                    style={styles.passwordInput}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.usernameColumnFiller}></View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Channels")}
                style={styles.button}
              >
                <Text style={styles.text2}>Get Started       </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(config.baseUrl+ '/users/auth/google')}
                style={styles.button}
              >
                <Text style={styles.text2}>Login With Google       </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(config.baseUrl+ '/users/auth/facebook')}
                style={styles.button}
              >
                <Text style={styles.text2}>Login With Facebook       </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.logoStackColumnFiller}></View>
          <View style={styles.footerTexts}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignUp")}
              style={styles.button2}
            >
              <View style={styles.createAccountFiller}></View>
              <Text style={styles.createAccount}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.button2Filler}></View>
            <Text style={styles.needHelp}>Need Help?</Text>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  background: {
    flex: 1
  },
  rect: {
    flex: 1
  },
  rect_imageStyle: {},
  logo: {
    top: 22,
    width: 116,
    height: 122,
    position: "absolute",
    left: 53
  },
  rect7Filler: {
    flex: 1
  },
  rect7: {
    height: 8,
    backgroundColor: "#25cdec",
    marginBottom: 6,
    marginLeft: 2,
    marginRight: 3
  },
  liveMart: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 57
  },
  logoStack: {
    width: 217,
    height: 144,
    marginLeft: 35
  },
  form: {
    height: 230,
    marginTop: 66
  },
  username: {
    height: 59,
    backgroundColor: "rgba(251,247,247,0.25)",
    borderRadius: 5,
    flexDirection: "row"
  },
  icon22: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginLeft: 20,
    alignSelf: "center"
  },
  usernameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 14
  },
  password: {
    height: 59,
    backgroundColor: "rgba(253,251,251,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 27
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  passwordInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  usernameColumn: {},
  usernameColumnFiller: {
    flex: 1
  },
  button: {
    height: 59,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  logoStackColumn: {
    marginTop: 90,
    marginLeft: 41,
    marginRight: 41
  },
  logoStackColumnFiller: {
    flex: 1
  },
  footerTexts: {
    height: 14,
    flexDirection: "row",
    marginBottom: 36,
    marginLeft: 37,
    marginRight: 36
  },
  button2: {
    width: 104,
    height: 14,
    alignSelf: "flex-end"
  },
  createAccountFiller: {
    flex: 1
  },
  createAccount: {
    color: "rgba(255,255,255,0.5)"
  },
  button2Filler: {
    flex: 1,
    flexDirection: "row"
  },
  needHelp: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "flex-end",
    marginRight: -1
  }
});

export default Login;
