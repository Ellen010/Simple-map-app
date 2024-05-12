import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
	const [placeName, setPlaceName] = useState('');
	const [placeLat, setPlaceLat] = useState(null);
	const [placeLon, setPlaceLon] = useState(null);
	const [places, setPlaces] = useState([]);

	const handlePress = () => {
		setPlaces([...places, { name: placeName, lat: parseFloat(placeLat), lon: parseFloat(placeLon) }]);
		setPlaceName('');
		setPlaceLon(null);
		setPlaceLat(null);
	};

	const placesMarkers = places.map((e, i) => {
		return (
			<Marker
				key={i}
				coordinate={{ latitude: e.lat, longitude: e.lon }}
				title={e.name}
			/>
		);
	});

	return (
		<View>
			<SafeAreaView style={styles.inputSection}>
				<TextInput
					placeholder='Place Name'
					onChangeText={value => setPlaceName(value)}
					value={placeName}
					style={styles.input}
				/>
				<TextInput
					placeholder='Latitude'
					onChangeText={value => setPlaceLat(value)}
					value={placeLat}
					style={styles.input}
				/>
				<TextInput
					placeholder='Longitude'
					onChangeText={value => setPlaceLon(value)}
					value={placeLon}
					style={styles.input}
				/>
				<Pressable
					onPress={() => handlePress()}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Go</Text>
				</Pressable>
			</SafeAreaView>
			<MapView
				initialRegion={{
					latitude: 48.856614,
					longitude: 2.3522219,
					latitudeDelta: 25,
					longitudeDelta: 25,
				}}
				style={styles.map}
			>
				{placesMarkers}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		width: '100%',
		height: '70%',
	},
	inputSection: {
		width: '100%',
		height: '30%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		borderWidth: 1,
		width: '80%',
		borderColor: 'gray',
		paddingHorizontal: 20,
		paddingVertical: 5,
		margin: 5,
		borderRadius: 10,
	},
	button: {
		marginTop: 5,
		paddingHorizontal: 12,
		paddingVertical: 3,
		borderRadius: 10,
		backgroundColor: '#16C172',
	},
	buttonText: {
		color: 'white',
		fontSize: 17,
		fontWeight: 'bold',
		paddingHorizontal: 20,
	},
});
