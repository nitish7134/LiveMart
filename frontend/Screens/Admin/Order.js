import React, { useState, useCallback } from "react";
import { View, FlatList, Text, AsyncStorage } from "react-native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";

import OrderCard from "../../Shared/OrderCard";

const Orders = (props) => {
  const [orderList, setOrderList] = useState();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt").then((res) => {
        getOrders(res);
      });
      return () => {
        setOrderList();
      };
    }, [])
  );

  const getOrders = (res) => {
    axios
      .get(`${baseURL}orders/seller`, {
        headers: {
          authorization: "Bearer " + res,
        },
      })
      .then((x) => {
        setOrderList(x.data);
        console.log("OrdersReceived: ", JSON.stringify(x.data))
      })
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderCard navigation={props.navigation} Order={item} editMode={true} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Orders;
