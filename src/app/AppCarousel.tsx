import React, {useCallback, useRef} from 'react';

import {FlashList} from '@shopify/flash-list';
import {LinearGradient} from 'expo-linear-gradient';
import {
	View,
	Image,
	Animated,
	TextProps,
	StyleSheet,
	Dimensions,
	Text as RNText,
	TouchableOpacity,
	NativeSyntheticEvent,
	FlatList,
	NativeScrollEvent,
} from 'react-native';

import BANNER_IMG from '../assets/images/banner.webp';

const data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ITEM_SIZE = 120;

const BANNER_HEIGHT = 210;
const SPACING = 280;
const SEPARATOR = 12;
const ItemSeparatorComponent = () => <View style={{width: SEPARATOR}} />;

const {width} = Dimensions.get('window');

const Text = (props: TextProps) => (
	<RNText {...props} style={[{color: 'white'}, props.style]}>
		{props.children}
	</RNText>
);

// NOTE: header component
const ListHeaderComponent = () => {
	return (
		<View
			style={{
				alignItems: 'center',
				paddingHorizontal: ITEM_SIZE - 28,
				position: 'absolute',
				top: (BANNER_HEIGHT - 32) / 6,
			}}
		>
			<View
				style={{
					width: ITEM_SIZE / 1.5,
					aspectRatio: 1,
					borderRadius: 100,
					backgroundColor: 'grey',
				}}
			/>
			<View style={{paddingVertical: 10}}>
				<Text style={{}}>{`More by {user}`}</Text>
			</View>

			<TouchableOpacity
				onPress={() => {}}
				style={{
					borderWidth: 1,
					borderColor: 'white',
					borderRadius: 100,
					paddingHorizontal: 12,
					paddingVertical: 8,
				}}
			>
				<Text>More</Text>
			</TouchableOpacity>
		</View>
	);
};

// NOTE: Main render
const AppCarousel = () => {
	const translateXAnim = useRef(new Animated.Value(0)).current;

	const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);
	const flatListRef = useRef<FlashList<any>>(null);

	const inputRange = [0, 100];
	const outputRange = [0, -40];

	const translateX = translateXAnim.interpolate({
		inputRange,
		outputRange,
		extrapolate: 'clamp',
	});

	const opacity = translateXAnim.interpolate({
		inputRange: [10, 100],
		outputRange: [1, 0],
	});

	const handleOnScroll = Animated.event(
		[{nativeEvent: {contentOffset: {x: translateXAnim}}}],
		{useNativeDriver: true}
	);

	const handleOnMomentumScrollEnd = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			const offsetX = event.nativeEvent.contentOffset.x;
			const center = offsetX + (ITEM_SIZE + SEPARATOR) / 2;
			const adjustedOffsetX = center - (SPACING - 13);

			const index = Math.floor(adjustedOffsetX / (ITEM_SIZE + SEPARATOR));
			const targetOffset = index * (ITEM_SIZE + SEPARATOR) + (SPACING - 13);

			flatListRef.current?.scrollToOffset({
				offset: targetOffset,
				animated: true,
			});
		},
		[flatListRef]
	);

	const renderItem = ({item}: {item: any}) => {
		return (
			<View>
				<View
					style={{
						aspectRatio: 1,
						width: ITEM_SIZE,
						height: ITEM_SIZE,
						alignItems: 'center',
						backgroundColor: 'grey',
						justifyContent: 'center',
						borderRadius: ITEM_SIZE / 6,
					}}
				>
					<Text>{item}</Text>
				</View>

				<View style={{marginTop: 10}}>
					<Text>{`{Item Title}`}</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={{flex: 1}}>
			<View
				style={{
					justifyContent: 'center',
					height: BANNER_HEIGHT,
				}}
			>
				{/* NOTE: Background Image */}
				<Animated.View
					style={{
						position: 'absolute',
						height: '100%',
						transform: [
							{
								translateX: translateX,
							},
						],
					}}
				>
					<Image
						source={BANNER_IMG}
						style={{resizeMode: 'cover', width: width, height: '100%'}}
					/>
				</Animated.View>

				{/* NOTE: Gradient overlay */}
				<LinearGradient
					start={{x: 0, y: 0.5}}
					end={{x: 1, y: 0.5}}
					style={{height: '100%'}}
					colors={[
						'rgba(0,0,0,0.2)',
						'rgba(0,0,0,0.4)',
						'rgba(0,0,0,0.6)',
						'rgba(0,0,0,0.8)',
						'rgba(0,0,0,1)',
					]}
				>
					<>
						{/* NOTE: More info button */}
						<Animated.View
							style={{
								opacity: opacity,
								zIndex: translateXAnim.interpolate({
									inputRange: [0, 100],
									outputRange: [99, -1],
									extrapolate: 'clamp',
								}),
							}}
						>
							<ListHeaderComponent />
						</Animated.View>

						{/* NOTE: Content */}
						<AnimatedFlashList
							horizontal
							data={data}
							bounces={false}
							ref={flatListRef}
							snapToEnd={false}
							snapToStart={false}
							decelerationRate={0}
							renderItem={renderItem}
							scrollEventThrottle={16}
							onScroll={handleOnScroll}
							snapToAlignment={'center'}
							snapToInterval={ITEM_SIZE}
							estimatedItemSize={ITEM_SIZE}
							showsHorizontalScrollIndicator={false}
							snapToOffsets={[0, SPACING - SEPARATOR]}
							onMomentumScrollEnd={handleOnMomentumScrollEnd}
							contentContainerStyle={styles.contentContainer}
							ItemSeparatorComponent={ItemSeparatorComponent}
						/>
					</>
				</LinearGradient>
			</View>
		</View>
	);
};

export default AppCarousel;

const styles = StyleSheet.create({
	contentContainer: {
		paddingLeft: SPACING,
		paddingVertical: 32,
		paddingHorizontal: 12,
	},
});
