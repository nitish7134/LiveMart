import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

class WebViewScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Webview Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#333',
    textAlign: 'center'
  }
})

export default WebViewScreen