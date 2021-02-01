import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View, StatusBar } from 'react-native';
import { Content, Input, Item } from 'native-base';

import Button from '../../../components/button';

import Toast from '../../../utils/Toast';
import Validator from '../../../utils/ValidateUtil';

import { exampleService } from '../../../services';

import { colors } from '../../../styles';

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colors.primaryPink,
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputContainer: {
		borderRadius: 16,
		backgroundColor: colors.white,
		paddingTop: 40,
		paddingBottom: 20,
		paddingHorizontal: 20,
		width: '80%',
		height: '60%'
	},
	input: {
		marginVertical: 10,
		borderRadius: 16
	},
	buttonContainer: {
		marginTop: 20
	}
});

function Home({ navigation }) {
	const [ isLoading, setIsLoading ] = React.useState(false);
	const [ asteroidId, setAsteroidId ] = React.useState('');

	function handleAsteroidResponse(asteroidData) {
		navigation.navigate('Asteroid', { asteroidData });
	}

	const handleRandomResponse = (asteroidData) => {
		const list = asteroidData.data.near_earth_objects;
		const random = Math.floor(Math.random() * list.length);
		asteroidData = list[random];
		navigation.navigate('Asteroid', { asteroidData });
	};

	function handleSubmit() {
		if (!Validator.validateField(asteroidId)) return Toast.warning('please fill the asteroid Id');
		setIsLoading(true);
		axios
			.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=yitSbDgKTOY9XCQCmYDW48Z2MOOKcHR14qB02wOl`)
			.then(handleAsteroidResponse)
			.catch(Toast.error)
			.finally(() => setIsLoading(false));
	}

	const handleRandom = () => {
		setIsLoading(true);
		axios
			.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=yitSbDgKTOY9XCQCmYDW48Z2MOOKcHR14qB02wOl`)
			.then(handleRandomResponse)
			.catch(Toast.error)
			.finally(() => setIsLoading(false));
	};

	return (
		<View style={styles.root}>
			<StatusBar backgroundColor={colors.primaryBlue} barStyle="light-content" />

			<View style={styles.inputContainer}>
				<Item rounded style={styles.input}>
					<Input
						placeholder="Enter Asteroid ID"
						placeholderTextColor={colors.warmGrey}
						value={asteroidId}
						onChangeText={setAsteroidId}
					/>
				</Item>
				<View style={styles.buttonContainer}>
					<Button isLoading={isLoading} onPress={handleSubmit} disabled={isLoading} buttonTitle="SUBMIT" />
					<Button
						isLoading={isLoading}
						onPress={handleRandom}
						disabled={isLoading}
						buttonTitle="Random Asteroid"
					/>
				</View>
			</View>
		</View>
	);
}

Home.propTypes = {
	navigation: PropTypes.object
};

Home.defaultProps = {
	navigation: {}
};

// module.exports = Home;
export default Home;
