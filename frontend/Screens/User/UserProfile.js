import React, { useContext, useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import OrderCard from "../../Shared/OrderCard";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import {
  logoutUser,
  getUserProfile,
  setCurrentUser,
} from "../../Context/actions/Auth.actions";
import { useEffect } from "react/cjs/react.development";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();
  const [token, setToken] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          console.log("TOKEN :" + res);
          axios
            .get(`${baseURL}users/profile`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((response) => {
              console.log("RESPONSE FROM PROFILE", response.data);
              setUserProfile(response.data.user);
              console.log("userProfile:33", response.data.user);
              setToken(response.data.token);
              // dipatch(response.data.token, response.data.user);
              console.log("Checking my Context User", context.stateUser);

              dispatch(setCurrentUser(response.data.token, response.data.user));
            });
        })
        .catch((error) => console.log(error));
      axios
        .get(`${baseURL}orders`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((rep) => {
          const data = rep.data;
          console.log(data);
          if (orders.length > 0) setOrders(data);
        })
        .catch((error) => console.log(error));

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.Name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phoneNo : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title={"Sign Out"}
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch),
              // props.navigation.navigate("Register"),
            ]}
          />
        </View>
        <View style={styles.order}>
          <Text style={{ fontSize: 20 }}>My Orders</Text>
          <View>
            {orders ? (
              orders.map((x) => {
                return <OrderCard key={x.id} {...x} />;
              })
            ) : (
              <View style={styles.order}>
                <Text>You have no orders</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});

export default UserProfile;
