import React, { useEffect, useState, useContext } from 'react'
import { Text, View, Button, Dimensions } from 'react-native'
import { Item, Picker, Toast } from 'native-base'
import FormContainer from '../../../Shared/Form/FormContainer'
import Input from '../../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AuthGlobal from "../../../Context/store/AuthGlobal"
import MapContainer from '../../User/MapContainer'
import { connect } from 'react-redux'
import axios from 'axios'

var { width } = Dimensions.get('window');

const countries = require("../../../assets/countries.json");

const Checkout = (props) => {
    const context = useContext(AuthGlobal)

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
        setOrderItems(props.cartItems)
        if (context.stateUser.isAuthenticated) {
            setUser(context.stateUser.userProfile._id)
        } else {
            props.navigation.navigate("Cart")
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Login to Checkout",
                text2: ""
            });
        }
        getAddress();
        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        let order = {
            dateOrdered: Date.now(),
            orderItems,
            phone,
            address: address,
            status: "3",
            user,
        }
        props.navigation.navigate("OrderMode", { order: order })
    }

    const getAddress = () => {
        axios.get("http://ip-api.com/json")
            .then(json => {
                console.log(json);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <>
           {/*  <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true}
            >
                <FormContainer title={"Shipping Address"}>
                    <Input
                        placeholder={"Phone"}
                        name={"phone"}
                        value={phone}
                        keyboardType={"numeric"}
                        onChangeText={(text) => setPhone(text)}
                    />
                    <Input
                        placeholder={"Shipping Address 1"}
                        name={"ShippingAddress1"}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                    <Input
                        placeholder={"Shipping Address 2"}
                        name={"ShippingAddress2"}
                        value={address2}
                        onChangeText={(text) => setAddress2(text)}
                    />
                    <Input
                        placeholder={"City"}
                        name={"city"}
                        value={city}
                        onChangeText={(text) => setCity(text)}
                    />
                    <Input
                        placeholder={"Zip Code"}
                        name={"zip"}
                        value={zip}
                        keyboardType={"numeric"}
                        onChangeText={(text) => setZip(text)}
                    />
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Ionicons name="arrow-down" color={"#007aff"} />}
                            style={{ width: undefined }}
                            selectedValue={country}
                            placeholder="Select your country"
                            placeholderStyle={{ color: '#007aff' }}
                            placeholderIconColor="#007aff"
                            onValueChange={(e) => setCountry(e)}
                        >
                            {countries.map((c) => {
                                return <Picker.Item
                                    key={c.code}
                                    label={c.name}
                                    value={c.name}
                                />
                            })}
                        </Picker>
                    </Item>
                    <View style={{ width: '80%', alignItems: "center" }}>
                        <Button title="Confirm" onPress={() => checkOut()} />
                    </View>
                </FormContainer>
            </KeyboardAwareScrollView> */}
            <Input
                placeholder={"Phone"}
                name={"phone"}
                value={phone}
                keyboardType={"numeric"}
                onChangeText={(text) => setPhone(text)}
            />
            <MapContainer setAddress={setAddress} />

            <View style={{ width: '80%', alignItems: "center" }}>
                <Button title="Confirm" onPress={() => checkOut()} />

            </View>
        </>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

export default connect(mapStateToProps)(Checkout)