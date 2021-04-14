import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

const CartItem = (props) => {
  console.log("CART ITEM: ",JSON.stringify(props.item.item));
  const data = props.item.item
  return (
    <ListItem style={styles.listItem} key={Math.random()} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: data.Item.image
              ? data.Item.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
      </Left>
      <Body style={styles.body}>
        {/* Card In Future */}
      <Text>{data.Item.Name}</Text>
        <Left>
          <Text>Seller: {data.Sellers[0].Name}</Text>
        </Left>
        <Text>*{data.Sellers[0].Quantity_to_buy} </Text>
        <Right>
          <Text> ₹ {data.Sellers[0].Price}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default CartItem;
