import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class Filter extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
            {data.map((x, i) => (
                <FilterButton
                text={x.title}
                id={i}
                selectedIndex={selectedIndex}
                callback={(id) => {
                    setSelectedIndex(id);
                    if (onValueChange) {
                    onValueChange(id);
                    }
                }}
                />
            ))}
            </View>
        );
    }
};

const FilterButton = ({ callback, text, id, selectedIndex }) => {
  const clicked = selectedIndex === id;
  return (
    <TouchableOpacity
      style={[
        { borderRadius: 20, borderColor: 'black', borderWidth: 2, padding: 10 },
        { backgroundColor: clicked ? 'black' : 'white' },
      ]}
      onPress={() => {
        callback(id);
      }}>
      <Text style={{ color: clicked ? 'white' : 'black' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Filter
