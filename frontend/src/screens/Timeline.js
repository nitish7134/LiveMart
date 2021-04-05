import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ImageBackground,
  Text,
  ScrollView
} from "react-native";
import HeaderX from "../components/HeaderX";
import ScrollViewEntry from "../components/ScrollViewEntry";

function Timeline(props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <HeaderX button="Settings" style={styles.headerX}></HeaderX>
      <View style={styles.body}>
        <View style={styles.headline}>
          <ImageBackground
            source={require("../assets/images/astronaut-astronomy-cosmos-21561.jpg")}
            resizeMode="cover"
            style={styles.image}
            imageStyle={styles.image_imageStyle}
          >
            <View style={styles.overlay}>
              <Text style={styles.scienceChannel}>TECHNOLOGY</Text>
              <View style={styles.following}>
                <Text style={styles.text}>Following</Text>
              </View>
              <Text style={styles.followers}>777K Followers</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.scrollArea}>
          <ScrollView
            horizontal={false}
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >
            <ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
            <ScrollViewEntry style={styles.scrollViewEntry4}></ScrollViewEntry>
            <ScrollViewEntry style={styles.scrollViewEntry2}></ScrollViewEntry>
            <ScrollViewEntry style={styles.scrollViewEntry3}></ScrollViewEntry>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  headerX: {
    height: 80,
    elevation: 15,
    shadowOffset: {
      height: 7,
      width: 1
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  body: {
    flex: 1
  },
  headline: {
    height: 246,
    overflow: "hidden"
  },
  image: {
    flex: 1
  },
  image_imageStyle: {},
  overlay: {
    backgroundColor: "rgba(30,26,26,0.4)",
    flex: 1
  },
  scienceChannel: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 43,
    alignSelf: "center"
  },
  following: {
    width: 90,
    height: 40,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 28,
    alignSelf: "center"
  },
  text: {
    color: "rgba(31,178,204,1)",
    fontSize: 14,
    alignSelf: "center"
  },
  followers: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    marginTop: 39,
    alignSelf: "center"
  },
  scrollArea: {
    height: 413
  },
  scrollArea_contentContainerStyle: {
    height: 413
  },
  scrollViewEntry: {
    height: 100
  },
  scrollViewEntry4: {
    width: 360,
    height: 100
  },
  scrollViewEntry2: {
    width: 360,
    height: 100
  },
  scrollViewEntry3: {
    width: 360,
    height: 100
  }
});

export default Timeline;
