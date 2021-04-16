import React, { useState, useEffect, useContext } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Button, Dimensions } from 'react-native';
import { Left, Right, Container, H1, ListItem } from 'native-base';
import Toast from 'react-native-toast-message';
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import TrafficLight from '../../Shared/StyledComponents/TrafficLight'
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import AuthGlobal from '../../Context/store/AuthGlobal';
import axios from "axios";
import baseURL from '../../assets/common/baseUrl';
var { width } = Dimensions.get("window");

const SingleProduct = (props) => {
    const context = useContext(AuthGlobal);

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("")

    useEffect(() => {
        if (props.route.params.item.TotalQuantity == 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unvailable")
        } else if (props.route.params.item.TotalQuantity <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock")
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Available")
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])

    return (
        <Container style={styles.container}>
            <ScrollView style={{ padding: 5 }}>
                <View>
                    <Image
                        source={{
                            uri: item.image ? item.image
                                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <Text style={styles.contentText}>{item.brand}</Text>
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{ marginRight: 10 }}>
                            Availability: {availabilityText}
                        </Text>
                        {availability}
                    </View>
                    <Text>{item.description}</Text>
                </View>

                <View /*style={styles.item} */>
                    {item.Sellers.map((x) => {
                        return (
                            <ListItem key={x._id}>
                                <Text style={styles.Name}>{x.SellerName}</Text>
                                <Text style={styles.price}>₹ {x.Price}</Text>
                                {(!props.route.params.admin) ? (
                                          <EasyButton
                                          primary
                                          medium
                                          onPress={() => {
                                              axios.post(baseURL + 'cart',
                                                  {
                                                      Item: item.id,
                                                      seller: { Quantity_to_buy: 1, seller: x._id, price: x.Price, Name: x.SellerName }
                                                  }, {
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
                                                      props.addItemToCart(res.data);
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
                                          <Text style={{ color: 'white' }}>Add</Text>
                                      </EasyButton>
      
                                ) : null }
                          
                            </ListItem>
                        )
                    })}
                </View>



            </ScrollView>

        </Container>
    )

}

const mapToDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (cart) =>
            dispatch(actions.updateCart(cart))
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    Name: {
        fontSize: 16,
        flexWrap: "wrap",
        width: width * 0.4
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    price: {
        color: 'red',
        fontSize: 17,
        flexWrap: "wrap",
        width: width * 0.2
    },
    availabilityContainer: {
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
    }
})

export default connect(null, mapToDispatchToProps)(SingleProduct);