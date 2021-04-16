import React, { useState } from 'react'
import { View, Button } from 'react-native'
import {
    Container,
    Header,
    Content,
    ListItem,
    Text,
    Radio,
    Right,
    Left,
    Picker,
    Icon,
    Body,
    Title
} from 'native-base';

const methods = [
    { name: 'Online', value: 1 },
    { name: 'Offline', value: 2 },
]

const Payment = (props) => {

    const order = props.route.params;

    const [selected, setSelected] = useState();
    return(
       <Container>
           <Header>
               <Body>
                   <Title>Choose your Order Mode</Title>
               </Body>
           </Header>
           <Content>
               {methods.map((item, index) => {
                   return (
                       <ListItem key={item.name} onPress={() => setSelected(item.value)}>
                           <Left>
                            <Text>{item.name}</Text>
                           </Left>
                           <Right>
                               <Radio selected={selected == item.value}/>
                           </Right>
                       </ListItem>
                   )
               })}
               <View style={{ marginTop: 60, alignSelf: 'center' }}>
                       <Button 
                       title={"Confirm"} 
                       onPress={() => props.navigation.navigate("Confirm", { order })}/>
               </View>
           </Content>
       </Container>
    )
}

export default Payment;