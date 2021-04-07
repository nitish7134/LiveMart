// import React, { Component } from 'react'
// import { StyleSheet, View, Text } from 'react-native'
// import baseURL from '../../assets/common/baseUrl'

// class WebViewScreen extends Component {

//     state = {
//         SocialLink: props.SocialLink,
//     }

//     render() {
//     return (
//       <>
//       <WebView source={{ uri: this.state.SocialLink }} />
//       {/* <View style={styles.container}>
//         <Text style={styles.text}>Webview Screen</Text>
//       </View> */}
//       </>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   text: {
//     color: '#333',
//     textAlign: 'center'
//   }
// })

// export default WebViewScreen


import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview';

class WebViewScreen extends Component {
  LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color='#0a1142'
        size='large'
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      />
    )
  }
  render() {
    const { route } = this.props;
    const link = route.params.link;
    return (
      <WebView
        source={{ uri: link }}
        renderLoading={this.LoadingIndicatorView}
        startInLoadingState={true}
      />
    )
  }
}

export default WebViewScreen