import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Picker, Text, Left, Right, ListItem, Thumbnail, Body, Card, CardItem } from "native-base";


import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import CartItem from "./../Screens/Cart/CartItem"
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
const [width] = Dimensions.get("window")
const codes = [
  { name: "pending", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();
  const [items,setItems] = useState(props.editMode ? props.Order.Items : props.Order.Order.Items)
  console.log("cartPROPS", JSON.stringify(props))

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }
    console.log("props.order", JSON.stringify(props.Order))
    if (props.Order.statusCode == "0") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("pending");
      setCardColor("#E74C3C");
    } else if (props.Order.statusCode == "1") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("shipped");
      setCardColor("#F1C40F");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("delivered");
      setCardColor("#2ECC71");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);
  const handleSubmit = () => {
    console.log("FEEDBACK?")
  }
  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.OrderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Edited",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>

        <Text>Order Number: #{props.editMode ? props.Order.orderID : props.Order._id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        {props.Order ? (
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {props.Order.address}</Text>
              <Text>Order Mode: {props.Order.orderType}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {items.map((data) => {
              console.log("data", data);
              return (
                <>
                  {data ? (
                    <ListItem style={styles.listItem} key={data._id} avatar>
                      <Body style={styles.body}>
                        <Card style={styles.card}>
                          <CardItem>
                            <Thumbnail
                              source={{
                                uri: data.Item.image
                                  ? data.Item.image
                                  : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                              }}
                            />
                            <Text style={{ fontWeight: "bold" }}>   {data.Item.Name}</Text>
                          </CardItem>

                          {/* <CardItem header>	
                      </CardItem> */}
                          {!props.editMode ? (
                            <CardItem>
                              <Left>
                                <Text>Sellers: </Text>
                              </Left>
                            </CardItem>
                          ) : null}
                          {!props.editMode ? data.Sellers.map((x) => {
                            console.log(x);
                            return (
                              <>
                                <CardItem>
                                  <Left>
                                    <Text>{x.Name}</Text>
                                  </Left>

                                  <Text> ₹ {x.Price} X {x.Quantity_to_buy} </Text>
                                  <Right>
                                    <EasyButton small onPress={() => props.navigation.navigate("Product Feedback", { item: data.Item, Seller: x.Seller })}>
                                      <MaterialIcons name="feedback" size={24} color="black" />
                                    </EasyButton>
                                  </Right>
                                </CardItem>
                              </>)
                          }) : <Text> ₹ {data.Price} X {data.QuantityBought} </Text>
                          }
                          {/*       <CardItem>
                            <Left>
                              <Text>{x.Name}</Text>
                            </Left>

                            <Text> ₹ {x.Price} X {x.Quantity_to_buy} </Text>
                            <Right>
                              <EasyButton small onPress={() => props.navigation.navigate("Product Feedback", { item: data.Item, Seller: x })}>
                                <MaterialIcons name="feedback" size={24} color="black" />
                              </EasyButton>
                            </Right>
                          </CardItem> */}

                        </Card>
                      </Body>
                    </ListItem>
                  ) : null}
                </>
              );
            })}
          </View>
        ) : null}
        <Text>Date Ordered: {props.Order.createdAt.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.Price}>₹ {props.Order.TotalPrice}</Text>
        </View>
        {props.editMode ? (
          <View>
            <Picker
              mode="dropdown"
              iosIcon={<Ionicons color={"#007aff"} name="ios-arrow-down" />}
              style={{ width: undefined }}
              selectedValue={statusChange}
              placeholder="Change Status"
              placeholderIconColor={{ color: "#007aff" }}
              onValueChange={(e) => setStatusChange(e)}
            >
              {codes.map((c) => {
                return (
                  <Picker.Item key={c.code} label={c.name} value={c.code} />
                );
              })}
            </Picker>
            <EasyButton secondary large onPress={() => updateOrder()}>
              <Text style={{ color: "white" }}>Update</Text>
            </EasyButton>
          </View>
        ) : null}
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    width:width,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderCard;
