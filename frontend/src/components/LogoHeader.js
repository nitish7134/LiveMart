import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Center } from "@builderx/utils";

function LogoHeader(props) {
  return (
    <View style={[styles.root, props.style]}>
      <View style={styles.text5Stack}>
        <Center horizontal>
          <Text style={styles.text5}>bx</Text>
        </Center>
        <View style={styles.rect8}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  text5: {
    top: 0,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 36
  },
  rect8: {
    top: 38,
    left: 0,
    backgroundColor: "rgba(5,5,5,1)",
    position: "absolute",
    right: 0,
    bottom: 5
  },
  text5Stack: {
    flex: 1,
    marginBottom: -4
  }
});

export default LogoHeader;
