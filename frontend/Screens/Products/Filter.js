import React, { Component, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'


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

class Filter extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: Number
		};

	}

	render() {
		return (
			<View style={{ flexDirection: 'row' }}>
				{this.props.data.map((x, i) => (
					<FilterButton
						text={x.title}
						id={i}
						selectedIndex={this.state.selectedIndex}
						callback={(id) => {
							this.setState({ selectedIndex: id });
							if (this.props.onValueChange) {
								this.props.onValueChange(id);
							}
						}}
					/>
				))}
			</View>
		);
	}
};


export default Filter;
