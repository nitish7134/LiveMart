import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground
} from "react-native";
import HeaderX from "../components/HeaderX";

function Channels(props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <HeaderX
        icon2Family="Feather"
        icon2Name="search"
        style={styles.headerX}
      ></HeaderX>
      <View style={styles.body}>
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.following}>
            <Text style={styles.text}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popular}>
            <Text style={styles.text2}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text3}>Explore</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <View style={styles.button2RowColumn}>
            <View style={styles.button2Row}>
              <TouchableOpacity style={styles.button2}>
                <ImageBackground
                  source={require("../assets/images/astronaut-astronomy-cosmos-2156.jpg")}
                  resizeMode="cover"
                  style={styles.image}
                  imageStyle={styles.image_imageStyle}
                >
                  <View style={styles.rect8Filler}></View>
                  <View style={styles.rect8}>
                    <Text style={styles.text22}>SCIENCE</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <View style={styles.button2Filler}></View>
              <TouchableOpacity style={styles.button3}>
                <View style={styles.image2Stack}>
                  <Image
                    source={require("../assets/images/chips-circuit-circuit-board-343457.jpg")}
                    resizeMode="cover"
                    style={styles.image2}
                  ></Image>
                  <View style={styles.rect82}>
                    <Text style={styles.text23}>TECHNOLOGY</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.button4Row}>
              <TouchableOpacity style={styles.button4}>
                <ImageBackground
                  source={require("../assets/images/accessories-accessory-boots-322207.jpg")}
                  resizeMode="cover"
                  style={styles.image3}
                  imageStyle={styles.image3_imageStyle}
                >
                  <View style={styles.rect83Filler}></View>
                  <View style={styles.rect83}>
                    <Text style={styles.text24}>FASHION</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <View style={styles.button4Filler}></View>
              <TouchableOpacity style={styles.button5}>
                <ImageBackground
                  source={require("../assets/images/cash-cent-child-1246954.jpg")}
                  resizeMode="cover"
                  style={styles.image4}
                  imageStyle={styles.image4_imageStyle}
                >
                  <View style={styles.rect84Filler}></View>
                  <View style={styles.rect84}>
                    <Text style={styles.text25}>FINANCE</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.button2RowColumnFiller}></View>
          <View style={styles.button7Row}>
            <TouchableOpacity style={styles.button7}>
              <ImageBackground
                source={require("../assets/images/conifers-daylight-environment-1666021.jpg")}
                resizeMode="cover"
                style={styles.image22}
                imageStyle={styles.image22_imageStyle}
              >
                <View style={styles.rect85Filler}></View>
                <View style={styles.rect85}>
                  <Text style={styles.text26}>ENVIRONMENT</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <View style={styles.button7Filler}></View>
            <TouchableOpacity style={styles.button6}>
              <ImageBackground
                source={require("../assets/images/architecture-audi-automotive-1545743.jpg")}
                resizeMode="cover"
                style={styles.image32}
                imageStyle={styles.image32_imageStyle}
              >
                <View style={styles.rect86Filler}></View>
                <View style={styles.rect86}>
                  <Text style={styles.text27}>AUTO</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
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
  tabs: {
    height: 80,
    backgroundColor: "rgba(31,178,204,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 0,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowRadius: 0
  },
  following: {
    width: 100,
    height: 38,
    backgroundColor: "rgba(247,247,247,0)",
    alignSelf: "center",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    justifyContent: "center"
  },
  text: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  popular: {
    width: 100,
    height: 38,
    backgroundColor: "rgba(247,247,247,0)",
    alignSelf: "center",
    borderRadius: 100,
    justifyContent: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  button: {
    width: 100,
    height: 38,
    backgroundColor: "rgba(247,247,247,0)",
    alignSelf: "center",
    borderRadius: 100,
    justifyContent: "center"
  },
  text3: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  categories: {
    backgroundColor: "rgba(255,255,255,1)",
    flex: 1
  },
  button2: {
    width: 150,
    height: 150,
    backgroundColor: "rgba(230, 230, 230,1)",
    elevation: 18,
    borderRadius: 5,
    overflow: "hidden"
  },
  image: {
    flex: 1
  },
  image_imageStyle: {},
  rect8Filler: {
    flex: 1
  },
  rect8: {
    height: 27,
    backgroundColor: "rgba(21,19,19,0.5)",
    justifyContent: "center"
  },
  text22: {
    color: "rgba(247,252,253,1)",
    fontSize: 14,
    alignSelf: "center"
  },
  button2Filler: {
    flex: 1,
    flexDirection: "row"
  },
  button3: {
    width: 150,
    height: 150,
    backgroundColor: "rgba(230, 230, 230,1)",
    elevation: 18,
    borderRadius: 5,
    overflow: "hidden"
  },
  image2: {
    top: 0,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 1
  },
  rect82: {
    left: 0,
    height: 27,
    backgroundColor: "rgba(21,19,19,0.5)",
    position: "absolute",
    right: 0,
    bottom: 0,
    justifyContent: "center"
  },
  text23: {
    color: "rgba(247,252,253,1)",
    fontSize: 14,
    alignSelf: "center"
  },
  image2Stack: {
    flex: 1,
    marginBottom: -1
  },
  button2Row: {
    height: 150,
    flexDirection: "row"
  },
  button4: {
    width: 150,
    height: 150,
    backgroundColor: "rgba(230, 230, 230,1)",
    elevation: 18,
    borderRadius: 5,
    overflow: "hidden"
  },
  image3: {
    flex: 1
  },
  image3_imageStyle: {},
  rect83Filler: {
    flex: 1
  },
  rect83: {
    height: 27,
    backgroundColor: "rgba(21,19,19,0.5)",
    justifyContent: "center"
  },
  text24: {
    color: "rgba(247,252,253,1)",
    fontSize: 14,
    alignSelf: "center"
  },
  button4Filler: {
    flex: 1,
    flexDirection: "row"
  },
  button5: {
    width: 150,
    height: 150,
    backgroundColor: "rgba(230, 230, 230,1)",
    elevation: 18,
    borderRadius: 5,
    overflow: "hidden"
  },
  image4: {
    flex: 1
  },
  image4_imageStyle: {},
  rect84Filler: {
    flex: 1
  },
  rect84: {
    height: 27,
    backgroundColor: "rgba(21,19,19,0.5)"
  },
  text25: {
    color: "rgba(247,252,253,1)",
    fontSize: 14,
    marginTop: 7,
    alignSelf: "center"
  },
  button4Row: {
    height: 150,
    flexDirection: "row",
    marginTop: 40
  },
  button2RowColumn: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15
  },
  button2RowColumnFiller: {
    flex: 1
  },
  button7: {
    width: 150,
    height: 150,
    backgroundColor: "rgba(230, 230, 230,1)",
    elevation: 18,
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: "flex-end"
  },
  image22: {
    flex: 1,
    marginBottom: -1,
    marginTop: 1
  },
  image22_imageStyle: {},
  rect85Filler: {
    flex: 1
  },
  rect85: {
    height: 27,
    backgroundColor: "rgba(21,19,19,0.5)",
    marginBottom: 1
  },
  text26: {
    color: "rgba(247,252,253,1)",
    fontSize: 14,
    marginTop: 7,
    alignSelf: "center"
  },
  button7Filler: {
    flex: 1,
    flexDirection: "row"
  },
  button6: {
    width: 150,
    height: 150,
    backgroundColor: "rgba(230, 230, 230,1)",
    elevation: 18,
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: "flex-end"
  },
  image32: {
    flex: 1,
    marginBottom: -1,
    marginTop: 1
  },
  image32_imageStyle: {},
  rect86Filler: {
    flex: 1
  },
  rect86: {
    height: 27,
    backgroundColor: "rgba(21,19,19,0.5)"
  },
  text27: {
    color: "rgba(247,252,253,1)",
    fontSize: 14,
    marginTop: 6,
    alignSelf: "center"
  },
  button7Row: {
    height: 150,
    flexDirection: "row",
    marginBottom: 30,
    marginLeft: 15,
    marginRight: 15
  }
});

export default Channels;
