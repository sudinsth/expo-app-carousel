import {StyleSheet} from 'react-native';

import AppCarousel from '../AppCarousel';
import {Text, View} from '@/src/components/Themed';
import EditScreenInfo from '@/src/components/EditScreenInfo';

export default function TabOneScreen() {
	return (
		<View style={styles.container}>
			{/* <EditScreenInfo path='app/(tabs)/index.tsx' />
			 */}

			<AppCarousel />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
