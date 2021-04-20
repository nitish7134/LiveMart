import { View } from 'native-base';
import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements/dist/card/Card';
import Toast from "react-native-toast-message";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

var { width, heigth } = Dimensions.get("window");

class Feedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            token: "",
            show: Boolean()
        }

        this.setComment = this.setComment.bind(this);
        this.setToken = this.setToken.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.setShow = this.setShow(this);
    }

    componentDidMount() {
        AsyncStorage.getItem("jwt")
            .then(res => {
                setToken(res);
                axios
                    .get(`${baseURL}feedback`, {
                        headers: {
                            authorization: "Bearer " + res,
                        },
                    })
                    .then(response => {
                        // display all the feedbacks that the user has already posted @Mittal
                    })
            })
    }

    setShow = () => {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        });
    }

    setComment = (text) => {
        this.setState({
            comment = text
        })
    }

    setToken = (text) => {
        this.setState({
            token: text
        })
    }

    sendComment = () => {
        let commentBody = {
            dateOfComment: Date.now(),
            AddressedToID: this.props.RetailerId,   // somehow get retailer id here
            AddressFromID: this.props.UserID,   // somehow get user id here
            ItemID: this.props.ItemID,  // somehow get item ID about which the feedbeck is, here
            Query: this.state.comment   // this we have picked up from input
        }

        axios.post(`${baseURL}feedback`, commentBody, {
            headers: {
                authorization: "Bearer " + res,
            }
        })
            .then((response) => {
                switch (response.statusCode) {
                    case 200:
                    case 201:
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Comment successfully posted",
                            text2: "Expect a reply soon",
                        });
                        this.setShow();
                        break;
                    default:
                        Toast.show({
                            topOffset: 60,
                            type: "error",
                            text1: "Something went wrong",
                            text2: "Please try again",
                        });
                        break;
                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    render() {
        return (
            <View>
                <Card style={styles.card}>
                    <Text>
                        
                    </Text>
                    <Input>
                        placeholder={"Comment here..."}
                        name={"Comment"}
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                    </Input>
                    <View style={{ width: '80%', alignItems: "center" }}>
                        {this.state.show ? <Button title="Send" type="button" onPress={() => sendComment()} /> : null}
                    </View>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        // add styles here
    }
});

export default Feedback;