import React, { useContext } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1
} from "native-base";
import { SwipeListView } from 'react-native-swipe-list-view'
import CartItem from './CartItem'

// import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../Shared/StyledComponents/EasyButton"

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {

  console.log("CART PROPS", props.cartItems);
  var total = 0;
  console.log("ITEMS:", props.cartItems.Items)

  return (
    <>
      {props.cartItems && props.cartItems.Items && props.cartItems.Items.length ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          <SwipeListView
            data={props.cartItems.Items}
            renderItem={(data) => (
              <CartItem item={data} />
            )}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => {
                    //AXIOS SERVER TO REMOVE ITEM FROM CART sending data.item
                    axios.delete(baseURL + 'cart',
                      data.item, {
                      headers: {
                        authorization: `Bearer ` + context.stateUser.token,
                      },
                    }).then(() => {
                      axios.get(baseURL + 'cart',
                        {
                          headers: {
                            authorization: `Bearer ` + context.stateUser.token,
                          }
                        }).then(res => {
                          console.log(res.data)
                          props.updateCart(res.data);
                          Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: `${item.Name} added to Cart`,
                            text2: "Go to your cart to complete order"
                          })
                        }).catch((error) => alert(error));

                    })
                  }}
                >
                  {/* <Icon name="trash" color={"white"} size={30} /> */}
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>₹ {props.cartItems.TotalPrice}</Text>
            </Left>
            <Right>
              <EasyButton
                danger
                medium
                onPress={() => {
                  //AXIOS SERVER TO REMOVE ITEM FROM CART
                  axios.delete(baseURL + 'cart/Clear',
                    {
                    headers: {
                      authorization: `Bearer ` + context.stateUser.token,
                    },
                  }).then(() => {
                    axios.get(baseURL + 'cart',
                      {
                        headers: {
                          authorization: `Bearer ` + context.stateUser.token,
                        }
                      }).then(res => {
                        console.log(res.data)
                        props.updateCart(res.data);
                        Toast.show({
                          topOffset: 60,
                          type: "success",
                          text1: `${item.Name} added to Cart`,
                          text2: "Go to your cart to complete order"
                        })
                      }).catch((error) => alert(error));

                  })
                }}
              >
                <Text style={{ color: 'white' }}>Clear</Text>
              </EasyButton>
            </Right>
            <Right>
              <EasyButton
                primary
                medium
                onPress={() => props.navigation.navigate('Checkout')}
              >
                <Text style={{ color: 'white' }}>Checkout</Text>
              </EasyButton>
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (cart) => dispatch(actions.updateCart(cart)),
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red'
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
