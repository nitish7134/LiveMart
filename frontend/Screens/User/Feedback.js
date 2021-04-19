import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import axios from "axios";
import * as actions from '../../Redux/Actions/cartActions';
import { connect } from 'react-redux';
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { setCurrentUser } from "../../Context/actions/Auth.actions";

const Feedback = () => {
    return (
    <FormContainer title={"Feedback"}>
      <Input
        placeholder={"How was you experience with our app ?"}
        onChangeText={}
      />
      <View style={styles.buttonGroup}>
        <EasyButton style={{ innerHeight: 5 }} onPress={}>
          <Text style={{ color: "black" }}>Submit</Text>
        </EasyButton>
      </View>
    </FormContainer>
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

export default connect(null, mapToDispatchToProps)(Feedback);
