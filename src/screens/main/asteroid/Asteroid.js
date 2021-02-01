import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View, StatusBar, ScrollView } from 'react-native';
import { Content, Input, Item } from 'native-base';

import Button from '../../../components/button';

import Toast from '../../../utils/Toast';
import Validator from '../../../utils/ValidateUtil';

import { exampleService } from '../../../services';

import { colors } from '../../../styles';

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colors.primaryBlue,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container: {
		borderRadius: 16,
		backgroundColor: colors.white,
		padding: 35,
		marginVertical: 20,
		fontWeight: 'bold',
		fontSize: 12,
		fontFamily: 'Cochin'
	}
});

function Asteroid({ navigation }) {
	const [ isLoading, setIsLoading ] = React.useState(false);

	const asteroidData = navigation.getParam('asteroidData').data
		? navigation.getParam('asteroidData').data
		: navigation.getParam('asteroidData');
	// console.log(asteroidData.data);
	// const {} = asteroidData || {};
	console.log(asteroidData);

	return (
		<View style={styles.root}>
			<StatusBar backgroundColor={colors.primaryPink} barStyle="light-content" />
			<View style={styles.container}>
				<Text>Name - {asteroidData.name}</Text>
				<Text>Nasa JPL URL - {asteroidData.nasa_jpl_url}</Text>
				<Text>
					Is potentially hazardous Asteroid -{' '}
					{asteroidData.is_potentially_hazardous_asteroid ? 'Dangerous' : 'Harmless'}
				</Text>
			</View>
		</View>
	);
}

Asteroid.propTypes = {
	navigation: PropTypes.object
};

Asteroid.defaultProps = {
	navigation: {}
};

// module.exports = Asteroid;
export default Asteroid;
