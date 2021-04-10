import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import { Picker } from '@react-native-community/picker';

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

const PostSignup = (props) => {
    const context = useContext(AuthGlobal);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("Customer");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        const user = {
            password
        };

        if (password === "") {
            setError("Please fill in your credentials");
        } else {
            loginUser(user, context.dispatch);
        }
    };

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
            
        >
            <FormContainer title={"Post SignUp"} >
                {/* <Input
                placeholder={"Enter Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            /> */}
                <Input
                    placeholder={"Enter Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder={"Phone Number"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
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
                        <Text style={{ color: "white" }}>Continue</Text>
                    </EasyButton>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView >
    );
};

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

export default PostSignup;
